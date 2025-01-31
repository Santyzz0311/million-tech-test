import { render, screen } from '@testing-library/react-native'
import { CryptosList } from '@/components/cryptos/cryptos-management/cryptos-list'
import { ContractCrypto } from '@/types/implementations/contract'

jest.mock(
  '@/components/cryptos/cryptos-management/cryptos-list/crypto-item',
  () => {
    const { Text } = require('react-native')
    return {
      CryptoItem: ({ crypto }: { crypto: ContractCrypto }) => (
        <Text testID="crypto-item">{crypto.name}</Text>
      ),
    }
  },
)

describe('CryptosList Component', () => {
  const mockAddMoreCryptos = jest.fn()

  const mockCryptos: Partial<ContractCrypto>[] = [
    { id: 'btc', name: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the list of cryptocurrencies', () => {
    render(<CryptosList cryptos={mockCryptos as ContractCrypto[]} />)

    expect(screen.getAllByTestId('crypto-item')).toHaveLength(2)
    expect(screen.getByText('Bitcoin')).toBeTruthy()
    expect(screen.getByText('Ethereum')).toBeTruthy()
  })

  test('shows a message when there are no cryptocurrencies', () => {
    render(<CryptosList cryptos={[]} />)

    expect(screen.getByText('No cryptocurrencies found.')).toBeTruthy()
  })

  test('calls `addMoreCryptos` when reaching the end of the list', () => {
    render(
      <CryptosList
        cryptos={mockCryptos as ContractCrypto[]}
        addMoreCryptos={mockAddMoreCryptos}
      />,
    )

    screen.getByTestId('cryptos-list').props.onEndReached()

    expect(mockAddMoreCryptos).toHaveBeenCalled()
  })
})
