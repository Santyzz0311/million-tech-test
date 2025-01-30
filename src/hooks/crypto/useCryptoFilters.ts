import { ContractCryptoResponse } from '@/types/implementations/contract'
import { useMemo, useState } from 'react'

interface UseCryptosFiltersParams {
  /**
   * Cryptocurrencies data.
   */
  cryptos: ContractCryptoResponse['data']
}

interface CryptoFilters {
  /**
   * Filter name.
   */
  name: string
}

/**
 * Hook to filter cryptocurrencies.
 */
export function useCryptosFilters({ cryptos }: UseCryptosFiltersParams) {
  const [filters, setFilters] = useState<CryptoFilters>({
    name: '',
  })

  const updateFilters = (newFilters: Partial<CryptoFilters>) => {
    setFilters({
      ...filters,
      ...newFilters,
    })
  }

  const filteredCryptos = useMemo(() => {
    if (!filters.name) return cryptos

    return cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(filters.name.toLowerCase()),
    )
  }, [cryptos, filters])

  return {
    filters,
    updateFilters,
    filteredCryptos,
  }
}
