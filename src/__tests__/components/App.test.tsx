import { render, screen } from '@testing-library/react-native'
import App from '@/App'

jest.mock('@/components/cryptos', () => {
  const { Text } = require('react-native')
  return {
    Cryptos: () => <Text testID="mocked-cryptos">Mocked Cryptos</Text>,
  }
})

test('renders App with Cryptos component', () => {
  render(<App />)

  expect(screen.getByTestId('mocked-cryptos')).toBeTruthy()
})
