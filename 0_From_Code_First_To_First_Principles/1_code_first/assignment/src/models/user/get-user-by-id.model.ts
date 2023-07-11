import { PrismaClient } from "@prisma/client";
import { removePassword } from "../../utils/helpers/remove-password";

const prisma = new PrismaClient();

export const getUserById = async (userProps: any): Promise<any> => {
    try {
        const fetchedUser = await prisma.user.findUnique({
            where: {
                id: Number(userProps.id),
            }
        })
        return removePassword(fetchedUser);
    } catch (err) {
        console.error(err);
    }
}