"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const p2pTransfer = async (to : string, amount : number)=>{
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return {
            message : "Error while sending",
        }
    }

    const toUser = await prisma.user.findFirst({
        where : {
            number : to,
        }
    })

    if(!toUser){
        return {
            message : "User not found",
        }
    }

    try {
        await prisma.$transaction( async (txn)=>{
            await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`
            const fromBalance = await txn.balance.findUnique({
                where : {
                    userId : Number(from),
                }
            })
            if(!fromBalance || fromBalance.amount < amount){
                throw new Error("Insufficient balance")
            }

            await txn.balance.update({
                where : {userId : Number(from)},
                data:{
                    amount : {decrement : amount},
                }
            })

            await txn.balance.update({
                where : {userId : toUser.id},
                data : {
                    amount : {increment : amount},
                }
            })

            await txn.p2pTransaction.create({
                data : {
                    amount : amount,
                    timestamp : new Date(),
                    fromUserId : Number(from),
                    toUserId : toUser.id,
                }
            })
        }) 
    } catch (error) {
        console.log(error);
        return {
            message : "Error while doing transaction"
        }
    }
}