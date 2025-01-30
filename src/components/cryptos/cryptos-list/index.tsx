import { ContractCrypto } from '@/types/implementations/contract'
import { FC } from 'react'
import { FlatList, Text, View } from 'react-native'
import { CryptoItem } from './crypto-item'

interface Props {
  /**
   * List of cryptocurrencies.
   */
  cryptos: ContractCrypto[]
}

/**
 * Cryptos list component.
 */
export const CryptosList: FC<Props> = ({ cryptos }) => {
  return cryptos.length > 0 ? (
    <FlatList
      data={cryptos}
      renderItem={({ item: crypto }) => <CryptoItem crypto={crypto} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      style={{ paddingHorizontal: 10 }}
    />
  ) : (
    <View>
      <Text>No cryptocurrencies found. Please try again later.</Text>
    </View>
  )
}
