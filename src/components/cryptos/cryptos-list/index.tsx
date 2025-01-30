import { ContractCrypto } from '@/types/implementations/contract'
import { FC } from 'react'
import { FlatList, Text, View } from 'react-native'

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
      renderItem={({ item: crypto }) => <></>} // TODO: Implement the item component
      keyExtractor={item => item.id}
    />
  ) : (
    <View>
      <Text>No cryptocurrencies found. Please try again later.</Text>
    </View>
  )
}
