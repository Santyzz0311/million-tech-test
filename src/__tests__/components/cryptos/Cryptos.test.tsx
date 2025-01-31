import { render, screen } from '@testing-library/react-native'
import { Cryptos } from '@/components/cryptos'
import { useCryptos } from '@/hooks/crypto/useCryptos'

jest.mock('@/hooks/crypto/useCryptos')

jest.mock('@/components/cryptos/cryptos-management', () => {
  const { Text } = require('react-native')
  return {
    CryptosManagement: () => (
      <Text testID="cryptos-management">Cryptos Management</Text>
    ),
  }
})

jest.mock('@/components/design-system/error', () => {
  const { Text } = require('react-native')
  return {
    ErrorCannotAccess: ({ message }: { message: string }) => (
      <Text testID="error">{message}</Text>
    ),
  }
})

describe('Cryptos Component', () => {
  test('displays an ActivityIndicator while loading', () => {
    ;(useCryptos as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      cryptos: null,
      addMoreCryptos: jest.fn(),
      loadingMoreCryptos: false,
    })

    render(<Cryptos />)

    expect(screen.getByTestId('activity-indicator')).toBeTruthy()
  })

  test('displays an error message when there is an error fetching data', () => {
    ;(useCryptos as jest.Mock).mockReturnValue({
      loading: false,
      error: { message: 'Error fetching data' },
      cryptos: null,
      addMoreCryptos: jest.fn(),
      loadingMoreCryptos: false,
    })

    render(<Cryptos />)

    expect(screen.getByTestId('error')).toBeTruthy()
    expect(screen.getByText('Error fetching data')).toBeTruthy()
  })

  test('displays `CryptosManagement` when data is successfully loaded', () => {
    const mockCryptos = [{ id: 'btc', name: 'Bitcoin' }]
    ;(useCryptos as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      cryptos: mockCryptos,
      addMoreCryptos: jest.fn(),
      loadingMoreCryptos: false,
    })

    render(<Cryptos />)

    expect(screen.getByTestId('cryptos-management')).toBeTruthy()
  })
})
