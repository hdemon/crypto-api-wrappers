export type Ticker<Pair extends string> = {
  channel: `lightning_ticker_${Pair}`;
  message: {
    product_code: Pair; // "BTC_JPY";
    state: "RUNNING";
    timestamp: string; // "2021-06-15T12:36:50.8871232Z";
    tick_id: number;
    best_bid: number;
    best_ask: number;
    best_bid_size: number;
    best_ask_size: number;
    total_bid_depth: number;
    total_ask_depth: number;
    market_bid_size: number;
    market_ask_size: number;
    ltp: number;
    volume: number;
    volume_by_product: number;
  };
};
