import Link from 'next/link';
import type { Metadata } from 'next';
import RoadmapDiagram from '../components/RoadmapDiagram';
import { ROADMAP_NODES } from '../lib/roadmap';

export const metadata: Metadata = {
  title: 'Kotlin App Roadmap — Beginner to Job-Ready',
  description:
    'A NeetCode-style Kotlin roadmap with core foundations and split tracks for Android, Backend, and Kotlin Multiplatform.',
};

export default function KotlinRoadmapPage() {
  const availableNow = ROADMAP_NODES.filter((node) => node.status === 'available');
  const planned = ROADMAP_NODES.filter((node) => node.status === 'planned');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors inline-flex items-center gap-1"
          >
            ← Back to course
          </Link>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
            Kotlin App Tutorial + Roadmap
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400 text-lg leading-relaxed">
            Learn all major techniques required to build real Kotlin apps. Start with shared core
            fundamentals, then branch into Android, Backend (Ktor), or Kotlin Multiplatform.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <RoadmapDiagram />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-700/40 bg-emerald-950/20 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              Available lessons now
            </h2>
            <ul className="mt-3 space-y-2">
              {availableNow.map((node) => (
                <li key={node.id}>
                  {node.href ? (
                    <Link href={node.href} className="text-sm text-zinc-200 hover:text-white">
                      {node.title}
                    </Link>
                  ) : (
                    <span className="text-sm text-zinc-300">{node.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
              Planned next modules
            </h2>
            <ul className="mt-3 space-y-2">
              {planned.map((node) => (
                <li key={node.id} className="text-sm text-zinc-400">
                  {node.title} <span className="text-zinc-600">({node.duration})</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-xl border border-purple-700/40 bg-purple-950/20 p-5">
          <h2 className="text-lg font-semibold text-purple-200">How to use this roadmap</h2>
          <ol className="mt-3 space-y-2 text-sm text-purple-100/90">
            <li>1. Complete the core foundations in order.</li>
            <li>2. Pick one specialization track based on your app goal.</li>
            <li>3. Finish one capstone and publish it in your portfolio.</li>
            <li>4. Return and complete other tracks for full-stack Kotlin breadth.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
