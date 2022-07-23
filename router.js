const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
execSync("yarn add react-snap");
execSync("yarn add react-router-dom");
execSync("cp ./bootstrap-cra-typescript/router/routes.tsx src/");
execSync("rm src/index.tsx");
execSync("cp ./bootstrap-cra-typescript/router/index.tsx src/");
const packageJson = fs.readFileSync("package.json", { encoding: "utf8" });
const packageJsonProps = JSON.parse(packageJson);
const updatedPackageJsonProps = {
  ...packageJsonProps,
  scripts: {
    ...packageJsonProps.scripts,
    postbuild: "react-snap"
  }
};
const sortUpdatedPackageJsonProps = {
  ...updatedPackageJsonProps,
  scripts: Object.keys(updatedPackageJsonProps.scripts).sort().reduce((acc, key) => ({
    ...acc,
    [key]: updatedPackageJsonProps.scripts[key]
  }), {})
};
fs.writeFileSync("package.json", JSON.stringify(sortUpdatedPackageJsonProps, null, 2));
const app = fs.readFileSync("src/App.tsx", { encoding: "utf8" });
const updatedApp = app
  .replace("import React from \"react\";", "import React from \"react\";\nimport { NavLink } from \"react-router-dom\";")
  .replace("<header className=\"App-header\">", "<header className=\"App-header\">\n<nav><NavLink to=\"/example\" className=\"App-link\">Example Route</NavLink></nav>");
fs.writeFileSync("src/App.tsx", updatedApp);
const getTestFilesFromDir = (acc, dir) => {
  if (!fs.existsSync(dir)) {
    return acc;
  }
  const dirItems = fs.readdirSync(dir);
  const testFiles = dirItems.map((item) => {
    const itemPath = path.join(dir, item);
    if (fs.lstatSync(itemPath).isDirectory()) {
      return getTestFilesFromDir(acc, itemPath);
    }
    if (itemPath.endsWith(".test.tsx")) {
      return acc.concat(itemPath);
    }
    return null;
  })
    .flatMap((item) => item)
    .filter(Boolean);
  return testFiles;
};
const srcPath = `${process.cwd()}/src`;
const testFiles = getTestFilesFromDir([], srcPath);
testFiles.forEach((filePath) => {
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const updatedFile = file
    .replace("import App from \"./App\";", "import { BrowserRouter } from \"react-router-dom\";\nimport Routes from \"./routes\";")
    .replace("<App />", "<BrowserRouter><Routes /></BrowserRouter>");
  fs.writeFileSync(filePath, updatedFile);
});
execSync("yarn lint");
execSync("git reset");
execSync("git add package.json");
execSync("git add yarn.lock");
execSync("git add src/index.tsx");
execSync("git add src/routes.tsx");
execSync("git add src/App.tsx");
testFiles.forEach((file) => {
  execSync(`git add ${file}`);
});
execSync("git commit -m 'cfg: add react-router with react-snap'");
