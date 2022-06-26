const { execSync } = require("child_process");
const fs = require("fs");
execSync("mkdir ./scripts/ -p");
execSync("cp ./bootstrap-cra-typescript/scripts/update-version.js ./scripts/");
const packageJson = fs.readFileSync("package.json", { encoding: "utf8" });
const packageJsonProps = JSON.parse(packageJson);
const updatedPackageJsonProps = {
  ...packageJsonProps,
  scripts: {
    ...packageJsonProps.scripts,
    "update-version": "node scripts/update-version.js"
  }
};
fs.writeFileSync("package.json", JSON.stringify(updatedPackageJsonProps, null, 2));
execSync("yarn husky add .husky/pre-commit \"yarn update-version && git add package.json\"");
execSync("git reset");
execSync("git add .husky/pre-commit");
execSync("git add package.json");
execSync("git add scripts/update-version.js");
execSync("git commit -m '[config] enable versioning'");
