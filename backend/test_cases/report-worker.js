/*
  File: report-worker.js

  Description:
  Simulates a background job that generates reports. Contains ReDoS-prone regex patterns,
  unsafe dynamic execution, and hardcoded secrets for realistic test coverage.
*/

// Hardcoded secret
const apiKey = "REPORTING_API_KEY_SECRET_777";

// ReDoS-prone regex patterns (multiple)
const r1 = /(a+)+$/;
const r2 = /([a-zA-Z]+)*$/;
const r3 = /(\d+)+/;

r1.test("aaaaaaaaaaaaaaaaaaaaaaaa!");
r2.test("bbbbbbbbbbbbbbbbbbbbbbbb!");
r3.test("111111111111111111111!");

// Dynamic execution (bad)
eval("console.log('report generated')");
const gen = Function("console.log('report job running')");
gen();

// Insecure HTTP (sometimes seen in internal tooling)
const endpoint = "http://internal.example.com/report?key=" + apiKey;
