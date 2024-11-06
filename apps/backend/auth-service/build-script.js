const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs-extra");
const copy = require("esbuild-plugin-copy").default;

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: "build",
    external: ["express"], // Keep external dependencies not needed in bundle
    loader: {
      ".ts": "ts",
    },
    plugins: [
      copy({
        assets: {
          from: [
            "./node_modules/swagger-ui-dist/*.css",
            "./node_modules/swagger-ui-dist/*.js",
            "./node_modules/swagger-ui-dist/*.png",
          ],
          to: ["./"],
        },
      }),
      {
        name: "log-success-after-copy",
        setup(build) {
          build.onEnd(() => {
            console.log("Assets copied successfully");
          });
        },
      },
    ],
    resolveExtensions: [".ts", ".js"],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  })
  .then(() => {
    // Copy swagger.json after successful build
    try {
      fs.copySync(
        path.resolve(__dirname, "src/docs/swagger.json"),
        path.resolve(__dirname, "build/docs/swagger.json")
      );
      console.log("Swagger JSON copied successfully!");
    } catch (error) {
      console.error("Error copying swagger.json:", error);
    }

    // Copy package.json for dependency reference in production
    try {
      fs.copySync(
        path.resolve(__dirname, "package.json"),
        path.resolve(__dirname, "build/package.json")
      );
      console.log("Package.json copied successfully!");
    } catch (error) {
      console.error("Error copying package.json:", error);
    }

    // Copy .env.development file to build directory
    const envFilePath = path.resolve(__dirname, "src/configs/.env.development");
    if (fs.existsSync(envFilePath)) {
      try {
        fs.copySync(
          envFilePath,
          path.resolve(__dirname, "build/configs/.env.production")
        );
        console.log(".env.production file copied successfully!");
      } catch (error) {
        console.error("Error copying .env.production:", error);
      }
    } else {
      console.error("Environment file does not exist:", envFilePath);
    }

    // Copy ecosystem.config.js for PM2 configuration in production
    try {
      fs.copySync(
        path.resolve(__dirname, "ecosystem.config.js"),
        path.resolve(__dirname, "build/ecosystem.config.js")
      );
      console.log("Ecosystem Config copied successfully!");
    } catch (error) {
      console.error("Error copying ecosystem.config.js:", error);
    }
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
