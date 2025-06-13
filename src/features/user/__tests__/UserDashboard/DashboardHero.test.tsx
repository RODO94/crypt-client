import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardHero from "../../components/DashboardHero/DashboardHero";
import { mockUser, userInfo } from "../../../../store/__tests__/userMocks";
import { mockBattles } from "../../../../store/__tests__/battleMocks";
import {
  mockAlly,
  mockFantasyRanks,
  mockFortyKRanks,
  mockNemesis,
} from "../../../../store/__tests__/rankMocks";

describe.only("Hero Dashboard UI", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <DashboardHero
          user={mockUser}
          nemesis={mockNemesis}
          ally={mockAlly}
          nextBattle={mockBattles[0]}
          fortykRanked={mockFortyKRanks[0]}
          fantasyRanked={mockFantasyRanks[0]}
        />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });
  it("Renders a welcome message with the users name", () => {
    const helloMessage = screen.getByText(`Hey ${mockUser.known_as}!`);
    expect(helloMessage).toBeInTheDocument();
  });

  it("shows the users next battle", () => {
    const nextBattleArticle = screen.getByTestId("next-battle-card");
    expect(nextBattleArticle).toBeInTheDocument();

    const playerTwo = mockBattles[0].player_2[0];

    const battleCard = within(nextBattleArticle).getByTestId(
      `battle-card-${playerTwo.known_as}-${playerTwo.army_id}`
    );
    expect(battleCard).toBeInTheDocument();
  });

  it("shows the users nemesis", () => {
    const nemesisArticle = screen.getByTestId("nemesis-article");
    expect(nemesisArticle).toBeInTheDocument();

    const nemesisCard = within(nemesisArticle).getByTestId(
      `battle-card-${mockNemesis.known_as}-${mockNemesis.army_id}`
    );
    expect(nemesisCard).toBeInTheDocument();
  });

  it("shows the users ally", () => {
    const allyArticle = screen.getByTestId("ally-article");
    expect(allyArticle).toBeInTheDocument();

    const allyCard = within(allyArticle).getByTestId(
      `battle-card-${mockAlly.known_as}-${mockAlly.army_id}`
    );
    expect(allyCard).toBeInTheDocument();
  });

  it("shows the users top armies", () => {
    const { fortyK, fantasy } = userInfo!.rankArray;
    const fortyKCard = screen.getByTestId(
      `battle-card-${mockUser.known_as}-${fortyK[0].army_id}`
    );
    expect(fortyKCard).toBeInTheDocument();

    const fantasyCard = screen.getByTestId(
      `battle-card-${mockUser.known_as}-${fantasy[0].army_id}`
    );
    expect(fantasyCard).toBeInTheDocument();
  });
});
