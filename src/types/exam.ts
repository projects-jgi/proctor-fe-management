export type Exam = {
    id: number,
    department_id: number,
    name: string,
    start_time: string,
    end_time: string,
    duration_in_minutes: number,
    passing_percentage: string,
    max_attempts: number,
    status: number,
    show_answers: number,
    max_violations_count: number
}

export type Department = {
    id: number,
    school_id: number,
    name: string
}