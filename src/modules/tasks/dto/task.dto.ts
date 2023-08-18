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

type TaskDTO = {
  start_at: Date | null;
  end_at: Date | null;
  title: string;
  description: string | null;
};

type UserDTO = {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar_url: string | null;
  created_at: Date;
};

export type TaskUserNotificationDTO = {
  id: string;
  task_id: string;
  user_id: string;
  created_at: Date;
  task: TaskDTO;
  user: UserDTO;
};
