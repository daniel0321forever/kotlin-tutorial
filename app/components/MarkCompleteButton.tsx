'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'kotlin-tutorial-progress';

function getProgress(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

type Props = {
  slug: string;
  nextSlug?: string;
  nextTitle?: string;
};

export default function MarkCompleteButton({ slug, nextSlug, nextTitle }: Props) {
  const [completed, setCompleted] = useState(false);
  const [justMarked, setJustMarked] = useState(false);

  useEffect(() => {
    setCompleted(getProgress().includes(slug));
  }, [slug]);

  function handleMark() {
    const current = getProgress();
    if (!current.includes(slug)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, slug]));
    }
    setCompleted(true);
    setJustMarked(true);
  }

  return (
    <div className="mt-12 pt-8 border-t border-zinc-800">
      {/* Completion banner */}
      {completed && (
        <div className="mb-6 flex items-center gap-3 bg-green-950/40 border border-green-700/50 rounded-lg px-5 py-3">
          <span className="text-green-400 text-xl">✓</span>
          <span className="text-green-300 font-medium">
            {justMarked ? 'Nice work! Lesson marked as complete.' : 'You have completed this lesson.'}
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {!completed && (
          <button
            onClick={handleMark}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <span>Mark as Complete</span>
            <span>→</span>
          </button>
        )}

        {nextSlug && (
          <Link
            href={`/lesson/${nextSlug}`}
            className="inline-flex items-center gap-2 border border-zinc-600 hover:border-purple-500 text-zinc-300 hover:text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <span>Next: {nextTitle}</span>
            <span>→</span>
          </Link>
        )}

        {!nextSlug && completed && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-zinc-600 hover:border-purple-500 text-zinc-300 hover:text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Course
          </Link>
        )}
      </div>
    </div>
  );
}
