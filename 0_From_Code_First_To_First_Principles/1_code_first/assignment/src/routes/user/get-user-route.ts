import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exceptions/http.exception";
import { getUserByEmail } from "../../models/user";

export const getUserRoute = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const userExists = await getUserByEmail({ email: req.query.email });

        if (!userExists) {
            return next(new HttpException({
                statusCode: 404,
                message: "UserNotFound"
            }))
        }

        res.status(201).json({
            error: null, 
            data: userExists,
            success: true,
        });

    } catch (err) {
        return next(new HttpException({
            statusCode: 500,
            message: 'Failed to update user',
        }));
    }
}