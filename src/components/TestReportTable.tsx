'use client';

import React from 'react';
import { CheckCircle2, FileText, Database, Shield, AlertTriangle } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  method: string;
  endpoint: string;
  expectedStatus: number;
  noisyFields: string[];
  description: string;
}

const testCases: TestCase[] = [
  {
    id: 'test-1',
    name: 'Shorten URL',
    method: 'POST',
    endpoint: '/url',
    expectedStatus: 200,
    noisyFields: ['body.ts', 'header.Date'],
    description: 'Creates a shortened URL for https://google.com → returns short code Lhr4BWAi with timestamp',
  },
  {
    id: 'test-2',
    name: 'Redirect Short URL',
    method: 'GET',
    endpoint: '/Lhr4BWAi',
    expectedStatus: 303,
    noisyFields: ['header.Date'],
    description: 'Redirects to https://google.com via HTTP 303 See Other',
  },
];

export default function TestReportTable() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            Keploy-Generated Test Artifacts
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pre-recorded interactions from <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">keploy/test-set-0/</code> (Keploy sample repo, June 2024).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-semibold text-xs border border-amber-300 dark:border-amber-800">
            <AlertTriangle className="w-3.5 h-3.5" />
            2 Recorded Tests
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              <th className="py-3 px-3">Test ID</th>
              <th className="py-3 px-3">Scenario</th>
              <th className="py-3 px-3">HTTP Endpoint</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Noise Filters</th>
              <th className="py-3 px-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {testCases.map((tc) => (
              <tr key={tc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3 font-mono font-bold text-brand-600 dark:text-brand-400">
                  {tc.id}
                </td>
                <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                  {tc.name}
                </td>
                <td className="py-3 px-3 font-mono text-[11px]">
                  <span className={`px-1.5 py-0.5 rounded mr-1.5 font-bold ${
                    tc.method === 'POST'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                  }`}>
                    {tc.method}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">{tc.endpoint}</span>
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {tc.expectedStatus}
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1">
                    {tc.noisyFields.map((nf) => (
                      <span key={nf} className="font-mono text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded">
                        {nf}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600 dark:text-slate-400 max-w-[200px]">
                  {tc.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-500" />
          <span>Artifacts from: <code>samples-go/gin-mongo/keploy/test-set-0/</code></span>
        </div>
        <div>
          <span>Wire protocol: <strong>MongoDB OpQuery + OpMsg (BSON v1)</strong></span>
        </div>
      </div>
    </div>
  );
}
