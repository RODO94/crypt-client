import { FunctionComponent } from "react";

export interface Player {
  name: string;
  known_as: string;
  rank: string;
}

export interface LogInBody {
  email: string;
  password: string;
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
}
