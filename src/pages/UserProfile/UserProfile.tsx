import { useEffect, useState } from "react";
import "./UserProfile.scss";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getUser, makeAdmin } from "../../utils/UserRequests";
import { getAllUserArmies } from "../../utils/ArmyRequests";
import BattleCard from "../../components/BattleCard/BattleCard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Button,
  Menu,
  MenuItem,
  MenuProps,
  alpha,
  styled,
} from "@mui/material";

export default function UserProfile() {
  const [role, setRole] = useState<string>("");
  const [user, setUser] = useState<any>();
  const [fantasyArmyArray, setFantasyArmyArray] = useState([]);
  const [fortykArmyArray, setFortykArmyArray] = useState([]);
  const [userArray, setUserArray] = useState([]);
  const [targetUser, setTargetUser] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userToken = sessionStorage.getItem("token");
  if (!userToken) {
    navigate("/login");
    return <h1>You need to log in</h1>;
  }

  const handleAdmin = async () => {
    if (targetUser) {
      await makeAdmin(targetUser, userToken);
    }
    window.location.reload();
  };

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 60,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "8px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  useEffect(() => {
    const fetchUser = async (token: string) => {
      const data = await getUser(token);
      setRole(data.role);
      setUser(data);
      return data;
    };
    fetchUser(userToken);
  }, []);

  useEffect(() => {
    const fetchArmies = async () => {
      const data = await getAllUserArmies(user?.id);
      const fortykArray = data.filter((army: any) => army.type === "40k");
      const fantasyArray = data.filter((army: any) => army.type === "fantasy");

      setFantasyArmyArray(fantasyArray);
      setFortykArmyArray(fortykArray);
    };
    if (user) {
      fetchArmies();
    }
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUserArray(response);
    };
    fetchUsers();
  }, []);

  if (!fantasyArmyArray || !fortykArmyArray || !user || !role || !userArray) {
    return <p> Loading Content</p>;
  }
  return (
    <main className="user-profile">
      <section className="user-profile__dashboard">
        <h1 className="user-profile__title">User Profile</h1>
        <div className="user-profile__info-container">
          <article className="user-profile__info-card">
            <h3 className="user-profile__info-header">Name</h3>
            <div className="user-profile__info-wrap">
              <strong className="user-profile__info">{`${user.first_name} ${user.last_name}`}</strong>
            </div>
          </article>{" "}
          <article className="user-profile__info-card">
            <h3 className="user-profile__info-header">Access</h3>
            <div className="user-profile__info-wrap">
              <strong className="user-profile__info">{role}</strong>
            </div>
          </article>{" "}
          <article className="user-profile__info-card">
            <h3 className="user-profile__info-header">Email</h3>
            <div className="user-profile__info-wrap">
              <strong className="user-profile__info">{user.email}</strong>
            </div>
          </article>
        </div>
      </section>
      <section className="user-profile__army-list">
        <h2 className="user-profile__subheader">Fantasy Armies</h2>
        {fantasyArmyArray.map((army: any) => {
          return (
            <article
              key={`article${army.army_id}`}
              className="user-profile__army-card"
            >
              <div
                key={`div2${army.army_id}`}
                className="user-profile__army-wrap"
              >
                <BattleCard
                  key={`battlecard${army.army_id}`}
                  name={army.name}
                />
              </div>
              <div
                key={`div${army.army_id}`}
                className="user-profile__count-wrap"
              >
                <strong
                  key={`strong${army.army_id}`}
                  className="user-profile__info"
                >
                  {army.count > 1 || army.count === 0
                    ? `${army.count} games`
                    : `${army.count} game`}
                </strong>
              </div>
            </article>
          );
        })}
      </section>{" "}
      <section id="fortyk" className="user-profile__army-list">
        <h2 className="user-profile__subheader">40k Armies</h2>
        {fortykArmyArray.map((army: any) => {
          return (
            <article
              key={`article${army.army_id}`}
              className="user-profile__army-card"
            >
              {" "}
              <div
                key={`div2${army.army_id}`}
                className="user-profile__army-wrap"
              >
                <BattleCard
                  key={`battlecard${army.army_id}`}
                  name={army.name}
                />
              </div>
              <div
                key={`div${army.army_id}`}
                className="user-profile__count-wrap"
              >
                <strong
                  key={`strong${army.army_id}`}
                  className="user-profile__info"
                >
                  {army.count > 1 || army.count === 0
                    ? `${army.count} games`
                    : `${army.count} game`}
                </strong>
              </div>
            </article>
          );
        })}
      </section>
      <section className="user-profile__user-list">
        <div className="user-profile__user-headers">
          <p id="user" className="user-profile__user-header">
            User
          </p>
          <p id="email" className="user-profile__user-header">
            Email
          </p>
          <p id="role" className="user-profile__user-header">
            Role
          </p>
          <p id="action" className="user-profile__user-header">
            Action
          </p>
        </div>
        {userArray.map((user: any, index: number) => {
          return (
            <article
              key={`article${user.id}`}
              id={user.id}
              className={
                index % 2 !== 0
                  ? "user-profile__user-records"
                  : "user-profile__user-records user-profile__user-records--dark"
              }
            >
              <strong
                key={`strong${user.id}`}
                id="user"
                className="user-profile__user-record"
              >
                {user.known_as}
              </strong>
              <p
                key={`email${user.id}`}
                id="email"
                className="user-profile__user-record"
              >
                {user.email}
              </p>
              <p
                key={`role${user.id}`}
                id="role"
                className="user-profile__user-record"
              >
                {user.role}
              </p>
              {user.role !== "admin" ? (
                <div
                  key={`div${user.id}`}
                  className="user-profile__user-record--action"
                  id={user.id}
                >
                  <Button
                    key={`button${user.id}`}
                    size="small"
                    style={{
                      maxWidth: "30px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={(event: any) => {
                      setTargetUser(event.target.parentElement.id);
                      handleClick(event);
                    }}
                  >
                    {">"}
                  </Button>
                  <StyledMenu
                    key={`styledmenu${user.id}`}
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      key={`menuitem${user.id}`}
                      onClick={() => {
                        handleAdmin();
                      }}
                      disableRipple
                    >
                      <PersonAddIcon />
                      Make Admin
                    </MenuItem>
                  </StyledMenu>
                </div>
              ) : (
                <div className="user-profile__user-record--action">...</div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
