import { mapCryptoData } from '@/utils/helpers/crypto-mappers'
import { ApiGetCryptoReponse } from '@/types/implementations/api'
import { ContractCryptoResponse } from '@/types/implementations/contract'
import { formatPriceToCurrency } from '@/utils/helpers/price-format'

jest.mock('@/utils/helpers/price-format', () => ({
  formatPriceToCurrency: jest.fn(value => `$${value.toFixed(2)}`),
}))

describe('mapCryptoData', () => {
  const mockApiResponse: ApiGetCryptoReponse = {
    data: [
      {
        id: 'btc',
        name: 'Bitcoin',
        csupply: '19000000',
        market_cap_usd: '900000000000',
        msupply: '21000000',
        nameid: 'bitcoin',
        percent_change_1h: '0.5',
        percent_change_24h: '2.3',
        percent_change_7d: '-1.2',
        price_btc: '1',
        price_usd: '50000',
        rank: 1,
        symbol: 'BTC',
        tsupply: '21000000',
        volume24: '20000000000',
        volume24a: '18000000000',
      },
    ],
    info: {
      time: 1000,
      coins_num: 1,
    },
  }

  test('correctly maps API response to contract response', () => {
    const expectedMappedData: ContractCryptoResponse = {
      data: [
        {
          id: 'btc',
          name: 'Bitcoin',
          circulatingSupply: '19000000',
          marketCapUsd: '900000000000',
          maxSupply: '21000000',
          nameId: 'bitcoin',
          percentChange1h: '0.5',
          percentChange24h: '2.3',
          percentChange7d: '-1.2',
          priceBtc: '$1.00',
          priceUsd: '$50000.00',
          rank: 1,
          symbol: 'BTC',
          totalSupply: '21000000',
          volume24: '20000000000',
          volume24a: '18000000000',
        },
      ],
      info: {
        coinsNum: 1,
        time: 1000,
      },
    }

    const mappedData = mapCryptoData(mockApiResponse)

    expect(mappedData).toEqual(expectedMappedData)
    expect(formatPriceToCurrency).toHaveBeenCalledWith(1)
    expect(formatPriceToCurrency).toHaveBeenCalledWith(50000)
  })

  test('handles empty API response correctly', () => {
    const emptyApiResponse: ApiGetCryptoReponse = {
      data: [],
      info: { time: 2000, coins_num: 0 },
    }
    const expectedMappedData: ContractCryptoResponse = {
      data: [],
      info: { coinsNum: 0, time: 2000 },
    }

    const mappedData = mapCryptoData(emptyApiResponse)

    expect(mappedData).toEqual(expectedMappedData)
  })
})
