import { useCryptos } from '@/hooks/useCryptos'
import { ActivityIndicator } from 'react-native'
import { ErrorCannotAccess } from '@/components/design-system/error'
import { CryptosList } from './cryptos-list'

/**
 * Cryptos component that manage the list of cryptocurrencies.
 */
export const Cryptos = () => {
  const { cryptos, loading, error } = useCryptos()

  if (loading) return <ActivityIndicator />

  return error ? (
    <ErrorCannotAccess message={error.message} />
  ) : (
    <CryptosList cryptos={cryptos?.data ?? []} />
  )
}
