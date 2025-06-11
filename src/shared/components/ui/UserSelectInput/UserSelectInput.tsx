import { ChangeEvent, useState } from "react";
import "./UserSelectInput.scss";
import { Users } from "../../../../utils/Interfaces";
import { useUserStore } from "../../../../store/user";

export default function UserSelectInput({
  initialUser,
  setNewUser,
}: {
  initialUser: Users;
  setNewUser: React.Dispatch<React.SetStateAction<Users>>;
}) {
  const [selectedUser, setSelectedUser] = useState<Users>(initialUser);

  const { allUsers } = useUserStore();

  return (
    <select
      name='user'
      id='user-select'
      className='user-select'
      value={selectedUser.known_as}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        const newUser: Users | undefined = allUsers?.find(
          (user: Users) => user.id === event.target.value
        );
        if (newUser) {
          setSelectedUser(newUser);
          setNewUser(newUser);
        }
      }}
    >
      {allUsers?.map((user: Users) => (
        <option value={user.id}>{user.known_as}</option>
      ))}
    </select>
  );
}
