import { Rank } from "../../utils/Interfaces";

// Mock rank data
export const mockAlly: Rank = {
  rank: "1",
  known_as: "The Imperium",
  name: "Space Marines",
  ranking: "2500",
  prev_ranking: "2400",
  army_id: "army-001",
  status: "active",
  current_position: 1,
  emblem: "space-marine-emblem",
  rn: 1,
  date: "2025-06-01",
  id: "rank-001",
};

export const mockNemesis: Rank = {
  rank: "3",
  known_as: "Chaos Undivided",
  name: "Chaos Space Marines",
  ranking: "2200",
  prev_ranking: "2300",
  army_id: "army-002",
  status: "active",
  current_position: 3,
  emblem: "chaos-emblem",
  rn: 3,
  date: "2025-06-01",
  id: "rank-002",
};

export const mockFortyKRanks: Rank[] = [
  mockAlly,
  {
    rank: "2",
    known_as: "The Swarm",
    name: "Tyranids",
    ranking: "2350",
    army_id: "army-003",
    status: "active",
    current_position: 2,
    emblem: "tyranid-emblem",
    rn: 2,
    id: "rank-003",
  },
  mockNemesis,
];

export const mockFantasyRanks: Rank[] = [
  {
    rank: "1",
    known_as: "The Empire",
    name: "Empire",
    ranking: "1800",
    army_id: "army-004",
    status: "active",
    current_position: 1,
    emblem: "empire-emblem",
    rn: 1,
    id: "rank-004",
  },
  {
    rank: "2",
    known_as: "Greenskins",
    name: "Orcs and Goblins",
    ranking: "1650",
    army_id: "army-005",
    status: "active",
    current_position: 2,
    emblem: "orc-emblem",
    rn: 2,
    id: "rank-005",
  },
];
