import { PrismaClient } from "@prisma/client";
import { removePassword } from "../../utils/helpers/remove-password";

const prisma = new PrismaClient();

export const getUserByEmail = async (userProps: any): Promise<any> => {
    try {
        const fetchedUser = await prisma.user.findUnique({
            where: {
                email: userProps.email,
            }
        })
        return removePassword(fetchedUser);
    } catch (err) {
        console.error(err);
    }
}