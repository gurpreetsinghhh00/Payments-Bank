import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import client from "@repo/db/client"

export const authOptions = {
    providers : [
        CredentialsProvider({
            name: "Credentials",
            credentials : {
                phone: { label: "Phone Number", type: "text", placeholder: "Enter your phone number", required : true},
                password: { label: "Password", type: "password", placeholder : "Enter your password", required : true}
            },

            async authorize(credentials : any){
                const existingUser = await client.user.findFirst({
                    where : {
                        number : credentials?.phone,
                    }
                });

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials?.password, existingUser.password);
                    if(!passwordValidation){
                        return null;
                    }
                    return {
                        id : existingUser.id.toString(),
                        name : existingUser.name || "",
                        email : existingUser.number,
                    }
                }

                try {
                    console.log(credentials);
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const user = await client.user.create({
                        data : {
                            number : credentials.phone,
                            password : hashedPassword,
                        }
                    });
                    return {
                        id : user.id.toString(),
                        name : user.name || "",
                        email : user.number,
                    }
                } catch (error) {
                    console.error(error);   
                }
                return null;
            }
        }),
    ],
    secret : process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session } : any) {
            session.user.id = token.sub;
            return session;
        }
    },
    pages : {
        signIn : "/signin"
    }
}