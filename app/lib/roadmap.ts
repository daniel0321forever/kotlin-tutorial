export type RoadmapStatus = 'available' | 'planned';
export type RoadmapTrack = 'core' | 'android' | 'backend' | 'kmp';

export type RoadmapNode = {
  id: string;
  title: string;
  track: RoadmapTrack;
  stage: 1 | 2 | 3 | 4;
  summary: string;
  duration: string;
  techniques: string[];
  prerequisites: string[];
  milestone: string;
  status: RoadmapStatus;
  href?: string;
};

export const ROADMAP_STAGE_TITLES: Record<1 | 2 | 3 | 4, string> = {
  1: 'Core Foundations',
  2: 'Architecture & Testing',
  3: 'Track Specialization',
  4: 'Capstone & Portfolio',
};

export const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: 'core-kotlin-syntax',
    title: 'Kotlin Syntax & Control Flow',
    track: 'core',
    stage: 1,
    summary: 'Build fluency with variables, functions, null-safety, and flow control.',
    duration: '1-2 weeks',
    techniques: ['val vs var', 'if/when', 'null safety', 'function design'],
    prerequisites: [],
    milestone: 'Write utility-focused Kotlin console programs.',
    status: 'available',
    href: '/lesson/hello-kotlin',
  },
  {
    id: 'core-oop-data-modeling',
    title: 'OOP, Data Modeling, Collections',
    track: 'core',
    stage: 1,
    summary: 'Model real domain data with classes, data classes, and collection operations.',
    duration: '1-2 weeks',
    techniques: ['classes', 'data classes', 'lambdas', 'extensions', 'sealed classes'],
    prerequisites: ['core-kotlin-syntax'],
    milestone: 'Model a simple product/user/order domain in Kotlin.',
    status: 'available',
    href: '/lesson/classes',
  },
  {
    id: 'core-concurrency-quality',
    title: 'Coroutines, Errors, Testing Basics',
    track: 'core',
    stage: 2,
    summary: 'Introduce async thinking, robust error handling, and automated tests.',
    duration: '1-2 weeks',
    techniques: ['coroutines', 'structured concurrency', 'result modeling', 'unit tests'],
    prerequisites: ['core-oop-data-modeling'],
    milestone: 'Ship a tested, asynchronous feature module.',
    status: 'available',
    href: '/lesson/coroutines',
  },
  {
    id: 'android-compose-foundations',
    title: 'Android UI with Jetpack Compose',
    track: 'android',
    stage: 3,
    summary: 'Build reactive screens with state, navigation, and lifecycle-aware UI.',
    duration: '2-3 weeks',
    techniques: ['Compose', 'state hoisting', 'navigation', 'ViewModel'],
    prerequisites: ['core-concurrency-quality'],
    milestone: 'Complete a multi-screen Android app with local state.',
    status: 'planned',
  },
  {
    id: 'backend-ktor-api',
    title: 'Backend APIs with Ktor',
    track: 'backend',
    stage: 3,
    summary: 'Design and implement REST APIs with validation and layered architecture.',
    duration: '2-3 weeks',
    techniques: ['Ktor routing', 'serialization', 'service layer', 'validation'],
    prerequisites: ['core-concurrency-quality'],
    milestone: 'Deploy a production-ready API service.',
    status: 'planned',
  },
  {
    id: 'kmp-shared-domain',
    title: 'Kotlin Multiplatform Shared Core',
    track: 'kmp',
    stage: 3,
    summary: 'Share business logic across Android/iOS using multiplatform modules.',
    duration: '2-3 weeks',
    techniques: ['expect/actual', 'shared modules', 'platform adapters', 'KMP architecture'],
    prerequisites: ['core-concurrency-quality'],
    milestone: 'Run shared domain logic on multiple platforms.',
    status: 'planned',
  },
  {
    id: 'android-capstone',
    title: 'Android Capstone App',
    track: 'android',
    stage: 4,
    summary: 'Integrate auth, persistence, networking, and testing in one complete app.',
    duration: '2-4 weeks',
    techniques: ['offline-first', 'paging', 'UI tests', 'release build'],
    prerequisites: ['android-compose-foundations'],
    milestone: 'Publish portfolio-grade Android project with docs.',
    status: 'planned',
  },
  {
    id: 'backend-capstone',
    title: 'Backend Capstone API',
    track: 'backend',
    stage: 4,
    summary: 'Build, monitor, and deploy an end-to-end Kotlin backend service.',
    duration: '2-4 weeks',
    techniques: ['PostgreSQL', 'auth', 'observability', 'Docker deployment'],
    prerequisites: ['backend-ktor-api'],
    milestone: 'Expose stable API used by a real client app.',
    status: 'planned',
  },
  {
    id: 'kmp-capstone',
    title: 'KMP End-to-End App',
    track: 'kmp',
    stage: 4,
    summary: 'Combine shared business logic with platform-specific UI for production use.',
    duration: '2-4 weeks',
    techniques: ['shared networking', 'sync strategies', 'cross-platform testing'],
    prerequisites: ['kmp-shared-domain'],
    milestone: 'Ship a cross-platform app prototype with shared core.',
    status: 'planned',
  },
];

export function getRoadmapByStage(stage: 1 | 2 | 3 | 4) {
  return ROADMAP_NODES.filter((node) => node.stage === stage);
}

export function getTrackLabel(track: RoadmapTrack) {
  if (track === 'android') return 'Android';
  if (track === 'backend') return 'Backend';
  if (track === 'kmp') return 'KMP';
  return 'Core';
}
