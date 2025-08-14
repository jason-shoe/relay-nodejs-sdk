import { generateTypes } from "./generateTypes";

generateTypes().then(() => {
  process.exit(0);
});
