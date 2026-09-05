"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** หน่วงเวลาก่อนเริ่ม animation (มิลลิวินาที) */
  delay?: number;
  className?: string;
};

/**
 * ห่อเนื้อหาให้ค่อย ๆ ปรากฏเมื่อเลื่อนถึง (fade-up)
 * ใช้ IntersectionObserver + CSS transition เพื่อให้เบาที่สุด ไม่ต้องพึ่ง library
 */
export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
