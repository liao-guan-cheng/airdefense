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

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

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

export function calculateScore(correctCount: number, totalQuestions: number, totalTime: number): number {
  // 基礎分 = 正確題數 * 10
  const baseScore = correctCount * 10;
  // 時間獎勵 = 每題平均時間越短獎勵越高（最高每題5分獎勵）
  const avgTime = totalTime / totalQuestions;
  const timeBonus = Math.max(0, Math.round((30 - avgTime) / 6)); // 30秒內作答，每快6秒加1分
  const totalTimeBonus = timeBonus * correctCount; // 只有答對的題目才有時間獎勵
  return baseScore + totalTimeBonus;
}

export function clearLeaderboard(): void {
  localStorage.removeItem(LEADERBOARD_KEY);
}
