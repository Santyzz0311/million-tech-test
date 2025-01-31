import { act, renderHook } from '@testing-library/react-native'
import { useBoolean } from '@/hooks/shared/useBoolean'

describe('useBoolean hook', () => {
  test('initializes with default value (false)', () => {
    const { result } = renderHook(() => useBoolean())

    expect(result.current.value).toBe(false)
  })

  test('initializes with a provided value (true)', () => {
    const { result } = renderHook(() => useBoolean(true))

    expect(result.current.value).toBe(true)
  })

  test('toggle switches value from false to true', () => {
    const { result } = renderHook(() => useBoolean())

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(false)
  })

  test('updateValue sets value correctly', () => {
    const { result } = renderHook(() => useBoolean())

    act(() => {
      result.current.updateValue(true)
    })

    expect(result.current.value).toBe(true)

    act(() => {
      result.current.updateValue(false)
    })

    expect(result.current.value).toBe(false)
  })
})
