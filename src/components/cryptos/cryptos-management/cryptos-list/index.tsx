import { ContractCrypto } from '@/types/implementations/contract'
import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { CryptoItem } from './crypto-item'

interface Props {
  /**
   * List of cryptocurrencies.
   */
  cryptos: ContractCrypto[]
  /**
   * Adds more cryptocurrencies to the list.
   */
  addMoreCryptos?: () => void
}

/**
 * Cryptos list component.
 */
export const CryptosList: FC<Props> = ({ cryptos, addMoreCryptos }) => {
  const handleOnEndReachedCryptosList = () => {
    addMoreCryptos?.()
  }

  return cryptos.length > 0 ? (
    <FlatList
      data={cryptos}
      renderItem={({ item: crypto }) => <CryptoItem crypto={crypto} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      style={{ paddingHorizontal: 10 }}
      contentContainerStyle={{ paddingBottom: 60 }}
      onEndReachedThreshold={0.5}
      onEndReached={handleOnEndReachedCryptosList}
    />
  ) : (
    <View style={styles['container--empty']}>
      <Text>No cryptocurrencies found.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  'container--empty': {
    padding: 10,
  },
})
