/*
  File: legacy-middleware.js

  Description:
  Simulates legacy middleware/config. Includes insecure CORS wildcard, SQL-like concatenation,
  and document.write/innerHTML style strings (mixed legacy snippets) for analyzer coverage.
*/

const corsConfig = { origin: "*" }; // insecure cors style

// SQL-like concatenation again
const action = "userInput";
const sql = "INSERT INTO actions (name) VALUES (" + action + ")";

// More hardcoded secrets
const token = "LEGACY_TOKEN_123456789";
const password = "legacyPass_0000";

// Some legacy snippets (for detection coverage)
document.write("<p>" + action + "</p>");
element.innerHTML = action;
