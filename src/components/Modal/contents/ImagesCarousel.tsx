import Box from '@mui/material/Box'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
interface IImagesCarouselProps {
  images: string[]
  index: number
}

function ImagesCarousel({
  images,
  index = 0
}: IImagesCarouselProps): JSX.Element {
  const reorderedImages = [
    images[index],
    ...images.slice(0, index),
    ...images.slice(index + 1)
  ]

  return (
    <Carousel dynamicHeight emulateTouch>
      {reorderedImages.map((img, i) => (
        <Box
          id={`Images-Carousel-image-${i}`}
          sx={{
            ['& img']: {
              height: '300px',
              objectFit: 'contain',
              aspectRatio: '1/1'
            }
          }}
        >
          <img src={img} alt={`Carousel-image-${i}`} />
        </Box>
      ))}
    </Carousel>
  )
}
export default ImagesCarousel
