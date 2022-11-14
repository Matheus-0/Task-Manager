interface TaskFormProps {
  onSubmit(): any
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label htmlFor="input-title" className="block mb-2 text-sm font-medium text-gray-900">Título</label>

        <input type="text" id="input-title" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Digite o título..." />
      </div>

      <div className="mb-2">
        <label htmlFor="input-description" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>

        <textarea id="input-description" rows={4} className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Digite a descrição da tarefa..."></textarea>
      </div>

      <div className="mb-2">
        <label htmlFor="input-date" className="block mb-2 text-sm font-medium text-gray-900">Data</label>

        <input id="input-date" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Selecionar data" />
      </div>

      <div className="mb-2">
        <label htmlFor="input-duration" className="block mb-2 text-sm font-medium text-gray-900">Duração (minutos)</label>

        <input type="text" id="input-duration" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Digite a duração da tarefa em minutos..." />
      </div>
    </form>
  )
}