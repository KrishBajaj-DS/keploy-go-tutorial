import type { MDXComponents } from 'mdx/types';
import Callout from './src/components/Callout';
import CodeBlock from './src/components/CodeBlock';
import ArchitectureDiagram from './src/components/ArchitectureDiagram';
import TroubleshootingCard from './src/components/TroubleshootingCard';
import TestReportTable from './src/components/TestReportTable';
import InteractiveTabs from './src/components/InteractiveTabs';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    CodeBlock,
    ArchitectureDiagram,
    TroubleshootingCard,
    TestReportTable,
    InteractiveTabs,
    // Native markdown elements styled with Tailwind
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
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-500 pl-4 italic text-slate-600 dark:text-slate-400 my-4">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-sm">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold text-xs uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 text-xs">
        {children}
      </td>
    ),
    pre: ({ children }) => <div className="not-prose">{children}</div>,
    code: ({ className, children }) => {
      // If inline code without language
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
