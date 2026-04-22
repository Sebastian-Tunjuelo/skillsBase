import { randomUUID } from "node:crypto";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

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
