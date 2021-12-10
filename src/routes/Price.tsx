import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

import {
  Routes,
  Route,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";

interface RouteParams {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Boxs = styled.div`
  background-color: #0abac0;
  margin: 20px;
  padding: 10px;

  height: fit-content;
`;

const Box = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  span:nth-child(1) {
  }
`;

function Price() {
  const { coinId } = useParams() as RouteParams;
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000000,
    }
  );

  return (
    <>
      <Boxs>
        <Box>
          <span>price : </span>
          <span>${tickersData?.quotes.USD.price}</span>
        </Box>
        <Box>
          <span>Change rate (last 30 Minutes):</span>
          <span>{tickersData?.quotes?.USD.percent_change_30m}</span>
        </Box>
        <Box>
          <span>Change rate (last 1 hours):</span>
          <span>{tickersData?.quotes?.USD.percent_change_1h}</span>
        </Box>
        <Box>
          <span>Change rate (last 12 hours):</span>
          <span>{tickersData?.quotes?.USD.percent_change_12h}</span>
        </Box>
        <Box>
          <span>Change rate (last 24 hours):</span>
          <span>{tickersData?.quotes?.USD.percent_change_24h}</span>
        </Box>
      </Boxs>
    </>
  );
}

export default Price;
