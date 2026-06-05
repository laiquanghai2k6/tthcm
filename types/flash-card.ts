export type QuizOption = {
  text: string;
  is_correct?: boolean;
};

export type Questions = {
  subjectSlug: string;
  questions: Question[];
};

export type Question = {
  question:string
  options: QuizOption[];
}

export type Subject = {
  slug: string;
  name: string;
};
