'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bug, Wrench, CheckCircle, HelpCircle } from 'lucide-react';

interface TroubleItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  symptom: string;
  rootCause: string;
  solution: string;
  codeSnippet?: string;
  lang?: string;
}

const troubleItems: TroubleItem[] = [
  {
    id: 'mongo-dns',
    title: '1. Docker DNS vs MongoDB Go Driver Hostname Casing',
    badge: 'DNS Resolution',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    symptom: 'The Gin application failed to connect to MongoDB on the Docker bridge network: "server selection error: server selection timeout, current topology: { Type: Unknown, Servers: [{ Addr: mongodb:27017, Type: Unknown }] }".',
    rootCause: 'In main.go, the connection string uses "mongoDb:27017". The official Go mongo-driver parses URIs according to RFC 3986 and normalizes the hostname to lowercase "mongodb". When the Docker container was only registered as "mongoDb", Docker\'s internal DNS (127.0.0.11) couldn\'t resolve the lowercase query.',
    solution: 'Attach both casing variants as network aliases on the MongoDB container so Docker DNS responds to either form.',
    codeSnippet: 'docker run -d --name mongodb --network keploy-network \\\n  --network-alias mongodb --network-alias mongoDb \\\n  -p 27017:27017 mongo',
    lang: 'bash',
  },
  {
    id: 'noisy-timestamp',
    title: '2. Dynamic Timestamp in Response Body (body.ts)',
    badge: 'Test Flakiness',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    symptom: 'During test replay, Keploy would report a body mismatch on the "ts" field because the application generates a fresh timestamp (time.Now().UnixNano()) on every request.',
    rootCause: 'The POST /url handler returns a "ts" field containing the current nanosecond timestamp. This value naturally differs between the original recording and any replay, causing assertion failures.',
    solution: 'Keploy\'s test YAML includes an assertions.noise section. Adding "body.ts: []" and "header.Date: []" tells Keploy to skip these fields during comparison.',
    codeSnippet: '# In test-1.yaml\nassertions:\n  noise:\n    body.ts: []\n    header.Date: []',
    lang: 'yaml',
  },
  {
    id: 'keploy-auth',
    title: '3. Keploy CLI v3.x Mandatory OAuth Authentication',
    badge: 'CLI Blocker',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    symptom: 'Running "keploy record" on v3.8.53 immediately opens a browser-based OAuth flow at app.keploy.io. In headless WSL2 environments without a desktop browser, the process blocks for 60 seconds and then exits with "authentication timed out".',
    rootCause: 'Starting with Keploy v3.x, the CLI requires cloud authentication before recording or testing. The --in-ci flag and KEPLOY_API_KEY environment variable were tested but did not bypass the interactive OAuth prompt without a valid API key from the Keploy cloud console.',
    solution: 'Create a free account at app.keploy.io to obtain an API key, or use --manual-login in an environment with browser access. For this tutorial, we verified the application independently and examined the pre-existing Keploy artifacts shipped with the samples-go repository.',
    codeSnippet: '# What we observed:\n$ keploy record -c "docker run ..." --in-ci\n\nOpening browser for authentication...\nWaiting for authentication...\nError: authentication timed out after 1 minute',
    lang: 'bash',
  },
];

export default function TroubleshootingCard() {
  const [openItem, setOpenItem] = useState<string | null>('mongo-dns');

  const toggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-lg">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
          <Bug className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Real-World Issues Encountered
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Genuine problems hit while setting up and running this quickstart — not hypothetical.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {troubleItems.map((item) => {
          const isOpen = openItem === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all bg-slate-50/50 dark:bg-slate-950/40"
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                )}
              </button>

              {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-1">
                      <HelpCircle className="w-3.5 h-3.5" /> Symptom:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-mono bg-slate-200/50 dark:bg-slate-900/90 p-2 rounded-lg border border-slate-300/40 dark:border-slate-800">
                      {item.symptom}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                      <Wrench className="w-3.5 h-3.5" /> Root Cause:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {item.rootCause}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Resolution:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {item.solution}
                    </p>
                  </div>

                  {item.codeSnippet && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <pre className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono overflow-x-auto text-[11px]">
                        <code>{item.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
