import { randomUUID } from "node:crypto";
import { Task } from "../../domain/entities/Task.js";
import { TaskRepository } from "../../domain/repositories/TaskRepository.js";

export interface CreateTaskInput {
  title: string;
}

export class CreateTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(input: CreateTaskInput): Promise<Task> {
    const title = input.title.trim();

    if (!title) {
      throw new Error("Task title is required");
    }

    const task = new Task({
      id: randomUUID(),
      title,
      status: "pending",
    });

    await this.taskRepository.save(task);

    return task;
  }
}
