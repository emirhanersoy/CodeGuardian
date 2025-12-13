const rules = require("./rules.js");
//please use CommonJS module syntax to be compatible with the rest of the backend

function analyzeCode(source) {
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
function generateJSONReport(issues) {
  return {
    analyzedAt: new Date().toISOString(),
    issueCount: issues.length,
    issues: issues,
  };
}

module.exports = { analyzeCode, generateJSONReport};
