export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Frontier';

export interface Repo {
  id: string;
  url: string;
  name: string;
  category: string;
  level: Difficulty;
  description: string;
  stars?: string;
  starter?: boolean;
}

export interface Resource {
  title: string;
  url: string;
  type: string;
  category: string;
  desc: string;
  level: Difficulty;
}

export interface LearningPathModule {
  title: string;
  topics: string[];
  resources: number; // count
}

export interface LearningPath {
  id: string;
  title: string;
  level: Difficulty;
  description: string;
  modules: LearningPathModule[];
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
