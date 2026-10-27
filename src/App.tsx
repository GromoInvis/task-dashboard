import { useEffect, useState } from 'react'
import { FilterBar } from './components/FilterBar'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { TaskBoard } from './components/TaskBoard'
import { TaskFormModal } from './components/TaskFormModal'
import { useAppDispatch, useAppSelector } from './store/hooks'
import {
  selectFilteredTasks,
  selectHasActiveFilters,
  selectTasksByStatus,
} from './store/selectors/taskSelectors'
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from './store/slices/tasksSlice'
import type { CreateTaskInput, Task } from './types/task'

function App() {
  const dispatch = useAppDispatch()
  const loadStatus = useAppSelector((state) => state.tasks.status)
  const error = useAppSelector((state) => state.tasks.error)
  const grouped = useAppSelector(selectTasksByStatus)
  const filtered = useAppSelector(selectFilteredTasks)
  const hasActiveFilters = useAppSelector(selectHasActiveFilters)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  useEffect(() => {
    void dispatch(fetchTasks())
  }, [dispatch])

  function openCreate() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(task: Task) {
    setEditing(task)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditing(null)
  }

  function handleSubmit(input: CreateTaskInput) {
    if (editing) {
      void dispatch(updateTask({ id: editing.id, input }))
    } else {
      void dispatch(createTask(input))
    }
    closeModal()
  }

  return (
    <div className="min-h-svh bg-slate-100">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Header onCreate={openCreate} />
        <StatsBar />
        <FilterBar />

        {loadStatus === 'loading' ? (
          <p className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
            Loading tasks…
          </p>
        ) : null}

        {loadStatus === 'failed' ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-8 text-center text-sm text-rose-700">
            {error ?? 'Could not load tasks.'}
          </p>
        ) : null}

        {loadStatus === 'succeeded' && filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-slate-500">
            {hasActiveFilters
              ? 'No tasks match the current search and filters.'
              : 'No tasks yet. Create the first one.'}
          </p>
        ) : null}

        {loadStatus === 'succeeded' ? (
          <TaskBoard
            grouped={grouped}
            onEdit={openEdit}
            onStatusChange={(id, status) => {
              void dispatch(updateTask({ id, input: { status } }))
            }}
            onDelete={(id) => {
              void dispatch(deleteTask(id))
            }}
          />
        ) : null}
      </main>

      <TaskFormModal
        open={modalOpen}
        task={editing}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App
