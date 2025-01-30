/**
 * Represents the formatted structure for use in the application.
 */
export interface ContractCrypto {
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
  nameId: string
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
  priceUsd: string
  /**
   * Price change in percent for last 24 hours.
   */
  percentChange24h: string
  /**
   * Price change in percent for last 1 hour.
   */
  percentChange1h: string
  /**
   * Price change in percent for last 7 days.
   */
  percentChange7d: string
  /**
   * How much coin costs in BTC.
   */
  priceBtc: string
  /**
   * Coin marketcap in USD.
   */
  marketCapUsd: string
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
  circulatingSupply: string
  /**
   * Total supply.
   */
  totalSupply: string
  /**
   * Maximum supply.
   */
  maxSupply: string
}

/**
 * Represents the formatted structure for use in the application.
 */
export interface ContractCryptoInfo {
  /**
   * Total available coins. Can be used to loop through all coins as maximum
   * limit of tickers endpoint is 100 coins.
   */
  coinsNum: number
  /**
   * Timestamp of the data response.
   */
  time: number
}

/**
 * Represents the formatted structure for use in the application.
 */
export interface ContractCryptoResponse {
  /**
   * Array of contract with all crypto statistics.
   */
  data: ContractCrypto[]
  /**
   * Additional information about the response from the API.
   */
  info: ContractCryptoInfo
}
