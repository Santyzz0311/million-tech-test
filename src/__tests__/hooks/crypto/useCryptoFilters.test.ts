import { act, renderHook } from '@testing-library/react-native'
import { useCryptosFilters } from '@/hooks/crypto/useCryptoFilters'
import {
  ContractCrypto,
  ContractCryptoResponse,
} from '@/types/implementations/contract'

describe('useCryptosFilters hook', () => {
  const mockCryptos: ContractCryptoResponse['data'] = [
    { id: 'btc', name: 'Bitcoin', priceUsd: '50000' } as ContractCrypto,
    { id: 'eth', name: 'Ethereum', priceUsd: '3500' } as ContractCrypto,
    { id: 'ltc', name: 'Litecoin', priceUsd: '200' } as ContractCrypto,
  ]

  test('returns all cryptocurrencies when no filter is applied', () => {
    const { result } = renderHook(() =>
      useCryptosFilters({ cryptos: mockCryptos }),
    )

    expect(result.current.filteredCryptos).toEqual(mockCryptos)
  })

  test('filters cryptocurrencies correctly by name', () => {
    const { result } = renderHook(() =>
      useCryptosFilters({ cryptos: mockCryptos }),
    )

    act(() => {
      result.current.updateFilters({ name: 'bit' })
    })

    expect(result.current.filteredCryptos).toEqual([
      { id: 'btc', name: 'Bitcoin', priceUsd: '50000' },
    ])
  })

  test('filters are case-insensitive', () => {
    const { result } = renderHook(() =>
      useCryptosFilters({ cryptos: mockCryptos }),
    )

    act(() => {
      result.current.updateFilters({ name: 'BIT' })
    })

    expect(result.current.filteredCryptos).toEqual([
      { id: 'btc', name: 'Bitcoin', priceUsd: '50000' },
    ])
  })

  test('updates filters correctly', () => {
    const { result } = renderHook(() =>
      useCryptosFilters({ cryptos: mockCryptos }),
    )

    act(() => {
      result.current.updateFilters({ name: 'lite' })
    })

    expect(result.current.filters.name).toBe('lite')
  })
})
