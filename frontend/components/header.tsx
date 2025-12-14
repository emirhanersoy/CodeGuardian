export default function Header() {
  return (
    <header className="border-b border-border bg-gradient-to-b from-card/80 to-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CodeGuardian
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
