import { Armies, Player, Users } from "../../../../utils/Interfaces";
import { Formik } from "./utils";

type SetUserArray = React.Dispatch<React.SetStateAction<Users[]>>;
type SetArmyArray = React.Dispatch<React.SetStateAction<Armies[]>>;
export const filterArrays = (
  userArray: Users[],
  armyArray: Armies[],
  setFilteredArmyArray: SetArmyArray,
  setFilteredUserArray: SetUserArray,
  formik: Formik
) => {
  const filteredArmyArray = armyArray?.filter(
    (army) => army.type === formik.values.battleType
  );
  setFilteredArmyArray(filteredArmyArray);
  // Filter the user list based on if a user has an army in the army array
  const filteredResponse = userArray?.filter((user: Player) => {
    const army = filteredArmyArray?.find((army) => army.user_id === user.id);
    return army;
  });

  const secondFilteredResponse = filteredResponse?.filter((user: Player) => {
    const userOneBool = formik.values.playerOne.find(
      (player) => player.id === user.id
    );
    const userTwoBool = formik.values.playerTwo.find(
      (player) => player.id === user.id
    );

    if (userOneBool || userTwoBool) {
      return false;
    } else {
      return true;
    }
  });

  setFilteredUserArray(secondFilteredResponse);
};
