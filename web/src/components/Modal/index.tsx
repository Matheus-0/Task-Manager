import React, { ReactNode, useEffect, useState } from "react"
import ReactDOM from "react-dom"

interface ModalProps {
  children: ReactNode,
  onClose(): any,
  show: boolean,
  title: string
}

const Modal = ({ children, onClose, show, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCloseClick = (e) => {
    e.preventDefault()

    onClose()
  }

  const modalContent = show ? (
    <div className="bg-half-transparent absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white w-96 h-96 rounded-2xl">
        <div className="flex items-center justify-between pl-4 pr-2.5 py-2.5 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={handleCloseClick}
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className="pt-4 px-4">{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    )
  } else {
    return null
  }
}

export default Modal;