import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import TableOfContents from '@/components/TableOfContents';

export const metadata: Metadata = {
  title: 'Zero-Code Testing for Go with Keploy: A Hands-On Guide',
  description:
    'A comprehensive, beginner-friendly DevRel tutorial on capturing real network wire traffic, recording test cases, mocking MongoDB, and troubleshooting container networking with Keploy.',
  keywords: [
    'Keploy',
    'Go',
    'Golang',
    'Gin',
    'MongoDB',
    'eBPF',
    'Integration Testing',
    'Docker',
    'DevRel',
    'Automated Mocks',
  ],
  authors: [{ name: 'Keploy DevRel Candidate' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 transition-colors selection:bg-brand-500/30 selection:text-brand-600 dark:selection:text-brand-300">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col xl:flex-row gap-12 items-start">
            {/* Main Content Area */}
            <main className="w-full xl:max-w-4xl min-w-0">
              {children}
            </main>

            {/* Sticky Table of Contents */}
            <TableOfContents />
          </div>
        </div>

        {/* Global Footer */}
        <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500 dark:text-slate-400">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Keploy DevRel Candidate Technical Assignment
              </p>
              <p className="mt-1">
                Built with Next.js 14, MDX, Tailwind CSS & Docker eBPF Testing Suite.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center justify-center gap-6">
              <a
                href="https://keploy.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-500 transition-colors"
              >
                Official Docs
              </a>
              <a
                href="https://github.com/keploy/keploy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-500 transition-colors"
              >
                Keploy GitHub
              </a>
              <a
                href="https://keploy.io/slack"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-500 transition-colors"
              >
                Community Slack
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
