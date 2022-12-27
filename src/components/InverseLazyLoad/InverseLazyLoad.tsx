/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

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
  const [currentPage, setCurrentPage] = useState(totalPages)
  const lastItemRef = useRef<HTMLDivElement>(null)

  const showItems = children !== undefined && children?.length > 0

  useEffect(() => {
    setCurrentPage(totalPages)
  }, [totalPages])

  useEffect(() => {
    if (currentPage === 0) {
      onEndReached(Math.pow(10, 10))
    } else {
      onEndReached(currentPage)
    }
  }, [currentPage, ...dependencies])

  useEffect(() => {
    if (lastItemRef.current === null) return
    const observer = new IntersectionObserver(
      (entries) => {
        setCurrentPage((prev) => {
          if (prev - 1 > 0 && entries[0].isIntersecting) {
            console.log('Actualizando index', prev - 1)
            return prev - 1
          }
          return prev
        })
      },
      {
        rootMargin: '100px 0px 0px 0px'
      }
    )
    observer.observe(lastItemRef.current as Element)
    return () => observer.disconnect()
  }, [])

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
