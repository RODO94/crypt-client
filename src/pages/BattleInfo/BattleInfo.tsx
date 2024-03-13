import { useLocation, useNavigate } from "react-router-dom";
import "./BattleInfo.scss";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/UserRequests";
import { getOneBattle } from "../../utils/BattleRequests";
import BattleDash from "../../components/BattleDash/BattleDash";
import BattlePointsForm from "../../components/BattlePointsForm/BattlePointsForm";
import { Battle } from "../../utils/Interfaces";
import NavFooter from "../../components/NavFooter/NavFooter";

export default function BattleInfo() {
  const [battle, setBattle] = useState<Battle>();
  const [role, setRole] = useState<string>("");
  const [playerOneArray, setPlayerOneArray] = useState([]);
  const [playerTwoArray, setPlayerTwoArray] = useState([]);
  const [winnerValue, setWinnerValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const battleID = location.state.id;
  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    navigate("/login");
    return <h1>You need to log in</h1>;
  }
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data and set role
      const userData = await getUser(userToken);
      if (!userData) {
        return navigate("/");
      }
      setRole(userData.role);

      // Fetch battle data
      const battleData = await getOneBattle(battleID);
      if (!battleData) {
        return navigate("/");
      }
      setBattle(battleData);
      setPlayerOneArray(battleData.player_1);
      setPlayerTwoArray(battleData.player_2);

      // Set winner value
      const fetchWinner = (winner: string) => {
        if (battleData) {
          winner === battleData.combatant_1_id
            ? setWinnerValue("Player 1")
            : winner === battleData.combatant_2_id
            ? setWinnerValue("Player 2")
            : setWinnerValue("TBC");
        }
      };
      fetchWinner(battleData.winner);
    };

    fetchData();
  }, [userToken, battleID]);

  if (!userToken || !battle || !role || !playerOneArray || !playerTwoArray) {
    return (
      <div>
        <h1>Content Loading</h1>
      </div>
    );
  }
  return (
    <main>
      <BattleDash
        playerOne={playerOneArray}
        setPlayerOneArray={setPlayerOneArray}
        playerTwo={playerTwoArray}
        setPlayerTwoArray={setPlayerTwoArray}
        gameType={battle.player_type}
        battleType={battle.battle_type}
        scenario={battle.scenario}
        pointsSize={battle.points_size}
        result={battle.result}
        winner={winnerValue}
        date={battle.date}
        table={battle.table}
        start={battle.start}
        finish={battle.finish}
        battleID={battleID}
        token={userToken}
      />
      <BattlePointsForm
        playerOne={playerOneArray}
        playerTwo={playerTwoArray}
        playerOnePoints={battle.player_1_points}
        playerTwoPoints={battle.player_2_points}
        result={battle.result}
        battleID={battleID}
        token={userToken}
      />
      <NavFooter />
    </main>
  );
}
