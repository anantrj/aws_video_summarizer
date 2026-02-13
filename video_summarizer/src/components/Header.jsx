import { FaPlay } from 'react-icons/fa'

const Header = () => {
  return (
    <header className="bg-light/95 backdrop-blur-xl border-b border-light/20 py-12 shadow-lg w-full rounded-t-3xl mb-12">
      <div className="max-w-4xl mx-auto px-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <FaPlay className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Video Summarizer
          </h1>
        </div>
        <p className="text-xl text-dark/70 font-medium">
          Transform videos into concise summaries with AWS
        </p>
      </div>
    </header>
  )
}

export default Header
