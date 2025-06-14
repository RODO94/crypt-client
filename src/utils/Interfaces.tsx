import { Emblems } from "./emblems";

export interface Player {
  id?: string;
  name?: string;
  known_as?: string;
  ranking?: string;
  army_id?: string;
  emblem?: string;
  count?: number;
}

export interface AllyObj {
  armyID: string;
  count: number;
  id: string;
  known_as: string;
  name: string;
  ranking: string;
  emblem: string;
}

export interface Army {
  emblem: string;
  emblem_id?: string;
  id: string;
  name: string;
  type: string;
  user_id: string;
  army_id?: string;
}
export interface LogInBody {
  email: string;
  password: string;
}

export interface UsersArmyInfo {
  nemesis: Army;
  ally: Army;
  user: ArmyInformation;
  battleCount: number;
  winPercent: string;
}

export interface ArmyInformation {
  id: string;
  ranking: string;
  user_id: string;
  emblem_id: string;
  rn: number;
  type: "fantasy" | "40k";
  name: string;
  emblem: Emblems;
  known_as: string;
}

export interface Armies {
  id: string;
  name: string;
  emblem_id: string;
  type: string;
  user_id: string;
  emblem: string;
}

export interface Users {
  known_as: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  id?: string;
  user_emblem?: string;
  "password-reset-token"?: string;
}

export type Password = Pick<LogInBody, "password">;
export type Email = Pick<LogInBody, "email">;

export interface SignUpBody extends Users {
  password: Password;
}

export interface Input {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export interface Rank {
  rank: string;
  known_as: string;
  name: string;
  ranking: string;
  prev_ranking?: string;
  army_id?: string;
  status?: string;
  current_position?: number;
  emblem?: string;
  rn?: number;
  date?: string;
  id?: string;
}

export interface allRankObjs {
  fortyK: Rank;
  fantays: Rank;
}

export interface CompletedBattle {
  id: string;
  date: string;
  winner: string;
  result: string;
  battle_type: "40k" | "fantasy";
  player_type: "single" | "multi";
  player_1: Player[];
  player_2: Player[];
  combatant_1_id?: string;
  combatant_2_id?: string;
}

export interface Battle {
  id: string;
  date: string;
  scenario?: string;
  points_size?: number;
  result: string;
  winner: string;
  battle_type: "40k" | "fantasy";
  player_type: "single" | "multi";
  player_1: Player[];
  player_2: Player[];
  player_1_points: number;
  player_2_points: number;
  table: string;
  finish: string;
  start: string;
  combatant_1_id?: string;
  combatant_2_id?: string;
  user_1_id?: string;
  user_2_id?: string;
}
