import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {/* Global Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/ranking/40k" element={<FortyKRankingPage />} />
          <Route path="/ranking/fantasy" element={<FantasyRankingPage />} />
          <Route path="/battles/completed" element={<CompletedBattlesPage />} />
          <Route path="/battles/upcoming" element={<UpcomingBattlesPage />} />
          <Route path="/battles/:battleID" element={<BattleInfo />} />
          <Route path="/armies/:armyID" element={<ArmyInfo />} />
          {/* User Routes */}
          <Route path="/:userID" element={<UserDashboard />} />
          <Route path="/:userID/profile" element={<UserProfile />} />
          <Route path="/battles/:userID/create" element={<CreateBattle />} />
          <Route path="/battles/:userID/:battleID" element={<BattleInfo />} />
          <Route path="/armies/:userID/add" element={<AddArmy />} />
          <Route path="/armies/:userID/:armyID" element={<ArmyInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
