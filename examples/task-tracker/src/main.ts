import { CreateTaskService } from "./contexts/tasks/application/services/CreateTaskService";
import { ListTasksService } from "./contexts/tasks/application/services/ListTasksService";
import { InMemoryTaskRepository } from "./contexts/tasks/infrastructure/persistence/InMemoryTaskRepository";

async function main(): Promise<void> {
  const repository = new InMemoryTaskRepository();
  const createTaskService = new CreateTaskService(repository);
  const listTasksService = new ListTasksService(repository);

  await createTaskService.execute({ title: "Write initial docs" });
  await createTaskService.execute({ title: "Review architecture" });

  const tasks = await listTasksService.execute();

  for (const task of tasks) {
    console.log(`${task.id} | ${task.title} | ${task.status}`);
  }
}

void main();
