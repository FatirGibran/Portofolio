import React, { useState, useEffect, memo } from 'react';

function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't spawn if clicked on an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const id = `${Date.now()}-${Math.random()}`;
      const newRipple = {
        id,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-8), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };

    window.addEventListener('pointerdown', handleClick, { passive: true });
    return () => window.removeEventListener('pointerdown', handleClick);
  }, []);

  if (ripples.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden">
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-12 h-12 rounded-full border-2 border-pastel-yellow dark:border-amber-400/80 bg-pastel-blue/20 dark:bg-sky-400/20 animate-ping duration-700 pointer-events-none"
        />
      ))}
    </div>
  );
}

export default memo(ClickRipple);
