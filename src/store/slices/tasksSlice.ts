import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import {
  mapCreateInputToDto,
  mapTaskDtoToTask,
  mapUpdateInputToDto,
} from '../../api/mappers'
import { tasksClient } from '../../api/tasksClient'
import type { CreateTaskInput, Task, UpdateTaskInput } from '../../types/task'

interface TasksState {
  items: Task[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TasksState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const response = await tasksClient.list()
  return response.data.map(mapTaskDtoToTask)
})

export const createTask = createAsyncThunk(
  'tasks/create',
  async (input: CreateTaskInput) => {
    const response = await tasksClient.create(mapCreateInputToDto(input))
    return mapTaskDtoToTask(response.data)
  },
)

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, input }: { id: string; input: UpdateTaskInput }) => {
    const response = await tasksClient.update(id, mapUpdateInputToDto(input))
    return mapTaskDtoToTask(response.data)
  },
)

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await tasksClient.remove(id)
  return id
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load tasks'
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.items.findIndex((task) => task.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((task) => task.id !== action.payload)
      })
  },
})

export default tasksSlice.reducer
