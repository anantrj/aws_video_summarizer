import { FaLink, FaPlay, FaSpinner } from 'react-icons/fa'

const YouTubeInput = ({ youtubeUrl, setYoutubeUrl, handleSubmit, isProcessing, isFormValid }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative flex items-center">
        <FaLink className="absolute left-4 text-primary w-6 h-6 z-10" />
        <input
          type="url"
          placeholder="Paste YouTube URL here..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-primary/20 rounded-2xl text-base font-medium text-dark bg-light transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10 focus:bg-light focus:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
        />
      </div>
      <button
        className="flex items-center justify-center gap-2 w-full py-4 px-8 bg-gradient-to-r from-primary via-accent to-secondary text-white border-none rounded-2xl text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        onClick={handleSubmit}
        disabled={!isFormValid() || isProcessing}
      >
        {isProcessing ? (
          <>
            <FaSpinner className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <FaPlay className="w-5 h-5" />
            Generate Summary
          </>
        )}
      </button>
    </div>
  )
}

export default YouTubeInput
