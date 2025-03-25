import dayjs from "dayjs";
import { Rank } from "../../utils/Interfaces";
import "./RankTrackerCard.scss";
import Chip, { ChipOwnProps } from "@mui/material/Chip";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

interface RankCardProps {
  ranking: Rank;
  previousRanking: Rank | null;
}

interface RankMessage {
  message: "Increase" | "Decrease" | "Unchanged";
  color: ChipOwnProps["color"];
  icon: JSX.Element | null;
}

export default function RankTrackerCard({
  ranking,
  previousRanking,
}: RankCardProps) {
  const handleRankChangeMessage = (): RankMessage => {
    const rankNumber = Number(ranking.ranking);
    const prevRankNumber = Number(previousRanking?.ranking);

    if (rankNumber > prevRankNumber)
      return {
        message: "Increase",
        color: "success",
        icon: <TrendingUpIcon color={"success"} />,
      };
    if (rankNumber < prevRankNumber)
      return {
        message: "Decrease",
        color: "error",
        icon: <TrendingDownIcon color="error" />,
      };

    return {
      message: "Unchanged",
      color: "info",
      icon: <TrendingFlatIcon color="info" />,
    };
  };

  return (
    <article className="rank-tracker-card">
      <div className="rank-tracker-card__main">
        <div className="rank-tracker-card__main-text">
          <p className="rank-tracker-card__ranking">{ranking.ranking}</p>
          <p className="rank-tracker-card__old-ranking">
            {previousRanking?.ranking || "-"}
          </p>
        </div>
        {handleRankChangeMessage().icon}
      </div>
      <div className="rank-tracker-card__banner">
        <p>{dayjs(ranking.date).format("DD/MM")}</p>
        <Chip
          label={handleRankChangeMessage().message}
          variant="filled"
          color={handleRankChangeMessage().color}
          sx={{ font: "inherit", height: "auto", paddingY: "0.25rem" }}
        />
      </div>
    </article>
  );
}
