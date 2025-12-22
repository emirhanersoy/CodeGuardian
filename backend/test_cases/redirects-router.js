/*
  File: redirects-router.js

  Description:
  Simulates routing/redirection logic in a frontend app.
  Includes unsafe window.open, href concatenation, and insecure HTTP links.
*/

const target = "userInputUrl";

// Unsafe redirect building / open redirect style
window.open(target);
window.open("http://example.com/" + target);

// Unsafe URL concatenations
location.href = "/login?next=" + target;
document.getElementById("helpLink").href = "http://help.example.com?q=" + target;

// Insecure HTTP literal
const download = "http://downloads.example.com/file.zip";
