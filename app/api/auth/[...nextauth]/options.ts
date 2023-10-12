import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Email from "next-auth/providers/email"
import {PrismaClient} from "@prisma/client";
import {PrismaAdapter} from "@auth/prisma-adapter";

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NEXTAUTH_SECRET: string
            AUTH_GITHUB_ID: string
            AUTH_GITHUB_SECRET: string
            AUTH_GOOGLE_ID: string
            AUTH_GOOGLE_SECRET: string
        }
    }
}

const prisma = new PrismaClient()

export const authOptions: any = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Email({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ]
}