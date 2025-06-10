import { Rank } from "../../utils/Interfaces";
import { mockAlly, mockNemesis } from "./userMocks";

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
