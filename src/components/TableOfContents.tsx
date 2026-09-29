'use client';

import React, { useEffect, useState } from 'react';
import { Bookmark, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  label: string;
}

const tocItems: TocItem[] = [
  { id: 'why-keploy', label: '1. Why Keploy for Go Engineers?' },
  { id: 'sample-app', label: '2. The Sample Architecture (Gin + Mongo)' },
  { id: 'architecture', label: '3. Keploy Internals: eBPF & Wire Proxy' },
  { id: 'hands-on-guide', label: '4. Step-by-Step Hands-On Guide' },
  { id: 'step-1-network', label: '— Setup Docker Network & MongoDB' },
  { id: 'step-2-build', label: '— Build the Go Container Image' },
  { id: 'step-3-record', label: '— Record Real API Traffic' },
  { id: 'step-4-replay', label: '— Replay Tests with Zero Dependencies' },
  { id: 'troubleshooting', label: '5. Real-World Troubleshooting' },
  { id: 'anatomy', label: '6. Anatomy of Keploy Artifacts' },
  { id: 'evidence', label: '7. Execution Evidence & Verification' },
  { id: 'devrel-takeaways', label: '8. DevRel Key Takeaways' },
];

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('why-keploy');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur p-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Bookmark className="w-3.5 h-3.5 text-brand-500" />
          On This Page
        </div>
        <nav className="space-y-1 text-xs">
          {tocItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 font-semibold bg-brand-50 dark:bg-brand-950/60'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1 text-brand-500" />}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
