import type { MDXComponents } from 'mdx/types';
import Callout from '@/components/Callout';
import CodeBlock from '@/components/CodeBlock';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import TroubleshootingCard from '@/components/TroubleshootingCard';
import TestReportTable from '@/components/TestReportTable';
import InteractiveTabs from '@/components/InteractiveTabs';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    CodeBlock,
    ArchitectureDiagram,
    TroubleshootingCard,
    TestReportTable,
    InteractiveTabs,
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mt-10 mb-4">
        {children}
      </h1>
    ),
    h2: ({ id, children }) => (
      <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-12 mb-4 scroll-mt-24 border-b border-slate-200 dark:border-slate-800 pb-2">
        {children}
      </h2>
    ),
    h3: ({ id, children }) => (
      <h3 id={id} className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-8 mb-3 scroll-mt-24">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed my-4 text-base">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-4 text-slate-700 dark:text-slate-300 text-sm">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 text-slate-700 dark:text-slate-300 text-sm">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    code: ({ className, children }) => {
      if (!className) {
        return (
          <code className="px-1.5 py-0.5 rounded-md font-mono text-xs bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-medium border border-slate-200 dark:border-slate-700">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    ...components,
  };
}
