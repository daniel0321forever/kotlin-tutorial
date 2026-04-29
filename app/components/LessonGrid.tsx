'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Lesson } from '../lib/lessons';

const STORAGE_KEY = 'kotlin-tutorial-progress';

const LEVEL_COLORS = {
  Beginner:     'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
  Intermediate: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  Advanced:     'bg-rose-900/60 text-rose-300 border-rose-700/50',
};

type Props = {
  lessons: Lesson[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  startIndex: number;
};

export default function LessonGrid({ lessons, level, startIndex }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    function load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setCompleted(new Set(raw ? JSON.parse(raw) : []));
      } catch {
        setCompleted(new Set());
      }
    }
    load();
    window.addEventListener('focus', load);
    return () => window.removeEventListener('focus', load);
  }, []);

  const sectionColors = {
    Beginner:     { heading: 'text-emerald-400', accent: 'border-emerald-500' },
    Intermediate: { heading: 'text-blue-400',    accent: 'border-blue-500' },
    Advanced:     { heading: 'text-rose-400',     accent: 'border-rose-500' },
  }[level];

  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <h2 className={`text-2xl font-bold ${sectionColors.heading}`}>{level}</h2>
        <div className={`flex-1 h-px border-t ${sectionColors.accent} opacity-30`} />
        <span className="text-zinc-500 text-sm">{lessons.length} lessons</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson, i) => {
          const isDone = completed.has(lesson.slug);
          const num = startIndex + i + 1;
          return (
            <Link
              key={lesson.slug}
              href={`/lesson/${lesson.slug}`}
              className={`group relative flex flex-col gap-3 rounded-xl border p-5 transition-all duration-200
                ${isDone
                  ? 'border-purple-600/60 bg-purple-950/20 hover:border-purple-500'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/60'
                }`}
            >
              {/* Number + completion indicator */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">#{String(num).padStart(2, '0')}</span>
                {isDone ? (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold">
                    ✓
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full border-2 border-zinc-700 group-hover:border-zinc-500 transition-colors" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-zinc-100 font-semibold text-base leading-snug group-hover:text-white transition-colors">
                {lesson.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-500 text-sm leading-5 line-clamp-2 flex-1">
                {lesson.description}
              </p>

              {/* Level badge */}
              <span className={`self-start text-xs font-medium px-2 py-0.5 rounded border ${LEVEL_COLORS[level]}`}>
                {level}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
