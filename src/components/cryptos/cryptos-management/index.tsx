import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native'
import { CryptosList } from './cryptos-list'
import { ContractCryptoResponse } from '@/types/implementations/contract'
import { FC } from 'react'
import { useCryptosFilters } from '@/hooks/crypto/useCryptoFilters'

interface Props {
  /**
   * Cryptocurrency data.
   */
  cryptos: ContractCryptoResponse
  /**
   * Adds more cryptocurrencies to the list.
   */
  addMoreCryptos?: () => void
  /**
   * Loading more cryptocurrencies.
   */
  loadingMoreCryptos?: boolean
}

/**
 * Cryptos management component.
 */
export const CryptosManagement: FC<Props> = ({
  cryptos,
  addMoreCryptos,
  loadingMoreCryptos,
}) => {
  const { filteredCryptos, filters, updateFilters } = useCryptosFilters({
    cryptos: cryptos.data,
  })

  const handleOnChangeTextSearchCrypto = (text: string) => {
    updateFilters({ name: text })
  }

  return (
    <View style={styles.container}>
      <View style={styles.container__header}>
        <TextInput
          style={styles.header__input}
          placeholder="Search for a cryptocurrency"
          placeholderTextColor="black"
          onChangeText={handleOnChangeTextSearchCrypto}
          value={filters.name}
        />
      </View>
      <CryptosList cryptos={filteredCryptos} addMoreCryptos={addMoreCryptos} />
      {loadingMoreCryptos && <ActivityIndicator color="#000" />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  container__header: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  header__input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
  },
})
