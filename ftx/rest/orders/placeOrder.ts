import { Config, postCall } from "../api";

export const placeOrder = ({
  market,
  side,
  size,
  reduceOnly,
  config,
}: {
  market: string;
  side: "buy" | "sell";
  size: number;
  reduceOnly?: boolean;
  config: Config;
}) => {
  const path = `/api/orders`;
  const body = {
    market,
    side,
    type: "market",
    size,
    price: null as unknown,
    reduceOnly,
  };

  return postCall({
    path,
    body,
    config,
  });
};
