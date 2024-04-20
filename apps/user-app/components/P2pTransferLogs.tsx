import { Card } from "@repo/ui/card"

interface TransactionType{
        time : Date,
        amount : number,
        name : string,
}

export const P2pTransferLogs = ({
    transactions, receive
}: {
    transactions: TransactionType[],
    receive : boolean
}) => {
    if (!transactions.length) {
        return <Card title={receive ? "Credit" : "Debit"}>
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title={receive ? "Credit" : "Debit"}>
        <div className="pt-2 text-sm font-medium">
            { transactions.map(t => <div className="flex justify-between" key={t.time.toString()}>
                    <div>
                        <div className="text-sm">
                            {receive ? "Received INR" : "Send INR"}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                    {receive ? "+" : "-"} Rs {t.amount / 100}
                    </div>
                    <div className="flex flex-col justify-center">
                    {t.name}
                    </div>
                  </div>
                )
            }
        </div>
    </Card>
}