import { NextFunction, Request, Response } from "express";

import { HttpException } from "../../utils/exceptions/http.exception";
import { createUser, getUserByEmail } from "../../models/user";
import { generatePassword } from "../../utils/helpers/password-generator";

export const createUserRoute = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const userExists = await getUserByEmail({ email: req.body.email });

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

        const createdUser = await createUser({
            email: req.body.email,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: generatePassword()
        });

        res.status(201).json({
            error: null, 
            data: createdUser,
            success: true,
        });
    } catch (err) {
        next(new HttpException({
            statusCode: 500,
            message: 'Unable to create user',
        }));
    }
}