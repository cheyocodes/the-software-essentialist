import { PrismaClient } from "@prisma/client";
import { removePassword } from "../../utils/helpers/remove-password";

const prisma = new PrismaClient();

export const createUser = async (userProps: any): Promise<any> => {
    try {
        const createdUser = await prisma.user.create({ 
            data: userProps 
        });
        return removePassword(createdUser);
    } catch (err) {
        console.error(err);
    }
}