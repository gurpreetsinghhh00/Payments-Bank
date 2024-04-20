import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";


async function getBalance(){
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId : Number(session?.user?.id)
        }
    })
    return {
        amount : balance?.amount || 0,
        locked : balance?.locked || 0
    }
}

async function getOnRampTransaction(){
    const session = await getServerSession(authOptions);
    const transactions = await prisma.onRampTransaction.findMany({
        where : {
            userId : Number(session?.user?.id)
        }
    })
    return transactions.map((tx)=>(
        {
            time : tx.startTime,
            amount : tx.amount,
            status : tx.status,
            provider : tx.provider
        }
    ))
}


export default async function(){
    const balance = await getBalance();
    const transactions = await getOnRampTransaction();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div className="">
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}