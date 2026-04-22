import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { Task } from "../../domain/entities/Task.js";
import { InMemoryTaskRepository } from "../../infrastructure/persistence/InMemoryTaskRepository.js";
import { ListTasksService } from "./ListTasksService.js";

describe("ListTasksService", () => {
  it("returns all stored tasks", async () => {
    const repository = new InMemoryTaskRepository();
    const taskA = new Task({ id: "task-a", title: "First", status: "pending" });
    const taskB = new Task({
      id: "task-b",
      title: "Second",
      status: "completed",
    });

    await repository.save(taskA);
    await repository.save(taskB);

    const service = new ListTasksService(repository);
    const tasks = await service.execute();

    assert.equal(tasks.length, 2);
    assert.equal(tasks[0]?.id, "task-a");
    assert.equal(tasks[1]?.id, "task-b");
  });
});
