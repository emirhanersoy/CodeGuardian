import { Card } from "@/components/ui/card"

interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Card className="border-l-4 border-l-destructive bg-red-50 p-4 dark:bg-red-950">
      <p className="text-sm font-semibold text-red-800 dark:text-red-200">Error: {message}</p>
    </Card>
  )
}
