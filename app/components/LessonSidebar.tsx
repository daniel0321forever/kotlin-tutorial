'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Lesson } from '../lib/lessons';

const STORAGE_KEY = 'kotlin-tutorial-progress';

const LEVEL_DOT = {
  Beginner:     'bg-emerald-400',
  Intermediate: 'bg-blue-400',
  Advanced:     'bg-rose-400',
};

type Props = {
  lessons: Lesson[];
  currentSlug: string;
};

export default function LessonSidebar({ lessons, currentSlug }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setCompleted(new Set(raw ? JSON.parse(raw) : []));
    } catch {
      setCompleted(new Set());
    }
  }, [currentSlug]);

  const nav = (
    <nav className="space-y-1">
      {lessons.map((lesson, i) => {
        const isCurrent = lesson.slug === currentSlug;
        const isDone = completed.has(lesson.slug);
        return (
          <Link
            key={lesson.slug}
            href={`/lesson/${lesson.slug}`}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors
              ${isCurrent
                ? 'bg-purple-600/20 text-purple-300 border border-purple-600/40'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
              }`}
          >
            <span className="shrink-0 w-5 h-5 flex items-center justify-center">
              {isDone ? (
                <span className="text-green-400 text-xs">✓</span>
              ) : (
                <span className={`w-2 h-2 rounded-full ${LEVEL_DOT[lesson.level]}`} />
              )}
            </span>
            <span className="truncate leading-tight">
              <span className="text-zinc-600 text-xs mr-1">
                {String(i + 1).padStart(2, '0')}.
              </span>
              {lesson.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 border border-zinc-700 rounded-lg px-4 py-2 cursor-pointer"
        >
          <span>{open ? '✕' : '☰'}</span>
          <span>All lessons</span>
        </button>
        {open && (
          <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            {nav}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-8 bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              ← Course overview
            </Link>
          </div>
          {nav}
        </div>
      </aside>
    </>
  );
}
