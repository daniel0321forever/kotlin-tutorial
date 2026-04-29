import { beginnerLessons } from './beginner';
import { intermediateLessons } from './intermediate';
import { advancedLessons } from './advanced';

export type { Lesson, Block } from './types';

export const ALL_LESSONS = [
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons,
];

export function getLessonBySlug(slug: string) {
  return ALL_LESSONS.find((l) => l.slug === slug) ?? null;
}

export function getLessonIndex(slug: string) {
  return ALL_LESSONS.findIndex((l) => l.slug === slug);
}

export function getPrevLesson(slug: string) {
  const idx = getLessonIndex(slug);
  return idx > 0 ? ALL_LESSONS[idx - 1] : null;
}

export function getNextLesson(slug: string) {
  const idx = getLessonIndex(slug);
  return idx >= 0 && idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : null;
}
