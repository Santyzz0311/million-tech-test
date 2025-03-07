import useAnimation from '@/hooks/shared/useAnimation'
import { useBoolean } from '@/hooks/shared/useBoolean'
import { ContractCrypto } from '@/types/implementations/contract'
import { memo } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
  /**
   * Cryptocurrency data.
   */
  crypto: ContractCrypto
  /**
   * The index of the cryptocurrency in the list.
   */
  index: number
}

export const CryptoItem = memo(({ crypto, index }: Props) => {
  const opacity = useAnimation({
    initialValue: 0,
    toValue: 1,
    delay: 1,
    delayValueReference: index,
  })
  const { value: isOpen, toggle } = useBoolean()

  const handlePressCryptoItem = () => {
    toggle()
  }

  const getCanShowDetails = (pressed: boolean) => {
    return pressed || isOpen
  }

  const cryptoName =
    crypto.name.length > 20
      ? crypto.name.slice(0, 20).concat('...')
      : crypto.name

  return (
    <Animated.View style={{ opacity }}>
      <Pressable
        onPress={handlePressCryptoItem}
        style={({ pressed }) => pressed && styles['container--pressed']}>
        {({ pressed }) => (
          <View style={styles.container__data}>
            <View style={styles.data__mainInfo}>
              <Text style={styles.mainInfo__name}>{cryptoName}</Text>
              <Text style={styles.mainInfo__priceInUsd}>
                Price in USD: {crypto.priceUsd}
              </Text>
            </View>
            {getCanShowDetails(pressed) && (
              <View style={styles.data__details}>
                <Text style={styles.details__item}>
                  Rank: {crypto.rank || '-'}
                </Text>
                <Text style={styles.details__item}>
                  Market cap usd: {crypto.marketCapUsd || '-'}
                </Text>
                <Text style={styles.details__item}>
                  Max supply: {crypto.maxSupply || '-'}
                </Text>
                <Text style={styles.details__item}>
                  Percent change 1h: {crypto.percentChange1h || '-'}
                </Text>
                <Text style={styles.details__item}>
                  Percent change 24h: {crypto.percentChange24h || '-'}
                </Text>
                <Text style={styles.details__item}>
                  Percent change 7d: {crypto.percentChange7d || '-'}
                </Text>
                <Text style={styles.details__item}>
                  Price in btc: {crypto.priceBtc || '-'}
                </Text>
              </View>
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  )
})

CryptoItem.displayName = 'CryptoItem'

const styles = StyleSheet.create({
  'container--pressed': {
    opacity: 0.5,
  },
  container__data: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    gap: 10,
  },
  data__mainInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainInfo__name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  mainInfo__priceInUsd: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
  data__details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  details__item: {
    borderRadius: 4,
    padding: 3,
    borderColor: 'black',
    borderWidth: 0.5,
    textAlign: 'center',
  },
})
