import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";

export class ListTasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}
