import { TASK_STATUSES, type Task, type TaskStatus } from '../types/task'
import { TaskColumn } from './TaskColumn'

interface TaskBoardProps {
  grouped: Record<TaskStatus, Task[]>
  onEdit: (task: Task) => void
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

export function TaskBoard({
  grouped,
  onEdit,
  onStatusChange,
  onDelete,
}: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {TASK_STATUSES.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={grouped[status]}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
