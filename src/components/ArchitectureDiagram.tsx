'use client';

import React, { useState } from 'react';
import { Database, ArrowRight, Play, Disc, ShieldCheck, Zap } from 'lucide-react';

export default function ArchitectureDiagram() {
  const [mode, setMode] = useState<'record' | 'test'>('record');

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-500" />
            Interactive Keploy Architecture: eBPF & Wire Proxy
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Switch between modes to see how Keploy eliminates manual mocks and intercepts traffic.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setMode('record')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'record'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Disc className="w-4 h-4 animate-pulse" />
            Record Mode
          </button>
          <button
            onClick={() => setMode('test')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mode === 'test'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Play className="w-4 h-4" />
            Test Mode (Mocks Replay)
          </button>
        </div>
      </div>

      {/* Visual Pipeline */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Step 1: Ingress / Client */}
        <div className="flex flex-col items-center text-center p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 relative group">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-lg mb-3 shadow-inner">
            cURL
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mode === 'record' ? 'Real Ingress Traffic' : 'Keploy Test Replay Engine'}
          </span>
          <h5 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mt-1">
            {mode === 'record' ? 'Manual or CI Requests' : 'Zero-Code Test Harness'}
          </h5>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {mode === 'record'
              ? 'Sends POST /url, GET /:id, or GET /verify-email to the container.'
              : 'Re-emits recorded HTTP payloads without modifying the Go binary.'}
          </p>
          <div className="mt-4 px-2.5 py-1 rounded bg-blue-100/60 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-mono">
            :8080 (HTTP)
          </div>
        </div>

        {/* Step 2: Keploy Interception & App */}
        <div className="flex flex-col items-center text-center p-5 rounded-xl border-2 border-brand-500/50 bg-brand-50/20 dark:bg-brand-950/20 relative shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-3 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            eBPF & Network Tap
          </span>
          <h5 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mt-1">
            Go Gin Container (MongoApp)
          </h5>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            {mode === 'record'
              ? 'Keploy attaches to network sockets via kernel hooks to record HTTP & outbound MongoDB requests.'
              : 'Keploy intercepts Mongo socket read/write calls and mocks them directly from YAML!'}
          </p>
          <div className="mt-4 px-2.5 py-1 rounded bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-[11px] font-mono">
            Docker Network: keploy-network
          </div>
        </div>

        {/* Step 3: Database & Mocks */}
        <div className="flex flex-col items-center text-center p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 relative">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 shadow-inner">
            <Database className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {mode === 'record' ? 'Live MongoDB Server' : 'Virtual Mocks (No DB Required)'}
          </span>
          <h5 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mt-1">
            {mode === 'record' ? 'mongodb:27017' : 'mocks.yaml Replay'}
          </h5>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {mode === 'record'
              ? 'Real queries (OpMsg, insert, find) execute on MongoDB and responses are serialized into mocks.yaml.'
              : 'Database container is completely unnecessary! Keploy serves BSON packets from recorded wire files.'}
          </p>
          <div className="mt-4 px-2.5 py-1 rounded bg-purple-100/60 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] font-mono">
            {mode === 'record' ? 'Live BSON Wire Traffic' : 'Zero-Dependency CI'}
          </div>
        </div>
      </div>

      {/* Mode Callout Banner */}
      <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-xs leading-relaxed ${
        mode === 'record'
          ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50'
          : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
      }`}>
        <div className="w-2.5 h-2.5 rounded-full bg-current shrink-0 animate-pulse" />
        <div>
          {mode === 'record' ? (
            <span>
              <strong>Record Active:</strong> Keploy captures both incoming HTTP assertions (status, headers, body) and outbound MongoDB queries (`OpMsg`) to disk under <code className="font-mono bg-rose-100 dark:bg-rose-900/60 px-1 py-0.5 rounded">keploy/test-set-0/</code>.
            </span>
          ) : (
            <span>
              <strong>Test Active:</strong> In CI/CD, the Go application runs against simulated external calls. Keploy intercepts database connections at the transport layer and matches incoming requests against stored mocks in sub-millisecond speeds.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
