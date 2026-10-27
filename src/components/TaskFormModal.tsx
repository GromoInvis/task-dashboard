import { useEffect, useState, type FormEvent } from 'react'
import { PRIORITY_LABELS, STATUS_LABELS } from '../lib/labels'
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type CreateTaskInput,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '../types/task'

interface TaskFormModalProps {
  open: boolean
  task: Task | null
  onClose: () => void
  onSubmit: (input: CreateTaskInput) => void
}

interface FormState {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  tags: string
  dueDate: string
}

const EMPTY_FORM: FormState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assignee: '',
  tags: '',
  dueDate: '',
}

function taskToForm(task: Task): FormState {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assignee: task.assignee,
    tags: task.tags.join(', '),
    dueDate: task.dueDate ?? '',
  }
}

export function TaskFormModal({
  open,
  task,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  useEffect(() => {
    if (!open) return
    setForm(task ? taskToForm(task) : EMPTY_FORM)
  }, [open, task])

  if (!open) return null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = form.title.trim()
    const assignee = form.assignee.trim()
    if (!title || !assignee) return

    onSubmit({
      title,
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      assignee,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      dueDate: form.dueDate.length > 0 ? form.dueDate : null,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-slate-900">
          {task ? 'Edit task' : 'New task'}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs font-medium text-slate-500">Title</span>
            <input
              required
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs font-medium text-slate-500">Description</span>
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  status: event.target.value as TaskStatus,
                }))
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            >
              {TASK_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">Priority</span>
            <select
              value={form.priority}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  priority: event.target.value as TaskPriority,
                }))
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            >
              {TASK_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {PRIORITY_LABELS[priority]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">Assignee</span>
            <input
              required
              value={form.assignee}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  assignee: event.target.value,
                }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">Due date</span>
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  dueDate: event.target.value,
                }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs font-medium text-slate-500">
              Tags (comma separated)
            </span>
            <input
              value={form.tags}
              onChange={(event) =>
                setForm((current) => ({ ...current, tags: event.target.value }))
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
            />
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            {task ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  )
}
