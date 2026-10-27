import type { TaskPriority, TaskStatus } from '../types/task'

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  review: 'Review',
  done: 'Done',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const STATUS_STYLES: Record<TaskStatus, string> = {
  todo: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-sky-100 text-sky-800',
  review: 'bg-amber-100 text-amber-800',
  done: 'bg-emerald-100 text-emerald-800',
}

export const PRIORITY_STYLES: Record<TaskPriority, string> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-rose-100 text-rose-800',
}

export const COLUMN_ACCENT: Record<TaskStatus, string> = {
  todo: 'border-t-slate-400',
  in_progress: 'border-t-sky-500',
  review: 'border-t-amber-500',
  done: 'border-t-emerald-500',
}
