"use client"

import { Button } from "@/components/ui/button"

interface CodeInputProps {
  value: string
  onChange: (value: string) => void
  disabled: boolean
  onAnalyze: () => void
  loading: boolean
  isHero?: boolean
}

export default function CodeInput({ value, onChange, disabled, onAnalyze, loading, isHero }: CodeInputProps) {
  return (
    <div className={`flex flex-col gap-4 ${isHero ? "" : "h-full"}`}>
      <div
        className={`flex-1 overflow-hidden rounded-lg border border-border bg-input transition-all duration-300 ${isHero ? "glow-pulse" : ""}`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste your JavaScript code here..."
          className={`h-full w-full resize-none overflow-y-auto bg-input p-6 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-all duration-200 font-mono ${isHero ? "min-h-80" : ""}`}
        />
      </div>

      <Button
        onClick={onAnalyze}
        disabled={disabled || !value.trim()}
        size="lg"
        className="w-full shrink-0 gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-6 text-base transition-all duration-300"
      >
        {loading ? (
          <>
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Analyzing...
          </>
        ) : (
          "Analyze Code"
        )}
      </Button>
    </div>
  )
}
