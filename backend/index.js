const express = require('express');
const corsMiddleware = require('./config/corsConfig');

const app = express();
app.use(corsMiddleware);
app.use(express.json());

const { analyzeCode, generateJSONReport } = require('./ruleAnalysis/engine');

//something else can be added to keep the responses
//improve error handling in the next sprint

function analyzeSourceCode(sourceCode) {
  const issues = analyzeCode(sourceCode);
  return generateJSONReport(issues);
}

app.post('/api/analyze', (req, res) => {
  const sourceCode = req.body.sourceCode;

  if (!sourceCode || typeof sourceCode !== "string") {
    return res.status(400).json({ 
      error: "SourceCode must be a non-empty string" 
    });
  }

  const report = analyzeSourceCode(sourceCode);
  res.json(report);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend works!' });
});

app.listen(8080, () => {
  console.log('Backend running on http://localhost:8080');
});

