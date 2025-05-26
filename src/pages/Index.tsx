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
  const {
    toast
  } = useToast();
  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('video/')) {
      setUploadedFile(file);
      toast({
        title: "Video uploaded successfully!",
        description: `${file.name} is ready for analysis.`
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive"
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
        description: "Your video engagement analysis is ready."
      });
    }, 3000);
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
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
          <h1 className="text-5xl font-bold text-white mb-4">YouTube Intro Analyzer</h1>
          <p className="text-xl text-gray-300">Upload the first minute of the video and get instant AI-powered engagement insights</p>
        </div>

        {/* Upload Section */}
        {!analysisComplete && <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Upload Your Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${isDragOver ? 'border-blue-400 bg-blue-400/10' : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/30'}`} onDrop={handleDrop} onDragOver={e => e.preventDefault()} onDragEnter={() => setIsDragOver(true)} onDragLeave={() => setIsDragOver(false)}>
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-lg mb-4">
                  Drag and drop your video here, or click to select
                </p>
                <input type="file" accept="video/*" onChange={handleFileSelect} className="hidden" id="video-upload" />
                <label htmlFor="video-upload">
                  <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
                    Choose Video File
                  </Button>
                </label>
              </div>

              {uploadedFile && <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                  <div className="flex items-center space-x-3">
                    <FileVideo className="h-6 w-6 text-emerald-400" />
                    <div>
                      <p className="text-white font-medium">{uploadedFile.name}</p>
                      <p className="text-emerald-300 text-sm">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button onClick={analyzeVideo} disabled={isAnalyzing} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Engagement'}
                  </Button>
                </div>}
            </CardContent>
          </Card>}

        {/* Analysis Results */}
        {analysisComplete && <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
                <span>Engagement Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 p-6 rounded-lg border border-emerald-500/30">
                  <h3 className="text-emerald-300 text-sm font-semibold uppercase tracking-wide">Overall Score</h3>
                  <p className="text-3xl font-bold text-white mt-2">87/100</p>
                  <p className="text-emerald-200 text-sm mt-1">Highly Engaging</p>
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

              <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h3 className="text-white text-lg font-semibold mb-3">AI Recommendations</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Strong opening hook keeps viewers engaged</li>
                  <li>• Consider adding more dynamic camera movements</li>
                  <li>• Audio quality is excellent - maintain this standard</li>
                  <li>• Content pacing is optimal for audience retention</li>
                </ul>
              </div>

              <Button onClick={() => {
            setAnalysisComplete(false);
            setUploadedFile(null);
          }} className="mt-6 bg-white text-black hover:bg-gray-200 transition-colors w-full">
                Analyze Another Video
              </Button>
            </CardContent>
          </Card>}
      </div>
    </div>;
};

export default Index;
