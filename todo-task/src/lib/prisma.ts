import {PrismaClient} from '@prisma/client'

//creating a global instance named prisma
declare global {
    var prisma : PrismaClient | undefined
}

//a client is being exported which accesses the prismaClient, either it reuses the existing one or it creates a new one 
//the new instance is created only if the previous global instance is undefined
export const client = globalThis.prisma || new PrismaClient()

//this checks if the application is in development mode, then it avoids creating new connections to the database
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client
