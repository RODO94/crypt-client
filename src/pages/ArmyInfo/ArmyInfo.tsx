import { useLocation, useNavigate } from "react-router-dom";
import "./ArmyInfo.scss";
import { useEffect, useState } from "react";
import {
  getArmyRank,
  getBattleCount,
  getOneArmy,
  // getWinPercent,
} from "../../utils/ArmyRequests";
import ArmyDash from "../../components/ArmyDash/ArmyDash";
import ArmyNemesis from "../../components/ArmyNemesis/ArmyNemesis";
import ArmyAlly from "../../components/ArmyAlly/ArmyAlly";
import { ArmyObj } from "../../utils/Interfaces";

export default function ArmyInfo() {
  const [armyObj, setArmyObj] = useState<ArmyObj | null>(null);
  const [battleCount, setBattleCount] = useState(0);
  // const [winPercent, setWinPercent] = useState("");
  const [armyRank, setArmyRank] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const armyID = location.state.id;
  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    navigate("/login");
    return <h1>You need to log in</h1>;
  }

  useEffect(() => {
    const fetchArmy = async () => {
      const response = await getOneArmy(armyID, userToken);
      if (response) {
        setArmyObj(response);

        let responseBattleCount = await getBattleCount(
          response.user_id,
          userToken
        );

        if (!responseBattleCount) {
          setTimeout(async () => {
            responseBattleCount = await getBattleCount(
              response.user_id,
              userToken
            );
          }, 20);
        }

        // let responseWinPercent = await getWinPercent(
        //   response.user_id,
        //   userToken
        // );

        // if (!responseWinPercent) {
        //   setTimeout(async () => {
        //     responseWinPercent = await getWinPercent(
        //       response.user_id,
        //       userToken
        //     );
        //   }, 30);
        // }

        let responseArmyRank = await getArmyRank(response.id);
        if (!responseArmyRank) {
          setTimeout(async () => {
            responseArmyRank = await getArmyRank(response.id);
          }, 40);
        }

        setBattleCount(await responseBattleCount);
        // setWinPercent(await responseWinPercent);
        setArmyRank(Number(await responseArmyRank.ranking));
      }
    };
    fetchArmy();
  }, []);

  if (!armyObj) {
    return;
  }

  return (
    <main className="army-info">
      <ArmyDash
        winPercent={"50%"}
        battleCount={battleCount}
        armyObj={armyObj}
        armyRank={armyRank}
      />
      <ArmyNemesis armyID={armyObj.id} />
      <ArmyAlly armyID={armyObj.id} />
    </main>
  );
}
