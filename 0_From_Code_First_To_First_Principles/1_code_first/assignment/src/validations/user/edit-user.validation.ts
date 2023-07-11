import { z } from 'zod';

export const editUserSchema = z.object({
    body: z.object({
      email: z.string().email(),
      username: z.string(),
      firstName: z.string(),
      lastName: z.string(),
    }),
    query: z.object({}).optional(),
    params: z.object({
      userId: z.string()
    }),
});


