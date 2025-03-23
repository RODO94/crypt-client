import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Homepage from "./pages/Homepage/Homepage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import FortyKRankingPage from "./pages/FortyKRankingPage/FortyKRankingPage";
import FantasyRankingPage from "./pages/FantasyRankingPage/FantasyRankingPage";
import CompletedBattlesPage from "./pages/CompletedBattlesPage/CompletedBattlesPage";
import UpcomingBattlesPage from "./pages/UpcomingBattlesPage/UpcomingBattlesPage";
import BattleInfo from "./pages/BattleInfo/BattleInfo";
import ArmyInfo from "./pages/ArmyInfo/ArmyInfo";
import CreateBattle from "./pages/CreateBattle/CreateBattle";
import AddArmy from "./pages/AddArmy/AddArmy";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import UserProfile from "./pages/UserProfile/UserProfile";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import NavHeader from "./components/NavHeader/NavHeader";
import LogInRedirect from "./pages/LogInRedirect/LogInRedirect";
import NavFooter from "./components/NavFooter/NavFooter";
import { useArmiesStore } from "./store/armies";
import { useEffect } from "react";
import { useBattlesStore } from "./store/battles";
import { useRankingsStore } from "./store/rankings";
import { useUserStore } from "./store/user";

function App() {
  const { fetchAllUsers, allUsers } = useUserStore();
  const { armies, fetchAllArmies } = useArmiesStore();
  const {
    upcomingBattles,
    completedBattles,
    fetchUpcomingBattles,
    fetchCompletedBattles,
  } = useBattlesStore();

  const {
    fetchFantasyRankings,
    fetchFortyKRankings,
    fetchTopRankings,
    fantasyRankings,
    fortyKRankings,
    topRankings,
  } = useRankingsStore();

  useEffect(() => {
    if (!armies[0]) {
      fetchAllArmies();
    }
    if (!upcomingBattles[0]) {
      fetchUpcomingBattles();
    }
    if (!completedBattles[0]) {
      fetchCompletedBattles();
    }
    if (!fantasyRankings) fetchFantasyRankings();
    if (!fortyKRankings) fetchFortyKRankings();
    if (!topRankings.fantasy) fetchTopRankings();
    if (!allUsers) fetchAllUsers();
  });

  return (
    <BrowserRouter>
      <div className="App">
        <NavHeader />
        <Routes>
          {/* Global Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/login/redirect" element={<LogInRedirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/rankings/40k" element={<FortyKRankingPage />} />
          <Route path="/rankings/fantasy" element={<FantasyRankingPage />} />
          <Route path="/battles/completed" element={<CompletedBattlesPage />} />
          <Route path="/battles/upcoming" element={<UpcomingBattlesPage />} />
          <Route path="/battles/information/:id" element={<BattleInfo />} />
          <Route path="/armies/information" element={<ArmyInfo />} />
          {/* User Routes */}
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/battles/create" element={<CreateBattle />} />
          <Route path="/armies/add" element={<AddArmy />} />
        </Routes>
        <NavFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
