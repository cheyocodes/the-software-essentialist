import { z } from 'zod';

export const getUserSchema = z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({}),
});


