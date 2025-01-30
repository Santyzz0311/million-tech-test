/**
 * Represents the raw response format from the cryptocurrency API.
 */
export interface ApiCrypto {
  /**
   * ID of cryptocurrency.
   */
  id: string
  /**
   * Cryptocurrency Ticker symbol.
   */
  symbol: string
  /**
   * Name slug.
   */
  nameid: string
  /**
   * Full name of crypto coin.
   */
  name: string
  /**
   * Rank by marketcap.
   */
  rank: number
  /**
   * Price in USD currency.
   */
  price_usd: string
  /**
   * Price change in percent for last 24 hours.
   */
  percent_change_24h: string
  /**
   * Price change in percent for last 1 hour.
   */
  percent_change_1h: string
  /**
   * Price change in percent for last 7 days.
   */
  percent_change_7d: string
  /**
   * How much coin costs in BTC.
   */
  price_btc: string
  /**
   * Coin marketcap in USD.
   */
  market_cap_usd: string
  /**
   * Trading volume of coin for last 24 hours in USD.
   */
  volume24: string
  /**
   * How many coins have been traded in the last 24 hours.
   */
  volume24a: string
  /**
   * Circulating supply.
   */
  csupply: string
  /**
   * Total supply.
   */
  tsupply: string
  /**
   * Maximum supply.
   */
  msupply: string
}

/**
 * Represents the additional information about the response from the
 */
export interface ApiCryptoInfo {
  /**
   * Total available coins. Can be used to loop through all coins as maximum
   * limit of tickers endpoint is 100 coins.
   */
  coins_num: number
  /**
   * Timestamp of the data response.
   */
  time: number
}

/**
 * Represents the raw response format from the cryptocurrency API.
 */
export interface ApiGetCryptoReponse {
  /**
   * Cryptocurrency statistics.
   */
  data: ApiCrypto[]
  /**
   * Additional information about the response.
   */
  info: ApiCryptoInfo
}
