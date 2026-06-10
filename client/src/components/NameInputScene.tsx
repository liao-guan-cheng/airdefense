import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';
import Header from './Header';

const NameInputScene: React.FC = () => {
  const { setPlayerName: setGlobalPlayerName, startGame } = useGame();
  const [playerName, setPlayerName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (playerName.trim()) {
      setIsSubmitted(true);
      setGlobalPlayerName(playerName.trim());
      localStorage.setItem('playerName', playerName.trim());
      setTimeout(() => {
        startGame();
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* 背景圖片 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/manus-storage/game-background-intro_c3486aef.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />

      {/* 主要內容 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-14 sm:pt-20 pb-6">
        {/* 警察角色 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-3 sm:mb-6"
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/police-npc-new-K6AmNkBatb8SgH3pn9orhM.webp"
            alt="警察NPC"
            className="w-24 h-28 sm:w-32 sm:h-40 md:w-40 md:h-48 object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* 對話框 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-lg w-full neon-border"
        >
          {!isSubmitted ? (
            <>
              {/* NPC 名稱 */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-green-300">警察人員</span>
              </div>

              {/* 問題文字 */}
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-6 leading-relaxed">
                防空避難戰士，你準備好接受挑戰了嗎？請告訴我你的大名叫？
              </h2>

              {/* 名字輸入框 */}
              <div className="mb-4 sm:mb-5">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="請輸入你的名字..."
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.slice(0, 20))}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-slate-800/80 border-slate-600 text-white placeholder:text-slate-500 rounded-lg sm:rounded-xl py-4 sm:py-5 px-3 sm:px-4 text-sm sm:text-base focus:border-blue-400 focus:ring-blue-400/30"
                    autoFocus
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-slate-500">
                    {playerName.length}/20
                  </span>
                </div>
              </div>

              {/* 確認按鈕 */}
              <Button
                onClick={handleSubmit}
                disabled={!playerName.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-slate-700 disabled:to-slate-600 disabled:opacity-50 text-white font-bold py-4 sm:py-5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-[0.97] text-sm sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-[18px] sm:h-[18px]">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                  確認出發
                </span>
              </Button>
            </>
          ) : (
            /* 成功狀態 */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-3 sm:py-4"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
                歡迎你，<span className="text-yellow-400">{playerName}</span>！
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">準備開始你的防空避難守護者之旅...</p>
              <div className="mt-3 sm:mt-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NameInputScene;
