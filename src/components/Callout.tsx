'use client';

import React from 'react';
import { Info, AlertTriangle, CheckCircle2, Flame, AlertCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger' | 'success';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60',
      text: 'text-blue-900 dark:text-blue-200',
      iconText: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
      icon: Info,
      defaultTitle: 'Note',
    },
    warning: {
      bg: 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60',
      text: 'text-amber-900 dark:text-amber-200',
      iconText: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
      icon: AlertTriangle,
      defaultTitle: 'Attention',
    },
    tip: {
      bg: 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60',
      text: 'text-emerald-900 dark:text-emerald-200',
      iconText: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
      icon: CheckCircle2,
      defaultTitle: 'Pro-Tip',
    },
    danger: {
      bg: 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60',
      text: 'text-rose-900 dark:text-rose-200',
      iconText: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300',
      icon: AlertCircle,
      defaultTitle: 'Crucial Bug / Gotcha',
    },
    success: {
      bg: 'bg-green-50/80 dark:bg-green-950/30 border-green-200 dark:border-green-900/60',
      text: 'text-green-900 dark:text-green-200',
      iconText: 'text-green-600 dark:text-green-400',
      badge: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
      icon: Flame,
      defaultTitle: 'Success',
    },
  }[type];

  const Icon = styles.icon;

  return (
    <div className={`my-6 p-4 rounded-xl border ${styles.bg} transition-all duration-200 shadow-sm`}>
      <div className="flex items-start gap-3">
        <div className={`p-1 rounded-lg shrink-0 mt-0.5 ${styles.iconText}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badge}`}>
              {title || styles.defaultTitle}
            </span>
          </div>
          <div className={`text-sm leading-relaxed ${styles.text} prose-sm max-w-none`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
