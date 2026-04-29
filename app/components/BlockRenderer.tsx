import type { Block } from '../lib/lessons';
import CodeBlock from './CodeBlock';

// Render inline text: converts `backtick` and **bold** to HTML elements.
function InlineText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  // Split on backtick or bold markers using a regex with capture groups.
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('`')) {
      parts.push(
        <code key={key++} className="bg-zinc-800 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    }
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));

  return <>{parts}</>;
}

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-zinc-300 leading-7 text-base">
                <InlineText text={block.text} />
              </p>
            );

          case 'code':
            return <CodeBlock key={i} code={block.code} title={block.title} />;

          case 'note':
            return (
              <div key={i} className="flex gap-3 bg-purple-950/40 border border-purple-700/50 rounded-lg p-4 my-6">
                <span className="text-purple-400 text-lg shrink-0 mt-0.5">💡</span>
                <p className="text-purple-200 text-sm leading-6">
                  <InlineText text={block.text} />
                </p>
              </div>
            );

          case 'list':
            return (
              <ul key={i} className="space-y-2 my-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-zinc-300 text-base leading-6">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
