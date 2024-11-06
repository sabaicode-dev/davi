import app from "./app";
import configs from "./config";
import connectToMongoDB from "./database/connection";

async function run() {
  try {
    await connectToMongoDB();
    app.listen(configs.port, () => {
      console.log(`Auth Service running on http://localhost:${configs.port}`);
    });
  } catch (error) {
    console.error("Failed to start the application:", error);
    process.exit(1);
  }
}

run();
