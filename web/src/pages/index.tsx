import { FormEvent, useEffect, useState } from 'react';

import { api } from '../services/api'

interface TaskType {
  title: string,
  description: string,
  time: Date,
  durationMinutes: number
}

interface HomeProps {
  tasks: TaskType[]
}

export default function Home(props: HomeProps) {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setTasks(props.tasks)
  }, [])

  const handleTaskSearchSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.get(`/tasks/${search}`)

      setTasks(response.data)
    } catch (error) {
      alert('Falha ao buscar tarefas, tente novamente!')
    }
  }

  return (
    <>
      <div className="">
        <div className="bg-white flex justify-center border px-6 py-6">
          <h1 className="font-semibold text-2xl text-gray-700">Diel Task Manager</h1>
        </div>
        
        <div className="bg-gray-100 flex justify-center py-4 shadow-sm">
          <h1 className="font-medium text-lg text-gray-800">Lista de Tarefas</h1>
        </div>

        <form
          className="flex items-center px-20 pb-6 pt-12"
          onSubmit={handleTaskSearchSubmit}
        >   
            <label htmlFor="simple-search" className="sr-only">Buscar</label>

            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                </div>

                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Buscar tarefas"
                  required
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
            </div>

            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                
                <span className="sr-only">Buscar</span>
            </button>
        </form>

        <div className="grid grid-cols-4 gap-28 items-center py-6 px-20">
          {tasks.map((task: TaskType) => (
            <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{task.title}</h5>

              <p className="mb-3 font-normal text-gray-700">{task.description}</p>

              <p className="mb-6 font-normal text-gray-700">Duração: {task.durationMinutes} minutos</p>

              <div className="flex justify-between text-sm">
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">Editar</button>
              
                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">Remover</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const tasksResponse = await api.get('/tasks')
  
  return {
    props: {
      tasks: tasksResponse.data
    }
  }
}