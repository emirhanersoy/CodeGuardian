const express = require('express');
const corsMiddleware = require('./config/corsConfig');

const app = express();
app.use(corsMiddleware);
app.use(express.json());

const { analyzeCode, generateJSONReport } = require('./ruleAnalysis/engine');

//add input validation for security and to make sure the input is in string format before feeding to engine
//make sure the input is not null or undefined
//something else can be added to keep the responses
//add error handling in the next sprint

app.post('/api/analyze', (req, res) => {
  const sourceCode = req.body.sourceCode || '';
  const issues = analyzeCode(sourceCode);
  const report = generateJSONReport(issues);
  res.json(report);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend works!' });
});

app.listen(8080, () => {
  console.log('Backend running on http://localhost:8080');
});

