import { apiClient } from '@/configs/axios'
import { ApiGetCrypto } from '@/types/implementations/api'
import { ContractCrypto } from '@/types/implementations/contract'
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
): Promise<ContractCrypto[]> => {
  try {
    const response = await apiClient.get<ApiGetCrypto[]>('global/', { signal })
    const cryptos = response.data

    return cryptos.map(crypto => ({
      activeMarkets: crypto.active_markets,
      avgChangePercent: crypto.avg_change_percent,
      btcDominance: crypto.btc_d,
      coinsCount: crypto.coins_count,
      ethDominance: crypto.eth_d,
      mcapAth: crypto.mcap_ath,
      mcapChange: crypto.mcap_change,
      totalMcap: crypto.total_mcap,
      totalVolume: crypto.total_volume,
      volumeAth: crypto.volume_ath,
      volumeChange: crypto.volume_change,
    }))
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
