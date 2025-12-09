export const rules = [
  {
    id: "JS-EVAL-001",
    name: "Use of eval()",
    severity: "High",
    regex: /\beval\s*\(/,
    description: "Using eval() can execute arbitrary code and lead to code injection.",
    recommendation: "Avoid eval(). Use JSON.parse or safer alternatives.",
  },

  {
    id: "JS-INNERHTML-002",
    name: "Direct innerHTML assignment",
    severity: "High",
    regex: /\.innerHTML\s*=/,
    description: "innerHTML assignment can introduce DOM-based XSS vulnerabilities.",
    recommendation: "Use textContent instead or sanitize the HTML before assigning.",
  },

  {
    id: "JS-DOCWRITE-003",
    name: "Use of document.write",
    severity: "Medium",
    regex: /document\.write(ln)?\s*\(/,
    description: "document.write is unsafe and can be exploited for XSS.",
    recommendation: "Use modern DOM APIs or template rendering.",
  },

  {
    id: "JS-SECRET-004",
    name: "Hardcoded secret detected",
    severity: "High",
    regex: /\b(pass(word)?|token|secret|apiKey)\b\s*[:=]\s*["'`].{6,}["'`]/i,
    description: "Credentials inside source code create a major security risk.",
    recommendation: "Store secrets in environment variables or secret managers.",
  },

  {
    id: "JS-SQLI-005",
    name: "Possible SQL Injection via string concatenation",
    severity: "High",
    regex: /(SELECT|INSERT|UPDATE|DELETE)[\s\S]*["'`]\s*\+\s*\w+/i,
    description: "SQL queries built with string concatenation are vulnerable to injection.",
    recommendation: "Use prepared statements or parameterized queries.",
  },

  {
    id: "JS-CMDI-006",
    name: "Command injection risk via child_process",
    severity: "High",
    regex: /child_process\.(exec|execSync|spawn)\s*\(\s*["'`][^"'`]*\+\s*\w+/,
    description: "Concatenating user input into shell commands enables command injection.",
    recommendation: "Avoid command construction via concatenation. Use arguments safely.",
  },

  {
    id: "JS-WEAKCRYPTO-007",
    name: "Weak cryptographic hashing algorithm (MD5/SHA1)",
    severity: "High",
    regex: /\bcrypto\.createHash\s*\(\s*["'](md5|sha1)["']\s*\)/i,
    description: "MD5 and SHA-1 are considered cryptographically broken and unsafe.",
    recommendation: "Use SHA-256 or stronger hashing algorithms. For passwords, use bcrypt or Argon2.",
  },

  {
    id: "JS-INSECURECORS-008",
    name: "Insecure CORS configuration (Wildcard Origin)",
    severity: "High",
    regex: /(origin|Access-Control-Allow-Origin)\s*[:=]\s*["']\*["']/i,
    description: "Wildcard CORS allows any domain to access your API, creating a major security risk.",
    recommendation: "Replace '*' with a strict whitelist of trusted origins.",
  },

  {
    id: "JS-REDOS-009",
    name: "Potential ReDoS (Catastrophic Backtracking Regex)",
    severity: "Medium",
    regex: /\((?:[^()]*\+){2,}[^()]*\)/,
    description: "Nested quantifiers in regex can cause catastrophic backtracking and freeze the application.",
    recommendation: "Avoid nested quantifiers. Simplify the regex or use non-backtracking techniques.",
  }
];
