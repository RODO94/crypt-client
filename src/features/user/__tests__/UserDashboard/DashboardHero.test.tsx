import { render, screen } from "@testing-library/react";
import DashboardHero from "../../components/DashboardHero/DashboardHero";
import {
  mockAlly,
  mockNemesis,
  mockUser,
} from "../../../../store/__tests__/userMocks";
import { mockBattles } from "../../../../store/__tests__/battleMocks";
import {
  mockFantasyRanks,
  mockFortyKRanks,
} from "../../../../store/__tests__/rankMocks";

describe.only("Hero Dashboard UI", () => {
  beforeEach(() => {
    render(
      <DashboardHero
        user={mockUser}
        nemesis={mockNemesis}
        ally={mockAlly}
        nextBattle={mockBattles[0]}
        fortykRanked={mockFortyKRanks[0]}
        fantasyRanked={mockFantasyRanks[0]}
      />
    );
  });
  it.todo("Renders a green background with a welcome message", () => {
    const helloMessage = screen.getByText(`Hey ${mockUser.known_as}!`);
    expect(helloMessage).toBeInTheDocument();
  });
  it.todo("shows the users next battle");
  it.todo("shows the users nemesis");
  it.todo("shows the users ally");
  it.todo("shows the users top armies");
});
