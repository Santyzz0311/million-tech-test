import { SafeAreaView } from 'react-native'

import { Cryptos } from '@/components/cryptos'

function App() {
  return (
    <SafeAreaView style={{ backgroundColor: '#0af', flex: 1 }}>
      <Cryptos />
    </SafeAreaView>
  )
}

export default App
