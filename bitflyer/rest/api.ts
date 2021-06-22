import crypto from "crypto";
import winston from "winston";
import fetch from "node-fetch";

export type Config = {
  apiKey: string;
  apiSecret: string;
  logger: winston.Logger;
};

const origin = "https://api.bitflyer.com";

const getHeaders = ({
  path,
  method,
  body = "",
  timestamp,
  apiKey,
  apiSecret,
}: {
  path: string;
  method: string;
  body?: string;
  timestamp: string;
  apiKey: string;
  apiSecret: string;
}) => {
  const text = timestamp + method + path + body;
  const sign = crypto
    .createHmac("sha256", apiSecret)
    .update(text)
    .digest("hex");

  const headers = {
    "ACCESS-KEY": apiKey,
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-SIGN": sign,
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
      apiKey: config.apiKey,
      apiSecret: config.apiSecret,
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
