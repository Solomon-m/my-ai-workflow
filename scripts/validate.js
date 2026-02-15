#!/usr/bin/env node

/**
 * Validation script for AI workflow resources
 * Validates agents, instructions, prompts, skills, and collections
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { extname, join } from "path";
import { parse as parseYaml } from "yaml";

const errors = [];
const warnings = [];

function log(message, type = "info") {
  const prefix = type === "error" ? "❌" : type === "warning" ? "⚠️" : "✅";
  console.log(`${prefix} ${message}`);
}

function validateFrontmatter(filePath, content, requiredFields) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    errors.push(`${filePath}: Missing frontmatter`);
    return null;
  }

  try {
    const frontmatter = parseYaml(frontmatterMatch[1]);

    // Check required fields
    for (const field of requiredFields) {
      if (!frontmatter[field]) {
        errors.push(`${filePath}: Missing required field '${field}'`);
      }
    }

    // Validate description length
    if (frontmatter.description) {
      if (
        frontmatter.description.length < 1 ||
        frontmatter.description.length > 500
      ) {
        warnings.push(`${filePath}: Description should be 1-500 characters`);
      }
    }

    return frontmatter;
  } catch (error) {
    errors.push(`${filePath}: Invalid YAML frontmatter - ${error.message}`);
    return null;
  }
}

function validateAgent(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const frontmatter = validateFrontmatter(filePath, content, ["description"]);

  if (frontmatter) {
    // Check for handoffs section
    if (!content.includes("## Handoff")) {
      warnings.push(`${filePath}: Consider adding handoff strategy`);
    }

    // Check for examples
    if (!content.includes("```")) {
      warnings.push(`${filePath}: Should include code examples`);
    }
  }
}

function validateInstruction(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const frontmatter = validateFrontmatter(filePath, content, [
    "description",
    "applyTo",
  ]);

  if (frontmatter && frontmatter.applyTo) {
    // Validate glob pattern
    if (!frontmatter.applyTo.includes("*")) {
      warnings.push(`${filePath}: applyTo should use glob patterns`);
    }
  }
}

function validatePrompt(filePath) {
  const content = readFileSync(filePath, "utf-8");
  validateFrontmatter(filePath, content, ["description"]);
}

function validateSkill(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const frontmatter = validateFrontmatter(filePath, content, [
    "name",
    "description",
    "version",
  ]);

  if (frontmatter) {
    // Check for usage section
    if (!content.includes("## When to Use")) {
      warnings.push(`${filePath}: Should include "When to Use" section`);
    }
  }
}

function validateCollection(filePath) {
  const content = readFileSync(filePath, "utf-8");

  try {
    const collection = parseYaml(content);

    // Check required fields
    if (!collection.name) {
      errors.push(`${filePath}: Missing 'name' field`);
    }
    if (!collection.description) {
      errors.push(`${filePath}: Missing 'description' field`);
    }
    if (!collection.resources || !Array.isArray(collection.resources)) {
      errors.push(`${filePath}: Missing or invalid 'resources' array`);
    } else {
      // Validate each resource
      collection.resources.forEach((resource, index) => {
        if (!resource.type) {
          errors.push(`${filePath}: Resource ${index + 1} missing 'type'`);
        }
        if (!resource.path) {
          errors.push(`${filePath}: Resource ${index + 1} missing 'path'`);
        }
        if (!resource.description) {
          warnings.push(
            `${filePath}: Resource ${index + 1} missing 'description'`,
          );
        }
      });
    }
  } catch (error) {
    errors.push(`${filePath}: Invalid YAML - ${error.message}`);
  }
}

function validateDirectory(dir, validator, extension) {
  if (!statSync(dir, { throwIfNoEntry: false })) {
    warnings.push(`Directory not found: ${dir}`);
    return 0;
  }

  const files = readdirSync(dir, { recursive: true }).filter((file) => {
    const fullPath = join(dir, file);
    return (
      statSync(fullPath).isFile() &&
      (extension
        ? extname(file) === extension || file.endsWith(extension)
        : true)
    );
  });

  files.forEach((file) => {
    const filePath = join(dir, file);
    validator(filePath);
  });

  return files.length;
}

function main() {
  const args = process.argv.slice(2);
  const target = args[0] || "all";

  console.log("🔍 Validating AI Workflow Resources...\n");

  let totalFiles = 0;

  if (target === "all" || target === "agents") {
    console.log("Validating agents...");
    totalFiles += validateDirectory("agents", validateAgent, ".agent.md");
  }

  if (target === "all" || target === "instructions") {
    console.log("Validating instructions...");
    totalFiles += validateDirectory(
      "instructions",
      validateInstruction,
      ".instructions.md",
    );
  }

  if (target === "all" || target === "prompts") {
    console.log("Validating prompts...");
    totalFiles += validateDirectory("prompts", validatePrompt, ".prompt.md");
  }

  if (target === "all" || target === "skills") {
    console.log("Validating skills...");
    totalFiles += validateDirectory("skills", validateSkill, "SKILL.md");
  }

  if (target === "all" || target === "collections") {
    console.log("Validating collections...");
    totalFiles += validateDirectory(
      "collections",
      validateCollection,
      ".collection.yml",
    );
  }

  console.log(`\n📊 Validation Results:`);
  console.log(`   Files validated: ${totalFiles}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\n❌ Errors:");
    errors.forEach((error) => console.log(`   ${error}`));
  }

  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    warnings.forEach((warning) => console.log(`   ${warning}`));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("\n✨ All validations passed!");
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main();
