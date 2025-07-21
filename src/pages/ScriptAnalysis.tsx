import React, { useState } from 'react';
import { BarChart3, FileText, MessageSquare, Lightbulb, ArrowLeft, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useLocation } from 'react-router-dom';

const ScriptAnalysis = () => {
  const location = useLocation();
  const { videoTitle, transcript } = location.state || { 
    videoTitle: 'Untitled Video', 
    transcript: "Welcome to my channel! Today we're going to dive deep into the most amazing topic you've ever seen. I know the title promised you something incredible, and I'm here to deliver exactly that. This introduction is going to hook you right from the start because what I'm about to show you will completely change your perspective. The title wasn't clickbait - this is the real deal, and by the end of this video, you'll understand exactly why you need to keep watching until the very end."
  };

  const [chatMessages, setChatMessages] = useState([
    { type: 'system', content: 'Welcome! I can help you improve your video script. What would you like to work on?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const legendItems = [
    { label: 'Hook Strength', color: 'bg-emerald-500' },
    { label: 'Confirming the Click', color: 'bg-blue-500' },
    { label: 'Goal', color: 'bg-purple-500' },
    { label: 'Motive', color: 'bg-orange-500' },
    { label: 'Progression', color: 'bg-pink-500' }
  ];

  const recommendations = [
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
    }
  ];

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages(prev => [
        ...prev,
        { type: 'user', content: currentMessage },
        { type: 'system', content: 'Great suggestion! I\'ll analyze your script with that in mind. Consider focusing on making your opening more specific and action-oriented.' }
      ]);
      setCurrentMessage('');
    }
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
              <Link to="/script-analysis" className="text-white hover:text-gray-300 transition-colors font-medium">Script Analysis</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <Link to="/analysis" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mr-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Analysis</span>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Script Analysis</h1>
            <p className="text-xl text-gray-300">
              Detailed analysis and recommendations for "{videoTitle}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Script Display */}
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Video Script Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {transcript}
                  </p>
                </div>
                
                {/* Legend */}
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/20">
                  <h4 className="text-white text-sm font-medium mb-2">Analysis Legend</h4>
                  <div className="flex flex-wrap gap-4">
                    {legendItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-gray-300 text-xs">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Recommendations and Chat */}
          <div className="space-y-8">
            {/* Recommendations */}
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/20">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium">{rec.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rec.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{rec.description}</p>
                      <div className="bg-gray-900/50 rounded p-3 border-l-2 border-blue-400">
                        <p className="text-gray-300 text-xs font-mono">{rec.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Section */}
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Script Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-96">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600/20 text-blue-300 ml-4' 
                          : 'bg-gray-800/50 text-gray-300 mr-4'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask for script suggestions..."
                      className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
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

export default ScriptAnalysis;