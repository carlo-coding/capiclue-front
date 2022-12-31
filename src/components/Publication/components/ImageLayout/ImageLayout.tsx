import { Box, SxProps } from '@mui/material'
import { useAppDispatch } from '../../../../app/hooks'
import { ImagesCarousel, openModal, setModalContent } from '../../../Modal'
interface IImageLayoutProps {
  images: string[]
  rowHeight?: string
  sx?: SxProps
  editable?: boolean
  onRemoveImage?: (images: string[]) => void
}
function ImageLayout({
  images,
  sx,
  rowHeight = '160px',
  editable = false,
  onRemoveImage
}: IImageLayoutProps): JSX.Element {
  const dispatch = useAppDispatch()

  const handleClickImage = (index: number): void => {
    if (!editable) {
      dispatch(
        setModalContent(<ImagesCarousel images={images} index={index} />)
      )
      dispatch(openModal())
      return
    }
    onRemoveImage?.([...images.slice(0, index), ...images.slice(index + 1)])
  }

  const imageStyles = {
    1: {
      gridAutoRows: rowHeight
    },
    2: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    3: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: `${rowHeight} ${rowHeight}`,
      '& > *:nth-of-type(1)': {
        gridRow: '1/3'
      }
    },
    4: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: `${rowHeight} ${rowHeight}`
    }
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: '5px',
        ...sx,
        ...(images.length <= 4 && images.length > 0
          ? imageStyles[images.length as keyof typeof imageStyles]
          : {
              gridAutoRows: rowHeight
            }),
        ...(!editable && {
          cursor: 'pointer'
        })
      }}
    >
      {images.map((image, index) => (
        <Box
          onClick={() => handleClickImage(index)}
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            ...(editable && {
              '&:hover::after': {
                opacity: 1
              },
              '&::after': {
                content: '"Eliminar"',
                display: 'grid',
                placeItems: 'center',
                color: 'white',
                position: 'absolute',
                opacity: '0',
                inset: 0,
                bgcolor: 'rgba(210,30,30,0.5)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: '0.3s ease opacity'
              }
            })
          }}
          key={`publication-image-${index}`}
        >
          <Box
            component={'img'}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
            src={image}
            alt={`Publication Image ${index}`}
          />
        </Box>
      ))}
    </Box>
  )
}
export default ImageLayout
