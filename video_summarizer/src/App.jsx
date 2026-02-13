import { useState } from 'react'
import Header from './components/Header'
import InputTabs from './components/InputTabs'
import FileInput from './components/FileInput'
import ErrorMessage from './components/ErrorMessage'
import SummarySection from './components/SummarySection'

function App() {
  const [inputMethod, setInputMethod] = useState('file')
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [summary, setSummary] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleSubmit = async () => {
    // This is handled by FileInput component for file uploads
    // YouTube functionality can be added here in the future
    setError('YouTube functionality coming soon. Please use file upload.')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadSummary = () => {
    const element = document.createElement('a')
    const file = new Blob([summary], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'video-summary.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const isFormValid = () => {
    if (inputMethod === 'youtube') {
      return false // YouTube coming soon
    } else if (inputMethod === 'file') {
      return selectedFile !== null
    }
    return false
  }

  const clearForm = () => {
    setSelectedFile(null)
    setSummary('')
    setError('')
    setUploadProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-accent to-secondary flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <Header />
        
        <main className="flex-1 flex flex-col items-center gap-12">
          <div className="bg-light/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-light/20 w-full max-w-4xl">
            <InputTabs 
              inputMethod={inputMethod}
              setInputMethod={setInputMethod}
              clearForm={clearForm}
            />
            
            <div className="w-full">
              <FileInput
                dragActive={dragActive}
                setDragActive={setDragActive}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setError={setError}
                setSummary={setSummary}
                setGlobalProcessing={() => {}}
                setGlobalUploadProgress={setUploadProgress}
              />
            </div>

            <ErrorMessage error={error} />
          </div>

          {summary && (
            <SummarySection
              summary={summary}
              copied={copied}
              copyToClipboard={copyToClipboard}
              downloadSummary={downloadSummary}
            />
          )}
        </main>

      </div>
    </div>
  )
}

export default App