import app from "@/src/app";
import configs from "@/src/config";
import connectToMongoDB from "@/src/database/connection";

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
