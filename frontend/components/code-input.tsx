"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Editor from "@monaco-editor/react"
import type { editor } from "monaco-editor"

interface CodeInputProps {
  value: string
  onChange: (value: string) => void
  disabled: boolean
  onAnalyze: () => void
  loading: boolean
  isHero?: boolean
}

export default function CodeInput({ value, onChange, disabled, onAnalyze, loading, isHero }: CodeInputProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
    // Editor'ü sadece okuma moduna almak için disabled durumunu kontrol et
    editor.updateOptions({
      readOnly: disabled,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: "on",
      roundedSelection: false,
      cursorStyle: "line",
      automaticLayout: true,
      tabSize: 2,
      wordWrap: "on",
    })
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ readOnly: disabled })
    }
  }, [disabled])

  return (
    <div className={`flex flex-col gap-4 ${isHero ? "" : "h-full"}`}>
      <div
        className={`flex-1 overflow-hidden rounded-lg border border-border bg-input transition-all duration-300 ${isHero ? "glow-pulse" : ""}`}
      >
        <Editor
          height={isHero ? "320px" : "100%"}
          defaultLanguage="javascript"
          value={value}
          onChange={(val) => onChange(val || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            readOnly: disabled,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            cursorStyle: "line",
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
          loading={
            <div className="flex h-full items-center justify-center bg-input">
              <span className="text-muted-foreground">Loading editor...</span>
            </div>
          }
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
