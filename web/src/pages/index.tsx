export default function Home() {
  return (
    <>
      <div className="bg-gray-200 h-screen">
        <div className="bg-white flex justify-center border px-6 py-6">
          <h1 className="font-semibold text-2xl text-gray-700">Diel Task Manager</h1>
        </div>
        
        <div className="bg-gray-100 flex justify-center py-4 shadow-sm">
          <h1 className="font-medium text-lg text-gray-800">Lista de Tarefas</h1>
        </div>

        <form className="flex items-center px-20 py-6">   
            <label htmlFor="simple-search" className="sr-only">Buscar</label>

            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                </div>

                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Buscar tarefas" required />
            </div>

            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                
                <span className="sr-only">Buscar</span>
            </button>
        </form>
      </div>
    </>
  )
}
