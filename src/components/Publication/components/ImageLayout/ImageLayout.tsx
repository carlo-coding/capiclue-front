import { Box, SxProps } from '@mui/material'
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
  const handleRemoveImage = (index: number): void => {
    if (!editable) return
    onRemoveImage?.([...images.slice(0, index), ...images.slice(index + 1)])
  }
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '5px',
        ...sx,
        ...(images.length === 3
          ? {
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: `${rowHeight} ${rowHeight}`,
              '& > *:nth-of-type(1)': {
                gridRow: '1/3'
              }
            }
          : {
              gridAutoRows: rowHeight
            })
      }}
    >
      {images.map((image, index) => (
        <Box
          onClick={() => handleRemoveImage(index)}
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
