"use client"

import { useState } from "react"
import Header from "@/components/header"
import CodeInput from "@/components/code-input"
import ResultsSummary from "@/components/results-summary"
import IssuesList from "@/components/issues-list"
import ErrorMessage from "@/components/error-message"
import { Button } from "@/components/ui/button"

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
        // Try to parse error response from backend
        try {
          const errorData = await response.json()
          throw new Error(errorData.message || errorData.error || `API Error: ${response.statusText}`)
        } catch (parseError) {
          // If error response is not JSON, use status text
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

  const highSeverityCount = result?.issues.filter((i) => i.severity === "High").length || 0
  const mediumSeverityCount = result?.issues.filter((i) => i.severity === "Medium").length || 0

  const handleReset = () => {
    setResult(null)
    setError(null)
    setSourceCode("")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section with Centered Input */}
      {!result && !error && (
        <div className="flex min-h-[calc(100vh-180px)] flex-col items-center justify-center px-4 py-12">
          <div className="float-up w-full max-w-2xl space-y-6">
            {/* Title */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl sm:text-5xl font-bold text-balance leading-tight">
                Analyze Your Code
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  for Security Threats
                </span>
              </h2>
              <p className="text-lg text-muted-foreground text-balance">
                Paste your JavaScript code below and let CodeGuardian detect vulnerabilities instantly
              </p>
            </div>

            {/* Large Code Input */}
            <CodeInput
              value={sourceCode}
              onChange={setSourceCode}
              disabled={loading}
              onAnalyze={handleAnalyze}
              loading={loading}
              isHero
            />
          </div>
        </div>
      )}

      {/* Results Section */}
      {(result || error) && (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back to Home Button */}
          <div className="mb-6 flex justify-start">
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-2 border-primary/20 bg-background/50 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              New Analysis
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Code Input Section */}
            <div className="flex flex-col gap-4 lg:h-[calc(100vh-200px)]">
              <CodeInput
                value={sourceCode}
                onChange={setSourceCode}
                disabled={loading}
                onAnalyze={handleAnalyze}
                loading={loading}
              />
            </div>

            {/* Results Section */}
            <div className="flex flex-col gap-4 overflow-hidden lg:h-[calc(100vh-200px)]">
              {error && <ErrorMessage message={error} />}

              {result && (
                <>
                  <div className="shrink-0">
                    <ResultsSummary
                      totalIssues={result.issueCount}
                      highSeverity={highSeverityCount}
                      mediumSeverity={mediumSeverityCount}
                      analyzedAt={result.analyzedAt}
                    />
                  </div>

                  <div className="flex-1 min-h-0">
                    <IssuesList issues={result.issues} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
