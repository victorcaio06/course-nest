import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  start_at: z.string().transform((item) => new Date(item)),
  end_at: z.string().transform((item) => new Date(item)),
  priority: z.enum(['Baixa', 'Média', 'Alta'], {
    required_error: 'Priority is required',
  }),
  status: z.enum(['Pendente', 'Em andamento', 'Concluída'], {
    required_error: 'Status is required',
  }),
});

export class CreateTaskSchemaDTO extends createZodDto(CreateTaskSchema) {}
