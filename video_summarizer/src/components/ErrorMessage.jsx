import { FaExclamationCircle } from 'react-icons/fa'

const ErrorMessage = ({ error }) => {
  if (!error) return null

  return (
    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-300 rounded-xl text-red-600 font-medium mt-4 animate-slide-down">
      <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
      <span>{error}</span>
    </div>
  )
}

export default ErrorMessage
