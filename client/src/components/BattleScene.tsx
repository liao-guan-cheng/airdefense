import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { soundManager } from '@/lib/sounds';
import { addToLeaderboard } from '@/lib/leaderboard';
import Header from './Header';

const GUARDIAN_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/beyblade-guardian-new-2divrVh2tQ6XvR4F6zQEX3.webp';
const BATTLE_VIDEO = '/__manus__/battle.mp4';
const LOGO_IMG = '/__manus__/logo.png';

/**
 * 對決場景：
 * Phase 0 - 倒數 3、2、1、GO~SHOOT!
 * Phase 1 - 播放對決影片
 * Phase 2 - 勝利畫面（可截圖）
 */
const BattleScene: React.FC = () => {
  const { gameState, setPhase, resetGame } = useGame();
  const [battlePhase, setBattlePhase] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const playerName = gameState.playerName || localStorage.getItem('playerName') || '防空避難戰士';
  const certificateRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rank, setRank] = useState<number>(0);

  // 倒數動畫
  useEffect(() => {
    if (battlePhase !== 0) return;

    const timers = [
      setTimeout(() => { setCountdown(3); soundManager.playCountdown(); }, 500),
      setTimeout(() => { setCountdown(2); soundManager.playCountdown(); }, 1500),
      setTimeout(() => { setCountdown(1); soundManager.playCountdown(); }, 2500),
      setTimeout(() => { setCountdown(0); soundManager.playGo(); }, 3500), // GO~SHOOT!
      setTimeout(() => { setBattlePhase(1); }, 4500), // 開始播放影片
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [battlePhase]);

  // 影片播放結束後進入勝利畫面
  const handleVideoEnd = () => {
    setBattlePhase(2);
    soundManager.playVictory();
  };

  // 影片開始播放
  useEffect(() => {
    if (battlePhase === 1 && videoRef.current) {
      videoRef.current.play().catch(() => {
        // 自動播放失敗時，顯示播放按鈕
      });
    }
  }, [battlePhase]);

  // 儲存排行榜
  useEffect(() => {
    if (battlePhase === 2) {
      const totalQ = gameState.correctAnswers + (17 - gameState.correctAnswers);
      const entry = {
        name: playerName,
        score: gameState.score,
        correctCount: gameState.correctAnswers,
        totalQuestions: 17,
        averageTime: gameState.totalTimeSpent / Math.max(totalQ, 1),
        date: new Date().toLocaleDateString('zh-TW'),
      };
      const position = addToLeaderboard(entry);
      setRank(position);
    }
  }, [battlePhase]);

  const handleScreenshot = async () => {
    if (!certificateRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `防空避難戰士_${playerName}_證書.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('請使用手機或電腦的截圖功能來保存畫面！');
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
      <Header />

      {/* ===== 倒數階段 (battlePhase === 0) ===== */}
      <AnimatePresence mode="wait">
        {battlePhase === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-20">
            {/* 背景氛圍 */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-slate-900 to-red-900/30" />

            {/* VS 對陣資訊 */}
            <div className="absolute top-20 sm:top-28 left-0 right-0 flex items-center justify-center gap-4 sm:gap-8 px-4">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-blue-500/20 border-2 border-blue-400/50 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl sm:text-4xl">🛡️</span>
                </div>
                <p className="text-blue-300 font-bold text-xs sm:text-sm">防空避難守護者</p>
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
                VS
              </div>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-red-500/20 border-2 border-red-400/50 flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl sm:text-4xl">💀</span>
                </div>
                <p className="text-red-300 font-bold text-xs sm:text-sm">空襲威脅者</p>
              </div>
            </div>

            {/* 倒數數字 */}
            <motion.div
              key={countdown}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10"
            >
              {countdown > 0 ? (
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)', width: '200px', height: '200px', top: '-50px', left: '-50px' }}
                  />
                  <span
                    className="relative text-[120px] sm:text-[180px] md:text-[220px] font-black text-white block"
                    style={{ textShadow: '0 0 60px rgba(59, 130, 246, 0.9), 0 0 120px rgba(59, 130, 246, 0.5), 0 4px 8px rgba(0,0,0,0.5)' }}
                  >
                    {countdown}
                  </span>
                </div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.2, repeat: 4 }}
                >
                  <span
                    className="block text-[50px] sm:text-[80px] md:text-[120px] font-black text-yellow-400"
                    style={{
                      textShadow: '0 0 60px rgba(250, 204, 21, 0.9), 0 0 120px rgba(250, 204, 21, 0.5), 0 4px 8px rgba(0,0,0,0.5)',
                      fontFamily: 'Orbitron, sans-serif',
                    }}
                  >
                    GO~SHOOT!
                  </span>
                  {/* 放射線效果 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 bg-yellow-400/40"
                        style={{
                          height: '200px',
                          transform: `rotate(${i * 30}deg)`,
                          transformOrigin: 'center center',
                        }}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: [0, 0.6, 0] }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* 底部提示 */}
            <motion.p
              className="absolute bottom-8 sm:bottom-12 text-slate-400 text-sm sm:text-base font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              準備進入最終對決...
            </motion.p>
          </div>
        )}
      </AnimatePresence>

      {/* ===== 影片播放階段 (battlePhase === 1) ===== */}
      {battlePhase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <video
            ref={videoRef}
            src={BATTLE_VIDEO}
            onEnded={handleVideoEnd}
            playsInline
            autoPlay
            muted
            className="w-full h-full object-contain"
            style={{ maxHeight: '100vh' }}
          />
          {/* 影片上方的對戰標題 */}
          <div className="absolute top-4 sm:top-6 left-0 right-0 text-center z-30 pointer-events-none">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20"
            >
              <span className="text-white font-bold text-sm sm:text-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                🛡️ 防空避難守護者 VS 空襲威脅者 💀
              </span>
            </motion.div>
          </div>
          {/* 跳過按鈕 */}
          <button
            onClick={() => { if (videoRef.current) videoRef.current.pause(); handleVideoEnd(); }}
            className="absolute bottom-6 right-6 z-30 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all text-sm"
          >
            跳過 →
          </button>
        </div>
      )}

      {/* ===== 勝利畫面 (battlePhase === 2) ===== */}
      <AnimatePresence>
        {battlePhase === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-14 sm:pt-20 pb-4 sm:pb-8"
          >
            {/* 背景效果 */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-sm sm:max-w-lg"
            >
              {/* 可截圖的證書區域 */}
              <div
                ref={certificateRef}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}
              >
                {/* 裝飾邊框 */}
                <div className="absolute inset-0 border-2 sm:border-4 border-yellow-400/40 rounded-xl sm:rounded-2xl pointer-events-none" />
                <div className="absolute inset-1.5 sm:inset-2 border border-yellow-400/20 rounded-lg sm:rounded-xl pointer-events-none" />

                <div className="relative p-4 sm:p-6 md:p-8 text-center">
                  {/* Logo */}
                  <img
                    src={LOGO_IMG}
                    alt="臺南市政府警察局新營分局"
                    className="h-7 sm:h-9 mx-auto mb-2 sm:mb-3 object-contain"
                  />

                  {/* 勝利標題 */}
                  <div className="mb-2 sm:mb-3">
                    <motion.p
                      className="text-yellow-400 text-[10px] sm:text-xs font-medium tracking-widest mb-0.5 sm:mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      CONGRATULATIONS
                    </motion.p>
                    <motion.h2
                      className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      恭喜你挑戰成功
                    </motion.h2>
                    <motion.h2
                      className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      成為一名<span className="text-yellow-400">防空避難戰士</span>！
                    </motion.h2>
                  </div>

                  {/* 陀螺圖片 */}
                  <motion.div
                    className="my-3 sm:my-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <img
                      src={GUARDIAN_IMG}
                      alt="防空避難守護者"
                      className="w-16 h-16 sm:w-24 sm:h-24 mx-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    />
                  </motion.div>

                  {/* 玩家名字 */}
                  <motion.div
                    className="mb-2 sm:mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <p className="text-slate-400 text-[10px] sm:text-xs mb-0.5">防空避難戰士</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{playerName}</p>
                  </motion.div>

                  {/* 成績 */}
                  <motion.div
                    className="flex justify-center gap-3 sm:gap-4 mb-2 sm:mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="text-center">
                      <p className="text-slate-400 text-[10px] sm:text-xs mb-0.5">總得分</p>
                      <p className="text-base sm:text-lg font-bold text-yellow-400">{gameState.score}</p>
                    </div>
                    <div className="w-px bg-slate-700" />
                    <div className="text-center">
                      <p className="text-slate-400 text-[10px] sm:text-xs mb-0.5">正確率</p>
                      <p className="text-base sm:text-lg font-bold text-green-400">
                        {Math.round((gameState.correctAnswers / 17) * 100)}%
                      </p>
                    </div>
                  </motion.div>

                  {/* Slogan */}
                  <motion.div
                    className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-700/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                  >
                    <p className="text-cyan-300 font-bold leading-relaxed" style={{ fontSize: '20px' }}>
                      防空避難戰士，8月7日10點至10點半
                    </p>
                    <p className="text-yellow-300 font-black mt-0.5 sm:mt-1" style={{ fontFamily: 'Orbitron, Noto Sans TC, sans-serif', fontSize: '20px' }}>
                      讓我們一起GO~~避難吧!
                    </p>
                  </motion.div>

                  {/* 日期 */}
                  <p className="text-slate-500 text-[10px] sm:text-xs mt-2 sm:mt-3">
                    {new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* 操作按鈕 */}
              <motion.div
                className="mt-3 sm:mt-5 space-y-2 sm:space-y-2.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
              >
                <Button
                  onClick={handleScreenshot}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-900 font-bold py-3.5 sm:py-5 rounded-lg sm:rounded-xl shadow-lg shadow-yellow-500/20 transition-all duration-200 active:scale-[0.97] text-sm sm:text-base"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sm:w-[18px] sm:h-[18px]">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    儲存成績截圖
                  </span>
                </Button>

                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-medium py-3.5 sm:py-5 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base"
                >
                  重新挑戰
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BattleScene;
