import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  typeCheck: "both",
  shims: {
    deno: true,
  },
  package: {
    name: "SimpleHistory",
    version: Deno.args[0],
    description:
      "A simple History class that stores the current value and keeps a stack of previous values for undo/redo",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/kristianbinau/SimpleHistory.git",
    },
    bugs: {
      url: "https://github.com/kristianbinau/SimpleHistory/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
