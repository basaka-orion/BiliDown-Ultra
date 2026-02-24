"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, BookOpen, ExternalLink, Github, ChevronRight, Check } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState<'download' | 'tutorial' | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!url) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setMode('download');
    }, 1500);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          BiliDown <span className="text-[#FB7299]">Ultra</span>
        </h1>
        <p className="text-zinc-400 text-lg">最高质感的 B 站资源获取方案</p>
      </motion.div>

      <div className="w-full glass rounded-3xl p-2 flex items-center mb-12 pink-glow">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="粘贴 B 站视频链接 (BV/av/ep)..."
          className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-zinc-600"
        />
        <button 
          onClick={handleAnalyze}
          disabled={analyzing}
          className="bg-[#FB7299] hover:bg-[#ff85a9] text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {analyzing ? "识别中..." : "解析链接"}
          <Search size={18} />
        </button>
      </div>

      <AnimatePresence>
        {mode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full grid md:grid-cols-2 gap-6"
          >
            <div 
              onClick={() => setMode('download')}
              className={`p-8 rounded-3xl cursor-pointer transition-all border-2 ${mode === 'download' ? 'border-[#FB7299] bg-[#FB7299]/5' : 'border-transparent glass opacity-60'}`}
            >
              <Download className="text-[#FB7299] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">专业下载模式</h3>
              <p className="text-zinc-400 text-sm">获取 4K/8K/HDR 源码，支持 BBDown 指令生成。</p>
            </div>
            <div 
              onClick={() => setMode('tutorial')}
              className={`p-8 rounded-3xl cursor-pointer transition-all border-2 ${mode === 'tutorial' ? 'border-[#FB7299] bg-[#FB7299]/5' : 'border-transparent glass opacity-60'}`}
            >
              <BookOpen className="text-[#FB7299] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">AI 教程转化</h3>
              <p className="text-zinc-400 text-sm">将视频内容转化为图文步骤，零基础快速上手。</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mode === 'download' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-12 space-y-6"
          >
            <div className="glass rounded-3xl p-8">
              <h4 className="font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="text-[#FB7299]" /> 步骤 1：准备工具
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://github.com/nilaoda/BBDown/releases" target="_blank" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                  <span>BBDown 核心 (命令行)</span>
                  <ExternalLink size={16} />
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                  <span>BBDown_GUI (小白推荐)</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h4 className="font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="text-[#FB7299]" /> 步骤 2：执行指令
              </h4>
              <div className="bg-black/40 p-6 rounded-2xl font-mono text-sm text-zinc-300 relative group">
                <code>BBDown {url || "VIDEO_URL"} --video-only --audio-only</code>
                <button className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors">
                  <Check size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {mode === 'tutorial' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-12 glass rounded-3xl p-8 prose prose-invert max-w-none"
          >
            <h2 className="text-[#FB7299]">AI 视频解析报告</h2>
            <p>正在解析该视频的字幕与关键帧...</p>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-full bg-[#FB7299]" 
              />
            </div>
            <p className="text-sm text-zinc-500 mt-4">提示：该功能需要集成 bilibili-api 与 LLM 接口，当前为演示界面。</p>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-auto pt-20 pb-10 text-zinc-600 text-sm flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <a href="https://github.com/basaka-orion/BiliDown-Ultra" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
            <Github size={16} /> GitHub
          </a>
        </div>
        <p>© 2026 BiliDown-Ultra. 仅供学习交流使用。</p>
      </footer>
    </main>
  );
}
