/*
  File: user-auth.js

  Description:
  This file simulates a basic user authentication module.
  It contains intentionally insecure coding practices such as
  hardcoded secrets, weak cryptography, dynamic code execution,
  and unsafe DOM manipulation to test the static analysis engine.
*/

// Hardcoded credentials
const password = "user123456";
const apiKey = "ABCDEF123456SECRET";

// Weak cryptography usage
const crypto = require("crypto");
const hashedPassword1 = crypto.createHash("md5").update(password).digest("hex");
const hashedPassword2 = crypto.createHash("sha1").update(password).digest("hex");

// Dynamic code execution
eval("console.log('Logging user activity')");
eval("alert('User logged in')");

// DOM-based XSS
const userInput = "<img src=x onerror=alert(1)>";
document.getElementById("welcome").innerHTML = userInput;
document.getElementById("status").innerHTML = "Hello " + userInput;

// document.write usage
document.write("<p>Welcome " + userInput + "</p>");
document.writeln("<div>" + userInput + "</div>");
