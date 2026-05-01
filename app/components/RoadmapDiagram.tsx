import Link from 'next/link';
import {
  ROADMAP_NODES,
  ROADMAP_STAGE_TITLES,
  getRoadmapByStage,
  getTrackLabel,
  type RoadmapNode,
} from '../lib/roadmap';

const TRACK_STYLES: Record<RoadmapNode['track'], string> = {
  core: 'border-purple-700/50 bg-purple-950/20 text-purple-200',
  android: 'border-emerald-700/50 bg-emerald-950/20 text-emerald-200',
  backend: 'border-blue-700/50 bg-blue-950/20 text-blue-200',
  kmp: 'border-rose-700/50 bg-rose-950/20 text-rose-200',
};

const STATUS_STYLES: Record<RoadmapNode['status'], string> = {
  available: 'border-emerald-700/50 bg-emerald-950/30 text-emerald-200',
  planned: 'border-zinc-700/50 bg-zinc-900 text-zinc-400',
};

function RoadmapCard({ node }: { node: RoadmapNode }) {
  const cardStyle = TRACK_STYLES[node.track];
  const statusStyle = STATUS_STYLES[node.status];
  const content = (
    <article
      className={`rounded-xl border p-4 transition-colors ${cardStyle} ${
        node.href ? 'hover:border-purple-400/60' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wide text-zinc-400">
          {getTrackLabel(node.track)}
        </span>
        <span className={`text-[11px] px-2 py-0.5 rounded border ${statusStyle}`}>
          {node.status === 'available' ? 'Available now' : 'Planned'}
        </span>
      </div>
      <h3 className="mt-2 text-sm font-semibold">{node.title}</h3>
      <p className="mt-1 text-xs text-zinc-300 leading-relaxed">{node.summary}</p>
      <p className="mt-2 text-xs text-zinc-400">Time: {node.duration}</p>
      <p className="mt-2 text-xs text-zinc-400">Milestone: {node.milestone}</p>
    </article>
  );

  if (!node.href) {
    return content;
  }

  return (
    <Link href={node.href} className="block">
      {content}
    </Link>
  );
}

export default function RoadmapDiagram() {
  const stage1 = getRoadmapByStage(1);
  const stage2 = getRoadmapByStage(2);
  const stage3 = getRoadmapByStage(3);
  const stage4 = getRoadmapByStage(4);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 md:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-100">NeetCode-Style Kotlin Roadmap</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Follow core nodes from left to right, then choose one specialization track.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((stage) => (
          <div key={stage} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-200">
                Stage {stage}: {ROADMAP_STAGE_TITLES[stage as 1 | 2 | 3 | 4]}
              </h3>
              {stage < 4 && <span className="hidden md:inline text-zinc-600">→</span>}
            </div>

            <div className="mt-4 space-y-3">
              {(stage === 1 ? stage1 : stage === 2 ? stage2 : stage === 3 ? stage3 : stage4).map((node) => (
                <RoadmapCard key={node.id} node={node} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <h4 className="text-sm font-semibold text-zinc-200">Technique Checklist</h4>
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Array.from(new Set(ROADMAP_NODES.flatMap((n) => n.techniques))).map((technique) => (
            <li key={technique} className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              {technique}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
