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
        assets: [
          {
            from: "./node_modules/swagger-ui-dist/*.css",
            to: "./build/swagger-ui-dist",
          },
          {
            from: "./node_modules/swagger-ui-dist/*.js",
            to: "./build/swagger-ui-dist",
          },
          {
            from: "./node_modules/swagger-ui-dist/*.png",
            to: "./build/swagger-ui-dist",
          },
          {
            from: "./src/configs/.env.production",
            to: "./build/configs/.env.production",
          },
        ],
      }),
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
