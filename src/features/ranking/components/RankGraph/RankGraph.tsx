import { useEffect, useState } from "react";
import "./RankGraph.scss";
import { LineSeries, ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import { getRankingsOneArmy } from "../../../../utils/RankingRequests";
interface Rankings {
  ranking: string | undefined;
  date: string;
}

export default function RankGraph(props: {
  army_id: string | undefined;
  name: string;
}) {
  const [rankings, setRankings] = useState<LineSeries[]>([
    { id: "", data: [{ x: 0, y: 0 }] },
  ]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50);

  useEffect(() => {
    const fetchRankings = async () => {
      if (props.army_id && props.name) {
        const response = await getRankingsOneArmy(props.army_id);
        const mappedResponse = response.map((ranking: Rankings) => {
          return {
            y: Number(ranking.ranking),
            x: dayjs(ranking.date, "YYYY-MM-DDThh:mm:ss:SSSZ").format(
              "DD-MM-YY"
            ),
          };
        });

        const sortedArray = mappedResponse.toSorted(
          (a: { x: number; y: number }, b: { x: number; y: number }) =>
            a.y - b.y
        );
        setRankings([{ id: props.name, data: mappedResponse }]);
        setMinValue(sortedArray[0].y * 0.95);
        setMaxValue(sortedArray[sortedArray.length - 1].y * 1.05);
      }
    };
    fetchRankings();
  }, []);

  return (
    <article className='rank-graph'>
      <h2 className='rank-graph__title'>Your Rank History</h2>
      <div className='rank-graph__wrap'>
        <ResponsiveLine
          data={rankings}
          margin={{ top: 20, right: 60, bottom: 50, left: 120 }}
          colors={"#222222"}
          theme={{
            background: "transparent",
            axis: {
              legend: {
                text: {
                  fontSize: 24,
                  fill: "#222222",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
              ticks: {
                line: {
                  stroke: "#222222",
                  strokeWidth: 1,
                },
                text: {
                  fontSize: 16,
                  fill: "#222222",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
            },
            grid: {
              line: {
                stroke: "#ededed",
                strokeWidth: 1,
              },
            },
          }}
          yFormat=' >-.2f'
          curve='natural'
          yScale={{
            type: "linear",
            min: minValue,
            max: maxValue,
            stacked: true,
            reverse: false,
          }}
          axisBottom={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 16,
            tickRotation: 0,
            legend: "Score",
            legendOffset: -80,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel='data.yFormatted'
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
        />
      </div>
    </article>
  );
}
