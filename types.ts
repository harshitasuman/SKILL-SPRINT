
export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SprintContent {
  concept: string;
  example: string;
  task: string;
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
}

export interface UserProgress {
  streak: number;
  lastCompletedDate: string | null;
  completedSkills: string[];
  points: number;
}

export type View = 'dashboard' | 'explore' | 'sprint' | 'profile' | 'chat';
