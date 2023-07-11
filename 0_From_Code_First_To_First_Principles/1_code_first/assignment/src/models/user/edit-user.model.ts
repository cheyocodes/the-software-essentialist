import { PrismaClient } from "@prisma/client";
import { removePassword } from "../../utils/helpers/remove-password";

const prisma = new PrismaClient();

export const editUser = async (userProps: any): Promise<any> => {
    try {
        const userId = Number(userProps.id);
        delete userProps.id;

        const editedUser = await prisma.user.update({
            where: { id: userId },
            data: userProps,
        })

        return removePassword(editedUser);
    } catch (err) {
        console.error(err);
    }
}