import "./BattleInfo.scss";
import { useEffect, useState } from "react";
import { getOneBattle } from "../../utils/BattleRequests";
import BattleDash from "../../components/BattleDash/BattleDash";
import BattlePointsForm from "../../components/BattlePointsForm/BattlePointsForm";
import { Battle, Player } from "../../utils/Interfaces";
import { CircularProgress } from "@mui/material";
import { useUserStore } from "../../store/user";

export default function BattleInfo() {
  const [battle, setBattle] = useState<Battle>();
  const [playerOneArray, setPlayerOneArray] = useState<Player[]>();
  const [playerTwoArray, setPlayerTwoArray] = useState<Player[]>();
  const [winnerValue, setWinnerValue] = useState("");

  const pathName: string[] = window.location.pathname.split("/");
  const battleID = pathName[pathName.length - 1];
  const { token: userToken, userRole } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch battle data
      const battleData = await getOneBattle(battleID);
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

  if (!battle || !userRole || !playerOneArray || !playerTwoArray) {
    return (
      <div className="loading-message">
        <CircularProgress style={{ color: "white" }} />
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
      />
      <BattlePointsForm
        playerOne={playerOneArray}
        playerTwo={playerTwoArray}
        playerOnePoints={battle.player_1_points}
        playerTwoPoints={battle.player_2_points}
        result={battle.result}
        battleID={battleID}
      />
    </main>
  );
}
