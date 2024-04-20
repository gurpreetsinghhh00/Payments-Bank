import express from "express"
import client from "@repo/db/client"

const app = express();
app.use(express.json())

app.post("/kotakwebhook", async (req, res)=>{
    const paymentInformation : {
        token: string,
        userId: string,
        amount: string,
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    const findStatus = await client.onRampTransaction.findUnique({
        where: {
            token : paymentInformation.token,
        }
    })

    if(findStatus?.status !== "Processing")
        return res.json({
            message : "Request is already success"
    })
    
    try {
        await client.$transaction([
            client.balance.update({
                where : {
                    userId : Number(paymentInformation.userId)
                },
                data : {
                    amount : {
                        increment : Number(paymentInformation.amount),
                    }
                }
            }),
            client.onRampTransaction.update({
                where : {
                    token : paymentInformation.token,
                },
                data : {
                    status : "Success",
                }
            })
        ])

        res.status(200).json({
            message : "Captured"
        })
        
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})


app.listen(4000, ()=>{
    console.log("Listening on port: 4000");
})