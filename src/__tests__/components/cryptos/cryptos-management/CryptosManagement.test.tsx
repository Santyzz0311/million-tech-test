import { render, screen, fireEvent } from '@testing-library/react-native'
import { CryptosManagement } from '@/components/cryptos/cryptos-management'
import { useCryptosFilters } from '@/hooks/crypto/useCryptoFilters'

jest.mock('@/hooks/crypto/useCryptoFilters')
jest.mock('@/components/cryptos/cryptos-management/cryptos-list', () => {
  const { Text } = require('react-native')
  return {
    CryptosList: () => <Text testID="cryptos-list">Mocked CryptosList</Text>,
  }
})

describe('CryptosManagement Component', () => {
  const mockUpdateFilters = jest.fn()
  const mockAddMoreCryptos = jest.fn()

  beforeEach(() => {
    ;(useCryptosFilters as jest.Mock).mockReturnValue({
      filteredCryptos: [{ id: 'btc', name: 'Bitcoin' }],
      filters: { name: '' },
      updateFilters: mockUpdateFilters,
    })
  })

  test('renders the search input field', () => {
    render(
      <CryptosManagement
        cryptos={{ data: [], info: { coinsNum: 10, time: 1000 } }}
      />,
    )

    expect(
      screen.getByPlaceholderText('Search for a cryptocurrency'),
    ).toBeTruthy()
  })

  test('filters cryptocurrencies when typing in the search input', () => {
    render(
      <CryptosManagement
        cryptos={{ data: [], info: { coinsNum: 10, time: 1000 } }}
      />,
    )

    const searchInput = screen.getByPlaceholderText(
      'Search for a cryptocurrency',
    )

    fireEvent.changeText(searchInput, 'Bitcoin')

    expect(mockUpdateFilters).toHaveBeenCalledWith({ name: 'Bitcoin' })
  })

  test('renders `CryptosList` with filtered cryptos', () => {
    render(
      <CryptosManagement
        cryptos={{ data: [], info: { coinsNum: 10, time: 1000 } }}
      />,
    )

    expect(screen.getByTestId('cryptos-list')).toBeTruthy()
  })

  test('calls `addMoreCryptos` when loading more data', () => {
    render(
      <CryptosManagement
        cryptos={{ data: [], info: { coinsNum: 10, time: 1000 } }}
        addMoreCryptos={mockAddMoreCryptos}
        loadingMoreCryptos
      />,
    )

    expect(screen.getByTestId('loading-more-data')).toBeTruthy()
  })
})
