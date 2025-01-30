import { ApiGetCryptoReponse } from '@/types/implementations/api'
import { formatPriceToCurrency } from './price-format'
import { ContractCryptoResponse } from '@/types/implementations/contract'

/**
 * Map the response from the API to the contract response.
 * @param crypto - The response from the API.
 * @returns The contract response.
 */
export const mapCryptoData = (
  crypto: ApiGetCryptoReponse,
): ContractCryptoResponse => ({
  data: crypto.data.map(crypto => ({
    id: crypto.id,
    name: crypto.name,
    circulatingSupply: crypto.csupply,
    marketCapUsd: crypto.market_cap_usd,
    maxSupply: crypto.msupply,
    nameId: crypto.nameid,
    percentChange1h: crypto.percent_change_1h,
    percentChange24h: crypto.percent_change_24h,
    percentChange7d: crypto.percent_change_7d,
    priceBtc: formatPriceToCurrency(Number(crypto.price_btc)),
    priceUsd: formatPriceToCurrency(Number(crypto.price_usd)),
    rank: crypto.rank,
    symbol: crypto.symbol,
    totalSupply: crypto.tsupply,
    volume24: crypto.volume24,
    volume24a: crypto.volume24a,
  })),
  info: {
    coinsNum: crypto.data.length,
    time: crypto.info.time,
  },
})
