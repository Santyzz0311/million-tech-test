import { useCryptos } from '@/hooks/crypto/useCryptos'
import { getAllCryptoStatistics } from '@/services/crypto'
import { ContractCryptoResponse } from '@/types/implementations/contract'
import { GetAllCryptosError } from '@/utils/custom-errors'
import { HTTP_STATUS_CODES } from '@/utils/enums'
import { act, renderHook, waitFor } from '@testing-library/react-native'

jest.mock('@/services/crypto')

describe('useCryptos hook', () => {
  const mockCryptoData: ContractCryptoResponse = {
    data: [
      {
        id: 'btc',
        name: 'Bitcoin',
        priceUsd: '50000',
      } as ContractCryptoResponse['data'][0],
      {
        id: 'eth',
        name: 'Ethereum',
        priceUsd: '3500',
      } as ContractCryptoResponse['data'][1],
    ],
    info: { coinsNum: 2, time: 1000 },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches and sets cryptos correctly', async () => {
    ;(getAllCryptoStatistics as jest.Mock).mockResolvedValue(mockCryptoData)

    const { result } = renderHook(() => useCryptos())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.cryptos).toEqual(mockCryptoData))

    expect(result.current.loading).toBe(false)
  })

  test('handles errors correctly', async () => {
    const mockError = new GetAllCryptosError(
      'Failed to get all cryptos',
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    )
    ;(getAllCryptoStatistics as jest.Mock).mockRejectedValue(mockError)

    const { result } = renderHook(() => useCryptos())

    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.error).toEqual(mockError))

    expect(result.current.loading).toBe(false)
  })

  test('calls `getAllCryptoStatistics` with default start value (100)', async () => {
    ;(getAllCryptoStatistics as jest.Mock).mockResolvedValue(mockCryptoData)

    renderHook(() => useCryptos())

    await waitFor(() =>
      expect(getAllCryptoStatistics).toHaveBeenCalledWith(
        { start: 100 },
        expect.anything(),
      ),
    )
  })

  test('adds more cryptos when calling `addMoreCryptos`', async () => {
    ;(getAllCryptoStatistics as jest.Mock).mockResolvedValue(mockCryptoData)

    const { result } = renderHook(() => useCryptos())

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.addMoreCryptos()
    })

    await waitFor(() => expect(result.current.loadingMoreCryptos).toBe(false))

    expect(result.current.cryptos?.data.length).toBe(4)
  })

  test('does not add more cryptos if already loading more', async () => {
    ;(getAllCryptoStatistics as jest.Mock).mockResolvedValue(mockCryptoData)

    const { result } = renderHook(() => useCryptos())

    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.addMoreCryptos()
      result.current.addMoreCryptos()
    })

    await waitFor(() => expect(getAllCryptoStatistics).toHaveBeenCalledTimes(2))
  })

  test('does not fetch data when autoFetch is false', async () => {
    renderHook(() => useCryptos({ autoFetch: false }))

    await waitFor(() => expect(getAllCryptoStatistics).not.toHaveBeenCalled())
  })

  test('cancels request on unmount', async () => {
    const { unmount } = renderHook(() => useCryptos())

    await act(async () => {
      unmount()
    })

    await waitFor(() => expect(getAllCryptoStatistics).toHaveBeenCalled())
  })
})
