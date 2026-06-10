import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-panel border-b border-blue-400/30 border-t-0 border-l-0 border-r-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* 左側：臺南市政府警察局Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/logo.png"
              alt="臺南市政府警察局新營分局"
              className="h-7 sm:h-10 md:h-12 object-contain"
            />
          </div>

          {/* 中央：遊戲標題 - 只在桌面顯示 */}
          <div className="text-center hidden md:block">
            <h1 className="text-white font-bold text-sm" style={{fontSize: '19px'}}>
              你想成為防空避難戰士嗎？
            </h1>
            <p className="text-blue-300/70 text-xs" style={{fontSize: '16px'}}>
              8月7日10點至10點半 
讓我們一起GO~避難吧!
            </p>
          </div>

          {/* 右側：裝飾 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px] sm:text-xs font-medium hidden sm:inline">ONLINE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
