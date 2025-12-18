
import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Sparkles, 
  Type, 
  Image as ImageIcon,
  Loader2,
  Share2,
  CheckCircle2,
  Key,
  Layers,
  Zap,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { User, Resolution, CreativeStyle, ImageQuality } from '../../types';

// Fix: Use optional property for aistudio in Window interface to avoid modifier mismatch errors with existing definitions
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

const RESOLUTIONS: Record<Resolution, { w: number, h: number, ratio: string }> = {
  '1000x1500': { w: 450, h: 600, ratio: '3:4' },
  '1000x1000': { w: 400, h: 400, ratio: '1:1' },
  '1080x1920': { w: 337, h: 600, ratio: '9:16' }
};

const STYLE_PRESETS: Record<CreativeStyle, { label: string, promptSuffix: string }> = {
  photographic: { 
    label: 'Photorealistic', 
    promptSuffix: 'high-end photography, 8k resolution, highly detailed, realistic textures, natural lighting, professional camera' 
  },
  cinematic: { 
    label: 'Cinematic', 
    promptSuffix: 'cinematic lighting, dramatic shadows, movie still quality, moody, anamorphic, sharp focus' 
  },
  digital_art: { 
    label: 'Digital Art', 
    promptSuffix: 'vibrant digital illustration, detailed artstation style, smooth gradients, imaginative' 
  },
  '3d_render': { 
    label: '3D Render', 
    promptSuffix: 'unreal engine 5, octane render, stylized 3d, soft shadows, clay-like smooth texture, playful' 
  },
  neon_cyber: { 
    label: 'Neon/Cyberpunk', 
    promptSuffix: 'neon glow, futuristic city vibes, synthwave aesthetic, cyan and magenta lighting' 
  },
  minimalist_vector: { 
    label: 'Minimalist', 
    promptSuffix: 'flat vector illustration, bold graphic design, clean lines, minimalist, solid colors, modern branding' 
  }
};

const Editor: React.FC<{ user: User }> = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [resKey, setResKey] = useState<Resolution>('1000x1500');
  const [style, setStyle] = useState<CreativeStyle>('photographic');
  const [quality, setQuality] = useState<ImageQuality>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [overlayText, setOverlayText] = useState('YOUR VIRAL HEADLINE');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(36);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const savedPrompt = localStorage.getItem('last_ai_prompt');
    if (savedPrompt) {
      setPrompt(savedPrompt);
      localStorage.removeItem('last_ai_prompt');
    }

    const checkKey = async () => {
      try {
        // Fix: Use optional chaining for window.aistudio to handle potential undefined state safely
        const selected = await window.aistudio?.hasSelectedApiKey();
        if (selected !== undefined) {
          setHasApiKey(selected);
        }
      } catch (e) {
        console.log("AIStudio not available in this environment");
      }
    };
    checkKey();
  }, []);

  const handleOpenKeySelector = async () => {
    try {
      // Fix: Use optional chaining for window.aistudio
      await window.aistudio?.openSelectKey();
      // Guideline: Assume the key selection was successful after triggering openSelectKey()
      setHasApiKey(true);
    } catch (e) {
      alert("Key selector failed. Please check your browser settings.");
    }
  };

  const generateImage = async () => {
    if (!prompt) return;
    setErrorMessage(null);

    // Only force key selection if user specifically asks for Pro quality (2K)
    if (quality === '2K' && !hasApiKey) {
      await handleOpenKeySelector();
      // Guideline: Proceed after triggering openSelectKey to avoid potential race conditions where state isn't immediately true
    }

    setIsGenerating(true);
    try {
      // Guideline: Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullPrompt = `${prompt}. Style: ${STYLE_PRESETS[style].promptSuffix}. Pinterest aesthetic, professional quality.`;
      
      // Select model based on quality: 1K (Free/Standard) vs 2K (Pro)
      const modelToUse = quality === '1K' ? 'gemini-2.5-flash-image' : 'gemini-3-pro-image-preview';
      
      const response = await ai.models.generateContent({
        model: modelToUse,
        contents: {
          parts: [{ text: fullPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: RESOLUTIONS[resKey].ratio as any,
            // imageSize is only supported on gemini-3-pro-image-preview
            ...(quality === '2K' ? { imageSize: '2K' } : {})
          }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        let foundImage = false;
        // Guideline: Iterate through all parts to find the image part, do not assume it is the first part.
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
        if (!foundImage) {
          setErrorMessage("The AI didn't return an image. Try a different prompt.");
        }
      }
    } catch (error: any) {
      console.error("Generation failed", error);
      // Guideline: If the request fails with "Requested entity was not found.", reset key selection state
      if (error.message?.includes("Requested entity was not found") || error.message?.includes("404")) {
        setErrorMessage("Requested entity not found. Please ensure you have a valid Paid Key selected.");
        setHasApiKey(false);
      } else {
        setErrorMessage(error.message || "An unexpected error occurred during generation.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const render = () => {
      const { w, h } = RESOLUTIONS[resKey];
      canvas.width = w;
      canvas.height = h;

      if (generatedImage) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = generatedImage;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, w, h);
          drawOverlay(ctx, w, h);
        };
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        
        // Draw placeholder grid
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        for(let i=0; i<w; i+=20) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
        }
        for(let j=0; j<h; j+=20) {
          ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
        }

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('DESIGN CANVAS READY', w / 2, h / 2);
        drawOverlay(ctx, w, h);
      }
    };

    const drawOverlay = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.save();
      ctx.fillStyle = textColor;
      ctx.font = `bold ${fontSize}px Inter`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 10;
      
      const words = overlayText.split(' ');
      let y = h * 0.3; 
      
      words.forEach(word => {
        ctx.fillText(word.toUpperCase(), w / 2, y);
        y += fontSize + 10;
      });
      ctx.restore();
    };

    render();
  }, [generatedImage, overlayText, resKey, textColor, fontSize, style]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `pinpro-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setPrompt('');
    setErrorMessage(null);
    setOverlayText('YOUR VIRAL HEADLINE');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 max-w-[1400px] mx-auto pb-12 animate-in fade-in duration-700">
      {/* Sidebar Controls */}
      <div className="w-full xl:w-[420px] space-y-6 bg-white p-8 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 h-fit">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-100">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Pin Studio</h2>
          </div>
          <button onClick={handleReset} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
             <RotateCcw size={20} />
          </button>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-3xl flex items-start gap-3 animate-in slide-in-from-top duration-300">
            <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
            <p className="text-xs font-bold text-red-700 leading-tight">{errorMessage}</p>
          </div>
        )}

        <section className="space-y-4">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">1. Visual Prompt</label>
          <div className="relative group">
            <textarea
              placeholder="A magical forest with floating lanterns, cinematic lighting..."
              className="w-full p-5 bg-gray-50 border border-transparent rounded-3xl resize-none focus:ring-4 focus:ring-red-50 focus:bg-white outline-none text-sm transition-all font-medium min-h-[120px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">2. Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(RESOLUTIONS) as Resolution[]).map(r => (
                <button
                  key={r}
                  onClick={() => setResKey(r)}
                  className={`py-3 rounded-2xl text-[10px] font-black border transition-all ${resKey === r ? 'bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-200' : 'bg-white border-gray-100 text-gray-400 hover:border-red-200 hover:text-red-600'}`}
                >
                  {r.split('x').join(' : ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">3. Creative Style</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(STYLE_PRESETS) as CreativeStyle[]).map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`p-4 rounded-[2rem] text-[10px] text-left border transition-all flex flex-col gap-1.5 ${style === s ? 'bg-red-50 border-red-200 shadow-sm' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
                >
                  <span className={`font-black uppercase tracking-tight ${style === s ? 'text-red-600' : 'text-gray-600'}`}>
                    {STYLE_PRESETS[s].label}
                  </span>
                  <div className="w-full h-1 bg-gray-200/50 rounded-full overflow-hidden">
                    <div className={`h-full bg-red-500 transition-all duration-700 ${style === s ? 'w-full' : 'w-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent">
             <div className="flex items-center gap-2">
               <Layers size={16} className="text-gray-400" />
               <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Quality</span>
             </div>
             <select 
               value={quality}
               onChange={(e) => setQuality(e.target.value as ImageQuality)}
               className="bg-transparent text-[10px] font-black text-red-600 outline-none cursor-pointer uppercase tracking-widest"
             >
               <option value="1K">1K (Standard / Free)</option>
               <option value="2K">2K (High-Def / Pro)</option>
             </select>
          </div>
        </section>

        <button
          onClick={generateImage}
          disabled={isGenerating || !prompt}
          className="w-full py-5 bg-red-600 text-white rounded-[2.5rem] font-black text-sm flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-[0_20px_40px_-10px_rgba(220,38,38,0.3)] disabled:opacity-50 group hover:scale-[1.02] active:scale-95"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles className="group-hover:rotate-12 transition-transform" size={20} />}
          {isGenerating ? 'AI Rendering...' : 'Generate AI Image'}
        </button>

        <div className="h-px bg-gray-100 mx-4" />

        <section className="space-y-4">
          <div className="flex items-center gap-2">
             <Type size={16} className="text-red-600" />
             <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">4. Design Overlay</h3>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={overlayText}
              onChange={(e) => setOverlayText(e.target.value)}
              className="w-full p-5 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-red-50 focus:bg-white outline-none font-bold text-sm transition-all"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Text Size</label>
                   <span className="text-[10px] font-bold text-red-600">{fontSize}px</span>
                </div>
                <input 
                  type="range" min="20" max="100" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>
              <input 
                type="color" 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)}
                className="w-14 h-14 rounded-2xl cursor-pointer border-4 border-white shadow-sm p-1 bg-gray-100 hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </section>

        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            disabled={!generatedImage}
            className="flex-1 py-5 bg-gray-900 text-white rounded-[2.5rem] font-black text-sm flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-gray-200 disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            <Download size={18} />
            Export Pin
          </button>
          <button className="px-6 py-5 bg-white border border-gray-100 text-gray-400 rounded-[2rem] font-bold hover:bg-gray-50 transition-all active:scale-95">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Main Canvas Display */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[750px] bg-white lg:bg-transparent rounded-[4rem]">
        <div className="relative group">
          <div className="absolute -inset-10 bg-gradient-to-br from-red-600/5 via-transparent to-indigo-600/5 rounded-[5rem] blur-[80px] group-hover:blur-[100px] transition-all duration-1000" />
          
          <div className="relative shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white border-[12px] border-white ring-1 ring-gray-100">
            <canvas 
              ref={canvasRef} 
              className="block transition-all duration-500"
            />
            
            {isGenerating && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-12">
                <div className="relative mb-12 scale-150">
                  <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-red-200 animate-spin-slow">
                    <Sparkles className="text-white" size={36} />
                  </div>
                </div>
                <h3 className="text-4xl font-black text-gray-900 leading-tight tracking-tight">AI Engine <br/>is Rendering...</h3>
                <p className="mt-4 text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Creating your unique visual</p>
                <div className="mt-10 flex items-center gap-3 px-6 py-3 bg-red-50 text-red-600 rounded-full border border-red-100 shadow-sm">
                  <Loader2 className="animate-spin" size={16} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">{STYLE_PRESETS[style].label} Mode</span>
                </div>
              </div>
            )}
          </div>

          <div className="absolute -right-16 top-16 flex flex-col gap-4">
             <div className="bg-white/90 backdrop-blur shadow-2xl p-4 rounded-3xl border border-white rotate-6 hover:rotate-0 transition-all cursor-default">
                <CheckCircle2 className="text-green-500" size={28} />
             </div>
             <div className="bg-red-600 shadow-2xl p-4 rounded-3xl border border-red-400 -rotate-6 hover:rotate-0 transition-all cursor-default group/icon">
                <Zap className="text-white group-hover/icon:scale-125 transition-transform" size={28} />
             </div>
          </div>
        </div>
        
        <div className="mt-16 text-center space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] opacity-40">Master Studio Preview</p>
          <div className="flex items-center justify-center gap-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
            <span className="bg-gray-100 px-4 py-2 rounded-xl">{RESOLUTIONS[resKey].ratio} RATIO</span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
            <span className="bg-gray-100 px-4 py-2 rounded-xl">{quality} {quality === '1K' ? 'Standard' : 'HD'}</span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
            <span className="bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-100">{STYLE_PRESETS[style].label}</span>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        input[type="range"]::-webkit-slider-thumb {
          width: 16px;
          height: 16px;
          background: #dc2626;
          border-radius: 50%;
          cursor: pointer;
          -webkit-appearance: none;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Editor;
