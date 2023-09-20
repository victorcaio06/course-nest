import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const SingInSchema = z.object({
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'password is required' }),
});

export class SingInSchemaDTO extends createZodDto(SingInSchema) {}
