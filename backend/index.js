const express = require('express');
const corsMiddleware = require('./config/corsConfig');

const app = express();
app.use(corsMiddleware);
app.use(express.json());

// Payload size limit (DoS protection)
app.use(express.json({ limit: '100kb' }));

const { analyzeCode, generateJSONReport } = require('./ruleAnalysis/engine');
const { errorHandler } = require('./config/errorHandler');

function analyzeSourceCode(sourceCode) {
  const issues = analyzeCode(sourceCode);
  return generateJSONReport(issues);
}

app.post('/api/analyze', (req, res, next) => {
  try
  {
    const sourceCode = req.body.sourceCode;

    if (!sourceCode || typeof sourceCode !== "string") {
      return res.status(400).json({ 
        error: "SourceCode must be a non-empty string" 
      });
    }

    // Length check
    if (sourceCode.length > 100000) {
      const error = new Error('SourceCode exceeds size limit');
      error.statusCode = 413;
      throw error;
    }

    const report = analyzeSourceCode(sourceCode);
    res.status(200).json(report);
} 
catch (error) {
  next(error);
}
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend works!' });
});


app.listen(8080, () => {
  console.log('Backend running on http://localhost:8080');
});

app.use(errorHandler);