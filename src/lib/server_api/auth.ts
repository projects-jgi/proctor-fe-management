'use server';

import Request from "@/utils/Request";
import { loginSession, logoutSession } from "@/utils/session";


export async function login({ email, password}: {email: string, password: string}){
    const body = {
        email,
        password
    }

    try{
        const response = await Request({url: process.env.BACKEND_HOST + "/api/auth/faculty/login", method: 'POST', body: body})
        await loginSession(response.data)
        return {
            status: true
        }
    }catch(error: any){
        return {
            status: false,
            message: error.response?.data?.message || "Unknown error occurred"
        }
    }}

export async function logout(){
    await logoutSession()

    return true;
}