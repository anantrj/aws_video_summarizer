# Video Summarizer

A beautiful, modern web application that transforms videos into concise summaries using AI technology. Built with React and Vite, with full backend integration ready for AWS services.

## 🚀 Features

- **YouTube URL Support**: Paste YouTube URLs to analyze videos
- **File Upload**: Drag & drop video files or browse from file explorer
- **Multiple Video Formats**: Supports MP4, AVI, MOV, WMV, FLV, WebM, and MKV
- **AI-Powered Analysis**: Generates comprehensive video summaries
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Export Options**: Copy to clipboard or download summaries as text files
- **Real-time Progress**: Live progress tracking during video processing
- **Error Handling**: Comprehensive error handling and user feedback
- **Backend Ready**: Fully configured for backend integration

## 🔧 Backend Integration

This frontend is designed to work with a backend service that handles:
- **AWS S3 Integration**: Video file storage and retrieval
- **Video Processing**: AI-powered video analysis and summarization
- **Job Management**: Asynchronous processing with status tracking
- **API Endpoints**: RESTful API for all operations

### Required Backend Endpoints

Your backend should implement these endpoints:

#### 1. Upload Video File
```
POST /api/upload-video
Content-Type: multipart/form-data
Body: { video: File }
Response: { jobId: string, message: string }
```

#### 2. Process YouTube URL
```
POST /api/process-youtube
Content-Type: application/json
Body: { youtubeUrl: string }
Response: { jobId: string, message: string }
```

#### 3. Get Summary Status
```
GET /api/summary/{jobId}
Response: { 
  status: 'processing' | 'completed' | 'failed',
  progress?: number,
  summary?: string,
  error?: string
}
```

### Expected Response Format

```json
{
  "status": "processing",
  "progress": 45,
  "summary": null,
  "error": null
}
```

## 📁 Project Structure

```
video_summarizer/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── config.js        # Backend configuration
│   └── main.jsx         # Application entry point
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## ⚙️ Configuration

### Backend URL Setup

Update the backend URL in `src/config.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://your-backend-domain.com/api', // Update this
  // ... other config
}
```

### Authentication Setup

If your backend requires authentication, uncomment and configure in `src/config.js`:

```javascript
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-API-Key': 'your-api-key'
  }
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend service running (for full functionality)

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure backend URL in `src/config.js`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔌 Backend Connection

### 1. Update Configuration
Edit `src/config.js` and update:
- `BASE_URL`: Your backend service URL
- `ENDPOINTS`: API endpoint paths (if different)
- Authentication headers (if required)

### 2. Test Connection
The app will automatically attempt to connect to your backend when:
- Uploading video files
- Processing YouTube URLs
- Checking job status

### 3. Error Handling
The frontend includes comprehensive error handling for:
- Network errors
- Authentication failures
- File upload issues
- Processing failures

## 📱 Usage

1. **Choose Input Method**: Select between YouTube URL or file upload
2. **Provide Video**: Enter URL or upload video file
3. **Generate Summary**: Click the "Generate Summary" button
4. **Monitor Progress**: Watch real-time processing progress
5. **Review Results**: Read the AI-generated summary
6. **Export**: Copy to clipboard or download as text file

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Works perfectly on all device sizes
- **Progress Tracking**: Real-time progress bars with animations
- **Error States**: Clear error messages and user feedback

## 🔒 Security Considerations

- **File Validation**: Client-side file type and size validation
- **Input Sanitization**: URL and input validation
- **Headers Configuration**: Easy authentication header setup
- **Error Handling**: Secure error messages without exposing internals

## 🚧 Development Notes

### Current State
- ✅ Frontend UI complete
- ✅ API integration structure ready
- ✅ Error handling implemented
- ✅ Progress tracking ready
- ✅ Configuration centralized
- ⏳ Backend integration pending

### Next Steps
1. Set up backend service with required endpoints
2. Configure AWS S3 integration
3. Implement video processing pipeline
4. Update frontend configuration
5. Test end-to-end functionality

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from the frontend domain
2. **File Upload Failures**: Check file size limits and supported formats
3. **Authentication Errors**: Verify API keys and tokens in configuration
4. **Network Errors**: Confirm backend service is running and accessible

### Debug Mode

Enable console logging by checking the browser's developer tools for:
- API request/response details
- Error messages and stack traces
- Network request status

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Backend Integration Checklist

- [ ] Backend service running and accessible
- [ ] API endpoints implemented and tested
- [ ] AWS S3 integration configured
- [ ] Video processing pipeline working
- [ ] Frontend configuration updated
- [ ] Authentication configured (if required)
- [ ] CORS settings configured
- [ ] Error handling tested
- [ ] Progress tracking working
- [ ] End-to-end testing completed
