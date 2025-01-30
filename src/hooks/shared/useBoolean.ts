import { useCallback, useState } from 'react'

/**
 *  Hook to manage a boolean value.
 * @param initialValue - The initial value of the boolean.
 */
export function useBoolean(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const updateValue = useCallback((newValue: boolean) => setValue(newValue), [])
  const toggle = useCallback(() => setValue(prev => !prev), [])

  return {
    value,
    updateValue,
    toggle,
  }
}
