import { ContractCrypto } from '@/types/implementations/contract'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  /**
   * Cryptocurrency data.
   */
  crypto: ContractCrypto
}

export const CryptoItem = ({ crypto }: Props) => {
  return (
    <View style={styles.container}>
      <Text>{crypto.name}</Text>
      <Text>Price in USD: {crypto.priceUsd}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container__message: {
    color: 'red',
  },
})
