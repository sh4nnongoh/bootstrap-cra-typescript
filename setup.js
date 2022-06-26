const { execSync } = require("child_process");
const fs = require("fs");
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
execSync("git reset");
execSync("git add package.json");
execSync("git add yarn.lock");
execSync("git add .eslintrc.json");
execSync("git commit -m '[config] enable airbnb, typescript, and jest esLint'");
execSync("yarn prepare");
execSync("yarn husky add .husky/pre-commit \"yarn lint && yarn test:ci\"");
execSync("git reset");
execSync("git add .husky/pre-commit");
execSync("git commit -m '[config] enable husky'");
execSync("git reset");
execSync("git add src/*");
execSync("git commit -m '[config] lint default files'");
