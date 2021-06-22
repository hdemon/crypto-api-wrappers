import { Config, getCall } from "../api";

export const getPositions = async ({ config }: { config: Config }) => {
  // "/api" を含まないとvalidなsignatureにならない
  const path = `/api/positions`;
  const response = await getCall({
    path,
    config,
  });

  return (await response.json()) as any;
};
