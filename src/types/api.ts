import type { TaskPriority, TaskStatus } from './task'

export interface TaskDto {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  tags: string[]
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface CreateTaskRequestDto {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  tags: string[]
  due_date: string | null
}

export type UpdateTaskRequestDto = Partial<CreateTaskRequestDto>

export interface TaskListResponseDto {
  data: TaskDto[]
}

export interface TaskResponseDto {
  data: TaskDto
}
