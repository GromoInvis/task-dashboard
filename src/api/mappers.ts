import type {
  CreateTaskRequestDto,
  TaskDto,
  UpdateTaskRequestDto,
} from '../types/api'
import type { CreateTaskInput, Task, UpdateTaskInput } from '../types/task'

export function mapTaskDtoToTask(dto: TaskDto): Task {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    status: dto.status,
    priority: dto.priority,
    assignee: dto.assignee,
    tags: dto.tags,
    dueDate: dto.due_date,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  }
}

export function mapCreateInputToDto(
  input: CreateTaskInput,
): CreateTaskRequestDto {
  return {
    title: input.title,
    description: input.description,
    status: input.status,
    priority: input.priority,
    assignee: input.assignee,
    tags: input.tags,
    due_date: input.dueDate,
  }
}

export function mapUpdateInputToDto(
  input: UpdateTaskInput,
): UpdateTaskRequestDto {
  const dto: UpdateTaskRequestDto = {}

  if (input.title !== undefined) dto.title = input.title
  if (input.description !== undefined) dto.description = input.description
  if (input.status !== undefined) dto.status = input.status
  if (input.priority !== undefined) dto.priority = input.priority
  if (input.assignee !== undefined) dto.assignee = input.assignee
  if (input.tags !== undefined) dto.tags = input.tags
  if (input.dueDate !== undefined) dto.due_date = input.dueDate

  return dto
}
