import { COLUMN_ACCENT, STATUS_LABELS } from '../lib/labels'
import type { Task, TaskStatus } from '../types/task'
import { TaskCard } from './TaskCard'

interface TaskColumnProps {
  status: TaskStatus
  tasks: Task[]
  onEdit: (task: Task) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

export function TaskColumn({
  status,
  tasks,
  onEdit,
  onStatusChange,
  onDelete,
}: TaskColumnProps) {
  return (
    <section
      className={`flex min-h-64 flex-col rounded-2xl border border-slate-200 border-t-4 bg-slate-50/80 ${COLUMN_ACCENT[status]}`}
    >
      <header className="flex items-center justify-between px-3 py-3">
        <h2 className="text-sm font-semibold text-slate-800">
          {STATUS_LABELS[status]}
        </h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
          {tasks.length}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-3 px-3 pb-3">
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">
            No tasks in this column
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  )
}
