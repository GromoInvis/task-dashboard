export const TASK_STATUSES = ['todo', 'in_progress', 'review', 'done'] as const
export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  tags: string[]
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export interface TaskFilters {
  search: string
  statuses: TaskStatus[]
  priorities: TaskPriority[]
  assignee: string
}

export interface TaskStats {
  total: number
  todo: number
  inProgress: number
  review: number
  done: number
  overdue: number
}

export interface CreateTaskInput {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  tags: string[]
  dueDate: string | null
}

export type UpdateTaskInput = Partial<CreateTaskInput>
