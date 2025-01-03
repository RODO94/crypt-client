import { ChangeEvent, useEffect, useState } from "react";
import "./UserSelectInput.scss";
import { getAllUsers } from "../../utils/UserRequests";
import { UsersObj } from "../../utils/Interfaces";

export default function UserSelectInput({
  initialUser,
  setNewUser,
}: {
  initialUser: UsersObj;
  setNewUser: React.Dispatch<React.SetStateAction<UsersObj>>;
}) {
  const [userArray, setUserArray] = useState<UsersObj[]>();
  const [selectedUser, setSelectedUser] = useState<UsersObj>(initialUser);

  useEffect(() => {
    const fetchUsers = async () => {
      const userResponse = await getAllUsers(3);
      userResponse && setUserArray(userArray);
    };
    fetchUsers();
  }, [userArray]);

  return (
    <select
      name="user"
      id="user-select"
      className="user-select"
      value={selectedUser.known_as}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        const newUser: UsersObj | undefined = userArray?.find(
          (user: UsersObj) => user.id === event.target.value
        );
        newUser && setSelectedUser(newUser);
        newUser && setNewUser(newUser);
      }}
    >
      {userArray?.map((user: UsersObj) => (
        <option value={user.id}>{user.known_as}</option>
      ))}
    </select>
  );
}
