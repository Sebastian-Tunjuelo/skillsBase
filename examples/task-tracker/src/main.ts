import { buildDemoOutput } from "./app/demo.js";

async function main(): Promise<void> {
  const lines = await buildDemoOutput();

  for (const line of lines) {
    console.log(line);
  }
}

void main();
