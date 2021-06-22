import crypto from "crypto";
import winston from "winston";
import fetch from "node-fetch";

export type Config = {
  apiKey: string;
  apiSecret: string;
  subAccount?: string;
  logger: winston.Logger;
};

const origin = "https://ftx.com";

export const getHeaders = ({
  path,
  method,
  body = "",
  timestamp,
  config,
}: {
  path: string;
  method: string;
  body?: string;
  timestamp: string;
  config: Config;
}) => {
  const payload = `${timestamp}${method}${path}${body}`;
  const sign = crypto
    .createHmac("sha256", config.apiSecret)
    .update(payload)
    .digest("hex");

  const headers = {
    "FTX-KEY": config.apiKey,
    "FTX-TS": timestamp,
    "FTX-SIGN": sign,
    "FTX-SUBACCOUNT": config.subAccount,
    "Content-Type": "application/json",
  };

  return headers;
};

const callAPI = async ({
  method,
  path,
  body,
  config,
}: {
  method: "GET" | "POST";
  path: string;
  body?: object;
  config: Config;
}) => {
  const url = origin + path;
  const timestamp = Date.now().toString();
  const _body = JSON.stringify(body);

  const response = await fetch(url, {
    method,
    body: _body,
    headers: getHeaders({
      path,
      method,
      body: _body,
      timestamp,
      config,
    }),
  });

  return response;
};

export const getCall = async ({
  path,
  config,
}: {
  path: string;
  config: Config;
}) =>
  callAPI({
    method: "GET",
    path,
    config,
  });

export const postCall = async ({
  path,
  body,
  config,
}: {
  path: string;
  body: object;
  config: Config;
}) =>
  callAPI({
    method: "POST",
    path,
    body,
    config,
  });
