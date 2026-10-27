import { useAppSelector } from '../store/hooks'
import { selectTaskStats } from '../store/selectors/taskSelectors'

interface StatCardProps {
  label: string
  value: number
  tone?: 'default' | 'alert'
}

function StatCard({ label, value, tone = 'default' }: StatCardProps) {
  const valueClass =
    tone === 'alert' && value > 0 ? 'text-rose-600' : 'text-slate-900'

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`mt-1 text-2xl font-semibold ${valueClass}`}>{value}</p>
    </div>
  )
}

export function StatsBar() {
  const stats = useAppSelector(selectTaskStats)

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <StatCard label="Total" value={stats.total} />
      <StatCard label="To do" value={stats.todo} />
      <StatCard label="In progress" value={stats.inProgress} />
      <StatCard label="Review" value={stats.review} />
      <StatCard label="Done" value={stats.done} />
      <StatCard label="Overdue" value={stats.overdue} tone="alert" />
    </section>
  )
}
