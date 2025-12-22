/*
  File: auth-ui.js

  Description:
  Simulates an authentication page UI. It intentionally contains insecure patterns
  such as DOM XSS (innerHTML/outerHTML), localStorage token handling, template-literal HTML,
  insecure HTTP calls, and string-based timer execution for testing the analyzer.
*/

// Hardcoded secrets (bad practice)
const apiKey = "LIVE_API_KEY_ABCDEF_123456";
const token = "TOKEN_SUPER_SECRET_987654";

// DOM XSS via innerHTML / outerHTML
const userInput = "<img src=x onerror=alert('xss')>";
document.getElementById("loginMsg").innerHTML = "Welcome " + userInput;
document.getElementById("notice").outerHTML = "<div>" + userInput + "</div>";

// Template literal HTML injection
const banner = `<p class="banner">Hello, ${userInput}</p>`;
document.getElementById("banner").innerHTML = banner;

// localStorage / sessionStorage sensitive storage
localStorage.setItem("token", token);
sessionStorage.setItem("auth", token);
localStorage.setItem("secret", "SECRET_FROM_UI_123");

// Insecure HTTP usage
fetch("http://api.example.com/login?token=" + token);
fetch("http://api.example.com/profile?id=" + userInput);

// String execution with setTimeout / setInterval
setTimeout("console.log('string timer execution')", 500);
setInterval("alert('unsafe interval execution')", 1000);
