export interface ApiGetCrypto {
  /**
   * Total number of coins available on our platform.
   */
  coins_count: number
  /**
   * Total cryptocurrency exchange pairs (markets) which is tracked on coinlore.
   */
  active_markets: number
  /**
   * Total crypto market cap, sum of all coins mcap.
   */
  total_mcap: number
  /**
   * Total trading volume for last 24h, sum of 24h volume for all crypto coins.
   */
  total_volume: number
  /**
   * Dominance of bitcoin mcap.
   */
  btc_d: string
  /**
   * Dominance of ethereum mcap.
   */
  eth_d: string
  /**
   * How mcap changed for last 24h.
   */
  mcap_change: string
  /**
   * How trading volume changed for last 24h.
   */
  volume_change: string
  /**
   * On average how prices have been changed.
   */
  avg_change_percent: string
  /**
   * ATH total trading volume.
   */
  volume_ath: number
  /**
   * ATH total marketcap.
   */
  mcap_ath: number
}
