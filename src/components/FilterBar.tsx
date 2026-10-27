import { PRIORITY_LABELS, STATUS_LABELS } from '../lib/labels'
import {
  resetFilters,
  setAssignee,
  setSearch,
  togglePriority,
  toggleStatus,
} from '../store/slices/filtersSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectAssignees,
  selectHasActiveFilters,
} from '../store/selectors/taskSelectors'
import { TASK_PRIORITIES, TASK_STATUSES } from '../types/task'

export function FilterBar() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filters)
  const assignees = useAppSelector(selectAssignees)
  const hasActiveFilters = useAppSelector(selectHasActiveFilters)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Search
          </span>
          <input
            type="search"
            value={filters.search}
            onChange={(event) => dispatch(setSearch(event.target.value))}
            placeholder="Title, description, or tag"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-2"
          />
        </label>

        <label className="flex w-full flex-col gap-1.5 lg:w-48">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Assignee
          </span>
          <select
            value={filters.assignee}
            onChange={(event) => dispatch(setAssignee(event.target.value))}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-2"
          >
            <option value="">Everyone</option>
            {assignees.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => dispatch(resetFilters())}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Status
          </span>
          {TASK_STATUSES.map((status) => {
            const active = filters.statuses.includes(status)
            return (
              <button
                key={status}
                type="button"
                onClick={() => dispatch(toggleStatus(status))}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Priority
          </span>
          {TASK_PRIORITIES.map((priority) => {
            const active = filters.priorities.includes(priority)
            return (
              <button
                key={priority}
                type="button"
                onClick={() => dispatch(togglePriority(priority))}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {PRIORITY_LABELS[priority]}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
