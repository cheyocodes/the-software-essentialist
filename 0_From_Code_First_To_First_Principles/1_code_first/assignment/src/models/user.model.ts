import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (userProps: any): Promise<any> => {
    try {
        const createdUser = await prisma.user.create({ 
            data: userProps 
        });
        return createdUser;
    } catch (err) {
        console.error(err);
    }
}

export const editUser = async (userProps: any): Promise<any> => {

}

export const getUser = async (userProps: any): Promise<any> => {
    try {
        const fetchedUser = await prisma.user.findUnique({
            where: {
                email: userProps.email,
            }
        })
        return fetchedUser;
    } catch (err) {
        console.error(err);
    }
}