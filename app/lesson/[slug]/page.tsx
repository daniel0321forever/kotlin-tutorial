import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_LESSONS, getLessonBySlug, getPrevLesson, getNextLesson, getLessonIndex } from '../../lib/lessons';
import BlockRenderer from '../../components/BlockRenderer';
import LessonSidebar from '../../components/LessonSidebar';
import MarkCompleteButton from '../../components/MarkCompleteButton';

// Pre-generate all lesson routes at build time.
export function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<'/lesson/[slug]'>) {
  const { slug } = await props.params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — Kotlin Tutorial`,
    description: lesson.description,
  };
}

const LEVEL_STYLES = {
  Beginner:     'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
  Intermediate: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  Advanced:     'bg-rose-900/60 text-rose-300 border-rose-700/50',
};

export default async function LessonPage(props: PageProps<'/lesson/[slug]'>) {
  const { slug } = await props.params;

  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const index    = getLessonIndex(slug);
  const prev     = getPrevLesson(slug);
  const next     = getNextLesson(slug);
  const total    = ALL_LESSONS.length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Top nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors flex items-center gap-1"
          >
            ← Course
          </Link>
          <span className="text-zinc-600 text-xs">
            {index + 1} / {total}
          </span>
          <div className="flex items-center gap-3">
            {prev && (
              <Link
                href={`/lesson/${prev.slug}`}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                title={prev.title}
              >
                ← Prev
              </Link>
            )}
            {next && (
              <Link
                href={`/lesson/${next.slug}`}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                title={next.title}
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Body: sidebar + content ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-10">
        {/* Sidebar (sticky on desktop, toggle on mobile) */}
        <LessonSidebar lessons={ALL_LESSONS} currentSlug={slug} />

        {/* Main lesson content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* Lesson header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded border ${LEVEL_STYLES[lesson.level]}`}
              >
                {lesson.level}
              </span>
              <span className="text-zinc-600 text-xs">Lesson {index + 1}</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-50 mb-4">
              {lesson.title}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {lesson.description}
            </p>

            {/* Progress bar strip */}
            <div className="mt-6 h-1 bg-zinc-800 rounded-full">
              <div
                className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Lesson blocks */}
          <BlockRenderer blocks={lesson.blocks} />

          {/* Mark complete + next navigation */}
          <MarkCompleteButton
            slug={slug}
            nextSlug={next?.slug}
            nextTitle={next?.title}
          />

          {/* Prev/Next footer */}
          <div className="mt-12 pt-6 border-t border-zinc-800 flex justify-between text-sm">
            {prev ? (
              <Link
                href={`/lesson/${prev.slug}`}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                <span>←</span>
                <span>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/lesson/${next.slug}`}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                <span>{next.title}</span>
                <span>→</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
