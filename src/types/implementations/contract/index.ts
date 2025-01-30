export interface ContractCrypto {
  /**
   * Total number of coins available on our platform.
   */
  coinsCount: number
  /**
   * Total cryptocurrency exchange pairs (markets) which is tracked on coinlore.
   */
  activeMarkets: number
  /**
   * Total crypto market cap, sum of all coins mcap.
   */
  totalMcap: number
  /**
   * Total trading volume for last 24h, sum of 24h volume for all crypto coins.
   */
  totalVolume: number
  /**
   * Dominance of bitcoin mcap.
   */
  btcDominance: string
  /**
   * Dominance of ethereum mcap.
   */
  ethDominance: string
  /**
   * How mcap changed for last 24h.
   */
  mcapChange: string
  /**
   * How trading volume changed for last 24h.
   */
  volumeChange: string
  /**
   * On average how prices have been changed.
   */
  avgChangePercent: string
  /**
   * ATH total trading volume.
   */
  volumeAth: number
  /**
   * ATH total marketcap.
   */
  mcapAth: number
}
