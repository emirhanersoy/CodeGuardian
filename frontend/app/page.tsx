"use client"

import { useState } from "react"

interface Issue {
  ruleId: string
  name: string
  line: number
  column: number
  severity: "High" | "Medium"
  description: string
  recommendation: string
  snippet: string
}

interface AnalysisResult {
  analyzedAt: string
  issueCount: number
  issues: Issue[]
}

export default function Home() {
  const [sourceCode, setSourceCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!sourceCode.trim()) {
      setError("Please enter some code to analyze")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("http://localhost:8080/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceCode }),
      })

      if (!response.ok) {
        try {
          const errorData = await response.json()
          throw new Error(errorData.message || errorData.error || `API Error: ${response.statusText}`)
        } catch (parseError) {
          throw new Error(`API Error: ${response.statusText}`)
        }
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze code. Make sure the backend is running on http://localhost:8080",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setSourceCode("")
  }

  return (
    <div>
      <h1>CodeGuardian</h1>
      
      {result && (
        <div>
          <button onClick={handleReset}>New Analysis</button>
        </div>
      )}

      <table border={1} cellPadding="10" cellSpacing="0" width="100%">
        <tr>
          <td width="50%" valign="top">
            <h2>Code Input</h2>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              disabled={loading}
              placeholder="Enter JavaScript code..."
              rows={20}
              cols={50}
            />
            <br />
            <button onClick={handleAnalyze} disabled={loading || !sourceCode.trim()}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </td>
          <td width="50%" valign="top">
            <h2>Results</h2>
            
            {error && (
              <div>
                <strong>Error:</strong> {error}
              </div>
            )}

            {result && (
              <div>
                <h3>Summary</h3>
                <p>Total Issues: {result.issueCount}</p>
                <p>High: {result.issues.filter((i) => i.severity === "High").length}</p>
                <p>Medium: {result.issues.filter((i) => i.severity === "Medium").length}</p>
                <p>Time: {new Date(result.analyzedAt).toLocaleString()}</p>

                {result.issues.length === 0 ? (
                  <p>No issues found.</p>
                ) : (
                  <div>
                    <h3>Issues</h3>
                    {result.issues.map((issue, index) => (
                      <div key={index}>
                        <p><strong>{issue.severity}</strong> - {issue.ruleId}</p>
                        <p><strong>{issue.name}</strong></p>
                        <p>Line {issue.line}, Column {issue.column}</p>
                        <p>{issue.description}</p>
                        <p><strong>Code:</strong></p>
                        <pre>{issue.snippet}</pre>
                        <p><strong>Recommendation:</strong> {issue.recommendation}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!result && !error && (
              <p>Enter code and click Analyze to see results.</p>
            )}
          </td>
        </tr>
      </table>
    </div>
  )
}
