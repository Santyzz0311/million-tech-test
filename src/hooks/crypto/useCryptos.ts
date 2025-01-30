import { getAllCryptoStatistics } from '@/services/crypto'
import { ContractCryptoResponse } from '@/types/implementations/contract'
import { GetAllCryptosError } from '@/utils/custom-errors'
import { useCallback, useEffect, useState } from 'react'

/**
 * Fetches the list of cryptocurrencies
 * @returns The list of cryptocurrencies
 */
export function useCryptos({ autoFetch = true } = {}) {
  const [cryptos, setCryptos] = useState<ContractCryptoResponse | null>(null)
  const [error, setError] = useState<InstanceType<
    typeof GetAllCryptosError
  > | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const refreshCryptos = useCallback((signal?: AbortSignal) => {
    setLoading(true)
    getAllCryptoStatistics(signal)
      .then(cryptos => {
        setCryptos(cryptos)
        setError(null)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!autoFetch) return

    const controller = new AbortController()

    refreshCryptos(controller.signal)

    return () => controller.abort()
  }, [autoFetch, refreshCryptos])

  return {
    cryptos,
    loading,
    refreshCryptos,
    error,
  }
}
