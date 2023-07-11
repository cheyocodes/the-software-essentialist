import { z } from 'zod';

export const getUserSchema = z.object({
    body: z.object({}),
    query: z.object({
        email: z.string().email(),
    }),
    params: z.object({}),
});


