import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { buildDemoOutput } from "./demo";

describe("buildDemoOutput", () => {
  it("returns two formatted task lines", async () => {
    const lines = await buildDemoOutput();

    assert.equal(lines.length, 2);
    assert.match(lines[0] ?? "", /\| Write initial docs \| pending$/);
    assert.match(lines[1] ?? "", /\| Review architecture \| pending$/);
  });
});