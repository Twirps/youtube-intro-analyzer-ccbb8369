import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Film } from 'lucide-react';
interface VideoTimelineProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: number;
  duration: number;
  onTimeChange: (time: number) => void;
}
const VideoTimeline: React.FC<VideoTimelineProps> = ({
  videoRef,
  currentTime,
  duration,
  onTimeChange
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  // Generate waveform data (simulated)
  const generateWaveform = () => {
    const samples = 200;
    return Array.from({
      length: samples
    }, () => Math.random() * 0.8 + 0.2);
  };
  const waveformData = generateWaveform();

  // Generate video thumbnails at 10-second intervals
  const generateThumbnails = async () => {
    if (!videoRef.current || duration === 0) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const thumbs: string[] = [];
    canvas.width = 80;
    canvas.height = 45;
    const interval = 10; // 10 seconds
    const numThumbnails = Math.floor(duration / interval);
    for (let i = 0; i <= numThumbnails; i++) {
      const time = i * interval;
      video.currentTime = time;
      await new Promise(resolve => {
        video.addEventListener('seeked', () => {
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            thumbs.push(canvas.toDataURL());
          }
          resolve(null);
        }, {
          once: true
        });
      });
    }

    // Reset video time
    video.currentTime = currentTime;
    setThumbnails(thumbs);
  };
  useEffect(() => {
    if (duration > 0) {
      generateThumbnails();
    }
  }, [duration]);
  const formatTimecode = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  };
  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging && e.type === 'mousemove') return;
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = (e as MouseEvent).clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    onTimeChange(newTime);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Generate time markers
  const generateTimeMarkers = () => {
    const markers = [];
    const interval = Math.max(30, Math.floor(duration / 10)); // At least 30 seconds between markers

    for (let time = 0; time <= duration; time += interval) {
      const percentage = time / duration * 100;
      markers.push(<div key={time} className="absolute flex flex-col items-center" style={{
        left: `${percentage}%`
      }}>
          <div className="w-px h-4 bg-gray-400"></div>
          
        </div>);
    }
    return markers;
  };
  const playheadPosition = duration > 0 ? currentTime / duration * 100 : 0;
  return <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
      {/* Timeline Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-gray-300 font-mono text-sm bg-gray-800 px-2 py-1 rounded">
          {formatTimecode(currentTime)}
        </div>
        
      </div>

      {/* Time Markers */}
      

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative bg-gray-800 rounded border border-gray-600 cursor-pointer" onMouseDown={handleMouseDown}>
        {/* Audio Track */}
        <div className="flex items-center p-2 border-b border-gray-600">
          <div className="flex items-center space-x-2 w-12">
            <Volume2 className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex-1 h-12 bg-gray-900 rounded relative overflow-hidden">
            {/* Waveform */}
            <div className="flex items-center h-full px-2">
              {waveformData.map((amplitude, index) => <div key={index} className="bg-blue-400 mx-px rounded-full" style={{
              height: `${amplitude * 100}%`,
              width: '2px',
              opacity: 0.8
            }} />)}
            </div>
          </div>
        </div>

        {/* Video Track */}
        <div className="flex items-center p-2">
          <div className="flex items-center space-x-2 w-12">
            <Film className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex-1 h-12 bg-gray-900 rounded relative overflow-hidden">
            {/* Video Thumbnails */}
            <div className="flex h-full">
              {thumbnails.map((thumb, index) => <div key={index} className="flex-1 min-w-0 h-full bg-cover bg-center border-r border-gray-700 last:border-r-0" style={{
              backgroundImage: `url(${thumb})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />)}
              {/* Fallback if no thumbnails */}
              {thumbnails.length === 0 && <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Video Track</span>
                </div>}
            </div>
          </div>
        </div>

        {/* Playhead */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{
        left: `${playheadPosition}%`
      }}>
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* Timeline Controls */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Duration: {formatTimecode(duration)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
          <span>Audio</span>
          <span className="w-3 h-3 bg-gray-600 rounded-sm ml-4"></span>
          <span>Video</span>
        </div>
      </div>
    </div>;
};
export default VideoTimeline;