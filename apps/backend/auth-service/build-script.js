const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs-extra");
const copy = require("esbuild-plugin-copy").default;

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node20", // Target depends on your environment
    outdir: "build",
    external: ["express"], // Specify Node.js packages here
    loader: {
      ".ts": "ts",
    },
    plugins: [
      // Copy swagger-ui assets
      copy({
        assets: [
          {
            from: `../../../node_modules/swagger-ui-dist/*.css`,
            to: "./",
          },
          {
            from: `../../../node_modules/swagger-ui-dist/*.js`,
            to: "./",
          },
          {
            from: `../../../node_modules/swagger-ui-dist/*.png`,
            to: "./",
          },
        ],
      }),
    ],
    resolveExtensions: [".ts", ".js"],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  })
  .then(() => {
    // Copy swagger.json after successful build
    fs.copySync(
      path.resolve(__dirname, "src/docs/swagger.json"),
      path.resolve(__dirname, "build/docs/swagger.json")
    );
    console.log("Swagger JSON copied successfully!");

    // Copy package.json after ensuring the build was successful
    fs.copySync(
      path.resolve(__dirname, "package.json"),
      path.resolve(__dirname, "build/package.json")
    );
    console.log("Package.json copied successfully!");

    // Copy .env.development if it exists
    const envSource = path.resolve(__dirname, "src/configs/.env.development");
    const envDestination = path.resolve(
      __dirname,
      "build/configs/.env.production"
    );

    // Ensure the destination directory exists
    fs.ensureDirSync(path.dirname(envDestination));

    // Check if the .env.development file exists before copying
    if (fs.existsSync(envSource)) {
      fs.copySync(envSource, envDestination);
      console.log(".env.development copied successfully!");
    } else {
      console.warn(".env.development not found, skipping copy.");
    }

    // Copy ecosystem.config.js to the build folder
    const ecosystemSource = path.resolve(__dirname, "ecosystem.config.js");
    const ecosystemDestination = path.resolve(
      __dirname,
      "build/ecosystem.config.js"
    );
    fs.copySync(ecosystemSource, ecosystemDestination);
    console.log("ecosystem.config.js copied successfully!");
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
