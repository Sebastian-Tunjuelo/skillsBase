import { CreateTaskService } from "../contexts/tasks/application/services/CreateTaskService";
import { ListTasksService } from "../contexts/tasks/application/services/ListTasksService";
import { InMemoryTaskRepository } from "../contexts/tasks/infrastructure/persistence/InMemoryTaskRepository";

export async function buildDemoOutput(): Promise<string[]> {
  const repository = new InMemoryTaskRepository();
  const createTaskService = new CreateTaskService(repository);
  const listTasksService = new ListTasksService(repository);

  await createTaskService.execute({ title: "Write initial docs" });
  await createTaskService.execute({ title: "Review architecture" });

  const tasks = await listTasksService.execute();

  return tasks.map((task) => `${task.id} | ${task.title} | ${task.status}`);
}