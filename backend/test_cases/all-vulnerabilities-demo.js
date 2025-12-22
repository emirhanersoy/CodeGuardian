/*
  File: all-vulnerabilities-demo.js

  Description:
  This file is a comprehensive test case designed to trigger all vulnerability
  detection rules implemented in the CodeGuardian static analysis engine.
  It intentionally includes multiple real-life insecure coding patterns such as
  code injection, DOM-based XSS, hardcoded secrets, weak cryptography,
  insecure CORS configurations, command injection, ReDoS-prone regex patterns,
  insecure storage usage, and unsafe URL handling.

  Purpose:
  - Validate that every regex-based rule is triggered correctly
  - Provide a single, easy-to-demo file for frontend-backend testing
  - Serve as evidence of rule coverage in reports and presentations
*/

// =======================
// Hardcoded Secrets
// =======================
const password = "superSecretPassword123";
const apiKey = "API_KEY_ABCDEF_123456";
const token = "JWT_TOKEN_SECRET_987654";
const clientSecret = "CLIENT_SECRET_VALUE";

// =======================
// Weak Cryptography
// =======================
const crypto = require("crypto");

const weakHash1 = crypto.createHash("md5").update(password).digest("hex");
const weakHash2 = crypto.createHash("sha1").update(password).digest("hex");

// =======================
// Dynamic Code Execution
// =======================
eval("console.log('Eval execution detected')");
eval("alert('Another eval execution')");

const dynamicFn = Function("console.log('Function constructor execution')");
dynamicFn();

// String-based timers (eval-like behavior)
setTimeout("console.log('String-based timeout')", 500);
setInterval("console.log('String-based interval')", 1000);

// =======================
// DOM-based XSS
// =======================
const userInput = "<img src=x onerror=alert('xss')>";

document.getElementById("output").innerHTML = userInput;
document.getElementById("status").innerHTML = "User: " + userInput;
document.getElementById("box").outerHTML = "<div>" + userInput + "</div>";

// Legacy DOM write
document.write("<p>" + userInput + "</p>");
document.writeln("<div>" + userInput + "</div>");

// Template literal injection
const template = `<span>Welcome ${userInput}</span>`;
document.getElementById("template").innerHTML = template;

// =======================
// localStorage / sessionStorage Sensitive Data
// =======================
localStorage.setItem("token", token);
localStorage.setItem("secret", "LOCAL_STORAGE_SECRET");
sessionStorage.setItem("auth", token);

// =======================
// Insecure HTTP Usage
// =======================
fetch("http://api.example.com/login?token=" + token);
fetch("http://api.example.com/user?id=" + userInput);

// =======================
// URL / Redirect Injection
// =======================
const nextUrl = "userProvidedUrl";

window.open(nextUrl);
window.open("http://example.com/" + nextUrl);

location.href = "/redirect?next=" + nextUrl;
document.getElementById("help").href = "http://help.example.com?q=" + nextUrl;
document.getElementById("img").src = "http://cdn.example.com/" + nextUrl;

// =======================
// jQuery XSS (Legacy)
// =======================
$("#result").html(userInput);
$(".status").html("Status: " + userInput);

// =======================
// Insecure CORS Configuration (Backend Style)
// =======================
const express = require("express");
const cors = require("cors");
const { exec, execSync } = require("child_process");

const app = express();

app.use(cors({ origin: "*" }));
app.use(cors({ origin: "*", credentials: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// =======================
// SQL-like String Concatenation
// =======================
const userId = req.query.id;

const query1 = "SELECT * FROM users WHERE id = " + userId;
const query2 = "DELETE FROM users WHERE id = " + userId;
const query3 = "UPDATE users SET role='admin' WHERE id = " + userId;

// =======================
// Command Injection
// =======================
const cmd = req.query.cmd;

exec("ls " + cmd);
execSync("cat /var/log/" + cmd);

// =======================
// ReDoS – Catastrophic Backtracking Regex
// =======================
const redos1 = /(a+)+$/;
const redos2 = /([a-zA-Z]+)*$/;
const redos3 = /(\d+)+/;

redos1.test("aaaaaaaaaaaaaaaaaaaaaaaa!");
redos2.test("bbbbbbbbbbbbbbbbbbbbbbbb!");
redos3.test("111111111111111111111!");

// =======================
// Legacy / Misc
// =======================
document.write("<footer>" + nextUrl + "</footer>");
element.innerHTML = nextUrl;
