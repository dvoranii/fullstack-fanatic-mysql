require("ts-node").register({
  project: "./tsconfig.json",
  transpileOnly: true,
});

const { resolve } = require("path");
const tsConfigPaths = require("tsconfig-paths");

const tsConfig = require("./tsconfig.json");
const baseUrl = resolve(__dirname, "./src");

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});

require("./src/app");
