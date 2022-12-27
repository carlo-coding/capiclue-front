import { useLocation } from 'react-router-dom'
import React from 'react'
export function useQuery(): URLSearchParams {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}
