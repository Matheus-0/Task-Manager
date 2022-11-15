import { FormEvent, useEffect, useRef, useState } from 'react'

import Modal from '../components/Modal'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

import { api } from '../services/api'

interface TaskType {
  id: string,
  title: string,
  description: string,
  time: string,
  durationMinutes: number
}

interface HomeProps {
  tasks: TaskType[]
}

export default function Home(props: HomeProps) {
  const toBeEditedTask = useRef({});

  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [tasks, setTasks] = useState<TaskType[]>([])

  useEffect(() => {
    setTasks(props.tasks)
  }, [])

  const handleTaskCreate = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.post('/tasks', {
        "title": e.target.title.value,
        "description": e.target.description.value,
        "time": e.target.date.value,
        "durationMinutes": parseInt(e.target.duration.value)
      })

      alert(`Tarefa "${e.target.title.value}" cadastrada com sucesso!`)

      window.location.reload()
    } catch (error) {
      alert('Falha ao cadastrar tarefa, tente novamente!')
    }
  }

  const handleTaskCreateClose = () => {
    setShowCreateModal(false)
  }

  const handleTaskCreateOpen = () => {
    setShowCreateModal(true)
  }

  const handleTaskEdit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.put(`/tasks/${toBeEditedTask.current.id}`, {
        "title": e.target.title.value,
        "description": e.target.description.value,
        "time": e.target.date.value,
        "durationMinutes": parseInt(e.target.duration.value)
      })

      alert(`Tarefa "${e.target.title.value}" editada com sucesso!`)

      window.location.reload()
    } catch (error) {
      alert('Falha ao editar tarefa, tente novamente!')
    }
  }

  const handleTaskEditClose = () => {
    setShowEditModal(false)

    toBeEditedTask.current = {}
  }

  const handleTaskEditOpen = (task: TaskType) => {
    setShowEditModal(true)

    toBeEditedTask.current = task
  }

  const handleTaskRemove = async (task: TaskType) => {
    if (confirm(`Tem certeza que deseja apagar a tarefa "${task.title}"?`)) {
      try {
        const response = await api.delete(`/tasks/${task.id}`)

        alert(`Tarefa "${task.title}" removida com sucesso!`)

        window.location.reload()
      } catch (error) {
        alert('Falha ao remover tarefa, tente novamente!')
      }
    }
  }

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
      <Modal
        onClose={handleTaskEditClose}
        show={showEditModal}
        title={"Edição de tarefa"}
      >
        <TaskForm
          onSubmit={handleTaskEdit}
        />
      </Modal>

      <Modal
        onClose={handleTaskCreateClose}
        show={showCreateModal}
        title={"Criação de tarefa"}
      >
        <TaskForm
          onSubmit={handleTaskCreate}
        />
      </Modal>
      
      <div className="">
        <div className="bg-white flex justify-center border px-6 py-6">
          <h1 className="font-semibold text-2xl text-gray-700">Diel Task Manager</h1>
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
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
            </div>

            <button type="submit" className="flex px-4 py-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                
                Buscar
            </button>
        </form>

        <div className="flex justify-end pr-20 py-4">
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            onClick={handleTaskCreateOpen}
          >
            Cadastrar nova tarefa
          </button>
        </div>

        <div className="grid grid-cols-4 gap-x-24 gap-y-12 items-center pb-12 pt-6 px-20">
          {tasks.map((task: TaskType) => (
            <TaskCard
              onEditClick={() => handleTaskEditOpen(task)}
              onRemoveClick={() => handleTaskRemove(task)}
              taskDescription={task.description}
              taskDurationMinutes={task.durationMinutes}
              taskTime={new Date(task.time)}
              taskTitle={task.title}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const tasksResponse = await api.get('/tasks')

  tasksResponse.data.sort((a: TaskType, b: TaskType) => Date.parse(a.time) - Date.parse(b.time))
  
  return {
    props: {
      tasks: tasksResponse.data
    }
  }
}