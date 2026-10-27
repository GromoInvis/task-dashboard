import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TaskFilters, TaskPriority, TaskStatus } from '../../types/task'

const initialState: TaskFilters = {
  search: '',
  statuses: [],
  priorities: [],
  assignee: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    toggleStatus(state, action: PayloadAction<TaskStatus>) {
      const next = action.payload
      if (state.statuses.includes(next)) {
        state.statuses = state.statuses.filter((status) => status !== next)
      } else {
        state.statuses.push(next)
      }
    },
    togglePriority(state, action: PayloadAction<TaskPriority>) {
      const next = action.payload
      if (state.priorities.includes(next)) {
        state.priorities = state.priorities.filter((priority) => priority !== next)
      } else {
        state.priorities.push(next)
      }
    },
    setAssignee(state, action: PayloadAction<string>) {
      state.assignee = action.payload
    },
    resetFilters() {
      return initialState
    },
  },
})

export const {
  setSearch,
  toggleStatus,
  togglePriority,
  setAssignee,
  resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer
