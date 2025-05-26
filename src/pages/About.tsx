
import React from 'react';
import { BarChart3, Brain, Video, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-xl border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-white" />
              <span className="text-white text-xl font-bold">VideoAnalyzer</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home / Upload</Link>
              <Link to="/analysis" className="text-gray-300 hover:text-white transition-colors">Analysis</Link>
              <Link to="/about" className="text-white hover:text-gray-300 transition-colors font-medium">About</Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About VideoAnalyzer</h1>
          <p className="text-xl text-gray-300">
            AI-powered video engagement analysis for content creators
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                VideoAnalyzer is designed to help content creators understand what makes their 
                videos engaging from the very first minute. Using advanced AI technology, we 
                analyze the crucial opening moments of YouTube videos to provide actionable 
                insights that can improve viewer retention and engagement.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-purple-400" />
                  <span>AI-Powered</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Our advanced AI models analyze multiple factors including visual appeal, 
                  audio quality, pacing, and content structure.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Video className="h-6 w-6 text-blue-400" />
                  <span>Video Focus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Specialized in analyzing the first minute of videos, where viewer 
                  retention decisions are typically made.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <span>Fast Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Get comprehensive engagement analysis in under 3 minutes with 
                  detailed recommendations for improvement.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-white">Upload Your Video</h3>
                    <p>Simply drag and drop or select your video file for analysis.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-white">AI Analysis</h3>
                    <p>Our AI examines the first minute for engagement factors and quality metrics.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-white">Get Insights</h3>
                    <p>Receive detailed scores and recommendations to improve your content.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
