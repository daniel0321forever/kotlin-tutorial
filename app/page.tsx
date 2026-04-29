import { ALL_LESSONS } from './lib/lessons';
import ProgressBar from './components/ProgressBar';
import LessonGrid from './components/LessonGrid';

const beginner     = ALL_LESSONS.filter((l) => l.level === 'Beginner');
const intermediate = ALL_LESSONS.filter((l) => l.level === 'Intermediate');
const advanced     = ALL_LESSONS.filter((l) => l.level === 'Advanced');

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          {/* Kotlin badge */}
          <div className="inline-flex items-center gap-2 bg-purple-950/60 border border-purple-700/50 text-purple-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="text-purple-400">◆</span>
            Kotlin Tutorial
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            Learn{' '}
            <span className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Kotlin
            </span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed mb-4">
            A hands-on journey from beginner to advanced. Every lesson is packed
            with runnable code examples and detailed comments so you learn by reading
            real, idiomatic Kotlin.
          </p>
          <p className="text-zinc-600 text-sm">
            {ALL_LESSONS.length} lessons &nbsp;·&nbsp; Beginner → Intermediate → Advanced
          </p>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
        {/* Progress bar */}
        <ProgressBar />

        {/* Cheatsheet of what's covered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { level: 'Beginner', color: 'text-emerald-400', border: 'border-emerald-800/40', bg: 'bg-emerald-950/20',
              topics: ['Hello, Kotlin!', 'Variables & Types', 'Functions', 'Control Flow', 'Null Safety'] },
            { level: 'Intermediate', color: 'text-blue-400', border: 'border-blue-800/40', bg: 'bg-blue-950/20',
              topics: ['Classes & Objects', 'Inheritance', 'Data Classes', 'Collections', 'Lambdas', 'Extensions', 'Sealed Classes'] },
            { level: 'Advanced', color: 'text-rose-400', border: 'border-rose-800/40', bg: 'bg-rose-950/20',
              topics: ['Generics', 'Coroutines', 'DSL Building', 'Delegation'] },
          ].map(({ level, color, border, bg, topics }) => (
            <div key={level} className={`rounded-xl border ${border} ${bg} p-5`}>
              <h3 className={`font-semibold text-sm mb-3 ${color}`}>{level}</h3>
              <ul className="space-y-1">
                {topics.map((t) => (
                  <li key={t} className="text-zinc-400 text-sm flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full ${color.replace('text-', 'bg-')}`} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lesson grids */}
        <LessonGrid lessons={beginner}     level="Beginner"     startIndex={0} />
        <LessonGrid lessons={intermediate} level="Intermediate" startIndex={beginner.length} />
        <LessonGrid lessons={advanced}     level="Advanced"     startIndex={beginner.length + intermediate.length} />
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-900 mt-20 py-8 text-center text-zinc-600 text-sm">
        Built with Next.js &amp; Tailwind CSS &nbsp;·&nbsp; Progress saved in your browser
      </footer>
    </div>
  );
}
