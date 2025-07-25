import React, { useState } from 'react';
import { BarChart3, Play, Lightbulb, ArrowLeft, Check, Maximize2, Minimize2, Scissors, Volume2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const VideoAnalysis = () => {
  const location = useLocation();
  const { videoTitle, videoUrl } = location.state || { 
    videoTitle: 'Sample Video Analysis', 
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  };

  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

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
            <h1 className="text-4xl font-bold text-white mb-2">Video Analysis</h1>
            <p className="text-xl text-gray-300">
              Detailed video analysis and recommendations for "{videoTitle}"
            </p>
          </div>
          <div className="w-32"></div> {/* Spacer for balance */}
        </div>

      </div>
    </div>
  );
};

export default VideoAnalysis;