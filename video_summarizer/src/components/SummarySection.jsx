import { FaCopy, FaDownload, FaCheckCircle } from 'react-icons/fa'

const SummarySection = ({ summary, copied, copyToClipboard, downloadSummary }) => {
  return (
    <div className="bg-light/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-light/20 w-full max-w-4xl animate-slide-up">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-3xl text-dark font-bold">Video Summary</h2>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-6 py-3 border-none rounded-xl font-semibold cursor-pointer transition-all duration-300 text-sm bg-primary/10 text-primary hover:bg-primary/20 hover:-translate-y-0.5"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            {copied ? <FaCheckCircle className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 border-none rounded-xl font-semibold cursor-pointer transition-all duration-300 text-sm bg-secondary/10 text-secondary hover:bg-secondary/20 hover:-translate-y-0.5"
            onClick={downloadSummary}
            title="Download summary"
          >
            <FaDownload className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <p className="leading-relaxed text-dark whitespace-pre-line">{summary}</p>
      </div>
    </div>
  )
}

export default SummarySection
