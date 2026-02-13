import { FaSpinner } from 'react-icons/fa'

const ProcessingSection = ({ uploadProgress, jobId }) => {
  return (
    <div className="text-center p-16 bg-light/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-light/20 w-full max-w-4xl">
      <FaSpinner className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
      <h3 className="text-2xl text-dark mb-2">Processing your video...</h3>
      <p className="text-dark/60 mb-6">This may take a few minutes depending on the video length</p>
      
      {}
      <div className="max-w-md mx-auto mb-4">
        <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-500 relative"
            style={{ width: `${uploadProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <span className="text-sm text-primary font-semibold">{uploadProgress}%</span>
      </div>

      {jobId && (
        <p className="text-sm text-dark/60 bg-primary/10 px-4 py-2 rounded-lg inline-block font-mono">
          Job ID: {jobId}
        </p>
      )}
    </div>
  )
}

export default ProcessingSection
