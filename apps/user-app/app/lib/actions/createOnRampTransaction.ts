"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const createOnRampTransaction = async (amount : number, provider : string) =>{
    const session = await getServerSession(authOptions);
    if(!session?.user || !session.user?.id){
        return {
            message : "Unauthorised user"
        }
    }

    try {
        const res = await prisma.onRampTransaction.create({
            data : {
                status : "Processing",
                startTime : new Date(),
                provider,
                userId : Number(session?.user?.id),
                amount : amount * 100,
                token : (Math.random() * 1000).toString(),
            }
        })
    
        return {
            message : "Done"
        }
    } catch (error) {
        console.log(error);
        return {
            message : "Error while crating on ramp",
        }
    }
}