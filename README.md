AI Video & Audio Summarizer
A cloud-integrated tool that automatically generates concise summaries from video or audio files. This project leverages AWS S3 for scalable storage, Node.js/Express for the backend, React for the frontend, and the Google Gemini AI API for intelligent text summarization.

 How It Works
The application follows a linear processing pipeline:

Upload: Users upload an .mp4 or .mp3 file via the React frontend.

Storage (Stage 1): The backend receives the file and uploads the raw audio/video to an Amazon S3 Bucket.

Transcription: The system processes the file to extract the speech and convert it into a .txt transcript.

Storage (Stage 2): The generated transcript is stored in a separate S3 Bucket for record-keeping and future reference.

AI Summarization: The transcript is sent to the Gemini AI API, which analyzes the text and generates a structured summary.

Display: The final summary is sent back to the frontend and displayed to the user.

 Tech Stack
Frontend: React.js, Vite

Backend: Node.js, Express.js

Cloud Storage: Amazon Web Services (AWS) S3

AI Engine: Google Gemini Pro API

File Handling: Multer (for uploads), AWS SDK
