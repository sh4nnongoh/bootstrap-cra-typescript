const { execSync } = require("child_process");
const fs = require("fs");
execSync("yarn add react-router-dom");
execSync("cp ./bootstrap-cra-typescript/routes/routes.tsx src/");
const index = fs.readFileSync("src/index.tsx", { encoding: "utf8" });
const updatedIndex = index
  .replace('<App />', '<BrowserRouter><Routes /></BrowserRouter>')
  .replace('import App from "./App";', 'import { BrowserRouter } from "react-router-dom";\nimport Routes from "./routes";')
fs.writeFileSync("src/index.tsx", updatedIndex);
execSync("git reset");
execSync("git add package.json");
execSync("git add yarn.lock");
execSync("git add src/index.tsx");
execSync("git add src/routes.tsx");
execSync("git commit -m '[config] add react router'");
