import { createSelector } from '@reduxjs/toolkit'
import type { Task, TaskStats, TaskStatus } from '../../types/task'
import type { RootState } from '../index'

const selectTaskItems = (state: RootState) => state.tasks.items
const selectFilters = (state: RootState) => state.filters

function isOverdue(task: Task, now: Date): boolean {
  if (!task.dueDate || task.status === 'done') return false
  return new Date(`${task.dueDate}T23:59:59`) < now
}

export const selectAssignees = createSelector([selectTaskItems], (tasks) => {
  return [...new Set(tasks.map((task) => task.assignee))].sort()
})

export const selectFilteredTasks = createSelector(
  [selectTaskItems, selectFilters],
  (tasks, filters) => {
    const query = filters.search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch =
        query.length === 0 ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.tags.some((tag) => tag.toLowerCase().includes(query))

      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(task.status)

      const matchesPriority =
        filters.priorities.length === 0 ||
        filters.priorities.includes(task.priority)

      const matchesAssignee =
        filters.assignee.length === 0 || task.assignee === filters.assignee

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
    })
  },
)

export const selectTasksByStatus = createSelector(
  [selectFilteredTasks],
  (tasks) => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      review: [],
      done: [],
    }

    for (const task of tasks) {
      grouped[task.status].push(task)
    }

    return grouped
  },
)

export const selectTaskStats = createSelector([selectTaskItems], (tasks): TaskStats => {
  const now = new Date()
  return {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === 'todo').length,
    inProgress: tasks.filter((task) => task.status === 'in_progress').length,
    review: tasks.filter((task) => task.status === 'review').length,
    done: tasks.filter((task) => task.status === 'done').length,
    overdue: tasks.filter((task) => isOverdue(task, now)).length,
  }
})

export const selectHasActiveFilters = createSelector([selectFilters], (filters) => {
  return (
    filters.search.trim().length > 0 ||
    filters.statuses.length > 0 ||
    filters.priorities.length > 0 ||
    filters.assignee.length > 0
  )
})
