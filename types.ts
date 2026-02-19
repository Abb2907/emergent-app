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
  type: 'YouTube' | 'Book' | 'Newsletter' | 'Course' | 'Article' | 'Paper' | 'Tool' | 'Guide' | 'Whitepaper' | 'Playlist' | 'Webinar' | 'Talk' | 'Engineering Blog' | 'Research Paper' | 'Documentation' | 'University Lecture' | 'Training' | 'Learning Path' | 'YouTube Live' | 'Book / PDF' | 'ML Projects' | 'ML Fundamentals' | 'ML Engineering' | 'Career Advice' | 'Evaluation' | 'Vector DBs' | 'Agent Memory' | 'Agent Design' | 'RAG' | 'Multi-Agent' | 'LLM Ops' | 'GenAI' | 'Data Science' | 'Computer Science' | 'Web Development' | 'Programming' | 'Statistics' | 'Statistics / Data Analysis' | 'Business / Tech' | 'Cloud / ML' | 'Business / AI' | 'Productivity / Tools' | 'Productivity' | 'Voice Agents' | 'Tools & Tips' | 'Creativity / Tools' | 'Automation';
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
