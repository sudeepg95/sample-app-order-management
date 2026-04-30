import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "unicorn", "oxc"],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  categories: {
    correctness: "error",
  },
  rules: {},
  env: {
    builtin: true,
  },
});
