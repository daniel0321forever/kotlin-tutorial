'use client';

import { useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import darcula from 'react-syntax-highlighter/dist/esm/styles/prism/darcula';

type Props = {
  code: string;
  title?: string;
};

/** Darcula-style Kotlin highlighting (same family of colors as IntelliJ IDEA). */
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
          type="button"
          onClick={handleCopy}
          className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors px-2 py-1 rounded hover:bg-zinc-700 cursor-pointer"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code — Kotlin grammar + Darcula (IDE-style) token colors */}
      <div className="overflow-x-auto bg-zinc-950">
        <SyntaxHighlighter
          language="kotlin"
          style={darcula}
          showLineNumbers={false}
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: '#09090b',
            fontSize: '0.875rem',
            lineHeight: 1.65,
            borderRadius: 0,
          }}
          codeTagProps={{
            className: 'font-mono min-w-0',
            style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
