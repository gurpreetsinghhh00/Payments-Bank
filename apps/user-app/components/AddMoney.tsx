"use client"

import { useState } from "react";
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput"
import { Select } from "@repo/ui/select"
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}, {
    name: "Kotak Mahindra Bank",
    redirectUrl: "https://www.kotakMahindra.com"
}];

export const AddMoney = ()=>{
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl)
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
    const router = useRouter(); 
    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput label="Amount" placeholder="Amount" onChange={(val) =>{
                    setAmount(Number(val));
                }} />
                <div className="py-4 text-sm font-medium">Bank</div>
                <Select onSelect={(value) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
                    setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                }}  
                options={SUPPORTED_BANKS.map(bank => (
                    {
                        key : bank.name,
                        value : bank.name
                    }
                ))}
                />
                <div className="w-full text-center mt-6">
                    <Button onClick={async ()=>{
                        await createOnRampTransaction(amount, provider)
                        router.push(redirectUrl || "")
                    }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}