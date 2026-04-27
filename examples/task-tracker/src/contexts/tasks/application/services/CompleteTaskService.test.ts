import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { CreateTaskService } from "./CreateTaskService.js";
import { CompleteTaskService } from "./CompleteTaskService.js";
import { InMemoryTaskRepository } from "../../infrastructure/persistence/InMemoryTaskRepository.js";

describe("CompleteTaskService", () => {
  it("completes an existing task", async () => {
    const repository = new InMemoryTaskRepository();
    const createTaskService = new CreateTaskService(repository);
    const completeTaskService = new CompleteTaskService(repository);

    const createdTask = await createTaskService.execute({
      title: "Write docs",
    });
    const completedTask = await completeTaskService.execute({
      id: createdTask.id,
    });

    assert.equal(completedTask.id, createdTask.id);
    assert.equal(completedTask.status, "completed");

    const storedTask = await repository.findById(createdTask.id);
    assert.equal(storedTask?.status, "completed");
  });

  it("fails when task id does not exist", async () => {
    const repository = new InMemoryTaskRepository();
    const service = new CompleteTaskService(repository);

    await assert.rejects(
      () => service.execute({ id: "missing-task" }),
      /Task not found/,
    );
  });
});
