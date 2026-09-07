import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    let currentX = -100, currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      currentX = lerp(currentX, pos.current.x, 0.12);
      currentY = lerp(currentY, pos.current.y, 0.12);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);

    const checkExpand = (e: MouseEvent) => {
      const el = e.target as Element;
      const isInteractive = el?.closest('button, a, [role="button"], input, select, textarea, label');
      setExpanded(!!isInteractive);
    };

    window.addEventListener('mouseover', checkExpand);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkExpand);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor pointer-events-none hidden md:block ${expanded ? 'expanded' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot pointer-events-none hidden md:block"
        aria-hidden="true"
      />
    </>
  );
}
