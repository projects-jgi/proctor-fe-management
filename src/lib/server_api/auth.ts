'use server';

import Request from "@/utils/Request";
import { loginSession } from "@/utils/session";


export async function login({ email, password}: {email: string, password: string}){
    const body = {
        email,
        password
    }

    try{
        const response = await Request({url: process.env.BACKEND_HOST + "/api/auth/faculty/login", method: 'POST', body: body})
        await loginSession(response.data)
        return {}
    }catch(error: any){
        throw new Error(error.response?.data?.message || "Unknown error occurred");
    }}

export async function logout(){
    
}