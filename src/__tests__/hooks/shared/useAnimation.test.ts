import { renderHook } from '@testing-library/react-native'
import { Animated } from 'react-native'
import useAnimation from '@/hooks/shared/useAnimation'

jest.mock('react-native', () => ({
  Animated: {
    Value: jest.fn(val => ({
      setValue: jest.fn(),
      interpolate: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
      stopAnimation: jest.fn(),
      __getValue: () => val,
    })),
    timing: jest.fn(() => ({
      start: jest.fn(callback => callback && callback()),
    })),
  },
}))

describe('useAnimation hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('starts animation automatically when autoStart is true', () => {
    renderHook(() => useAnimation({ initialValue: 0, toValue: 1 }))

    expect(Animated.timing).toHaveBeenCalled()
  })

  test('does not start animation when autoStart is false', () => {
    renderHook(() =>
      useAnimation({ initialValue: 0, toValue: 1, autoStart: false }),
    )

    expect(Animated.timing).not.toHaveBeenCalled()
  })

  test('applies delay and duration correctly', () => {
    renderHook(() =>
      useAnimation({ initialValue: 0, toValue: 1, delay: 500, duration: 1000 }),
    )

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
    )
  })

  test('modifies delay based on delayValueReference', () => {
    renderHook(() =>
      useAnimation({
        initialValue: 0,
        toValue: 1,
        delay: 200,
        delayValueReference: 3,
      }),
    )

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        delay: 600, // 200 * 3
      }),
    )
  })
})
