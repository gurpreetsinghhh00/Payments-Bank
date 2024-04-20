"use client"

import { useState } from "react";
import {Card} from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
 
export default function SendCard(){
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return(
        <div className=" h-[90vh] flex items-center justify-center">
            <Card title="Send Money">
                <div className="w-96">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)}} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)}} />
                </div>
                <div className="flex justify-center mt-5">
                    <Button onClick={async ()=>{
                        await p2pTransfer(number, Number(amount) * 100);
                    }}>Send</Button>
                </div>
            </Card>
        </div>
    )
}