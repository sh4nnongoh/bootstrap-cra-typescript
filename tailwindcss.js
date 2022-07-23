const { execSync } = require("child_process");
const fs = require("fs");
execSync("yarn add tailwindcss postcss autoprefixer");
execSync("cp ./bootstrap-cra-typescript/tailwindcss/postcss.config.js ./postcss.config.js");
execSync("cp ./bootstrap-cra-typescript/tailwindcss/tailwind.config.js ./tailwind.config.js");
const indexCss = fs.readFileSync("src/index.css", { encoding: "utf8" });
const updatedIndexCss = "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n" + indexCss
fs.writeFileSync("src/index.css", updatedIndexCss);
execSync("git reset");
execSync("git add src/index.css");
execSync("git add postcss.config.js");
execSync("git add tailwind.config.js");
execSync("git add package.json");
execSync("git add yarn.lock");
execSync("git commit -m 'cfg: enable tailwindcss'");

