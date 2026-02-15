#!/usr/bin/env node

/**
 * Session Auto-Commit Hook
 * Automatically commits changes made during Copilot sessions to a feature branch
 */

import { execSync } from "child_process";
import { existsSync } from "fs";

/**
 * Create a commit for the session changes
 * @param {Object} session - Session data
 */
export function autoCommit(session) {
  try {
    // Check if we're in a git repository
    if (!existsSync(".git")) {
      console.log("[Auto-Commit] Not a git repository, skipping");
      return;
    }

    // Check if there are changes
    const status = execSync("git status --porcelain", { encoding: "utf-8" });
    if (!status.trim()) {
      console.log("[Auto-Commit] No changes to commit");
      return;
    }

    // Get current branch
    const currentBranch = execSync("git branch --show-current", {
      encoding: "utf-8",
    }).trim();

    // Don't auto-commit on main/master
    if (currentBranch === "main" || currentBranch === "master") {
      console.log("[Auto-Commit] On protected branch, skipping auto-commit");
      return;
    }

    // Stage all changes
    execSync("git add .");

    // Create commit message
    const agent = session.agent || "copilot";
    const timestamp = new Date().toISOString();
    const commitMessage = `feat: [${agent}] ${session.prompt.slice(0, 50)}...\n\nGenerated at ${timestamp}\nSession ID: ${session.id}`;

    // Commit changes
    execSync(`git commit -m "${commitMessage}"`, { encoding: "utf-8" });

    console.log(`[Auto-Commit] Committed changes from session ${session.id}`);
  } catch (error) {
    console.error("[Auto-Commit] Error:", error.message);
  }
}

/**
 * Hook entry point
 * Called by Copilot after each session
 */
export function onSessionEnd(event) {
  try {
    autoCommit(event.session);
  } catch (error) {
    console.error("[Auto-Commit] Error:", error.message);
  }
}
