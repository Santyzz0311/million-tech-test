import { getAllCryptoStatistics } from '@/services/crypto'
import { apiClient } from '@/configs/axios'
import { ApiGetCryptoReponse } from '@/types/implementations/api'
import { GetAllCryptosError } from '@/utils/custom-errors'
import { HTTP_STATUS_CODES } from '@/utils/enums'
import { mapCryptoData } from '@/utils/helpers/crypto-mappers'
import { AxiosError } from 'axios'

jest.mock('@/configs/axios')
jest.mock('@/utils/helpers/crypto-mappers')

describe('getAllCryptoStatistics', () => {
  const mockCryptoData: ApiGetCryptoReponse = {
    data: [
      {
        id: 'btc',
        name: 'Bitcoin',
        price_usd: '50000',
      } as ApiGetCryptoReponse['data'][0],
      {
        id: 'eth',
        name: 'Ethereum',
        price_usd: '3500',
      } as ApiGetCryptoReponse['data'][1],
    ],
    info: {
      coins_num: 2,
      time: 1000,
    },
  }

  const mappedCryptoData = {
    data: [
      { id: 'btc', name: 'Bitcoin', priceUsd: 50000 },
      { id: 'eth', name: 'Ethereum', priceUsd: 3500 },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches crypto statistics successfully', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValue({ data: mockCryptoData })
    ;(mapCryptoData as jest.Mock).mockReturnValue(mappedCryptoData)

    const result = await getAllCryptoStatistics()

    expect(apiClient.get).toHaveBeenCalledWith('tickers/?start=100&limit=100', {
      signal: undefined,
    })
    expect(mapCryptoData).toHaveBeenCalledWith(mockCryptoData)
    expect(result).toEqual(mappedCryptoData)
  })

  test('uses default parameters if none are provided', async () => {
    ;(apiClient.get as jest.Mock).mockResolvedValue({ data: mockCryptoData })
    await getAllCryptoStatistics()

    expect(apiClient.get).toHaveBeenCalledWith('tickers/?start=100&limit=100', {
      signal: undefined,
    })
  })

  test('throws GetAllCryptosError with correct HTTP status on Axios error', async () => {
    const axiosError = new AxiosError('Network Error')
    axiosError.response = { status: 404 } as any
    ;(apiClient.get as jest.Mock).mockRejectedValue(axiosError)

    await expect(getAllCryptoStatistics()).rejects.toThrow(GetAllCryptosError)
    await expect(getAllCryptoStatistics()).rejects.toThrow(
      'Failed to get all cryptos',
    )
    await expect(getAllCryptoStatistics()).rejects.toHaveProperty(
      'statusCode',
      404,
    )
  })

  test('throws GetAllCryptosError with 500 on unknown error', async () => {
    ;(apiClient.get as jest.Mock).mockRejectedValue(
      new Error('Unexpected error'),
    )

    await expect(getAllCryptoStatistics()).rejects.toThrow(GetAllCryptosError)
    await expect(getAllCryptoStatistics()).rejects.toThrow(
      'Failed to get all cryptos',
    )
    await expect(getAllCryptoStatistics()).rejects.toHaveProperty(
      'statusCode',
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    )
  })

  test('passes AbortSignal correctly to API call', async () => {
    const mockSignal = new AbortController()

    ;(apiClient.get as jest.Mock).mockResolvedValue({ data: mockCryptoData })
    await getAllCryptoStatistics({}, mockSignal.signal)

    expect(apiClient.get).toHaveBeenCalledWith('tickers/?start=100&limit=100', {
      signal: mockSignal.signal,
    })
  })
})
