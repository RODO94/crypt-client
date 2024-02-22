import { useLocation, useNavigate } from "react-router-dom";
import "./BattleInfo.scss";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/UserRequests";
import { getOneBattle } from "../../utils/BattleRequests";
import BattleDash from "../../components/BattleDash/BattleDash";
import BattlePointsForm from "../../components/BattlePointsForm/BattlePointsForm";
import { Battle } from "../../utils/Interfaces";

export default function BattleInfo() {
  const [battle, setBattle] = useState<Battle>();
  const [role, setRole] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const battleID = location.state.id;
  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    return navigate("/login");
  }

  useEffect(() => {
    const fetchRole = async (token: string) => {
      const data = await getUser(token);
      setRole(data.role);
      return data;
    };
    fetchRole(userToken);
  }, []);

  useEffect(() => {
    const fetchBattle = async (battleID: string) => {
      const response = await getOneBattle(battleID);
      setBattle(response[0]);
      return response;
    };
    fetchBattle(battleID);
  }, []);

  if (!userToken || !battle || !role) {
    return <h1>Content Loading</h1>;
  }

  return (
    <>
      <BattleDash
        playerOne={battle.player_1}
        playerTwo={battle.player_2}
        gameType={battle.player_type}
        battleType={battle.battle_type}
        scenario={battle.scenario}
        pointsSize={battle.points_size}
        result={battle.result}
        winner={battle.winner}
        date={battle.date}
      />
      <BattlePointsForm
        playerOne={battle.player_1}
        playerTwo={battle.player_2}
        playerOnePoints={battle.player_1_points}
        playerTwoPoints={battle.player_2_points}
      />
    </>
  );
}
