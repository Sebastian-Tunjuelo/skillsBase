import { Task } from "../entities/Task.js";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
}
