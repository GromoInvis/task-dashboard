import type {
  CreateTaskRequestDto,
  TaskDto,
  TaskListResponseDto,
  TaskResponseDto,
  UpdateTaskRequestDto,
} from '../types/api'
import { SEED_TASKS } from './seed'

const STORAGE_KEY = 'task-dashboard.tasks.v1'

function delay(ms = 180): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function readStore(): TaskDto[] {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TASKS))
    return [...SEED_TASKS]
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return [...SEED_TASKS]
    return parsed as TaskDto[]
  } catch {
    return [...SEED_TASKS]
  }
}

function writeStore(tasks: TaskDto[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function nextId(): string {
  return `tsk_${Date.now().toString(36)}`
}

export const tasksClient = {
  async list(): Promise<TaskListResponseDto> {
    await delay()
    return { data: readStore() }
  },

  async create(payload: CreateTaskRequestDto): Promise<TaskResponseDto> {
    await delay()
    const now = new Date().toISOString()
    const task: TaskDto = {
      id: nextId(),
      title: payload.title,
      description: payload.description,
      status: payload.status,
      priority: payload.priority,
      assignee: payload.assignee,
      tags: payload.tags,
      due_date: payload.due_date,
      created_at: now,
      updated_at: now,
    }
    const tasks = readStore()
    writeStore([task, ...tasks])
    return { data: task }
  },

  async update(
    id: string,
    payload: UpdateTaskRequestDto,
  ): Promise<TaskResponseDto> {
    await delay()
    const tasks = readStore()
    const index = tasks.findIndex((task) => task.id === id)
    if (index === -1) {
      throw new Error(`Task ${id} was not found`)
    }

    const current = tasks[index]
    const updated: TaskDto = {
      ...current,
      ...payload,
      tags: payload.tags ?? current.tags,
      updated_at: new Date().toISOString(),
    }
    tasks[index] = updated
    writeStore(tasks)
    return { data: updated }
  },

  async remove(id: string): Promise<void> {
    await delay()
    writeStore(readStore().filter((task) => task.id !== id))
  },
}
