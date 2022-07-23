const { execSync } = require("child_process");
const fs = require("fs");
execSync("rm ./src/index.tsx");
execSync("cp ./bootstrap-cra-typescript/index.tsx ./src/index.tsx");
execSync("git reset");
execSync("git add ./src/index.tsx");
execSync("git commit -m 'cfg: enable React 18 support'");
execSync("rm -rf .husky");
execSync("cp ./bootstrap-cra-typescript/.eslintrc.json ./.eslintrc.json");
execSync("yarn add install-peerdeps");
execSync("yarn add cross-env");
execSync("yarn add husky");
execSync("yarn add eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript");
execSync("yarn install-peerdeps eslint-config-airbnb --yarn");
const packageJson = fs.readFileSync("package.json", { encoding: "utf8" });
const packageJsonProps = JSON.parse(packageJson);
const updatedPackageJsonProps = {
  ...packageJsonProps,
  eslintConfig: undefined,
  scripts: {
    ...packageJsonProps.scripts,
    test: "react-scripts test --coverage --watchAll",
    "test:ci": "cross-env CI=true react-scripts test",
    lint: "yarn eslint --ext .ts,.tsx src/ --fix",
    prepare: "husky install"
  },
  jest: {
    collectCoverageFrom: ["./src/**"],
    coverageThreshold: {
      global: {
        lines: 90
      }
    },
    coveragePathIgnorePatterns: []
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
execSync("mkdir .vscode -p");
execSync("cp ./bootstrap-cra-typescript/.vscode/settings.json .vscode/");
execSync("git reset");
execSync("git add .vscode/settings.json");
execSync("git add package.json");
execSync("git add yarn.lock");
execSync("git add .eslintrc.json");
execSync("git commit -m 'cfg: enable airbnb, typescript, and jest esLint'");
execSync("yarn prepare");
execSync("yarn husky add .husky/pre-commit \"yarn lint && yarn test:ci\"");
execSync("git reset");
execSync("git add .husky/pre-commit");
execSync("git commit -m 'cfg: enable husky'");
execSync("git reset");
execSync("git add src/*");
execSync("git commit -m 'cfg: lint default files'");
