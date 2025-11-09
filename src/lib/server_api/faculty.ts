'use server';

import Request from "@/utils/Request";

export async function get_exam_results({ exam_id }: { exam_id: number}){
    try{
        const response = await Request({
            url: process.env.BACKEND_HOST + `/api/faculty/exams/${exam_id}/results`,
            isAuthorized: true,
        });

        return {
            status: true,
            data: response.data.data
        }
    }catch(error: any){
        return {
            status: false,
            message: error.response?.data?.message || "Unknown error occurred"
        }
    }
}

export async function get_all_exams(){
    try{
        const response = await Request({
            url: process.env.BACKEND_HOST + `/api/faculty/exams`,
            isAuthorized: true,
        });

        return {
            status: true,
            data: response.data.data
        }
    }catch(error: any){
        return {
            status: false,
            message: error.response?.data?.message || "Unable to fetch exams"
        }
    }
}

export async function get_exam_violations({ exam_id }: { exam_id: number }){
    try{
        const response = await Request({
            url: process.env.BACKEND_HOST + `/api/faculty/exams/${exam_id}/violations`,
            isAuthorized: true,
        })
        return {
            status: true,
            data: response.data.data
        }
    }catch(error: any){
        return {
            status: false,
            message: error.response?.data?.message || "Unable to fetch exam violations"
        }
    }
}