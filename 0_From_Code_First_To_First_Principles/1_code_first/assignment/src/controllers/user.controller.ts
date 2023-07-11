import { Router } from 'express';

import { createUser, editUser, getUser } from '../models/user.model';
import { HttpException } from '../utils/exceptions/http.exception';
import { validate } from '../middleware/validate.middleware';
import { createUserSchema } from '../validations/user.validation';
import { generatePassword } from '../utils/helpers/password-generator';

const router = Router(); 

router.post('/new', validate(createUserSchema),  async (req, res, next) => {
    try {
        const userExists = await getUser({ email: req.body.email });

        if (userExists && userExists.username === req.body.username) {
            next(new HttpException({
                statusCode: 409,
                message: "UserNameAlreadyTaken"
            }));
        }

        if (userExists && userExists.email === req.body.email) {
            next(new HttpException({
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
            message: 'UnableToCreateUser',
        }));
    }
});

export default router;