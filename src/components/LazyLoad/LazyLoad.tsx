/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

interface ILazyLoadProps {
  totalPages?: number
  onEndReached: (cp: number) => void
  children?: React.ReactNode[]
  dependencies?: Array<string | number | boolean | undefined | null>
  emptinessMessage?: string
}

function LazyLoad({
  children,
  onEndReached,
  dependencies = [],
  emptinessMessage = 'No hay más items',
  totalPages = Infinity
}: ILazyLoadProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1)
  const lastItemRef = useRef<HTMLDivElement>(null)

  const showItems = children !== undefined && children?.length > 0

  useEffect(() => {
    setCurrentPage(1)
  }, [totalPages])

  useEffect(() => {
    onEndReached(currentPage)
  }, [currentPage, ...dependencies])

  useEffect(() => {
    if (lastItemRef.current === null) return
    const observer = new IntersectionObserver(
      (entries) => {
        setCurrentPage((prev) => {
          if (prev + 1 <= totalPages && entries[0].isIntersecting) {
            return prev + 1
          }
          return prev
        })
      },
      {
        rootMargin: '0px 0px 100px 0px'
      }
    )
    observer.observe(lastItemRef.current as Element)
    return () => observer.disconnect()
  }, [totalPages])

  return (
    <>
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
      <div ref={lastItemRef} />
    </>
  )
}
export default LazyLoad
