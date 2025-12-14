"use client"

import IssueCard from "./issue-card"

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

interface IssuesListProps {
  issues: Issue[]
}

export default function IssuesList({ issues }: IssuesListProps) {
  if (issues.length === 0) {
    return (
      <div className="rounded-lg border border-border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
        <p className="font-semibold text-green-800 dark:text-green-200">✓ No security issues found!</p>
        <p className="text-sm text-green-700 dark:text-green-300">Your code passed the security analysis</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <h2 className="shrink-0 text-lg font-semibold">Security Issues ({issues.length})</h2>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {issues.map((issue, index) => (
          <IssueCard key={`${issue.ruleId}-${index}`} issue={issue} />
        ))}
      </div>
    </div>
  )
}
