import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { SportsGrid } from "./components/SportsGrid";
import { BetSlip } from "./components/BetSlip";
import { LiveMatches } from "./components/LiveMatches";
import { Bet } from "./types";

export default function App() {
  const [activeSport, setActiveSport] = useState("football");
  const [betSlip, setBetSlip] = useState<Bet[]>([]);

  const addBet = (bet: Bet) => {
    setBetSlip((prev) => {
      const exists = prev.find((b) => b.id === bet.id);
      if (exists) {
        return prev.filter((b) => b.id !== bet.id);
      }
      return [...prev, bet];
    });
  };

  const removeBet = (id: string) => {
    setBetSlip((prev) => prev.filter((b) => b.id !== id));
  };

  const clearBets = () => {
    setBetSlip([]);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex">
        <Sidebar activeSport={activeSport} setActiveSport={setActiveSport} />
        <main className="flex-1 p-6">
          <LiveMatches addBet={addBet} betSlip={betSlip} activeSport={activeSport} />
          <SportsGrid addBet={addBet} betSlip={betSlip} activeSport={activeSport} />
        </main>
        <BetSlip bets={betSlip} removeBet={removeBet} clearBets={clearBets} />
      </div>
    </div>
  );
}