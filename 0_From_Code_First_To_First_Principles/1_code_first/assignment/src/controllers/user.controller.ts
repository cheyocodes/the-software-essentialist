import { Router } from 'express';

import { validate } from '../middleware/validate.middleware';

import { 
    createUserSchema,
    editUserSchema,
    getUserSchema,
 } from '../validations/user';

import { 
    createUserRoute,
    editUserRoute,
    getUserRoute
} from '../routes/user';



const router = Router(); 

router.post('/new', [
    validate(createUserSchema),  
    createUserRoute
]);

router.post('/edit/:userId', [
    validate(editUserSchema), 
    editUserRoute
]);

router.get('/', [
    validate(getUserSchema), 
    getUserRoute
]);

export default router;