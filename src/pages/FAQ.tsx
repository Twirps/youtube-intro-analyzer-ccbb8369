
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const FAQ = () => {
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
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/faq" className="text-white hover:text-gray-300 transition-colors font-medium">FAQ</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about VideoAnalyzer
          </p>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-700/50">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  What video formats are supported?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  VideoAnalyzer supports most common video formats including MP4, AVI, MOV, WMV, and MKV. 
                  We recommend MP4 format for the best compatibility and fastest processing times.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  How long does the analysis take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Analysis typically takes 2-3 minutes depending on the video quality and file size. 
                  Our AI focuses on the first minute of your video for engagement analysis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  What metrics does the AI analyze?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Our AI analyzes multiple engagement factors including:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Hook effectiveness in the opening seconds</li>
                    <li>Visual appeal and quality</li>
                    <li>Audio clarity and quality</li>
                    <li>Content pacing and rhythm</li>
                    <li>Predicted viewer retention</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  Is my video data secure?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Yes, your privacy is our priority. Videos are processed securely and are not stored 
                  permanently on our servers. All uploaded content is deleted after analysis completion.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  What's the maximum file size?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Currently, we support video files up to 500MB in size. Since we only analyze the 
                  first minute, larger files will be processed but only the initial portion will be examined.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  How accurate are the engagement predictions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Our AI model has been trained on thousands of YouTube videos and their engagement metrics. 
                  While predictions are highly accurate for general trends, individual results may vary 
                  based on your specific audience and niche.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  Can I analyze the same video multiple times?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Yes, you can analyze the same video multiple times. This can be useful if you've 
                  made edits based on our recommendations and want to see how the scores improve.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-gray-700/50">
                <AccordionTrigger className="text-white hover:text-gray-300">
                  Do you provide recommendations for improvement?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Absolutely! Along with the engagement scores, we provide specific, actionable 
                  recommendations to help improve your video's engagement potential based on 
                  YouTube best practices and our AI analysis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Have a question that's not answered here?</p>
          <Link 
            to="/" 
            className="inline-block bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Try VideoAnalyzer Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
