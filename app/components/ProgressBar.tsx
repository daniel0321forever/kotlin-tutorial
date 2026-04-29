'use client';

import { useState, useEffect } from 'react';
import { ALL_LESSONS } from '../lib/lessons';

const STORAGE_KEY = 'kotlin-tutorial-progress';

export default function ProgressBar() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    function load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        setCompleted(raw ? JSON.parse(raw) : []);
      } catch {
        setCompleted([]);
      }
    }
    load();
    // Re-sync when user navigates back to this page
    window.addEventListener('focus', load);
    return () => window.removeEventListener('focus', load);
  }, []);

  const total = ALL_LESSONS.length;
  const count = completed.length;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY);
    setCompleted([]);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-zinc-100 font-semibold text-lg">Your Progress</span>
          <span className="ml-3 text-zinc-400 text-sm">
            {count} / {total} lessons complete
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-purple-400 font-bold text-2xl">{pct}%</span>
          {count > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
