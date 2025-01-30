import { apiClient } from '@/configs/axios'
import { ApiGetCryptoReponse } from '@/types/implementations/api'
import { ContractCryptoResponse } from '@/types/implementations/contract'
import { GetAllCryptosError } from '@/utils/custom-errors'
import { HTTP_STATUS_CODES } from '@/utils/enums'
import { mapCryptoData } from '@/utils/helpers/crypto-mappers'
import { isAxiosError } from 'axios'

interface GetAllCryptoStatisticsParams {
  /**
   * The start index of the list of cryptocurrencies.
   */
  start?: number
  /**
   * The limit of the list of cryptocurrencies.
   */
  limit?: number
}

/**
 * Get all crypto statistics.
 * @param signal - An optional AbortSignal to allow cancelling the request.
 * @throws {GetAllCryptosError} - Failed to get all cryptos.
 * @returns A promise that resolves to an array of contract with all crypto statistics.
 */
export const getAllCryptoStatistics = async (
  { start = 100, limit = 100 }: GetAllCryptoStatisticsParams = {},
  signal?: AbortSignal,
): Promise<ContractCryptoResponse> => {
  try {
    const response = await apiClient.get<ApiGetCryptoReponse>(
      `tickers/?start=${start}&limit=${limit}`,
      {
        signal,
      },
    )
    const cryptoData = response.data

    return mapCryptoData(cryptoData)
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
