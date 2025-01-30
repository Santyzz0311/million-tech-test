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
  const [start, setStart] = useState<number>(100)
  const [loadingMoreCryptos, setLoadingMoreCryptos] = useState<boolean>(false)
  const [error, setError] = useState<InstanceType<
    typeof GetAllCryptosError
  > | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const refreshCryptos = useCallback(
    (signal?: AbortSignal) => {
      if (start === 100) setLoading(true)
      else setLoadingMoreCryptos(true)
      getAllCryptoStatistics({ start }, signal)
        .then(cryptos => {
          setCryptos(prevCryptos => {
            if (!prevCryptos) return cryptos

            return {
              data: [...prevCryptos.data, ...cryptos.data],
              info: cryptos.info,
            }
          })
          setError(null)
        })
        .catch(error => {
          setError(error)
        })
        .finally(() => {
          if (start === 100) setLoading(false)
          else setLoadingMoreCryptos(false)
        })
    },
    [start],
  )

  const addMoreCryptos = useCallback(() => {
    if (loadingMoreCryptos) return
    setStart(prevStart => prevStart + 100)
  }, [loadingMoreCryptos])

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
    addMoreCryptos,
    loadingMoreCryptos,
  }
}
