/**
 * เติม base path ให้ path ของไฟล์ใน public/
 *
 * จำเป็นเมื่อ deploy ลง subfolder เช่น https://username.github.io/repo-name/
 * เพราะ next/image แบบ unoptimized จะไม่เติม basePath ให้อัตโนมัติ
 *
 * ใช้กับทุก src ของรูปภาพ:  <Image src={asset("/images/xxx.jpg")} ... />
 */
export function asset(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path}`;
}
