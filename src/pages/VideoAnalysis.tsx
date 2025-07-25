import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, Play, Lightbulb, ArrowLeft, Check, Maximize2, Minimize2, Scissors, Volume2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Link, useLocation } from 'react-router-dom';

const VideoAnalysis = () => {
  const location = useLocation();
  const { videoTitle, videoFile, analysisType } = location.state || { 
    videoTitle: 'Sample Video Analysis', 
    videoFile: null,
    analysisType: 'visual'
  };

  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const initialRecommendations = [
    {
      title: "Strengthen Your Hook",
      description: "Consider starting with a more specific, attention-grabbing statement rather than a general welcome.",
      priority: "High",
      example: "Instead of 'Welcome to my channel', try 'In the next 60 seconds, you'll discover...'"
    },
    {
      title: "Add Specific Benefits",
      description: "Replace vague promises with concrete outcomes the viewer will achieve.",
      priority: "Medium", 
      example: "Replace 'change your perspective' with '3 actionable strategies that increased my results by 300%'"
    },
    {
      title: "Create Urgency",
      description: "Add a time-sensitive element to encourage immediate action.",
      priority: "Medium",
      example: "Add phrases like 'before it's too late' or 'the window is closing on this opportunity'"
    },
    {
      title: "Improve Storytelling",
      description: "Add a personal story or case study to make your content more relatable.",
      priority: "Low",
      example: "Share a specific moment when this strategy helped you overcome a challenge"
    },
    {
      title: "Add Social Proof",
      description: "Include testimonials or statistics to build credibility.",
      priority: "Medium",
      example: "Mention that '10,000+ students have used this method successfully'"
    }
  ];

  // Sort by priority: High > Medium > Low
  const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
  const sortedRecommendations = [...initialRecommendations].sort((a, b) => 
    priorityOrder[b.priority] - priorityOrder[a.priority]
  );

  const [recommendations, setRecommendations] = useState(sortedRecommendations);
  const visibleRecommendations = showAllRecommendations ? recommendations : recommendations.slice(0, 2);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newRecommendations = [...recommendations];
    const draggedItem = newRecommendations[draggedIndex];
    
    // Remove the dragged item
    newRecommendations.splice(draggedIndex, 1);
    
    // Insert it at the new position
    newRecommendations.splice(dropIndex, 0, draggedItem);
    
    setRecommendations(newRecommendations);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimelineSeek = (value) => {
    if (videoRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-xl border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <BarChart3 className="h-8 w-8 text-white" />
              <span className="text-white text-xl font-bold">Engagement Analysis</span>
            </Link>
            <div className="flex space-x-6">
              <Link to="/analysis" className="text-gray-300 hover:text-white transition-colors">Analysis</Link>
              <Link to="/script-analysis" className="text-gray-300 hover:text-white transition-colors">Script Analysis</Link>
              <Link to="/video-analysis" className="text-white hover:text-gray-300 transition-colors font-medium">Video Analysis</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/analysis" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Analysis</span>
          </Link>
          <div className="text-center flex-1 mx-8">
            <h1 className="text-4xl font-bold text-white mb-2">{analysisType === 'visual' ? 'Visual' : 'Audio'} Analysis</h1>
            <p className="text-xl text-gray-300">
              Detailed {analysisType} analysis and recommendations for "{videoTitle}"
            </p>
          </div>
          <div className="w-32"></div> {/* Spacer for balance */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Video Player */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Video Player</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Video Player */}
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    {videoFile ? (
                      <video
                        ref={videoRef}
                        className="w-full h-auto max-h-96"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      >
                        <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                        <p className="text-gray-400">No video available</p>
                      </div>
                    )}
                  </div>

                  {/* Video Controls */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={handlePlayPause}
                        variant="outline"
                        size="sm"
                        className="bg-gray-800/80 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Play className={`h-4 w-4 ${isPlaying ? 'hidden' : 'block'}`} />
                        <span className={`h-4 w-4 ${isPlaying ? 'block' : 'hidden'}`}>⏸</span>
                      </Button>
                      <div className="text-gray-300 text-sm font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    {/* Timeline Slider */}
                    <div className="space-y-2">
                      <div className="text-gray-400 text-xs">Timeline</div>
                      <Slider
                        value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                        onValueChange={handleTimelineSeek}
                        max={100}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Recommendations */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span>{analysisType === 'visual' ? 'Visual' : 'Audio'} Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {visibleRecommendations.map((rec, index) => (
                    <div 
                      key={index} 
                      className={`p-3 bg-gray-800/30 rounded-lg border border-gray-700/20 cursor-move transition-all duration-300 ease-in-out transform ${
                        draggedIndex === index 
                          ? 'scale-105 shadow-lg rotate-1 opacity-50' 
                          : dragOverIndex === index 
                            ? 'scale-102 border-blue-400/50 bg-gray-800/50' 
                            : 'hover:bg-gray-800/40 hover:scale-101'
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            rec.priority === 'High' ? 'bg-red-500/20 text-red-300' : 
                            rec.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {rec.priority}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-green-500/20 hover:text-green-400 text-gray-500"
                            title="Apply Suggestion"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mb-2">{rec.description}</p>
                      <div className="bg-gray-900/50 rounded p-2 border-l-2 border-blue-400">
                        <p className="text-gray-300 text-xs font-mono">{rec.example}</p>
                      </div>
                    </div>
                  ))}
                  
                  {recommendations.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllRecommendations(!showAllRecommendations)}
                      className="w-full text-gray-400 hover:text-white mt-2"
                    >
                      {showAllRecommendations ? 'Show Less' : `Show ${recommendations.length - 2} More`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoAnalysis;