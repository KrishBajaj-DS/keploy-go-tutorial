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
    title: '1. Docker DNS vs MongoDB Go Driver Hostname Case-Sensitivity',
    badge: 'DNS & Driver Bug',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    symptom: 'Gin app crashed on container start: server selection error: server selection timeout, current topology: { Type: Unknown, Servers: [{ Addr: mongodb:27017, Type: Unknown, State: Disconnected }] }',
    rootCause: 'In main.go, the connection string was configured as "mongoDb:27017". The official Go mongo-driver normalizes hostnames according to RFC 3986 to lowercase "mongodb". Docker\'s embedded DNS engine (127.0.0.11) treats container names strictly or fails when an exact matching casing isn\'t present.',
    solution: 'Provide both network aliases on the MongoDB container with `--network-alias mongodb --network-alias mongoDb`, or update the Docker network configuration.',
    codeSnippet: 'docker run -d --name mongodb --network keploy-network \\\n  --network-alias mongodb --network-alias mongoDb \\\n  -p 27017:27017 mongo',
    lang: 'bash',
  },
  {
    id: 'noisy-timestamp',
    title: '2. Dynamic Response Non-Determinism (body.ts Unix Timestamp)',
    badge: 'Test Flakiness',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    symptom: 'keploy test failed with: "Test set: test-set-0, Test: test-1, Result: FAILED. Body mismatch on field: ts (expected: 1774900595123456789, actual: 1774900891234567890)".',
    rootCause: 'The Gin handler generates a live timestamp using time.Now().UnixNano() on every URL creation. During test replay, the recorded timestamp will never match the freshly generated timestamp.',
    solution: 'Configure Keploy\'s assertions noise filter in test-1.yaml or keploy.yml to ignore dynamic fields such as body.ts and header.Date during assertion matching.',
    codeSnippet: 'assertions:\n  noise:\n    body.ts: []\n    header.Date: []',
    lang: 'yaml',
  },
  {
    id: 'keploy-auth',
    title: '3. Keploy CLI Cloud OAuth Prompt in Headless / CI Linux',
    badge: 'CLI Behavior',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    symptom: 'Keploy CLI v3.8+ opens an interactive browser OAuth handshake at app.keploy.io/signin/integration/auth. In headless WSL/CI runners without GUI browsers, the process blocks.',
    rootCause: 'Keploy recently integrated cloud telemetry and test management by default on interactive invocations.',
    solution: 'Pass the `--in-ci` or `--useLocalMock` flags, or leverage the local Docker container flow so Keploy operates purely offline with local YAML artifacts.',
    codeSnippet: '# Headless execution with local mock directory\nkeploy test -c "docker run -p 8080:8080 --name MongoApp --rm --network keploy-network gin-app:1.0" \\\n  --container-name MongoApp --delay 10',
    lang: 'bash',
  },
  {
    id: 'wsl-ipv6-hang',
    title: '4. WSL2 IPv6 GitHub Asset Download Hangs',
    badge: 'Networking',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    symptom: 'curl to github-releases-cdn hangs indefinitely during binary downloads in WSL2.',
    rootCause: 'WSL2 virtual switch IPv6 MTU auto-negotiation occasionally drops fragmented SYN packets for multi-hop CDN redirects.',
    solution: 'Force IPv4 address resolution in curl with the `-4` flag (e.g. `curl -4 -sL ...`).',
    codeSnippet: 'curl -4 -sL https://github.com/keploy/keploy/releases/latest/download/keploy_linux_amd64.tar.gz | tar xz -C /usr/local/bin',
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
            Real-World Troubleshooting & Debugging Log
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Field notes and root-cause post-mortems from running Keploy on real containers.
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
                      <Wrench className="w-3.5 h-3.5" /> Root Cause Analysis:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {item.rootCause}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Fix & Verification:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {item.solution}
                    </p>
                  </div>

                  {item.codeSnippet && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div className="text-[11px] font-mono text-slate-500 mb-1">Resolution snippet:</div>
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
