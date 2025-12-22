/*
  File: analytics-timers.js

  Description:
  Simulates analytics and tracking code. Includes unsafe Function/eval usage
  and string timers to test dynamic execution detection.
*/

// Dynamic execution
eval("console.log('tracking started')");
eval("console.log('user event captured')");

// Function() constructor
const fn = Function("console.log('unsafe Function constructor')");
fn();

// String-based timers
setTimeout("console.log('unsafe timer payload')", 250);
setInterval("console.log('unsafe interval payload')", 500);
