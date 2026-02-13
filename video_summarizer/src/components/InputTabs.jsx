import { FaYoutube, FaFileVideo } from 'react-icons/fa'

const InputTabs = ({ inputMethod, setInputMethod, clearForm }) => {
  return (
    <div className="flex gap-6 mb-12 justify-center">
      <button
        className={`flex items-center gap-2 px-8 py-4 border-2 rounded-2xl font-semibold cursor-pointer transition-all duration-300 text-base ${
          inputMethod === 'youtube'
            ? 'bg-gradient-to-r from-primary via-accent to-secondary text-white border-primary shadow-lg shadow-primary/30'
            : 'bg-primary/10 text-primary border-transparent hover:bg-primary/20 hover:-translate-y-0.5'
        }`}
        onClick={() => {
          setInputMethod('youtube')
          clearForm()
        }}
      >
        <FaYoutube className="w-6 h-6" />
        YouTube URL
      </button>
      <button
        className={`flex items-center gap-2 px-8 py-4 border-2 rounded-2xl font-semibold cursor-pointer transition-all duration-300 text-base ${
          inputMethod === 'file'
            ? 'bg-gradient-to-r from-primary via-accent to-secondary text-white border-primary shadow-lg shadow-primary/30'
            : 'bg-primary/10 text-primary border-transparent hover:bg-primary/20 hover:-translate-y-0.5'
        }`}
        onClick={() => {
          setInputMethod('file')
          clearForm()
        }}
      >
        <FaFileVideo className="w-6 h-6" />
        Upload Video
      </button>
    </div>
  )
}

export default InputTabs
