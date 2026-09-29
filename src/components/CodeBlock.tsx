'use client';

import React, { useState, useEffect } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';

interface CodeBlockProps {
  children?: string | React.ReactNode;
  className?: string;
  filename?: string;
  language?: string;
}

export default function CodeBlock({ children, className, filename, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text
  let rawCode = '';
  if (typeof children === 'string') {
    rawCode = children;
  } else if (React.isValidElement(children) && children.props && children.props.children) {
    rawCode = String(children.props.children);
  } else {
    rawCode = String(children || '');
  }
  rawCode = rawCode.trim();

  // Determine language
  const detectedLang =
    language ||
    (className ? className.replace(/language-/, '') : '') ||
    'bash';

  useEffect(() => {
    Prism.highlightAll();
  }, [rawCode, detectedLang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy code:', e);
    }
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'go':
      case 'golang':
        return 'Go';
      case 'yaml':
      case 'yml':
        return 'YAML';
      case 'bash':
      case 'sh':
      case 'shell':
        return 'Terminal';
      case 'json':
        return 'JSON';
      case 'dockerfile':
      case 'docker':
        return 'Dockerfile';
      default:
        return lang.toUpperCase();
    }
  };

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900/95 dark:bg-slate-950 text-slate-100 shadow-md">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 dark:bg-slate-900/80 border-b border-slate-700/60 dark:border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Terminal className="w-4 h-4 text-brand-500" />
          <span className="font-mono font-medium text-slate-300">
            {filename || getLanguageLabel(detectedLang)}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-700/40 hover:bg-slate-700/70 transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d1117]">
        <pre className={`language-${detectedLang} !m-0 !p-0 !bg-transparent`}>
          <code className={`language-${detectedLang}`}>{rawCode}</code>
        </pre>
      </div>
    </div>
  );
}
