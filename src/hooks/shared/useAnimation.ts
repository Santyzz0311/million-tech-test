import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

interface UseAnimationParams {
  /**
   * The delay before the animation starts
   */
  delay?: number
  /**
   * The value to animate to
   */
  toValue: number
  /**
   * The initial value of the animation
   */
  initialValue: number
  /**
   * The duration of the animation
   */
  duration?: number
  /**
   * The delay value reference
   */
  delayValueReference?: number
  /**
   * If the animation should start automatically
   */
  autoStart?: boolean
}

export default function useAnimation({
  initialValue,
  toValue,
  delay = 100,
  duration = 300,
  delayValueReference,
  autoStart = true,
}: UseAnimationParams) {
  const property = useRef(new Animated.Value(initialValue)).current

  useEffect(() => {
    if (!autoStart) return
    Animated.timing(property, {
      toValue: toValue,
      duration: duration,
      delay: delay * (delayValueReference ?? 1),
      useNativeDriver: true,
    }).start()
  }, [delayValueReference, property, toValue, delay, duration, autoStart])

  return property
}
