import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import { Video, Calendar, Clock, AlertCircle, RefreshCw, Smartphone, Monitor, FileVideo, AlertTriangle, Download, Play, Pause } from 'lucide-react';

const VideoSection: React.FC = () => {
  const [videoPath, setVideoPath] = useState('/Cow Video.mp4');
  const [videoStatus, setVideoStatus] = useState<'loading' | 'available' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRetrying, setIsRetrying] = useState(false);
  const [videoQuality, setVideoQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [showCompressionWarning, setShowCompressionWarning] = useState(false);

  // Available video sources - using Cow Video.mp4 as primary
  const videoSources = {
    high: [
      '/Cow Video.mp4',
      '/result (52).mp4',
      '/test-video.mp4',
      '/video.mp4'
    ],
    medium: [
      '/Cow Video.mp4',
      '/result (52).mp4',
      '/test-video.mp4',
      '/video.mp4'
    ],
    low: [
      '/Cow Video.mp4',
      '/result (52).mp4',
      '/test-video.mp4',
      '/video.mp4'
    ]
  };

  // Get current video sources based on quality
  const currentVideoSources = videoSources[videoQuality];

  // Test video accessibility with shorter timeout for smaller files
  useEffect(() => {
    const checkVideoAccessibility = async () => {
      try {
        // Create a timeout for the fetch request - shorter for smaller files
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for smaller files

        console.log(`🔍 Checking video accessibility: ${videoPath}`);
        
        const response = await fetch(videoPath, { 
          method: 'HEAD',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log(`✅ Video accessible: ${videoPath}`);
          setVideoStatus('available');
          setErrorMessage('');
        } else {
          console.log(`❌ Video not accessible: ${response.status} ${response.statusText}`);
          setVideoStatus('error');
          setErrorMessage(`Video not accessible: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log(`⏰ Timeout loading video: ${videoPath}`);
          setVideoStatus('error');
          setErrorMessage('Video file is taking time to load. Please wait or try a different video source.');
        } else {
          console.error('Video fetch test failed:', error);
          setVideoStatus('error');
          setErrorMessage('Failed to load video. Please check the video file path.');
        }
      }
    };

    checkVideoAccessibility();
  }, [videoPath]);

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = videoPath;
      link.download = 'cow-monitoring-video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Cow Monitoring Video',
      text: 'Check out this cow monitoring video',
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Link copied to clipboard!');
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback
      try {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      } catch (fallbackError) {
        console.error('Fallback copy error:', fallbackError);
        alert('Unable to share or copy link. Please copy the URL manually.');
      }
    }
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setVideoStatus('loading');
    setErrorMessage('');
    
    // Force re-check of video accessibility
    const checkVideo = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(videoPath, { 
          method: 'HEAD',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          setVideoStatus('available');
        } else {
          setVideoStatus('error');
          setErrorMessage(`Video not accessible: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          setVideoStatus('error');
          setErrorMessage('Video file is taking time to load. Please wait or try a different video source.');
        } else {
          setVideoStatus('error');
          setErrorMessage('Failed to load video. Please check the video file path.');
        }
      } finally {
        setIsRetrying(false);
      }
    };
    checkVideo();
  };

  const tryDifferentVideo = (newPath: string) => {
    setVideoPath(newPath);
    setVideoStatus('loading');
    setErrorMessage('');
  };

  const changeVideoQuality = (quality: 'high' | 'medium' | 'low') => {
    setVideoQuality(quality);
    // Try the first video in the new quality
    const newPath = videoSources[quality][0];
    setVideoPath(newPath);
    setVideoStatus('loading');
    setErrorMessage('');
  };

  const handleCompressVideo = () => {
    // Open compression instructions
    const instructions = `
Video Compression Instructions:

1. Install FFmpeg:
   - Windows: Download from https://ffmpeg.org/download.html
   - Or use online tools like: https://www.onlinevideoconverter.com/

2. Compress the video:
   - Target size: 10-20MB
   - Resolution: 720p or 480p
   - Format: MP4

3. Replace the original file or create compressed versions:
   - Cow Video-compressed.mp4
   - Cow Video-low.mp4

4. Restart the application
    `;
    alert(instructions);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Cow Monitoring Video</h2>
            <p className="text-sm text-gray-600">Live feed from barn cameras</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Calendar size={14} />
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
            <Clock size={14} />
            <span>Live Feed</span>
          </div>
        </div>
      </div>

      {/* Video Quality Selector */}
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Video Quality:</span>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Monitor size={12} />
            <span className="hidden sm:inline">Desktop</span>
            <Smartphone size={12} />
            <span className="hidden sm:inline">Mobile</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {(['high', 'medium', 'low'] as const).map((quality) => (
            <button
              key={quality}
              onClick={() => changeVideoQuality(quality)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                videoQuality === quality
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {quality === 'high' ? 'HD' : quality === 'medium' ? 'SD' : 'Low'}
            </button>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500 flex items-center">
          <FileVideo className="inline w-3 h-3 mr-1" />
          Using: {videoPath} (79MB)
        </div>
      </div>

      {/* Loading State */}
      {videoStatus === 'loading' && (
        <div className="flex items-center justify-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              {isRetrying ? 'Retrying...' : 'Loading cow monitoring video...'}
            </p>
            <p className="text-xs text-gray-500 mt-2">This may take a few moments</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {videoStatus === 'error' && (
        <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
          <div className="flex items-center space-x-3 text-red-600 mb-4">
            <AlertCircle size={20} />
            <span className="font-semibold text-base">Video Loading Notice</span>
          </div>
          <p className="text-sm text-red-700 mb-4">{errorMessage}</p>
          
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 font-medium"
            >
              {isRetrying ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Retrying...</span>
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  <span>Retry Loading</span>
                </>
              )}
            </button>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Try different video sources:</p>
              <div className="space-y-1">
                {currentVideoSources.map((source, index) => (
                  <button
                    key={index}
                    onClick={() => tryDifferentVideo(source)}
                    className="block text-left text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player */}
      <div className="mb-6">
        <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
          <VideoPlayer
            src={videoPath}
            title="Cow Monitoring Video"
            className="w-full"
          />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Video Details
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <p>Duration: Auto-detected</p>
            <p>Quality: {videoQuality === 'high' ? 'HD' : videoQuality === 'medium' ? 'SD' : 'Low'}</p>
            <p>Source: Farm Camera</p>
            <p className="truncate">Current: {videoPath}</p>
            <p>Status: {videoStatus}</p>
            <p>Size: 79MB</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Recording Info
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <p>Date: Current</p>
            <p>Location: Main Barn</p>
            <p>Camera: Cam-01</p>
            <p>File: Cow Video.mp4</p>
            <p>Size: 79MB</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 sm:col-span-2 lg:col-span-1">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Actions
          </h4>
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
            >
              Download Video
            </button>
            <button
              onClick={handleShare}
              className="w-full bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium"
            >
              Share Link
            </button>
            <button
              onClick={handleCompressVideo}
              className="w-full bg-yellow-600 text-white py-2 px-3 rounded-lg hover:bg-yellow-700 transition-colors text-xs sm:text-sm font-medium"
            >
              Compress Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;