interface HeaderProps {
  onCreate: () => void
}

export function Header({ onCreate }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
          Task Dashboard
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Workboard
        </h1>
        <p className="mt-1 max-w-xl text-sm text-slate-500">
          Filter, search, and track status across the team board.
        </p>
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
      >
        New task
      </button>
    </header>
  )
}
