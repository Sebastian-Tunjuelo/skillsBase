import { Task } from "../../domain/entities/Task.js";
import { TaskRepository } from "../../domain/repositories/TaskRepository.js";

export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }
}
