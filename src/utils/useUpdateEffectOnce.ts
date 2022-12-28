import { useEffect, useRef } from 'react'

export const useUpdateEffectOnce: typeof useEffect = (effect, deps): void => {
  const isFirstMount = useRef(true)
  const executedEffect = useRef(false)

  useEffect(() => {
    if (!isFirstMount.current && !executedEffect.current) {
      effect()
      executedEffect.current = true
    } else isFirstMount.current = false
  }, deps)
}
