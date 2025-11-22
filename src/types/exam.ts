export type Exam = {
  id: number;
  department_id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  duration_in_minutes: number;
  passing_percentage: string;
  max_attempts: number;
  status: number;
  show_answers: number;
  is_proctored: number;
  max_violations_count: number;
  created_at: string;
};

export type Department = {
  id: number;
  school_id: number;
  name: string;
};

export type ExamType = {
  id: number;
  name: string;
  description?: string;
  is_private: boolean;
  created_at: string;
  created_by_faculty: number;
};

export type ExamQuestion = {
  id: number;
  exam_type_id: number;
  question_text: string;
  score: number;
  option_1?: string;
  option_2?: string;
  option_3?: string;
  option_4?: string;
  option_5?: string;
  is_correct_1?: number;
  is_correct_2?: number;
  is_correct_3?: number;
  is_correct_4?: number;
  is_correct_5?: number;
  explanation_1?: string;
  explanation_2?: string;
  explanation_3?: string;
  explanation_4?: string;
  explanation_5?: string;
};
