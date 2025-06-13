import { Users } from "../../utils/Interfaces";
import { UserInfo, UserRole } from "../user";
import { mockBattles } from "./battleMocks";
import {
  mockAlly,
  mockFantasyRanks,
  mockFortyKRanks,
  mockNemesis,
} from "./rankMocks";

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test-token-123";

export const mockUser: Users = {
  known_as: "TestCommander",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@test.com",
  role: "admin",
  id: "user-001",
  user_emblem: "commander-emblem",
};

export const mockStandardUserData: Users = {
  known_as: "BattleBrother",
  first_name: "Jane",
  last_name: "Smith",
  email: "jane.smith@test.com",
  role: "user",
  id: "user-002",
  user_emblem: "battle-emblem",
};

export const userInfo: UserInfo = {
  user: mockUser,
  ally: mockAlly,
  nemesis: mockNemesis,
  rankArray: {
    fortyK: mockFortyKRanks,
    fantasy: mockFantasyRanks,
  },
  userResults: mockBattles,
};

export const allUsers: Users[] = [
  mockUser,
  mockStandardUserData,
  {
    known_as: "WarlordGrim",
    first_name: "Mike",
    last_name: "Johnson",
    email: "mike.johnson@test.com",
    role: "user",
    id: "user-003",
    user_emblem: "warlord-emblem",
  },
  {
    known_as: "SorcererMage",
    first_name: "Sarah",
    last_name: "Wilson",
    email: "sarah.wilson@test.com",
    role: "user",
    id: "user-004",
    user_emblem: "mage-emblem",
  },
];

export const adminUser: UserRole = "admin";
export const standardUser: UserRole = "user";
export const guestUser: UserRole = "guest";

export const currentAdminUser: Users | null = mockUser;
export const currentStandardUser: Users | null = mockStandardUserData;
export const currentGuestUser: Users | null = null;

// Mock functions for testing using vi
export const mockFetchUserInfo = vi.fn().mockResolvedValue(userInfo);
export const mockFetchCurrentUser = vi.fn().mockResolvedValue(mockUser);
export const mockFetchAllUsers = vi.fn().mockResolvedValue(allUsers);
export const mockSetToken = vi.fn();
export const mockSetUserRole = vi.fn();
export const mockLogout = vi.fn();
