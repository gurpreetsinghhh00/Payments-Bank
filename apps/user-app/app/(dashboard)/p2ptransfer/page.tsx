import { Center } from "@repo/ui/center";
import SendCard from "../../../components/SendCard";
import { P2pTransferLogs } from "../../../components/P2pTransferLogs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


const getSendTransaction = async ()=>{
    const session = await getServerSession(authOptions);
    const transaction = await prisma.p2pTransaction.findMany({
        where : {
            fromUserId : Number(session?.user?.id)
        },
        select : {
            amount : true,
            timestamp : true,
            ToUser :{
                select : {
                    name : true,
                }
            }
        }
    })

    return transaction.map((t) => ({
        amount : t.amount,
        time : t.timestamp,
        name : t.ToUser.name || "",
    }))
}

const getReceivedTransaction = async () => {
    const session = await getServerSession(authOptions);
    const transaction = await prisma.p2pTransaction.findMany({
        where : {
            toUserId : Number(session?.user?.id)
        },
        select : {
            amount : true,
            timestamp : true,
            fromUser :{
                select : {
                    name : true,
                }
            }
        }
    })

    return transaction.map((t) => ({
        amount : t.amount,
        time : t.timestamp,
        name : t.fromUser.name || "",
    }))
}

export default async function Page() {
    const sendTransaction = await getSendTransaction();
    const receiveTransaction = await getReceivedTransaction();
    return (
        <Center>
            <SendCard/>
            <div className="ml-8 w-96 flex gap-4 flex-col">
                <P2pTransferLogs transactions={sendTransaction} receive={false} />
                <P2pTransferLogs transactions={receiveTransaction} receive={true} />
            </div>
        </Center>
    )
}