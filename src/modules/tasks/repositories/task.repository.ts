import { CreateTaskDTO, TaskUserNotificationDTO } from '../dto/task.dto';

export abstract class ITaskRepository {
  abstract save(task: CreateTaskDTO): Promise<any>;
  abstract findByTitle(title: string): Promise<any>;
  abstract findAllStartDay(): Promise<TaskUserNotificationDTO[] | null>;
}
