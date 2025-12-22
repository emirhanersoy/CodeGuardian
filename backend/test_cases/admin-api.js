/*
  File: admin-api.js

  Description:
  Simulates an Express admin API. Intentionally includes insecure CORS configuration,
  SQL-like string concatenation patterns, command injection via child_process, and weak crypto.
*/

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { exec, execSync } = require("child_process");

const app = express();

// Insecure CORS configuration (multiple)
app.use(cors({ origin: "*" }));
app.use(cors({ origin: "*", credentials: true }));

// Also wildcard header style (seen in some codebases)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Weak crypto (md5/sha1)
const hash1 = crypto.createHash("md5").update("admin").digest("hex");
const hash2 = crypto.createHash("sha1").update("admin").digest("hex");

// SQL-like concatenation patterns (multiple)
const userId = req.query.id;
const q1 = "SELECT * FROM users WHERE id = " + userId;
const q2 = "DELETE FROM audit_logs WHERE user_id = " + userId;
const q3 = "UPDATE users SET role='admin' WHERE id = " + userId;

// Command injection patterns via child_process concatenation
const arg = req.query.cmd;
exec("ls " + arg);
execSync("cat /var/log/" + arg);

// Hardcoded secrets (bad)
const adminToken = "ADMIN_TOKEN_999999";
const secret = "super_secret_key_123456";
