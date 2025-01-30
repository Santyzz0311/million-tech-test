import { SafeAreaView } from 'react-native'

import { Cryptos } from '@/components/cryptos'

function App() {
  return (
    <SafeAreaView style={{ backgroundColor: '#e2e2e2', flex: 1 }}>
      <Cryptos />
    </SafeAreaView>
  )
}

export default App
