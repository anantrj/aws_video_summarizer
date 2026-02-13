import { FaUpload, FaFileVideo, FaPlay, FaSpinner } from "react-icons/fa";
import { useState, useRef, useCallback } from "react";
import axios from "axios";
import { API_CONFIG } from "../config";

const FileInput = ({
  dragActive,
  setDragActive,
  selectedFile,
  setSelectedFile,
  setError,
  setSummary,
  setGlobalProcessing,
  setGlobalUploadProgress,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const POLL_INTERVAL = 5000;

  const pollForSummary = async (filename) => {
    let attemptCount = 0;
    const maxAttempts = 120; 
    
    while (attemptCount < maxAttempts) {
      try {
        attemptCount++;
        console.log(`Polling for summary (attempt ${attemptCount})...`);
        
        const summaryResponse = await axios.get(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GET_SUMMARY}`,
          {
            params: { key: filename },
            timeout: API_CONFIG.TIMEOUT,
          }
        );

        if (summaryResponse.data?.summary) {
          console.log("Summary found!");
          setSummary?.(summaryResponse.data.summary);
          setError("");
          setGlobalProcessing?.(false);
          setGlobalUploadProgress?.(100);
          setSelectedFile(null);
          return;
        }
      } catch (summaryError) {
        if (summaryError.response?.status === 404) {
          console.log("Summary not ready yet, continuing to poll...");
        } else {
          console.error("Summary fetch error:", summaryError);
          const message =
            summaryError.response?.data?.error ||
            summaryError.message ||
            "Failed to retrieve summary. Please try again later.";
          setError(message);
          setGlobalProcessing?.(false);
          setGlobalUploadProgress?.(0);
          throw summaryError;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
    }
    
    setError("Summary generation is taking longer than expected. Please check back later.");
    setGlobalProcessing?.(false);
    setGlobalUploadProgress?.(0);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    try {
      setError("");
      setSummary?.("");
      setIsUploading(true);
      setUploadProgress(0);
      setGlobalProcessing?.(true);
      setGlobalUploadProgress?.(0);

      console.log("Starting file upload to backend...");

      const formData = new FormData();
      formData.append('video', selectedFile);

      const uploadResponse = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD_VIDEO}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 300000, // 5 minutes for large files
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
              setGlobalUploadProgress?.(percent);
            }
          },
        }
      );

      if (!uploadResponse.data?.key) {
        throw new Error("Failed to get file key from server");
      }

      const uploadKey = uploadResponse.data.key;
      console.log("File uploaded successfully to S3. Key:", uploadKey);
      setGlobalUploadProgress?.(100);
      setUploadProgress(100);

      setUploadProgress(0);

      await pollForSummary(uploadKey);
    } catch (err) {
      console.error("Upload error:", err);
      let message = "Upload failed. Please try again.";
      
      if (err.response) {
        // Server responded with error
        message = err.response.data?.error || err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request made but no response
        message = "No response from server. Please check your connection.";
      } else if (err.message) {
        // Error setting up request
        message = err.message;
      }
      
      setError(message);
      setGlobalProcessing?.(false);
      setGlobalUploadProgress?.(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    },
    [setDragActive]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("video/")) {
          setSelectedFile(file);
          setError("");
        } else {
          setError("Please select a valid video file");
        }
      }
    },
    [setDragActive, setSelectedFile, setError]
  );

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please select a valid video file");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 relative ${
          dragActive
            ? "border-primary bg-primary/15 scale-105"
            : "border-primary/30 bg-primary/5 hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <FaUpload className="w-16 h-16 text-primary mx-auto mb-4" />
        <p className="text-xl font-semibold text-dark mb-2">
          {selectedFile
            ? selectedFile.name
            : "Drag & drop video file here or click to browse"}
        </p>
        <p className="text-dark/60 text-sm">
          Supports MP4, AVI, MOV, and other video formats
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {selectedFile && (
        <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-xl border border-primary/20">
          <FaFileVideo className="text-primary w-6 h-6" />
          <span className="font-semibold text-dark">{selectedFile.name}</span>
          <span className="text-dark/60 text-sm">
            ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
          </span>
        </div>
      )}
      {isUploading && (
        <div className="mt-2">
          <progress value={uploadProgress} max="100" className="w-full" />
          <span>{uploadProgress}%</span>
        </div>
      )}

      <button
        className="flex items-center justify-center gap-2 w-full py-4 px-8 bg-gradient-to-r from-primary via-accent to-secondary text-white border-none rounded-2xl text-lg font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        onClick={uploadFile}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? (
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
  );
};

export default FileInput;
