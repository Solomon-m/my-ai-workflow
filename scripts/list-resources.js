#!/usr/bin/env node

/**
 * List all AI workflow resources
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { basename, join } from "path";
import { parse as parseYaml } from "yaml";

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    try {
      return parseYaml(match[1]);
    } catch {
      return null;
    }
  }
  return null;
}

function listDirectory(dir, extension, extractName) {
  if (!statSync(dir, { throwIfNoEntry: false })) {
    return [];
  }

  const files = readdirSync(dir, { recursive: true }).filter((file) => {
    const fullPath = join(dir, file);
    return (
      statSync(fullPath).isFile() &&
      (extension ? file.endsWith(extension) : true)
    );
  });

  return files.map((file) => {
    const fullPath = join(dir, file);
    const content = readFileSync(fullPath, "utf-8");
    const name = extractName(fullPath, content);
    const frontmatter = extractFrontmatter(content);

    return {
      name,
      file,
      description: frontmatter?.description || "No description",
    };
  });
}

function listAgents() {
  return listDirectory("agents", ".agent.md", (path, content) => {
    const frontmatter = extractFrontmatter(content);
    const name = basename(path, ".agent.md");
    return `@${name}`;
  });
}

function listInstructions() {
  return listDirectory("instructions", ".instructions.md", (path, content) => {
    const frontmatter = extractFrontmatter(content);
    return frontmatter?.applyTo || basename(path, ".instructions.md");
  });
}

function listPrompts() {
  return listDirectory("prompts", ".prompt.md", (path) => {
    const name = basename(path, ".prompt.md");
    return `/${name}`;
  });
}

function listSkills() {
  return listDirectory("skills", "SKILL.md", (path, content) => {
    const frontmatter = extractFrontmatter(content);
    return frontmatter?.name || basename(path).replace("/SKILL.md", "");
  });
}

function listCollections() {
  return listDirectory("collections", ".collection.yml", (path, content) => {
    const data = parseYaml(content);
    return data.name || basename(path, ".collection.yml");
  });
}

function printTable(title, items) {
  console.log(`\n${title}`);
  console.log("=".repeat(80));

  if (items.length === 0) {
    console.log("  (none found)");
    return;
  }

  items.forEach((item) => {
    console.log(`\n📄 ${item.name}`);
    console.log(`   ${item.description}`);
    console.log(`   File: ${item.file}`);
  });
}

function main() {
  const args = process.argv.slice(2);
  const target = args[0] || "all";

  console.log("📚 AI Workflow Resources\n");

  if (target === "all" || target === "agents") {
    printTable("🤖 Agents", listAgents());
  }

  if (target === "all" || target === "instructions") {
    printTable("📋 Instructions", listInstructions());
  }

  if (target === "all" || target === "prompts") {
    printTable("💬 Prompts", listPrompts());
  }

  if (target === "all" || target === "skills") {
    printTable("🛠️  Skills", listSkills());
  }

  if (target === "all" || target === "collections") {
    printTable("📦 Collections", listCollections());
  }

  console.log("\n");
}

main();
