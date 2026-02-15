#!/usr/bin/env node

/**
 * Session Logger Hook
 * Logs all Copilot chat sessions to .github/logs/ for team knowledge sharing
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const LOGS_DIR = join(process.cwd(), ".github", "logs");

// Ensure logs directory exists
if (!existsSync(LOGS_DIR)) {
  mkdirSync(LOGS_DIR, { recursive: true });
}

/**
 * Log a Copilot session
 * @param {Object} session - Session data
 */
export function logSession(session) {
  const timestamp = new Date().toISOString();
  const date = timestamp.split("T")[0];
  const logFile = join(LOGS_DIR, `${date}.jsonl`);

  const logEntry = {
    timestamp,
    sessionId: session.id,
    agent: session.agent || "default",
    prompt: session.prompt,
    duration: session.duration,
    filesModified: session.filesModified || [],
    outcome: session.outcome || "unknown",
  };

  // Append to JSONL file
  writeFileSync(logFile, JSON.stringify(logEntry) + "\n", { flag: "a" });

  console.log(`[Session Logger] Logged session ${session.id} to ${logFile}`);
}

/**
 * Hook entry point
 * Called by Copilot after each session
 */
export function onSessionEnd(event) {
  try {
    logSession(event.session);
  } catch (error) {
    console.error("[Session Logger] Error:", error.message);
  }
}
