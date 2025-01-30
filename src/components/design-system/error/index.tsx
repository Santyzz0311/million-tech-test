import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  /**
   * Error message.
   */
  message: string
}

/**
 * Error component for when the user cannot access the data.
 */
export const ErrorCannotAccess: FC<Props> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.container__message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
  },
  container__message: {
    color: 'red',
  },
})
