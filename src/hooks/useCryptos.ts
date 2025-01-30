import { getAllCryptoStatistics } from '@/services/crypto'
import { ContractCrypto } from '@/types/implementations/contract'
import { useCallback, useEffect, useState } from 'react'

/**
 * Fetches the list of cryptocurrencies
 * @returns The list of cryptocurrencies
 */
export function useCryptos({ autoFetch = true } = {}) {
  const [cryptos, setCryptos] = useState<ContractCrypto[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const refreshCryptos = useCallback((signal?: AbortSignal) => {
    setLoading(true)
    getAllCryptoStatistics(signal)
      .then(cryptos => setCryptos(cryptos))
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
  }
}
