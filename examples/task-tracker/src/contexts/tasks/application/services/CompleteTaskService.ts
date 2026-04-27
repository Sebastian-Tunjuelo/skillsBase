import { Task } from "../../domain/entities/Task.js";
import { TaskRepository } from "../../domain/repositories/TaskRepository.js";

export interface CompleteTaskInput {
  id: string;
}

export class CompleteTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: CompleteTaskInput): Promise<Task> {
    const task = await this.taskRepository.findById(input.id);

    if (!task) {
      throw new Error("Task not found");
    }

    const completedTask = task.complete();
    await this.taskRepository.update(completedTask);

    return completedTask;
  }
}
