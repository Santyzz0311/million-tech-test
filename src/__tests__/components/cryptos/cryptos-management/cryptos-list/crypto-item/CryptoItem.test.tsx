import { render, screen, fireEvent } from '@testing-library/react-native'
import { CryptoItem } from '@/components/cryptos/cryptos-management/cryptos-list/crypto-item'
import { useBoolean } from '@/hooks/shared/useBoolean'
import { ContractCrypto } from '@/types/implementations/contract'

jest.mock('@/hooks/shared/useBoolean')
jest.mock('@/hooks/shared/useAnimation')

describe('CryptoItem Component', () => {
  const mockToggle = jest.fn()

  beforeEach(() => {
    ;(useBoolean as jest.Mock).mockReturnValue({
      value: false,
      toggle: mockToggle,
    })
  })

  const mockCrypto: ContractCrypto = {
    id: 'btc',
    name: 'Bitcoin',
    priceUsd: '50000',
    rank: 1,
    marketCapUsd: '900B',
    maxSupply: '21000000',
    percentChange1h: '0.5%',
    percentChange24h: '2.3%',
    percentChange7d: '10%',
    priceBtc: '1',
    circulatingSupply: '18000000',
    nameId: 'bitcoin',
    symbol: 'btc',
    totalSupply: '21000000',
    volume24: '1000000',
    volume24a: '1000000',
  }

  test('renders cryptocurrency main information', () => {
    render(<CryptoItem crypto={mockCrypto} index={1} />)

    expect(screen.getByText('Bitcoin')).toBeTruthy()
    expect(screen.getByText('Price in USD: 50000')).toBeTruthy()
  })

  test('shows cryptocurrency details when pressed', () => {
    ;(useBoolean as jest.Mock).mockReturnValue({
      value: true,
      toggle: mockToggle,
    })

    render(<CryptoItem crypto={mockCrypto} index={1} />)

    expect(screen.getByText('Rank: 1')).toBeTruthy()
    expect(screen.getByText('Market cap usd: 900B')).toBeTruthy()
    expect(screen.getByText('Max supply: 21000000')).toBeTruthy()
    expect(screen.getByText('Percent change 1h: 0.5%')).toBeTruthy()
    expect(screen.getByText('Percent change 24h: 2.3%')).toBeTruthy()
    expect(screen.getByText('Percent change 7d: 10%')).toBeTruthy()
    expect(screen.getByText('Price in btc: 1')).toBeTruthy()
  })

  test('toggles details visibility when pressed', () => {
    render(<CryptoItem crypto={mockCrypto} index={1} />)

    fireEvent.press(screen.getByText('Bitcoin'))

    expect(mockToggle).toHaveBeenCalled()
  })

  test('renders shortened cryptocurrency name when name is too long', () => {
    const longNameCrypto = {
      ...mockCrypto,
      name: 'Super Long Cryptocurrency Name Exceeding 20 Chars',
    }

    render(<CryptoItem crypto={longNameCrypto} index={1} />)

    expect(
      screen.getByText(longNameCrypto.name.slice(0, 20).concat('...')),
    ).toBeTruthy()
  })
})
