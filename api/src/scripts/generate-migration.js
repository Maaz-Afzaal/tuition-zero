const { execSync } = require('child_process');
const name = process.argv[2];

if (!name) {
  console.error('❌ Please provide a migration name');
  process.exit(1);
}

const path = `src/database/migrations/${name}`;
const command = `npx typeorm-ts-node-commonjs migration:generate ${path} -d data-source.ts`;

console.log(`🛠  Generating migration: ${path}`);
execSync(command, { stdio: 'inherit' });
