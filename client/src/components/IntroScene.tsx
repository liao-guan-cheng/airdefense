import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { soundManager } from '@/lib/sounds';
import Header from './Header';

const IntroScene: React.FC = () => {
  const { setPhase } = useGame();
  const [showNPC, setShowNPC] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [typedText, setTypedText] = useState('');

  const fullText = '「面對防空警報的威脅，你是否願意接受挑戰，成為一名防空避難戰士？」';

  useEffect(() => {
    const npcTimer = setTimeout(() => setShowNPC(true), 600);
    const textTimer = setTimeout(() => setShowText(true), 1500);
    const buttonTimer = setTimeout(() => setShowButton(true), 4500);

    return () => {
      clearTimeout(npcTimer);
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // 打字機效果
  useEffect(() => {
    if (!showText) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [showText]);

  const handleAccept = () => {
    soundManager.playClick();
    soundManager.playAlert();
    setPhase('name-input');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* 背景圖片 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/bg-intro.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 暗色覆蓋層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-blue-900/60 to-slate-900/80" />

      {/* 掃描線效果 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* 粒子裝飾 */}
      <div className="absolute inset-0 particle-bg pointer-events-none" />

      {/* 角落裝飾 - 左上 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-16 sm:top-24 left-3 sm:left-6 text-blue-400/60"
      >
        <svg width="40" height="40" viewBox="0 0 60 60" fill="none" className="sm:w-[60px] sm:h-[60px]">
          <path d="M0 0 L20 0 L20 4 L4 4 L4 20 L0 20 Z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* 角落裝飾 - 右下 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-4 sm:bottom-6 right-3 sm:right-6 text-blue-400/60"
      >
        <svg width="40" height="40" viewBox="0 0 60 60" fill="none" className="sm:w-[60px] sm:h-[60px]">
          <path d="M60 60 L40 60 L40 56 L56 56 L56 40 L60 40 Z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* 主要內容 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-14 sm:pt-20 pb-6">
        {/* NPC角色 */}
        <AnimatePresence>
          {showNPC && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="mb-3 sm:mb-6"
            >
              <div className="relative">
                {/* 光暈效果 */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl scale-110" />
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/police-npc-new-K6AmNkBatb8SgH3pn9orhM.webp"
                  alt="警察NPC"
                  className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 標題 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-3 sm:mb-6"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-1 sm:mb-2"
            style={{ fontFamily: "'Noto Sans TC', sans-serif", textShadow: '0 2px 20px rgba(59, 130, 246, 0.5)' }}
          >
            防空避難守護者
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-blue-300 font-medium tracking-widest"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            BEYBLADE CHALLENGE
          </p>
        </motion.div>

        {/* 對話框 */}
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-2xl mb-4 sm:mb-8"
            >
              <div className="glass-panel rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 neon-border">
                {/* NPC名稱標籤 */}
                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-blue-300 font-bold text-xs sm:text-sm tracking-wide">警察人員</span>
                </div>

                {/* 打字機文字 */}
                <p className="text-white text-sm sm:text-lg md:text-xl leading-relaxed font-medium">
                  {typedText}
                  {typedText.length < fullText.length && (
                    <span className="inline-block w-0.5 h-4 sm:h-5 bg-blue-400 ml-1 animate-pulse" />
                  )}
                </p>

                {/* 補充說明 */}
                {typedText.length >= fullText.length && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-blue-200/80 text-xs sm:text-base mt-2 sm:mt-4 leading-relaxed"
                  >
                    透過完成三大主題的挑戰，組裝出你的防空避難守護者陀螺，最後擊敗空襲威脅者！
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 接受挑戰按鈕 */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-sm sm:max-w-none sm:w-auto"
            >
              <Button
                onClick={handleAccept}
                className="relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-base sm:text-lg md:text-xl px-8 sm:px-10 py-5 sm:py-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-200 active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  願意接受挑戰
                </span>
                <div className="absolute inset-0 animate-shimmer" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntroScene;
