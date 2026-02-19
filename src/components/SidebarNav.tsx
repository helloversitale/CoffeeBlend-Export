'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'hours', label: 'Hours' },
  { id: 'contact', label: 'Contact' },
];

export function SidebarNav() {
  const [activeId, setActiveId] = useState<string>('hero');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-5">
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className="flex items-center justify-end gap-3 group"
            aria-label={label}
          >
            <span
              className={`
                text-xs font-semibold tracking-wide transition-all duration-200
                ${isHovered || isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
                ${isActive ? 'text-amber-900' : 'text-amber-700'}
              `}
            >
              {label}
            </span>

            <span
              className={`
                relative flex items-center justify-center rounded-full border-2 transition-all duration-200
                ${isActive
                  ? 'w-4 h-4 border-amber-800 bg-amber-800'
                  : 'w-3 h-3 border-amber-400 bg-transparent group-hover:border-amber-700'
                }
              `}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
