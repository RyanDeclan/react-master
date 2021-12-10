import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 1000000,
    }
  );
  const items = data;
  const rusult = items?.map((item) => {
    const x = new Date(item.time_close);
    const y = [item.open, item.high, item.low, item.close];
    return { x, y };
  });

  return (
    <div style={{ color: "black" }}>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          height="350"
          series={[
            {
              name: "Price",
              data: rusult,
            },
          ]}
          options={{
            grid: { show: false },
            chart: {
              height: 300,

              width: 500,
              toolbar: {
                show: false,
              },
            },

            yaxis: {
              show: false,
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              labels: { show: false },
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
