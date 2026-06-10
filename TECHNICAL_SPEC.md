# 防空避難守護者：陀螺對決挑戰賽 — 技術規格書

> **專案名稱：** air-defense-game  
> **版本：** 1.0.0  
> **建置日期：** 2026年6月10日  
> **委託單位：** 臺南市政府警察局新營分局  
> **用途：** 115年南部地區城鎮韌性演習防空避難宣導網頁遊戲

---

## 目錄

1. [遊戲核心邏輯與規則](#1-遊戲核心邏輯與規則)
2. [使用的前端框架與套件](#2-使用的前端框架與套件)
3. [畫面元件布局與 UI 樣式說明](#3-畫面元件布局與-ui-樣式說明)
4. [完整的核心 JavaScript 遊戲運行邏輯代碼](#4-完整的核心-javascript-遊戲運行邏輯代碼)

---

## 1. 遊戲核心邏輯與規則

### 1.1 遊戲概述

本遊戲以「戰鬥陀螺」為主題包裝，結合防空避難知識問答，透過「收集零件→組裝陀螺→對決敵人」的闖關模式，向玩家宣導防空避難觀念、避難處所查詢方式及緊急避難包準備知識。

### 1.2 遊戲流程

遊戲採用 **Phase-Based（階段制）** 狀態機驅動，共有 8 個遊戲階段：

| 階段代號 | 階段名稱 | 說明 |
|---------|---------|------|
| `intro` | 開場動畫 | 警察NPC出場，邀請玩家接受挑戰 |
| `name-input` | 名字輸入 | 玩家輸入姓名，建立身份 |
| `challenge-select` | 挑戰選擇 | 選擇三大主題之一進行問答 |
| `quiz` | 問答挑戰 | 回答該主題的7道選擇題 |
| `assembly` | 陀螺組裝 | 完成三主題後，展示零件組裝動畫 |
| `battle` | 最終對決 | 3-2-1-GO SHOOT 倒數後播放對決影片 |
| `victory` | 勝利畫面 | 顯示成績證書（可截圖） |
| `leaderboard` | 排行榜 | 顯示歷史排名 |

### 1.3 三大挑戰主題與獎勵

| 主題分類 | 主題名稱 | 題目數量 | 獎勵零件 |
|---------|---------|---------|---------|
| `concept` | 防空避難觀念 | 7題 | 攻擊環 (Blade) |
| `app` | 防空避難處所查詢 | 7題 | 鋼鐵輪盤 (Armor) |
| `package` | 緊急避難包宣導 | 7題 | 軸底 (Driver) |

三個主題全部完成後，三個零件組合成一顆完整的「防空避難守護者」陀螺。

### 1.4 計分規則

**基礎分數：**
- 答對一題：+10 分
- 答錯或超時：+0 分

**時間獎勵：**
- 每題限時 30 秒
- 時間獎勵公式：`timeBonus = Math.max(0, Math.round((30 - timeSpent) / 6))`
- 即每快 6 秒額外加 1 分（最高每題 +5 分）
- 只有答對的題目才有時間獎勵

**總分公式：**
```
總分 = Σ (答對題目 × (10 + 時間獎勵))
最高可能分數 = 21 × (10 + 5) = 315 分
```

### 1.5 排行榜規則

- 使用 `localStorage` 儲存，最多保留 20 筆紀錄
- 排序規則：分數高者在前；分數相同時，平均答題時間短者在前
- 記錄欄位：玩家名稱、總分、正確題數、總題數、平均答題時間、日期

### 1.6 計時器規則

- 每題限時 30 秒
- 最後 5 秒會播放滴答聲警示
- 時間歸零時自動判定為答錯
- 計時器以環形進度條呈現，最後 5 秒變為紅色

### 1.7 對決規則

- 完成三個主題後進入組裝場景
- 組裝完成後進入最終對決
- 對決流程：倒數 3→2→1→GO~SHOOT! → 播放對決影片 → 勝利畫面
- 對決結果固定為「防空避難守護者」擊敗「空襲威脅者」

---

## 2. 使用的前端框架與套件

### 2.1 核心框架

| 套件名稱 | 版本 | 用途 |
|---------|------|------|
| React | ^19.2.1 | UI 框架 |
| TypeScript | 5.6.3 | 型別安全 |
| Vite | ^7.1.7 | 建置工具與開發伺服器 |
| Tailwind CSS | ^4.1.14 | 原子化 CSS 樣式框架 |

### 2.2 UI 元件庫

| 套件名稱 | 版本 | 用途 |
|---------|------|------|
| shadcn/ui (Radix UI) | 多版本 | 基礎 UI 元件（Button、Dialog、Progress 等） |
| Lucide React | ^0.453.0 | 圖示系統 |
| class-variance-authority | ^0.7.1 | 元件變體管理 |
| tailwind-merge | ^3.3.1 | Tailwind 類名合併 |

### 2.3 動畫與互動

| 套件名稱 | 版本 | 用途 |
|---------|------|------|
| Framer Motion | ^12.23.22 | 頁面過渡動畫、元素入場動畫 |
| tw-animate-css | ^1.4.0 | Tailwind 動畫擴展 |

### 2.4 功能性套件

| 套件名稱 | 版本 | 用途 |
|---------|------|------|
| html2canvas | ^1.4.1 | 成績證書截圖功能 |
| wouter | ^3.3.5 | 輕量級路由（本專案未使用 URL 路由，改為 Phase-Based） |
| sonner | ^2.0.7 | Toast 通知 |

### 2.5 開發工具

| 套件名稱 | 版本 | 用途 |
|---------|------|------|
| esbuild | ^0.25.0 | 伺服器端打包 |
| prettier | ^3.6.2 | 程式碼格式化 |
| pnpm | 10.4.1 | 套件管理器 |

### 2.6 字體

| 字體名稱 | 來源 | 用途 |
|---------|------|------|
| Noto Sans TC | Google Fonts | 主要中文字體 |
| Orbitron | Google Fonts | 科技感英文標題字體 |

### 2.7 自建模組（無外部依賴）

| 模組名稱 | 檔案路徑 | 用途 |
|---------|---------|------|
| SoundManager | `client/src/lib/sounds.ts` | Web Audio API 音效引擎 |
| Leaderboard | `client/src/lib/leaderboard.ts` | localStorage 排行榜管理 |
| GameContext | `client/src/contexts/GameContext.tsx` | 全域遊戲狀態管理 |
| Questions | `client/src/data/questions.ts` | 題目資料庫 |

---

## 3. 畫面元件布局與 UI 樣式說明

### 3.1 整體架構

```
App.tsx
├── ErrorBoundary          // 錯誤邊界
├── ThemeProvider (dark)   // 暗色主題
├── TooltipProvider        // 工具提示
├── Toaster                // 通知系統
└── Router
    ├── GameProvider       // 遊戲狀態
    ├── GameRouter         // Phase-Based 場景切換
    │   ├── IntroScene
    │   ├── NameInputScene
    │   ├── ChallengeSelect
    │   ├── QuizScene
    │   ├── AssemblyScene
    │   ├── BattleScene
    │   └── LeaderboardScene
    └── SoundToggle        // 全域音效開關
```

### 3.2 共用元件

**Header 元件**
- 固定於頁面頂部（`position: fixed`）
- 左側：臺南市政府警察局新營分局 Logo
- 中央（桌面版）：標題「你想成為防空避難戰士嗎？」+ 副標題「8月7日10點至10點半 讓我們一起GO~避難吧!」
- 右側：ONLINE 狀態指示燈
- 手機版隱藏中央標題，僅保留 Logo 和狀態燈

**SoundToggle 元件**
- 固定於右下角的圓形按鈕
- 切換靜音/開啟音效
- SVG 圖示切換

### 3.3 各場景布局說明

#### 3.3.1 開場場景 (IntroScene)

| 層級 | 元素 | 說明 |
|------|------|------|
| 背景層 | 城市夜景圖片 + 暗色遮罩 | 營造緊張氛圍 |
| 裝飾層 | 掃描線效果 + 粒子背景 + 角落SVG | 科技感裝飾 |
| 內容層 | 警察NPC圖片 + 對話框 | 打字機效果逐字顯示 |
| 互動層 | 「願意接受挑戰」按鈕 | 漸層色按鈕，帶脈動光暈 |

#### 3.3.2 名字輸入場景 (NameInputScene)

| 層級 | 元素 | 說明 |
|------|------|------|
| 背景層 | 同開場背景 | 視覺連續性 |
| 內容層 | 警察NPC + 玻璃面板對話框 | 包含輸入欄位 |
| 互動層 | 文字輸入框（限20字）+ 確認按鈕 | 支援 Enter 鍵提交 |
| 過渡層 | 歡迎訊息 + 載入動畫 | 1.5秒後自動跳轉 |

#### 3.3.3 挑戰選擇場景 (ChallengeSelect)

| 層級 | 元素 | 說明 |
|------|------|------|
| 頂部 | 進度指示器（3步驟） | 顯示已完成/進行中/待完成 |
| 主體 | 三張挑戰卡片 | 每張包含零件圖片、主題名稱、描述 |
| 卡片狀態 | 已完成（灰色+勾選）/ 可選擇（彩色+光暈） | 視覺區分 |

**三張卡片配色：**
- 攻擊環：藍色漸層（from-blue-600 to-cyan-500）
- 鋼鐵輪盤：紫色漸層（from-purple-600 to-pink-500）
- 軸底：橘色漸層（from-orange-500 to-red-500）

#### 3.3.4 問答場景 (QuizScene)

| 層級 | 元素 | 說明 |
|------|------|------|
| 頂部 | 進度條 + 題號 + 計時器 | 環形計時器，最後5秒變紅 |
| 中間 | 題目卡片 | 玻璃面板效果 |
| 下方 | 4個選項按鈕（A/B/C/D） | hover 時右移4px |
| 回饋 | 正確/錯誤提示 + 解釋說明 | 綠色勾/紅色叉 + 文字解釋 |
| 底部 | 「下一題」按鈕 | 回答後出現 |

#### 3.3.5 陀螺組裝場景 (AssemblyScene)

| 層級 | 元素 | 說明 |
|------|------|------|
| 標題 | 「零件收集完成！」 | 動態入場 |
| 主體 | 三個零件展示區 | 依序出現（0.8s/2.2s/3.6s） |
| 底部 | 完整陀螺展示 + 「進入最終對決」按鈕 | 5.2秒後出現 |

#### 3.3.6 對決場景 (BattleScene)

**Phase 0 - 倒數：**
- 全螢幕顯示 3→2→1→GO~SHOOT!
- 每個數字帶有縮放和脈動動畫
- 配合倒數音效和 GO 音效

**Phase 1 - 影片播放：**
- 全螢幕播放預錄的3D陀螺對決影片
- 提供「跳過」按鈕
- 影片結束後自動進入勝利畫面

**Phase 2 - 勝利證書：**
- 可截圖區域包含：Logo、恭喜標題、陀螺圖片、玩家名字、成績統計、Slogan、日期
- 操作按鈕：儲存截圖、查看排行榜、重新挑戰

#### 3.3.7 排行榜場景 (LeaderboardScene)

| 層級 | 元素 | 說明 |
|------|------|------|
| 標題 | 「排行榜」 | 帶獎杯圖示 |
| 列表 | 排名卡片（最多20筆） | 前三名特殊配色（金/銀/銅） |
| 規則 | 計分規則說明面板 | 玻璃面板展示 |
| 底部 | 「重新挑戰」按鈕 | 重置遊戲 |

### 3.4 設計系統

#### 3.4.1 色彩系統

| 用途 | 色值 | 說明 |
|------|------|------|
| 背景主色 | `oklch(0.12 0.02 260)` | 深藍黑色 |
| 前景文字 | `oklch(0.95 0 0)` | 近白色 |
| 主色調 | `oklch(0.45 0.18 260)` | 深藍色 |
| 強調色 | 黃色 `#facc15` | 用於獎勵、重要提示 |
| 正確 | 綠色 `#22c55e` | 答對回饋 |
| 錯誤 | 紅色 `#ef4444` | 答錯回饋 |
| 危險 | 紅色 `#dc2626` | 計時器最後5秒 |

#### 3.4.2 自定義 CSS 效果

| 效果名稱 | 類名 | 說明 |
|---------|------|------|
| 玻璃面板 | `.glass-panel` | 半透明背景 + 模糊 + 藍色邊框 |
| 淺色玻璃 | `.glass-panel-light` | 較亮的玻璃效果 |
| 浮動動畫 | `.animate-float` | 上下浮動 3s 循環 |
| 脈動光暈 | `.animate-pulse-glow` | 藍色光暈脈動 |
| 閃光效果 | `.animate-shimmer` | 水平閃光掃過 |
| 雷達掃描 | `.animate-radar` | 360度旋轉 |
| 文字光暈 | `.animate-text-glow` | 黃色文字光暈 |
| 霓虹邊框 | `.neon-border` | 藍色霓虹邊框 |
| 金色霓虹 | `.neon-border-gold` | 金色霓虹邊框 |
| 粒子背景 | `.particle-bg` | 多色徑向漸層粒子 |
| 選項按鈕 | `.option-btn` | hover右移 + 陰影 |
| 螢幕震動 | `.animate-shake` | 0.4s 隨機位移震動 |

#### 3.4.3 響應式斷點

| 斷點 | 寬度 | 適用裝置 |
|------|------|---------|
| 預設 | < 640px | 手機 |
| `sm:` | ≥ 640px | 平板 |
| `md:` | ≥ 768px | 小桌面 |
| `lg:` | ≥ 1024px | 桌面 |

---

## 4. 完整的核心 JavaScript 遊戲運行邏輯代碼

### 4.1 遊戲狀態管理 (GameContext.tsx)

此為遊戲的核心狀態機，管理所有遊戲階段的切換和數據追蹤。

```typescript
import React, { createContext, useContext, useState, useCallback } from 'react';

// ===== 型別定義 =====
export type GamePhase = 'intro' | 'name-input' | 'challenge-select' | 'quiz' 
                      | 'assembly' | 'battle' | 'victory' | 'leaderboard';
export type ChallengeCategory = 'concept' | 'app' | 'package';

export interface GameState {
  phase: GamePhase;
  playerName: string;
  completedChallenges: Set<ChallengeCategory>;
  currentChallenge: ChallengeCategory | null;
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  totalTimeSpent: number; // 總答題時間（秒）
}

interface GameContextType {
  gameState: GameState;
  setPhase: (phase: GamePhase) => void;
  setPlayerName: (name: string) => void;
  startGame: () => void;
  selectChallenge: (category: ChallengeCategory) => void;
  answerQuestion: (isCorrect: boolean, timeSpent?: number) => void;
  completeChallenge: () => void;
  startAssembly: () => void;
  startBattle: () => void;
  resetGame: () => void;
  addTimeSpent: (seconds: number) => void;
}

// ===== Context 建立 =====
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    playerName: '',
    completedChallenges: new Set(),
    currentChallenge: null,
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    totalTimeSpent: 0,
  });

  // 切換遊戲階段
  const setPhase = useCallback((phase: GamePhase) => {
    setGameState(prev => ({ ...prev, phase }));
  }, []);

  // 設定玩家名稱
  const setPlayerName = useCallback((name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
  }, []);

  // 開始遊戲（進入挑戰選擇）
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'challenge-select',
    }));
  }, []);

  // 選擇挑戰主題
  const selectChallenge = useCallback((category: ChallengeCategory) => {
    setGameState(prev => ({
      ...prev,
      phase: 'quiz',
      currentChallenge: category,
      currentQuestionIndex: 0,
    }));
  }, []);

  // 回答問題（核心計分邏輯）
  const answerQuestion = useCallback((isCorrect: boolean, timeSpent?: number) => {
    setGameState(prev => {
      // 計算時間獎勵分數：每快6秒加1分，最高5分
      const timeBonus = timeSpent !== undefined 
        ? Math.max(0, Math.round((30 - timeSpent) / 6)) 
        : 0;
      const scoreGain = isCorrect ? 10 + timeBonus : 0;

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        score: prev.score + scoreGain,
        totalTimeSpent: prev.totalTimeSpent + (timeSpent || 0),
      };
    });
  }, []);

  // 完成當前挑戰
  const completeChallenge = useCallback(() => {
    setGameState(prev => {
      const newCompleted = new Set(prev.completedChallenges);
      if (prev.currentChallenge) {
        newCompleted.add(prev.currentChallenge);
      }

      // 三個主題全部完成 → 進入組裝場景
      if (newCompleted.size === 3) {
        return {
          ...prev,
          phase: 'assembly' as GamePhase,
          completedChallenges: newCompleted,
          currentChallenge: null,
        };
      }

      // 尚未全部完成 → 回到挑戰選擇
      return {
        ...prev,
        phase: 'challenge-select' as GamePhase,
        completedChallenges: newCompleted,
        currentChallenge: null,
      };
    });
  }, []);

  // 開始組裝
  const startAssembly = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'assembly' }));
  }, []);

  // 開始對決
  const startBattle = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'battle' }));
  }, []);

  // 累加答題時間
  const addTimeSpent = useCallback((seconds: number) => {
    setGameState(prev => ({
      ...prev,
      totalTimeSpent: prev.totalTimeSpent + seconds,
    }));
  }, []);

  // 重置遊戲（回到開頭）
  const resetGame = useCallback(() => {
    setGameState({
      phase: 'intro',
      playerName: '',
      completedChallenges: new Set(),
      currentChallenge: null,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      totalTimeSpent: 0,
    });
  }, []);

  const value: GameContextType = {
    gameState, setPhase, setPlayerName, startGame,
    selectChallenge, answerQuestion, completeChallenge,
    startAssembly, startBattle, resetGame, addTimeSpent,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
```

### 4.2 問答系統核心邏輯 (QuizScene.tsx 節錄)

```typescript
const TIMER_SECONDS = 30; // 每題30秒

const QuizScene: React.FC = () => {
  const { gameState, answerQuestion, completeChallenge } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [localIndex, setLocalIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  const [localCorrect, setLocalCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // 取得當前分類的題目
  const categoryQuestions = useMemo(() => {
    return questions.filter(q => q.category === gameState.currentChallenge);
  }, [gameState.currentChallenge]);

  const totalQuestions = categoryQuestions.length;
  const currentQuestion = categoryQuestions[localIndex];
  const isLastQuestion = localIndex === totalQuestions - 1;

  // ===== 計時器邏輯 =====
  const startTimer = useCallback(() => {
    setTimeLeft(TIMER_SECONDS);
    startTimeRef.current = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        if (prev <= 6) {
          soundManager.playTick(); // 最後5秒滴答聲
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // 時間到自動處理
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  // 每題開始時重置計時器
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [localIndex, startTimer]);

  // ===== 超時處理 =====
  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setShowFeedback(true);
    setSelectedAnswer(-1); // -1 表示未作答
    soundManager.playWrong();
    const timeSpent = TIMER_SECONDS;
    answerQuestion(false, timeSpent); // 超時視為答錯
  };

  // ===== 回答問題 =====
  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;

    if (timerRef.current) clearInterval(timerRef.current);
    const timeSpent = (Date.now() - startTimeRef.current) / 1000;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setIsAnswered(true);

    const correct = answerIndex === currentQuestion.correctAnswer;
    answerQuestion(correct, timeSpent);

    if (correct) {
      soundManager.playCorrect();
      const timeBonus = Math.max(0, Math.round((30 - timeSpent) / 6));
      setLocalScore(prev => prev + 10 + timeBonus);
      setLocalCorrect(prev => prev + 1);
    } else {
      soundManager.playWrong();
    }
  };

  // ===== 下一題/完成 =====
  const handleNext = () => {
    soundManager.playClick();
    if (isLastQuestion) {
      completeChallenge(); // 完成當前主題
    } else {
      setLocalIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsAnswered(false);
    }
  };
};
```

### 4.3 排行榜系統 (leaderboard.ts)

```typescript
// 排行榜系統 - 使用 localStorage 存儲

export interface LeaderboardEntry {
  name: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  averageTime: number; // 平均答題時間（秒）
  date: string;
}

const LEADERBOARD_KEY = 'air-defense-leaderboard';
const MAX_ENTRIES = 20;

// 取得排行榜
export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 新增排行榜紀錄
export function addToLeaderboard(entry: LeaderboardEntry): number {
  const leaderboard = getLeaderboard();
  leaderboard.push(entry);
  // 排序：分數高的在前，分數相同則平均時間短的在前
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.averageTime - b.averageTime;
  });
  // 只保留前 MAX_ENTRIES 筆
  const trimmed = leaderboard.slice(0, MAX_ENTRIES);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  // 回傳此次的排名
  return trimmed.findIndex(e => e === entry) + 1 || trimmed.length;
}

// 計算分數
export function calculateScore(
  correctCount: number, 
  totalQuestions: number, 
  totalTime: number
): number {
  // 基礎分 = 正確題數 × 10
  const baseScore = correctCount * 10;
  // 時間獎勵 = 每題平均時間越短獎勵越高（最高每題5分獎勵）
  const avgTime = totalTime / totalQuestions;
  const timeBonus = Math.max(0, Math.round((30 - avgTime) / 6));
  const totalTimeBonus = timeBonus * correctCount; // 只有答對的題目才有時間獎勵
  return baseScore + totalTimeBonus;
}

// 清除排行榜
export function clearLeaderboard(): void {
  localStorage.removeItem(LEADERBOARD_KEY);
}
```

### 4.4 音效系統 (sounds.ts)

```typescript
// 音效系統 - 使用 Web Audio API 生成遊戲音效（無需外部音檔）
class SoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  setMuted(muted: boolean) { this.isMuted = muted; }
  getMuted(): boolean { return this.isMuted; }

  // 正確答案音效 - C5→E5→G5 上行琶音
  playCorrect() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);     // C5
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  }

  // 錯誤答案音效 - 鋸齒波下行
  playWrong() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }

  // 按鈕點擊音效
  playClick() { /* 800Hz 正弦波，0.08秒 */ }

  // 倒數計時音效 (3, 2, 1)
  playCountdown() { /* 440Hz 方波，0.15秒 */ }

  // GO! 音效
  playGo() { /* 880Hz→1100Hz 上行，0.5秒 */ }

  // 碰撞音效 - 噪音產生器模擬金屬碰撞
  playCrash() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    noise.start(ctx.currentTime);
  }

  // 勝利音效 - C5→E5→G5→C6 四音琶音
  playVictory() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.4);
    });
  }

  // 警報音效 - 600Hz→900Hz→600Hz 警笛掃頻
  playAlert() { /* 1.2秒警笛效果 */ }

  // 計時器滴答聲 - 1000Hz 短促正弦波
  playTick() { /* 0.05秒 */ }

  // 組裝零件音效 - 三角波上行
  playAssemble() { /* 300Hz→600Hz，0.3秒 */ }
}

export const soundManager = new SoundManager();
```

### 4.5 題目資料庫結構 (questions.ts)

```typescript
export interface Question {
  id: string;                              // 唯一識別碼
  category: 'concept' | 'app' | 'package'; // 分類
  question: string;                        // 題目文字
  options: string[];                       // 4個選項
  correctAnswer: number;                   // 正確答案索引 (0-3)
  explanation: string;                     // 答題解釋
}

export const questions: Question[] = [
  // 防空避難觀念 (concept) - 7題
  // 防空避難處所查詢 (app) - 7題
  // 緊急避難包宣導 (package) - 7題
  // 共計 21 題
];

// 工具函式
export const getQuestionsByCategory = (category) => 
  questions.filter(q => q.category === category);

export const getCategoryName = (category) => ({
  concept: '防空避難觀念',
  app: '防空避難處所查詢',
  package: '緊急避難包宣導'
}[category]);

export const getCategoryReward = (category) => ({
  concept: '攻擊環',
  app: '鋼鐵輪盤',
  package: '軸底'
}[category]);
```

### 4.6 對決場景核心邏輯 (BattleScene.tsx 節錄)

```typescript
const BattleScene: React.FC = () => {
  const { gameState, setPhase, resetGame } = useGame();
  const [battlePhase, setBattlePhase] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const playerName = gameState.playerName || localStorage.getItem('playerName') || '防空避難戰士';
  const videoRef = useRef<HTMLVideoElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [rank, setRank] = useState<number>(0);

  // ===== Phase 0: 倒數動畫 =====
  useEffect(() => {
    if (battlePhase !== 0) return;
    const timers = [
      setTimeout(() => { setCountdown(3); soundManager.playCountdown(); }, 500),
      setTimeout(() => { setCountdown(2); soundManager.playCountdown(); }, 1500),
      setTimeout(() => { setCountdown(1); soundManager.playCountdown(); }, 2500),
      setTimeout(() => { setCountdown(0); soundManager.playGo(); }, 3500),
      setTimeout(() => { setBattlePhase(1); }, 4500), // 開始播放影片
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [battlePhase]);

  // ===== Phase 1: 影片播放 =====
  const handleVideoEnd = () => {
    setBattlePhase(2);
    soundManager.playVictory();
  };

  useEffect(() => {
    if (battlePhase === 1 && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [battlePhase]);

  // ===== Phase 2: 儲存排行榜 =====
  useEffect(() => {
    if (battlePhase === 2) {
      const entry = {
        name: playerName,
        score: gameState.score,
        correctCount: gameState.correctAnswers,
        totalQuestions: 21,
        averageTime: gameState.totalTimeSpent / 21,
        date: new Date().toLocaleDateString('zh-TW'),
      };
      const position = addToLeaderboard(entry);
      setRank(position);
    }
  }, [battlePhase]);

  // ===== 截圖功能 =====
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
};
```

### 4.7 應用程式進入點 (App.tsx)

```typescript
import { GameProvider, useGame } from "./contexts/GameContext";
import IntroScene from "./components/IntroScene";
import NameInputScene from "./components/NameInputScene";
import ChallengeSelect from "./components/ChallengeSelect";
import QuizScene from "./components/QuizScene";
import AssemblyScene from "./components/AssemblyScene";
import BattleScene from "./components/BattleScene";
import LeaderboardScene from "./components/LeaderboardScene";
import SoundToggle from "./components/SoundToggle";

// Phase-Based 場景路由器（不使用 URL 路由）
function GameRouter() {
  const { gameState } = useGame();

  switch (gameState.phase) {
    case 'intro':            return <IntroScene />;
    case 'name-input':       return <NameInputScene />;
    case 'challenge-select': return <ChallengeSelect />;
    case 'quiz':             return <QuizScene />;
    case 'assembly':         return <AssemblyScene />;
    case 'battle':
    case 'victory':          return <BattleScene />;
    case 'leaderboard':      return <LeaderboardScene />;
    default:                 return <IntroScene />;
  }
}

function Router() {
  return (
    <GameProvider>
      <GameRouter />
      <SoundToggle />
    </GameProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

---

## 附錄：檔案結構總覽

```
air-defense-game/
├── client/
│   ├── index.html                          # HTML 入口（含 Google Fonts）
│   ├── src/
│   │   ├── App.tsx                         # 應用程式進入點
│   │   ├── main.tsx                        # React 掛載點
│   │   ├── index.css                       # 全域樣式 + 自定義動畫
│   │   ├── components/
│   │   │   ├── Header.tsx                  # 共用頂部導航
│   │   │   ├── IntroScene.tsx              # 開場場景
│   │   │   ├── NameInputScene.tsx          # 名字輸入場景
│   │   │   ├── ChallengeSelect.tsx         # 挑戰選擇場景
│   │   │   ├── QuizScene.tsx               # 問答場景
│   │   │   ├── AssemblyScene.tsx           # 陀螺組裝場景
│   │   │   ├── BattleScene.tsx             # 對決 + 勝利場景
│   │   │   ├── LeaderboardScene.tsx        # 排行榜場景
│   │   │   ├── SoundToggle.tsx             # 音效開關按鈕
│   │   │   └── ui/                         # shadcn/ui 元件庫
│   │   ├── contexts/
│   │   │   ├── GameContext.tsx             # 遊戲狀態管理
│   │   │   └── ThemeContext.tsx            # 主題管理
│   │   ├── data/
│   │   │   └── questions.ts               # 題目資料庫（21題）
│   │   ├── lib/
│   │   │   ├── sounds.ts                  # Web Audio API 音效引擎
│   │   │   ├── leaderboard.ts             # 排行榜管理
│   │   │   └── utils.ts                   # 工具函式
│   │   └── hooks/                          # 自定義 Hooks
│   └── public/                             # 靜態設定檔
├── server/
│   └── index.ts                            # Express 靜態伺服器
├── package.json                            # 專案設定與依賴
├── tsconfig.json                           # TypeScript 設定
└── vite.config.ts                          # Vite 建置設定
```

---

> **文件版本：** v1.0  
> **最後更新：** 2026年6月10日  
> **撰寫者：** Manus AI  
> **委託單位：** 臺南市政府警察局新營分局
