export interface Player {
  name?: string;
  known_as?: string;
  rank?: string;
  army_id?: string;
}

export interface LogInBody {
  email: string;
  password: string;
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
  role: string;
  id: string;
}

export type password = Omit<LogInBody, "email">;
export type email = Omit<LogInBody, "password">;

export interface SignUpBody {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  known_as: string;
}

export interface Input {
  name: string;
  label: string;
  type: string;
  onChange?: Function;
  required: Boolean;
}

export interface RankObj {
  rank: string;
  known_as: string;
  name: string;
  ranking: string;
  prev_ranking?: string;
  army_id?: string;
  status?: string;
  current_position?: number;
}

export interface UsersObj {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  known_as: string;
  user_emblem: string;
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
}
