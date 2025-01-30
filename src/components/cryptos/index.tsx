import { useCryptos } from '@/hooks/crypto/useCryptos'
import { ActivityIndicator } from 'react-native'
import { ErrorCannotAccess } from '@/components/design-system/error'
import { CryptosManagement } from './cryptos-management'

/**
 * Cryptos component that manage the list of cryptocurrencies.
 */
export const Cryptos = () => {
  const { cryptos, loading, error } = useCryptos()

  if (loading) return <ActivityIndicator />

  return error || !cryptos ? (
    <ErrorCannotAccess
      message={error?.message ?? 'An error has been ocurred'}
    />
  ) : (
    <CryptosManagement cryptos={cryptos} />
  )
}
