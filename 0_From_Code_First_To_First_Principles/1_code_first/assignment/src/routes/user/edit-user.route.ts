import { HttpException } from "../../utils/exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import { editUser, getUserById } from "../../models/user";

export const editUserRoute = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const userExists = await getUserById({ id: req.params.userId });

        if (!userExists) {
            return next(new HttpException({
                statusCode: 404,
                message: "UserNotFound"
            }))
        }

        if (userExists && userExists.username === req.body.username) {
            return next(new HttpException({
                statusCode: 409,
                message: "UserNameAlreadyTaken"
            }));
        }

        if (userExists && userExists.email === req.body.email) {
            return next(new HttpException({
                statusCode: 409,
                message: 'EmailAlreadyInUse',
            }));
        }

        const editedUser = await editUser({
            id: req.params.userId,
            ...(req.body.email && { email: req.body.email }),
            ...(req.body.username && { username: req.body.username }),
            ...(req.body.firstName && { firstName: req.body.firstName }),
            ...(req.body.lastName && { lastName: req.body.lastName }),
        });

        res.status(201).json({
            error: null, 
            data: editedUser,
            success: true,
        });

    } catch (err) {
        return next(new HttpException({
            statusCode: 500,
            message: 'Failed to update user',
        }));
    }
}