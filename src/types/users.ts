export enum SessionTypes {
    FACULTY_SESSION = 'faculty_session'
}

export type StudentExamResult = {
    id: number,
    student_id: number,
    attempt_id: number,
    exam_id: number,
    obtained_score: number,
    total_score: number,
    percentage: number,
    result: number,
    created_at: string,
    updated_at: string
};

export type StudentUser = {
    id: number,
    department_id: number,
    name: string,
    email: string
}