import { apiClient } from '@/configs/axios'
import { ApiGetCryptoReponse } from '@/types/implementations/api'
import { ContractCryptoResponse } from '@/types/implementations/contract'
import { GetAllCryptosError } from '@/utils/custom-errors'
import { HTTP_STATUS_CODES } from '@/utils/enums'
import { isAxiosError } from 'axios'

/**
 * Get all crypto statistics.
 * @param signal - An optional AbortSignal to allow cancelling the request.
 * @throws {GetAllCryptosError} - Failed to get all cryptos.
 * @returns A promise that resolves to an array of contract with all crypto statistics.
 */
export const getAllCryptoStatistics = async (
  signal?: AbortSignal,
): Promise<ContractCryptoResponse> => {
  try {
    const response = await apiClient.get<ApiGetCryptoReponse>('tickers/', {
      signal,
    })
    const cryptoData = response.data

    return {
      data: cryptoData.data.map(crypto => ({
        id: crypto.id,
        name: crypto.name,
        circulatingSupply: crypto.csupply,
        marketCapUsd: crypto.market_cap_usd,
        maxSupply: crypto.msupply,
        nameId: crypto.nameid,
        percentChange1h: crypto.percent_change_1h,
        percentChange24h: crypto.percent_change_24h,
        percentChange7d: crypto.percent_change_7d,
        priceBtc: crypto.price_btc,
        priceUsd: crypto.price_usd,
        rank: crypto.rank,
        symbol: crypto.symbol,
        totalSupply: crypto.tsupply,
        volume24: crypto.volume24,
        volume24a: crypto.volume24a,
      })),
      info: {
        coinsNum: cryptoData.data.length,
        time: cryptoData.info.time,
      },
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new GetAllCryptosError(
        'Failed to get all cryptos',
        error.response?.status ?? HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      )
    } else {
      throw new GetAllCryptosError(
        'Failed to get all cryptos',
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
