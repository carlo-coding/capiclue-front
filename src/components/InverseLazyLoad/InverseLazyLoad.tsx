/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useUpdateEffect } from '../../utils'

interface IInverseLazyLoadProps {
  totalPages?: number
  onEndReached: (cp: number) => void
  children?: React.ReactNode[]
  dependencies?: Array<string | number | boolean | undefined | null>
  emptinessMessage?: string
}

function InverseLazyLoad({
  children,
  onEndReached,
  dependencies = [],
  emptinessMessage = 'No hay más items',
  totalPages = Math.pow(10, 10)
}: IInverseLazyLoadProps): JSX.Element {
  const lastItemRef = useRef<HTMLDivElement>(null)
  const currentPage = useRef(0)

  const showItems = children !== undefined && children?.length > 0

  useEffect(() => {
    onEndReached(Math.pow(10, 10))
  }, [totalPages, ...dependencies])

  useUpdateEffect(() => {
    currentPage.current = totalPages
  }, [totalPages, ...dependencies])

  useUpdateEffect(() => {
    if (lastItemRef.current === null) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (currentPage.current !== 0) {
          onEndReached(currentPage.current)
        }
        if (currentPage.current - 1 >= 0 && entries[0].isIntersecting) {
          currentPage.current -= 1
        }
      },
      {
        rootMargin: '200px 0px 0px 0px'
      }
    )
    observer.observe(lastItemRef.current as Element)
    return () => observer.disconnect()
  }, [currentPage.current, onEndReached])

  return (
    <>
      <div ref={lastItemRef} />
      {showItems ? (
        children
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {emptinessMessage}
        </Box>
      )}
    </>
  )
}
export default InverseLazyLoad
