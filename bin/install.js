#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const VAULT_DEST = path.join(os.homedir(), '.local', 'share', 'storybook-research');
const SKILL_DEST = path.join(os.homedir(), '.claude', 'skills', 'storybook-guide');
const PKG_ROOT = path.join(__dirname, '..');

console.log('Installing storybook-guide skill for Claude Code...\n');

// Copy vault to permanent location
fs.cpSync(PKG_ROOT, VAULT_DEST, {
  recursive: true,
  force: true,
  filter: (src) => !src.includes('node_modules') && !src.includes('.git'),
});

// Install skill with correct vault path
fs.mkdirSync(SKILL_DEST, { recursive: true });

const skillSrc = path.join(VAULT_DEST, 'skill', 'storybook-guide', 'SKILL.md');
let skill = fs.readFileSync(skillSrc, 'utf8');
skill = skill.replace(
  /\/path\/to\/your\/storybook-research\/ ← update this to where you cloned the repo/,
  VAULT_DEST + '/'
);
fs.writeFileSync(path.join(SKILL_DEST, 'SKILL.md'), skill);

console.log('✓ Vault →', VAULT_DEST);
console.log('✓ Skill →', SKILL_DEST);
console.log('\nRestart Claude Code for the skill to appear.');
console.log('\nTrigger with: "add stories to X", "write Storybook stories", "audit these stories"');
