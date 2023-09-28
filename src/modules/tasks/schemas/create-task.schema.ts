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

export const ResponseTaskSchema = z.object({
  id: z.string().uuid(),
  task_id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.string(),
  task: z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    priority: z.string(),
    status: z.string(),
    start_at: z.string(),
    end_at: z.string(),
  }),
  user: z.object({
    id: z.string().uuid(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    avatar_url: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});
