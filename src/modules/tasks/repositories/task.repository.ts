import { CreateTaskDTO } from '../dto/task.dto';

export abstract class ITaskRepository {
  abstract save(task: CreateTaskDTO): Promise<any>;
  abstract findByTitle(title: string): Promise<any>;
}
