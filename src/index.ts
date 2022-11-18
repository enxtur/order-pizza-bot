import { app } from "./app";
import { config } from "./config";
import { getstarted } from "./webhooks/handlers";

async function main() {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  })
}

main();