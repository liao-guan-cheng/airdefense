import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider, useGame } from "./contexts/GameContext";
import IntroScene from "./components/IntroScene";
import NameInputScene from "./components/NameInputScene";
import ChallengeSelect from "./components/ChallengeSelect";
import QuizScene from "./components/QuizScene";
import AssemblyScene from "./components/AssemblyScene";
import BattleScene from "./components/BattleScene";
import LeaderboardScene from "./components/LeaderboardScene";
import SoundToggle from "./components/SoundToggle";


function GameRouter() {
  const { gameState } = useGame();

  switch (gameState.phase) {
    case 'intro':
      return <IntroScene />;
    case 'name-input':
      return <NameInputScene />;
    case 'challenge-select':
      return <ChallengeSelect />;
    case 'quiz':
      return <QuizScene />;
    case 'assembly':
      return <AssemblyScene />;
    case 'battle':
    case 'victory':
      return <BattleScene />;
    case 'leaderboard':
      return <LeaderboardScene />;
    default:
      return <IntroScene />;
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
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
