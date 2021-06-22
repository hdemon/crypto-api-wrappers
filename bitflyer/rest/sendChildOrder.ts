import { Config, postCall } from "./api";

export const sendChildOrder = async ({
  side,
  size,
  config,
}: {
  side: "BUY" | "SELL";
  size: number;
  config: Config;
}) => {
  const path = `/v1/me/sendchildorder`;
  const body = {
    product_code: "FX_BTC_JPY",
    child_order_type: "MARKET",
    side,
    size,
  };
  const response = await postCall({
    path,
    body,
    config,
  });

  return await response.json();
};
