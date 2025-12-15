/*
  File: legacy-utils.js

  Description:
  This file simulates legacy utility functions.
  It contains dangerous regular expressions that can cause ReDoS,
  unsafe DOM operations, and deprecated or insecure practices.
*/

// ReDoS-prone regular expressions
const regex1 = /(a+)+$/;
const regex2 = /([a-zA-Z]+)*$/;
const regex3 = /(\d+)+/;

regex1.test("aaaaaaaaaaaaaaaaaaaaaaaa!");
regex2.test("bbbbbbbbbbbbbbbbbbbbbbbb!");
regex3.test("111111111111111111111!");

// DOM manipulation vulnerabilities
const input = "<script>alert(1)</script>";
element.innerHTML = input;
element.innerHTML = "User input: " + input;

// document.write legacy usage
document.write("<span>" + input + "</span>");
document.write("<div>" + input + "</div>");

// Dynamic execution (legacy debug code)
eval("console.log('Legacy debug mode')");
