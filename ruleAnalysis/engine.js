import { rules } from "./rules.js";

export function analyzeCode(source) {
  const lines = source.split("\n");
  const issues = [];

  lines.forEach((lineText, lineIndex) => {
    rules.forEach((rule) => {
      const match = rule.regex.exec(lineText);

      if (match) {
        issues.push({
          ruleId: rule.id,
          name: rule.name,
          line: lineIndex + 1,
          column: match.index + 1,
          severity: rule.severity,
          description: rule.description,
          recommendation: rule.recommendation,
          snippet: lineText.trim(),
        });
      }
    });
  });

  return issues;
}

// Final Json format to use in backend
export function generateJSONReport(issues) {
  return {
    analyzedAt: new Date().toISOString(),
    issueCount: issues.length,
    issues: issues,
  };
}

// Example Usage
if (process.argv.includes("--demo")) {
  const demoCode = `
    const password = "123456789";
    eval("console.log('test')");
    element.innerHTML = userInput;
  `;

  const result = analyzeCode(demoCode);
  console.log(JSON.stringify(generateJSONReport(result), null, 2));
}
