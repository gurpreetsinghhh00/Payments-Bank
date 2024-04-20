"use client"

import { Button } from "@repo/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const SignInComponent = () => {
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<String>("");
    const router = useRouter();

    const handleSubmit = async (e? : React.FormEvent<HTMLButtonElement>)=>{
        setError("");
        if(e)
            e.preventDefault();

        if(!phoneRef.current?.value || !passwordRef.current?.value){
            setError("Phone and password are required");
            return;
        }

        const res = await signIn("credentials", {
            phone : phoneRef.current?.value,
            password : passwordRef.current?.value,
            redirect : false
        })
        
        if(!res?.error){
            router.push("/")
        }
        else{
            setError("Error while signing in")
        }
    }

  return (
    <div className="w-full max-w-xs h-[90vh] flex items-center">
    <form className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={(e)=>{e.preventDefault()}} >
        <div className="text-3xl font-bold text-center m-2">Sign In</div>
        <div className="mb-4 mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Phone No.
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="1234567890" ref={phoneRef} />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="***********" ref={passwordRef}/>
        </div>
        {
            error.length !== 0 ? (
                <p className="text-xs text-red-600 text-center" >{error}</p>
            ): <></>
        }
        <div className="flex justify-center mt-4">
            <Button onClick={handleSubmit}>Sign In</Button>
        </div>
    </form>
</div>
)
}

export default SignInComponent
