import { Card } from "@/components/ui/card"

interface ResultsSummaryProps {
  totalIssues: number
  highSeverity: number
  mediumSeverity: number
  analyzedAt: string
}

export default function ResultsSummary({ totalIssues, highSeverity, mediumSeverity, analyzedAt }: ResultsSummaryProps) {
  const date = new Date(analyzedAt)
  const formattedTime = date.toLocaleTimeString()

  return (
    <Card className="bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">Analysis Summary</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-secondary p-4">
          <p className="text-xs text-muted-foreground">Total Issues</p>
          <p className="text-2xl font-bold">{totalIssues}</p>
        </div>

        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
          <p className="text-xs text-red-600 dark:text-red-400">High Severity</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{highSeverity}</p>
        </div>

        <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950">
          <p className="text-xs text-orange-600 dark:text-orange-400">Medium Severity</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{mediumSeverity}</p>
        </div>

        <div className="rounded-lg bg-secondary p-4">
          <p className="text-xs text-muted-foreground">Analyzed At</p>
          <p className="text-sm font-mono font-semibold">{formattedTime}</p>
        </div>
      </div>
    </Card>
  )
}
