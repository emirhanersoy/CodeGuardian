/*
  File: admin-dashboard.js

  Description:
  This file represents an admin dashboard backend configuration.
  It includes insecure CORS settings, command injection patterns,
  SQL-like string concatenation, and multiple weak validation cases.
*/

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

// Insecure CORS configuration
app.use(cors({ origin: "*" }));
app.use(cors({ origin: "*", credentials: true }));

// SQL-like query construction (string concatenation)
const userId = req.query.id;
const query1 = "SELECT * FROM users WHERE id = " + userId;
const query2 = "DELETE FROM logs WHERE user = " + userId;

// Command injection risks
const userCommand = req.query.cmd;
exec("ls " + userCommand);
exec("cat /var/log/" + userCommand);

// Hardcoded admin secret
const adminToken = "ADMIN_SUPER_SECRET_999";
const secretKey = "hardcoded_secret_key";
