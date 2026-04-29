import * as esbuild from "esbuild";
import { pinoPlugin } from "esbuild-plugin-pino";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  sourcemap: true,
  plugins: [pinoPlugin({ transports: ["pino-pretty"] })],
});
