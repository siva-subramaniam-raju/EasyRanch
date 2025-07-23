import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, AlertCircle } from 'lucide-react';

interface CowVideoPlayerProps {
  className?: string;
}

interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  videoSource: string;
  lastUpdate: string;
}

const CowVideoPlayer: React.FC<CowVideoPlayerProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const currentCamera: Camera = {
    id: 'cam1',
    name: 'Cam 1',
    location: 'Main Barn',
    status: 'online',
    videoSource: '/Testing-host/Cow%20Video.mp4',
    lastUpdate: new Date().toLocaleTimeString()
  };

  useEffect(() => {
    // Simple video loading
    setIsLoading(true);
    setVideoError(false);
    
    // Quick loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
          setVideoError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoError(false);
      setIsLoading(false);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'maintenance': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'maintenance': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getStatusIcon(currentCamera.status)}</span>
            <div>
              <h3 className="text-white font-semibold">{currentCamera.name}</h3>
              <p className="text-gray-400 text-sm">{currentCamera.location}</p>
            </div>
          </div>
          <span className={`text-sm ${getStatusColor(currentCamera.status)}`}>
            {currentCamera.status}
          </span>
        </div>
        <div className="text-gray-400 text-sm">
          Last update: {currentCamera.lastUpdate}
        </div>
      </div>

      {/* Video Container */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading video...</p>
            </div>
          </div>
        )}

        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-white mb-4">Video loading failed</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          preload="metadata"
        >
          <source src={currentCamera.videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-gray-300 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={handleMuteToggle}
              className="text-white hover:text-gray-300 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div className="flex-1 mx-4">
              <label htmlFor="video-seek" className="sr-only">Video progress</label>
              <input
                id="video-seek"
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #4b5563 ${(currentTime / (duration || 1)) * 100}%, #4b5563 100%)`
                }}
                aria-label="Video progress slider"
              />
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button
              onClick={handleRestart}
              className="text-white hover:text-gray-300 transition-colors"
              title="Restart"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={handleFullscreen}
              className="text-white hover:text-gray-300 transition-colors"
              title="Fullscreen"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowVideoPlayer; 