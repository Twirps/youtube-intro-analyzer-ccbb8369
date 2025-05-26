
import React from 'react';
import { BarChart3, TrendingUp, Clock, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Analysis = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-white" />
              <span className="text-white text-xl font-bold">VideoAnalyzer</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-white hover:text-purple-200 transition-colors">Home / Upload</Link>
              <Link to="/analysis" className="text-purple-200 font-semibold">Analysis</Link>
              <Link to="/about" className="text-white hover:text-purple-200 transition-colors">About</Link>
              <Link to="/faq" className="text-white hover:text-purple-200 transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Analysis Dashboard</h1>
          <p className="text-xl text-purple-200">
            View detailed insights from your video analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Analysis */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">My_First_Video.mp4</p>
                      <p className="text-gray-300 text-sm">Score: 87/100 - 2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">Highly Engaging</span>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-gray-400">No more analysis history available.</p>
                  <Link to="/" className="text-purple-400 hover:text-purple-300 underline">
                    Upload another video
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm">Videos Analyzed</p>
                    <p className="text-2xl font-bold text-white">1</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Average Score</p>
                    <p className="text-2xl font-bold text-green-400">87/100</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Analysis Time</p>
                    <p className="text-2xl font-bold text-blue-400">~3 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>• Keep your intro under 15 seconds</p>
                  <p>• Use clear, high-quality audio</p>
                  <p>• Add visual variety every 3-5 seconds</p>
                  <p>• Start with a compelling hook</p>
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
