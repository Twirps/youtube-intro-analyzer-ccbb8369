
import React from 'react';
import { BarChart3, TrendingUp, Clock, Eye, Target, CheckCircle, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useLocation } from 'react-router-dom';

const Analysis = () => {
  const location = useLocation();
  const { videoTitle, videoFile } = location.state || { videoTitle: 'Untitled Video', videoFile: null };

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
          {/* Recent Analysis */}
          <Card className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Recent Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">"{videoTitle}"</p>
                        <p className="text-gray-400 text-sm">Overall Score: 88/100 - 2 hours ago</p>
                      </div>
                    </div>
                    <span className="text-emerald-400 text-sm font-semibold">Highly Engaging</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Target className="h-4 w-4 text-emerald-400 mr-1" />
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Hook Strength</span>
                      </div>
                      <p className="text-lg font-bold text-white">92%</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-4 w-4 text-blue-400 mr-1" />
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Title Match</span>
                      </div>
                      <p className="text-lg font-bold text-white">88%</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <PlayCircle className="h-4 w-4 text-purple-400 mr-1" />
                        <span className="text-xs text-gray-400 uppercase tracking-wide">Continue Motive</span>
                      </div>
                      <p className="text-lg font-bold text-white">85%</p>
                    </div>
                  </div>
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
                    <Target className="h-4 w-4 text-emerald-400" />
                    <span>Hook Strength - Opening impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Title Confirmation - Content match</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="h-4 w-4 text-purple-400" />
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
