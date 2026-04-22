import { Task } from "../entities/Task";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findAll(): Promise<Task[]>;
}
