#!/bin/bash
set -e

VAULT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$HOME/.claude/skills/storybook-guide"

echo "Installing storybook-guide skill..."
echo "  Vault: $VAULT_DIR"
echo "  Skill: $SKILL_DIR"

mkdir -p "$SKILL_DIR"

sed "s|/path/to/your/storybook-research/ ← update this to where you cloned the repo|$VAULT_DIR/|" \
  "$VAULT_DIR/skill/storybook-guide/SKILL.md" > "$SKILL_DIR/SKILL.md"

echo ""
echo "✓ Done. Restart Claude Code for the skill to appear."
echo ""
echo "Trigger with: 'add stories to X', 'write Storybook stories', 'audit these stories'"
