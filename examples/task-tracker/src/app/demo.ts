import { CreateTaskService } from "../contexts/tasks/application/services/CreateTaskService.js";
import { CompleteTaskService } from "../contexts/tasks/application/services/CompleteTaskService.js";
import { ListTasksService } from "../contexts/tasks/application/services/ListTasksService.js";
import { InMemoryTaskRepository } from "../contexts/tasks/infrastructure/persistence/InMemoryTaskRepository.js";
import type { Task } from "../contexts/tasks/domain/entities/Task.js";

export async function buildDemoOutput(): Promise<string[]> {
  const repository = new InMemoryTaskRepository();
  const createTaskService = new CreateTaskService(repository);
  const completeTaskService = new CompleteTaskService(repository);
  const listTasksService = new ListTasksService(repository);

  const firstTask = await createTaskService.execute({
    title: "Write initial docs",
  });
  await createTaskService.execute({ title: "Review architecture" });
  await completeTaskService.execute({ id: firstTask.id });

  const tasks = await listTasksService.execute();

  return tasks.map(
    (task: Task) => `${task.id} | ${task.title} | ${task.status}`,
  );
}
