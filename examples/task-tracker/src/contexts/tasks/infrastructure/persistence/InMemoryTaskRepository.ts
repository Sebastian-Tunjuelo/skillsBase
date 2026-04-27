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

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  async update(task: Task): Promise<void> {
    const index = this.tasks.findIndex(
      (currentTask) => currentTask.id === task.id,
    );

    if (index === -1) {
      return;
    }

    this.tasks[index] = task;
  }
}
