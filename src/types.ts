export type Category = 'Ethics' | 'Strategy' | 'Leadership' | 'Innovation' | 'Economics' | 'Logistics' | 'Logic';

export interface AssessmentItem {
  id: string;
  title: string;
  category: Category;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  description: string;
  status?: 'Start' | 'Review';
}

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    label: string;
    text: string;
  }[];
  correctOptionId: string;
  rationale: string;
  category: string;
}

export interface Assessment {
  id: string;
  title: string;
  volume: string;
  readingMaterial: {
    title: string;
    content?: string[];
    image?: string;
    imageCaption?: string;
    quote?: string;
    quoteAuthor?: string;
    iframeUrl?: string;
  };
  questions: Question[];
}

export interface UserResult {
  score: number;
  correctCount: number;
  totalCount: number;
  timeTaken: string;
  breakdown: {
    category: string;
    score: number;
  }[];
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

export interface HistoryRecord {
  id: string;
  assessmentId?: string;
  title: string;
  result: UserResult;
  date: string;
}

export type ViewType = 'library' | 'assessment' | 'results' | 'reports';
