export type Exam = {
  id: number;
  department_id: number;
  name: string;
  start_time: string;
  end_time: string;
  duration_in_minutes: number;
  passing_percentage: string;
  max_attempts: number;
  status: number;
  show_answers: number;
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
