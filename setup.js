#!/usr/bin/env node
// setup.js
const { execSync } = require("child_process");
const opts = { stdio: "inherit" };

console.log("\n👉  Generating .env file…");
execSync("node server/scripts/generateEnv.js", opts);

console.log("\n👉  Installing server dependencies…");
execSync("npm install", { cwd: "server", ...opts });

console.log("\n👉  Installing client dependencies…");
execSync("npm install", { cwd: "client", ...opts });

console.log("\n✅  Setup complete!\n");
console.log("▶️  Starting both servers…\n");
execSync(
  `npx concurrently "npm run dev --prefix server" "npm run dev --prefix client"`,
  opts
);
