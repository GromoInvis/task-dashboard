import { PRIORITY_LABELS, PRIORITY_STYLES } from '../lib/labels'
import type { Task, TaskStatus } from '../types/task'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const NEXT_STATUS: Record<TaskStatus, TaskStatus | null> = {
  todo: 'in_progress',
  in_progress: 'review',
  review: 'done',
  done: null,
}

export function TaskCard({
  task,
  onEdit,
  onStatusChange,
  onDelete,
}: TaskCardProps) {
  const nextStatus = NEXT_STATUS[task.status]
  const overdue =
    task.dueDate !== null &&
    task.status !== 'done' &&
    new Date(`${task.dueDate}T23:59:59`) < new Date()

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${PRIORITY_STYLES[task.priority]}`}
        >
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
        {task.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>{task.assignee}</span>
        <span className={overdue ? 'font-medium text-rose-600' : ''}>
          {task.dueDate ?? 'No due date'}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
        >
          Edit
        </button>
        {nextStatus ? (
          <button
            type="button"
            onClick={() => onStatusChange(task.id, nextStatus)}
            className="rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700 hover:bg-indigo-100"
          >
            Advance
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="ml-auto rounded-md px-2 py-1 text-[11px] font-medium text-rose-600 hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </article>
  )
}
