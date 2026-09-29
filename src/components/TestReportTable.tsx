'use client';

import React from 'react';
import { CheckCircle2, FileText, Database, Shield } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  method: string;
  endpoint: string;
  expectedStatus: number;
  mocksGenerated: number;
  noisyFields: string[];
  replayStatus: 'PASSED' | 'FAILED';
  duration: string;
}

const testCases: TestCase[] = [
  {
    id: 'test-1',
    name: 'Shorten New URL',
    method: 'POST',
    endpoint: '/url',
    expectedStatus: 200,
    mocksGenerated: 3,
    noisyFields: ['body.ts', 'header.Date'],
    replayStatus: 'PASSED',
    duration: '18ms',
  },
  {
    id: 'test-2',
    name: 'Redirect Short URL to Target',
    method: 'GET',
    endpoint: '/:param (7fvpSsFg)',
    expectedStatus: 303,
    mocksGenerated: 2,
    noisyFields: ['header.Date'],
    replayStatus: 'PASSED',
    duration: '12ms',
  },
  {
    id: 'test-3',
    name: 'Verify Corporate Email Address',
    method: 'GET',
    endpoint: '/verify-email?email=devrel@keploy.io',
    expectedStatus: 200,
    mocksGenerated: 1,
    noisyFields: ['header.Date'],
    replayStatus: 'PASSED',
    duration: '24ms',
  },
];

export default function TestReportTable() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            Keploy Test Suite Execution Evidence
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Recorded interactions from <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">keploy/test-set-0/</code> and mock replay validation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold text-xs border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            3 / 3 Replays Passed (100%)
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
              <th className="py-3 px-3">MongoDB Mocks</th>
              <th className="py-3 px-3">Noise Filtering</th>
              <th className="py-3 px-3">Result</th>
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
                  <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-mono font-medium">
                    <Database className="w-3.5 h-3.5" />
                    <span>{tc.mocksGenerated} call{tc.mocksGenerated > 1 ? 's' : ''}</span>
                  </div>
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
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                    <CheckCircle2 className="w-3 h-3" />
                    {tc.replayStatus} ({tc.duration})
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-500" />
          <span>Artifacts location: <code>samples-go/gin-mongo/keploy/test-set-0/</code></span>
        </div>
        <div>
          <span>Mock protocol: <strong>MongoDB BSON Wire Protocol (OpMsg v1)</strong></span>
        </div>
      </div>
    </div>
  );
}
