import { Config, getCall } from "./api";

export const getMarginStatus = async ({ config }: { config: Config }) => {
  const path = `/v1/me/getcollateral`;
  const response = await getCall({
    path,
    config,
  });

  return (await response.json()) as { open_position_pnl: number };
};
