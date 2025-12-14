import { Card } from "@/components/ui/card"

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

interface IssueCardProps {
  issue: Issue
}

export default function IssueCard({ issue }: IssueCardProps) {
  const isHighSeverity = issue.severity === "High"
  const severityColor = isHighSeverity
    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"

  return (
    <Card
      className="border-l-4 bg-card p-4"
      style={{
        borderLeftColor: isHighSeverity ? "rgb(239, 68, 68)" : "rgb(249, 115, 22)",
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${severityColor}`}>
                {issue.severity}
              </span>
              <span className="text-sm font-mono text-muted-foreground">{issue.ruleId}</span>
            </div>
            <h3 className="mt-1 text-base font-semibold">{issue.name}</h3>
          </div>
          <span className="text-xs text-muted-foreground">
            Line {issue.line}, Column {issue.column}
          </span>
        </div>

        <p className="text-sm text-foreground">{issue.description}</p>

        <div className="rounded bg-input p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Code snippet:</p>
          <pre className="overflow-x-auto text-xs font-mono text-foreground">{issue.snippet}</pre>
        </div>

        <div className="rounded bg-secondary p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-1">Recommendation:</p>
          <p className="text-sm text-foreground">{issue.recommendation}</p>
        </div>
      </div>
    </Card>
  )
}
