import { StyleSheet, TextInput, View } from 'react-native'
import { CryptosList } from './cryptos-list'
import { ContractCryptoResponse } from '@/types/implementations/contract'
import { FC } from 'react'
import { useCryptosFilters } from '@/hooks/crypto/useCryptoFilters'

interface Props {
  /**
   * Cryptocurrency data.
   */
  cryptos: ContractCryptoResponse
}

/**
 * Cryptos management component.
 */
export const CryptosManagement: FC<Props> = ({ cryptos }) => {
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
          onChangeText={handleOnChangeTextSearchCrypto}
          value={filters.name}
        />
      </View>
      <CryptosList cryptos={filteredCryptos} />
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
