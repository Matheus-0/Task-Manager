interface TaskCardProps {
  onEditClick(): any,
  onRemoveClick(): any,
  taskDescription: string,
  taskDurationMinutes: number,
  taskTitle: string
}

export default function TaskCard({ onEditClick, onRemoveClick, taskDescription, taskDurationMinutes, taskTitle }: TaskCardProps) {
  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{taskTitle}</h5>

      <p className="mb-3 font-normal text-gray-700">{taskDescription}</p>

      <p className="mb-6 font-normal text-gray-700">Duração: {taskDurationMinutes} minutos</p>

      <div className="flex justify-between text-sm">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
          onClick={onEditClick}
        >
          Editar
        </button>
      
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={onRemoveClick}
        >
          Remover
        </button>
      </div>
    </div>
  )
}