import React from 'react';
import { BarChart3, TrendingUp, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';

const Analysis = () => {
  const location = useLocation();
  const { videoTitle, videoFile } = location.state || { videoTitle: 'Untitled Video', videoFile: null };

  // Sample transcript - in a real app, this would come from the analysis
  const transcript = "Welcome to my channel! Today we're going to dive deep into the most amazing topic you've ever seen. I know the title promised you something incredible, and I'm here to deliver exactly that. This introduction is going to hook you right from the start because what I'm about to show you will completely change your perspective. The title wasn't clickbait - this is the real deal, and by the end of this video, you'll understand exactly why you need to keep watching until the very end.";

  const legendItems = [
    { label: 'Hook Strength', color: 'bg-emerald-500' },
    { label: 'Confirming the Click', color: 'bg-blue-500' },
    { label: 'Goal', color: 'bg-purple-500' },
    { label: 'Motive', color: 'bg-orange-500' },
    { label: 'Progression', color: 'bg-pink-500' }
  ];

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
              <Link to="/analysis" className="text-white hover:text-gray-300 transition-colors font-medium">Analysis</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Analysis Dashboard</h1>
          <p className="text-xl text-gray-300">
            View detailed insights from your video intro analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Results */}
          <Card className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">"{videoTitle}"</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Script Display Section */}
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <h3 className="text-white text-lg font-semibold">Video Script</h3>
                  </div>
                  
                  {/* Legend */}
                  <div className="mb-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/20">
                    <h4 className="text-white text-sm font-medium mb-3">Analysis Legend</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                      {legendItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-gray-300 text-xs">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {transcript}
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    Script extracted from video analysis • {transcript.length} characters
                  </p>
                </div>

                {/* Video Player */}
                {videoFile && (
                  <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                    <h3 className="text-white text-lg font-semibold mb-4">Analyzed Video</h3>
                    <div className="relative">
                      <video
                        controls
                        className="w-full rounded-lg"
                        style={{ maxHeight: '400px' }}
                      >
                        <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      File: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  </div>
                )}
                
                <div className="text-center py-8">
                  <p className="text-gray-500">No more analysis history available.</p>
                  <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
                    Upload another video
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Videos Analyzed</p>
                    <p className="text-2xl font-bold text-white">1</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Average Score</p>
                    <p className="text-2xl font-bold text-emerald-400">88/100</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Analysis Time</p>
                    <p className="text-2xl font-bold text-blue-400">~3 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Analysis Criteria</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    {/* <Target className="h-4 w-4 text-emerald-400" /> */}
                    <span>Hook Strength - Opening impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <CheckCircle className="h-4 w-4 text-blue-400" /> */}
                    <span>Title Confirmation - Content match</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <PlayCircle className="h-4 w-4 text-purple-400" /> */}
                    <span>Continue Motive - Retention drive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
