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
    external: ["express"], // Specify external packages
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
    fs.copySync(
      path.resolve(__dirname, "src/docs/swagger.json"),
      path.resolve(__dirname, "build/docs/swagger.json")
    );
    console.log("Swagger JSON copied successfully!");

    // Copy package.json for dependency reference in production
    fs.copySync(
      path.resolve(__dirname, "package.json"),
      path.resolve(__dirname, "build/package.json")
    );
    console.log("Package.json copied successfully!");

    // Copy .env.production
    const envFilePath = path.resolve(__dirname, "src/configs/.env.development");
    if (fs.existsSync(envFilePath)) {
      fs.copySync(
        envFilePath,
        path.resolve(__dirname, "build/configs/.env.production")
      );
      console.log("Environment file copied successfully!");
    } else {
      console.error("Environment file does not exist:", envFilePath);
    }

    // Copy ecosystem.config.js for PM2 configuration in production
    fs.copySync(
      path.resolve(__dirname, "ecosystem.config.js"),
      path.resolve(__dirname, "build/ecosystem.config.js")
    );
    console.log("Ecosystem Config copied successfully!");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
