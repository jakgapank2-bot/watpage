/**
 * ═══════════════════════════════════════════════════════════════
 *  ระบบหลังบ้าน "วัฒน์จัดให้"  —  รันบนเครื่องตัวเองเท่านั้น
 * ═══════════════════════════════════════════════════════════════
 *
 *  เปิดด้วย:  npm run admin     แล้วเข้า http://localhost:4000
 *
 *  หน้าที่:
 *    • อ่าน / บันทึกเนื้อหาในโฟลเดอร์ content/*.json
 *    • อัปโหลดรูป → แปลงเป็น .webp อัตโนมัติ → เก็บลง public/images/
 *    • แปลงรูปเก่า (.png/.jpg) ทั้งหมดเป็น .webp พร้อมอัปเดต path ให้
 *
 *  ⚠️ ตัวนี้ไม่ได้ถูก deploy ขึ้นเว็บ และไม่เกี่ยวกับ next build
 *     เว็บที่ deploy ยังเป็น static 100% เหมือนเดิม
 *     ฟังผูกกับ 127.0.0.1 จึงเข้าจากเครื่องอื่นไม่ได้
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, readdir, unlink, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const IMAGES = path.join(ROOT, "public", "images");
const PORT = Number(process.env.ADMIN_PORT ?? 4000);

/** ไฟล์เนื้อหาที่แก้ไขได้ */
const FILES = ["site", "services", "portfolio", "images"];

/** โฟลเดอร์ปลายทางของรูปแต่ละส่วน + ความกว้างสูงสุดที่เหมาะสม */
const SLOTS = {
  hero: { dir: "hero", maxWidth: 2000 },
  about: { dir: "about", maxWidth: 1200 },
  cta: { dir: "cta", maxWidth: 1800 },
  lineQr: { dir: "contact", maxWidth: 600 },
  services: { dir: "services", maxWidth: 1000 },
  portfolio: { dir: "portfolio", maxWidth: 1400 },
};

const WEBP_QUALITY = 82;

/* ───────────────────────── helpers ───────────────────────── */

const json = (res, code, data) => {
  res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
};

const readBody = (req, limit = 40 * 1024 * 1024) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error("ไฟล์ใหญ่เกิน 40 MB"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

/** กันการเขียนไฟล์นอกโฟลเดอร์ที่อนุญาต */
const safeJoin = (base, ...parts) => {
  const target = path.resolve(base, ...parts);
  if (target !== base && !target.startsWith(base + path.sep)) {
    throw new Error("path ไม่ถูกต้อง");
  }
  return target;
};

/** ตั้งชื่อไฟล์ให้ปลอดภัย (ตัดอักขระแปลก ๆ ออก) */
const safeName = (name) =>
  (name || "image")
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9ก-๙_-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";

/* ───────────────────────── routes ───────────────────────── */

/** GET /api/content — อ่านเนื้อหาทั้งหมด */
async function getContent(res) {
  const out = {};
  for (const name of FILES) {
    out[name] = JSON.parse(await readFile(path.join(CONTENT, `${name}.json`), "utf8"));
  }
  json(res, 200, out);
}

/** POST /api/content — บันทึกเนื้อหา (สำรองไฟล์เดิมไว้ก่อน) */
async function saveContent(req, res) {
  const body = JSON.parse((await readBody(req)).toString("utf8"));
  const backupDir = path.join(CONTENT, ".backup");
  await mkdir(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");

  const saved = [];
  for (const name of FILES) {
    if (!body[name]) continue;
    const file = path.join(CONTENT, `${name}.json`);
    if (existsSync(file)) {
      await writeFile(path.join(backupDir, `${name}.${stamp}.json`), await readFile(file));
    }
    await writeFile(file, JSON.stringify(body[name], null, 2) + "\n", "utf8");
    saved.push(name);
  }
  json(res, 200, { ok: true, saved });
}

/**
 * POST /api/upload?slot=hero&name=hero-bg
 * body = ไฟล์รูปดิบ → แปลงเป็น .webp แล้วบันทึก
 */
async function uploadImage(req, res, url) {
  const slotKey = url.searchParams.get("slot") ?? "";
  const slot = SLOTS[slotKey];
  if (!slot) return json(res, 400, { error: `ไม่รู้จักส่วน "${slotKey}"` });

  const buf = await readBody(req);
  if (!buf.length) return json(res, 400, { error: "ไม่พบข้อมูลรูป" });

  const base = safeName(url.searchParams.get("name"));
  const dir = safeJoin(IMAGES, slot.dir);
  await mkdir(dir, { recursive: true });
  const outPath = safeJoin(dir, `${base}.webp`);

  const image = sharp(buf, { failOn: "none" });
  const meta = await image.metadata();
  if (!meta.width) return json(res, 400, { error: "อ่านไฟล์รูปไม่ได้ (รองรับ png / jpg / webp / gif / avif)" });

  const pipeline = meta.width > slot.maxWidth ? image.resize({ width: slot.maxWidth }) : image;
  const info = await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);

  json(res, 200, {
    ok: true,
    src: `/images/${slot.dir}/${base}.webp`,
    width: info.width,
    height: info.height,
    bytes: info.size,
    originalBytes: buf.length,
  });
}

/**
 * POST /api/convert-all
 * แปลงรูป .png/.jpg/.jpeg ทั้งหมดใน public/images เป็น .webp
 * แล้วคืน mapping ให้ฝั่งหน้าเว็บอัปเดต path เอง
 */
async function convertAll(req, res) {
  const { deleteOriginals = false } = JSON.parse((await readBody(req)).toString("utf8") || "{}");
  const converted = [];
  const skipped = [];

  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }
      if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
      // og-image ต้องคงเป็น .png — บางแพลตฟอร์มอ่าน WebP ตอนแชร์ลิงก์ไม่ได้
      if (/^og-image\./i.test(entry.name)) {
        skipped.push({ file: entry.name, reason: "ข้ามไว้ ภาพตอนแชร์ลิงก์ต้องเป็น .png" });
        continue;
      }

      const outPath = full.replace(/\.(png|jpe?g)$/i, ".webp");
      const rel = (p) => "/images/" + path.relative(IMAGES, p).split(path.sep).join("/");

      try {
        const before = (await stat(full)).size;
        const info = await sharp(full, { failOn: "none" })
          .webp({ quality: WEBP_QUALITY })
          .toFile(outPath);
        if (deleteOriginals) await unlink(full);
        converted.push({
          from: rel(full),
          to: rel(outPath),
          width: info.width,
          height: info.height,
          beforeBytes: before,
          afterBytes: info.size,
        });
      } catch (err) {
        skipped.push({ file: rel(full), reason: String(err.message ?? err) });
      }
    }
  };

  if (existsSync(IMAGES)) await walk(IMAGES);
  json(res, 200, { ok: true, converted, skipped });
}

/** GET /api/images — รายชื่อไฟล์รูปทั้งหมด (ไว้เลือกใช้ซ้ำ) */
async function listImages(res) {
  const out = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(entry.name)) {
        const { size } = await stat(full);
        out.push({
          src: "/images/" + path.relative(IMAGES, full).split(path.sep).join("/"),
          bytes: size,
        });
      }
    }
  };
  if (existsSync(IMAGES)) await walk(IMAGES);
  out.sort((a, b) => a.src.localeCompare(b.src));
  json(res, 200, { images: out });
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

/* ───────────────────────── server ───────────────────────── */

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const p = url.pathname;

  try {
    if (req.method === "GET" && (p === "/" || p === "/index.html")) {
      res.writeHead(200, { "content-type": MIME[".html"] });
      res.end(await readFile(path.join(ROOT, "admin", "index.html")));
      return;
    }
    if (req.method === "GET" && p === "/api/content") return await getContent(res);
    if (req.method === "GET" && p === "/api/images") return await listImages(res);
    if (req.method === "POST" && p === "/api/content") return await saveContent(req, res);
    if (req.method === "POST" && p === "/api/upload") return await uploadImage(req, res, url);
    if (req.method === "POST" && p === "/api/convert-all") return await convertAll(req, res);

    // เสิร์ฟรูปจาก public/images สำหรับพรีวิว
    if (req.method === "GET" && p.startsWith("/images/")) {
      const file = safeJoin(IMAGES, decodeURIComponent(p.slice("/images/".length)));
      if (existsSync(file)) {
        res.writeHead(200, {
          "content-type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
          "cache-control": "no-store",
        });
        res.end(await readFile(file));
        return;
      }
    }

    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("ไม่พบหน้านี้");
  } catch (err) {
    console.error(err);
    json(res, 500, { error: String(err.message ?? err) });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("  ╔══════════════════════════════════════════════╗");
  console.log("  ║   ระบบหลังบ้าน วัฒน์จัดให้                    ║");
  console.log("  ╚══════════════════════════════════════════════╝");
  console.log("");
  console.log(`   เปิดที่  →  http://localhost:${PORT}`);
  console.log("");
  console.log("   • แก้ข้อความ/รูป แล้วกด “บันทึก”");
  console.log("   • รูปที่อัปโหลดจะถูกแปลงเป็น .webp ให้อัตโนมัติ");
  console.log("   • เสร็จแล้ว commit + push ผ่าน GitHub Desktop เพื่ออัปเว็บจริง");
  console.log("");
  console.log("   กด Ctrl+C เพื่อปิด");
  console.log("");
});
