import { FormEvent } from "react"

interface TaskFormProps {
  onSubmit(e: FormEvent): any
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="input-title" className="block mb-2 text-sm font-medium text-gray-900">Título</label>

        <input name="title" type="text" id="input-title" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Digite o título..." />
      </div>

      <div className="mb-3">
        <label htmlFor="input-description" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>

        <textarea name="description" id="input-description" rows={4} className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Digite a descrição da tarefa..."></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="input-date" className="block mb-2 text-sm font-medium text-gray-900">Data</label>

        <input name="date" id="input-date" type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Selecionar data" />
      </div>

      <div className="mb-3">
        <label htmlFor="input-duration" className="block mb-2 text-sm font-medium text-gray-900">Duração (minutos)</label>

        <input name="duration" type="number" id="input-duration" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Digite a duração da tarefa em minutos..." />
      </div>

      <button
        type="submit"
        className="text-white my-3 w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
      >
        Continuar
      </button>
    </form>
  )
}