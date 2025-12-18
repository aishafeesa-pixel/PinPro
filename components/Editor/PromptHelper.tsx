
import React, { useState } from 'react';
import { Sparkles, MessageSquare, Copy, ArrowRight, Loader2, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from 'react-router-dom';

const PromptHelper: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGeneratePrompt = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a Pinterest Marketing Expert. I will give you a topic or business idea, and you will write 3 highly descriptive, aesthetic image generation prompts that I can use to create a viral Pinterest Pin. The prompts should focus on lighting, mood, and composition. 
      Topic: ${input}`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setResponse(result.text || "Sorry, I couldn't generate a prompt right now.");
    } catch (error) {
      console.error("AI Assistant error:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToGenerator = (text: string) => {
    // In a real app, we might use a global state or search params
    // For this demo, we'll just navigate to editor with a placeholder or simple logic
    localStorage.setItem('last_ai_prompt', text);
    navigate('/app/editor');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-2">
          <MessageSquare size={32} />
        </div>
        <h1 className="text-4xl font-black text-gray-900">AI Prompt Assistant</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Tell us what your pin is about, and our AI will craft the perfect artistic prompt to ensure your pin looks professional and viral.</p>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-gray-100 border border-gray-100 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Your Topic / Idea</label>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. A healthy vegan breakfast bowl blog post"
              className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-indigo-50 focus:bg-white outline-none transition-all text-lg font-medium min-h-[150px] resize-none"
            />
            <button
              onClick={handleGeneratePrompt}
              disabled={isLoading || !input}
              className="absolute bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
            </button>
          </div>
        </div>

        {response && (
          <div className="pt-8 space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="h-px bg-gray-100" />
            <div className="flex items-center gap-2 text-indigo-600">
              <Sparkles size={18} />
              <span className="text-sm font-black uppercase tracking-widest">AI Suggested Prompts</span>
            </div>
            <div className="space-y-4">
              {response.split('\n').filter(line => line.trim().length > 10).map((p, i) => (
                <div key={i} className="group p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex items-start justify-between gap-6 hover:bg-white hover:shadow-lg transition-all">
                  <p className="text-gray-700 leading-relaxed font-medium">{p.replace(/^\d+\.\s*/, '')}</p>
                  <button 
                    onClick={() => copyToGenerator(p.replace(/^\d+\.\s*/, ''))}
                    className="shrink-0 p-3 bg-white border border-indigo-100 rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition shadow-sm flex items-center gap-2"
                  >
                    <ArrowRight size={18} />
                    <span className="text-xs font-bold uppercase">Use</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
          <h4 className="text-red-700 font-black mb-2 uppercase tracking-tight text-sm">Pro Tip</h4>
          <p className="text-red-600 text-sm leading-relaxed">Be specific! Instead of "food", try "Rustic Italian pasta on a dark wooden table with soft side lighting".</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
          <h4 className="text-amber-700 font-black mb-2 uppercase tracking-tight text-sm">Why use this?</h4>
          <p className="text-amber-600 text-sm leading-relaxed">Better prompts lead to better AI images. This tool ensures you use the right keywords for the Pinterest aesthetic.</p>
        </div>
      </div>
    </div>
  );
};

export default PromptHelper;
