// Each lesson is built from an array of typed blocks.
// The renderer picks the right display style for each block type.
export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; title?: string; code: string }
  | { type: 'note'; text: string }
  | { type: 'list'; items: string[] };

export type Lesson = {
  slug: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  blocks: Block[];
};
