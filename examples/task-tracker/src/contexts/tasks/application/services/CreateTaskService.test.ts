import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { InMemoryTaskRepository } from "../../infrastructure/persistence/InMemoryTaskRepository.js";
import { CreateTaskService } from "./CreateTaskService.js";

describe("CreateTaskService", () => {
  it("creates a pending task with a trimmed title", async () => {
    const repository = new InMemoryTaskRepository();
    const service = new CreateTaskService(repository);

    const task = await service.execute({ title: "  Write docs  " });

    assert.equal(task.title, "Write docs");
    assert.equal(task.status, "pending");

    const storedTasks = await repository.findAll();
    assert.equal(storedTasks.length, 1);
    assert.equal(storedTasks[0]?.title, "Write docs");
  });

  it("rejects empty titles", async () => {
    const repository = new InMemoryTaskRepository();
    const service = new CreateTaskService(repository);

    await assert.rejects(
      () => service.execute({ title: "   " }),
      /Task title is required/,
    );
  });
});
