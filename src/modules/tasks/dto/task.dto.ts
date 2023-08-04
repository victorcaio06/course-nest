export type CreateTaskDTO = {
  userId: string;
  id: string;
  title: string;
  description: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  status: 'Pendente' | 'Em andamento' | 'Concluída';
  start_at: Date;
  end_at: Date;
};
