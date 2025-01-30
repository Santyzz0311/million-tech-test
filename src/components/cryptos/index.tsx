import { useCryptos } from '@/hooks/useCryptos'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export const Cryptos = () => {
  const { cryptos, loading } = useCryptos()

  console.log({ cryptos })

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Text>DAS</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
