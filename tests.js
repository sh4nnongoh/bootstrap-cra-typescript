const { execSync } = require("child_process");
const fs = require("fs");
execSync("cp -r ./bootstrap-cra-typescript/__tests__ ./src/");
execSync("git reset");
execSync("git add src/__tests__/*");
execSync("git commit -m '[config] add basic user story test'");
