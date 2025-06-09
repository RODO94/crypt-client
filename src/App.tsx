import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useArmiesStore } from "./store/armies";
import { useEffect } from "react";
import { useBattlesStore } from "./store/battles";
import { useRankingsStore } from "./store/rankings";
import { useUserStore } from "./store/user";
import { NavFooter, NavHeader } from "./shared";
import Homepage from "./Homepage/Homepage";
import {
  ForgotPassword,
  LogIn,
  LogInRedirect,
  ResetPassword,
  SignUp,
} from "./features/auth";
import { FantasyRankingPage, FortyKRankingPage } from "./features/ranking";
import {
  BattleInfo,
  CompletedBattlesPage,
  CreateBattle,
  UpcomingBattlesPage,
} from "./features/battle";
import { AddArmy, ArmyInfo } from "./features/army";
import { UserDashboard, UserProfile } from "./features/user";

function App() {
  const { fetchAllUsers } = useUserStore();
  const { fetchAllArmies } = useArmiesStore();
  const { fetchUpcomingBattles, fetchCompletedBattles } = useBattlesStore();

  const { fetchFantasyRankings, fetchFortyKRankings, fetchTopRankings } =
    useRankingsStore();

  useEffect(() => {
    fetchAllArmies();
    fetchUpcomingBattles();
    fetchCompletedBattles();
    fetchFantasyRankings();
    fetchFortyKRankings();
    fetchTopRankings();
    fetchAllUsers();
  }, [
    fetchAllArmies,
    fetchAllUsers,
    fetchCompletedBattles,
    fetchFantasyRankings,
    fetchFortyKRankings,
    fetchTopRankings,
    fetchUpcomingBattles,
  ]);

  return (
    <BrowserRouter>
      <div className='App'>
        <NavHeader />
        <Routes>
          {/* Global Routes */}
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/login/redirect' element={<LogInRedirect />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset/:token' element={<ResetPassword />} />
          <Route path='/rankings/40k' element={<FortyKRankingPage />} />
          <Route path='/rankings/fantasy' element={<FantasyRankingPage />} />
          <Route path='/battles/completed' element={<CompletedBattlesPage />} />
          <Route path='/battles/upcoming' element={<UpcomingBattlesPage />} />
          <Route path='/battles/information/:id' element={<BattleInfo />} />
          <Route path='/armies/information' element={<ArmyInfo />} />
          {/* User Routes */}
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/battles/create' element={<CreateBattle />} />
          <Route path='/armies/add' element={<AddArmy />} />
        </Routes>
        <NavFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
