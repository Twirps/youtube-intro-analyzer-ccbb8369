
import React, { useState } from 'react';
import { Upload, BarChart3, FileVideo, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('video/')) {
      setUploadedFile(file);
      toast({
        title: "Video uploaded successfully!",
        description: `${file.name} is ready for analysis.`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const analyzeVideo = () => {
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Analysis complete!",
        description: "Your video engagement analysis is ready.",
      });
    }, 3000);
  };

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
              <Link to="/analysis" className="text-white hover:text-purple-200 transition-colors">Analysis</Link>
              <Link to="/about" className="text-white hover:text-purple-200 transition-colors">About</Link>
              <Link to="/faq" className="text-white hover:text-purple-200 transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            YouTube Video Engagement Analyzer
          </h1>
          <p className="text-xl text-purple-200">
            Upload your video and get instant AI-powered engagement insights
          </p>
        </div>

        {/* Upload Section */}
        {!analysisComplete && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Upload Your Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  isDragOver
                    ? 'border-purple-400 bg-purple-400/20'
                    : 'border-white/40 hover:border-purple-400 hover:bg-white/5'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDragOver(true)}
                onDragLeave={() => setIsDragOver(false)}
              >
                <Upload className="h-16 w-16 text-white mx-auto mb-4" />
                <p className="text-white text-lg mb-4">
                  Drag and drop your video here, or click to select
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Choose Video File
                  </Button>
                </label>
              </div>

              {uploadedFile && (
                <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center space-x-3">
                    <FileVideo className="h-6 w-6 text-green-400" />
                    <div>
                      <p className="text-white font-medium">{uploadedFile.name}</p>
                      <p className="text-green-300 text-sm">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={analyzeVideo}
                    disabled={isAnalyzing}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Engagement'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisComplete && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-400" />
                <span>Engagement Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-lg border border-green-500/30">
                  <h3 className="text-green-300 text-sm font-semibold uppercase tracking-wide">Overall Score</h3>
                  <p className="text-3xl font-bold text-white mt-2">87/100</p>
                  <p className="text-green-200 text-sm mt-1">Highly Engaging</p>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-lg border border-blue-500/30">
                  <h3 className="text-blue-300 text-sm font-semibold uppercase tracking-wide">Hook Effectiveness</h3>
                  <p className="text-3xl font-bold text-white mt-2">92%</p>
                  <p className="text-blue-200 text-sm mt-1">Strong opening hook</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
                  <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Visual Appeal</h3>
                  <p className="text-3xl font-bold text-white mt-2">85%</p>
                  <p className="text-purple-200 text-sm mt-1">Good visual quality</p>
                </div>

                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-lg border border-orange-500/30">
                  <h3 className="text-orange-300 text-sm font-semibold uppercase tracking-wide">Audio Quality</h3>
                  <p className="text-3xl font-bold text-white mt-2">90%</p>
                  <p className="text-orange-200 text-sm mt-1">Clear audio</p>
                </div>

                <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 p-6 rounded-lg border border-teal-500/30">
                  <h3 className="text-teal-300 text-sm font-semibold uppercase tracking-wide">Pacing</h3>
                  <p className="text-3xl font-bold text-white mt-2">88%</p>
                  <p className="text-teal-200 text-sm mt-1">Well-paced content</p>
                </div>

                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-6 rounded-lg border border-indigo-500/30">
                  <h3 className="text-indigo-300 text-sm font-semibold uppercase tracking-wide">Retention Prediction</h3>
                  <p className="text-3xl font-bold text-white mt-2">76%</p>
                  <p className="text-indigo-200 text-sm mt-1">Above average</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-3">AI Recommendations</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Strong opening hook keeps viewers engaged</li>
                  <li>• Consider adding more dynamic camera movements</li>
                  <li>• Audio quality is excellent - maintain this standard</li>
                  <li>• Content pacing is optimal for audience retention</li>
                </ul>
              </div>

              <Button
                onClick={() => {
                  setAnalysisComplete(false);
                  setUploadedFile(null);
                }}
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white w-full"
              >
                Analyze Another Video
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
