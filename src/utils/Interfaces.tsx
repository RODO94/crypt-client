export interface Player {
  name: string;
  known_as: string;
  rank: string;
}

export interface RankObj {
  rank: string;
  known_as: string;
  name: string;
  ranking: string;
  prev_ranking?: string;
  army_id?: string;
}
