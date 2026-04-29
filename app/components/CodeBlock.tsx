'use client';

import { useState } from 'react';

type Props = {
  code: string;
  title?: string;
};

export default function CodeBlock({ code, title }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700 my-6">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          {title && (
            <span className="ml-3 text-xs font-mono text-zinc-400">{title}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1 rounded hover:bg-zinc-700 cursor-pointer"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto bg-zinc-950">
        <pre className="p-5 text-sm leading-relaxed font-mono text-zinc-200 min-w-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
