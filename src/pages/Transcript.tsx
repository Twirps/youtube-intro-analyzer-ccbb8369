
import React, { useState } from 'react';
import { BarChart3, FileText, Lock, CheckCircle, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const Transcript = () => {
  const [transcript, setTranscript] = useState(
    "Welcome to my channel! Today we're going to dive deep into the most amazing topic you've ever seen. I know the title promised you something incredible, and I'm here to deliver exactly that. This introduction is going to hook you right from the start because what I'm about to show you will completely change your perspective. The title wasn't clickbait - this is the real deal, and by the end of this video, you'll understand exactly why you need to keep watching until the very end."
  );
  const [isLocked, setIsLocked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLockTranscript = () => {
    if (!transcript.trim()) {
      toast({
        title: "Transcript required",
        description: "Please ensure the transcript is not empty before locking.",
        variant: "destructive"
      });
      return;
    }

    setIsLocked(true);
    setIsEditing(false);
    toast({
      title: "Transcript locked!",
      description: "Your transcript has been locked and is ready for analysis."
    });
  };

  const handleEditTranscript = () => {
    setIsLocked(false);
    setIsEditing(true);
  };

  const proceedToAnalysis = () => {
    // Simulate analysis process
    toast({
      title: "Starting analysis...",
      description: "Analyzing your transcript for engagement metrics."
    });
    
    setTimeout(() => {
      navigate('/analysis');
    }, 2000);
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
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Video Transcript</h1>
          <p className="text-xl text-gray-300">Review and edit the transcribed text from your video</p>
        </div>

        {/* Transcript Section */}
        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>Video Transcript</span>
              {isLocked && (
                <div className="flex items-center space-x-2 ml-auto">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">Locked</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Transcript Text Area */}
            <div className="mb-6">
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="The transcript from your video will appear here..."
                className="min-h-[300px] bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 resize-none"
                disabled={isLocked}
              />
              <p className="text-gray-400 text-sm mt-2">
                {transcript.length} characters
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!isLocked ? (
                <Button
                  onClick={handleLockTranscript}
                  disabled={!transcript.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>Lock Transcript</span>
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleEditTranscript}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Transcript</span>
                  </Button>
                  <Button
                    onClick={proceedToAnalysis}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                  >
                    Proceed to Analysis
                  </Button>
                </>
              )}
            </div>

            {/* Status Message */}
            {isLocked && (
              <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <p className="text-emerald-300 text-sm flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Transcript has been locked and is ready for analysis. Click "Proceed to Analysis" to continue.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transcript;
