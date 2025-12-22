/*
  File: profile-page.js

  Description:
  Simulates a profile settings page. Contains insecure URL concatenation, XSS sinks,
  and additional hardcoded secrets. Used to test multiple occurrences per vulnerability.
*/

// Hardcoded secret
const password = "pass123456789";
const clientSecret = "clientSecret_very_sensitive_001";

// URL concatenation for href/src assignments (open redirect / injection risk)
const next = getQueryParam("next");
document.getElementById("continueLink").href = "/continue?next=" + next;
document.getElementById("avatar").src = "http://cdn.example.com/u/" + next;

// Another insecure HTTP string
const apiUrl = "http://api.example.com/user/" + next;

// DOM XSS sinks (multiple samples)
const bio = getQueryParam("bio");
document.getElementById("bio").innerHTML = bio;
document.getElementById("preview").innerHTML = "Bio preview: " + bio;

// document.write usage (legacy)
document.write("<h3>Profile</h3>");
document.write("<div>" + bio + "</div>");

function getQueryParam(name) {
  // dummy placeholder
  return "userInput";
}
