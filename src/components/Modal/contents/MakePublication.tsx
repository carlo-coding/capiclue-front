import { Box, Typography } from '@mui/material'
import { StandardButton } from '../../StandardButton'
import { TextArea } from '../../TextArea'
import { useState, useRef, useEffect } from 'react'
import { ImageLayout } from '../../Publication'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { enqueueSnackbar } from 'notistack'
import { useAppDispatch } from '../../../app/hooks'
import { postPublication, updatePublication } from '../../../features'
import { IImageModel, IPublication } from '../../../models'
import { urlToFile } from '../../../utils/urlToFile'

interface IPublicationImage {
  file: File
  url: string
}

interface IMakePublicationProps {
  publication?: IPublication
}

function MakePublication({
  publication = undefined
}: IMakePublicationProps): JSX.Element {
  const isEdititionMode = publication !== undefined

  const dispatch = useAppDispatch()
  const [content, setContent] = useState('')
  const [images, setImages] = useState<IPublicationImage[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const imageUrls = images.map((img) => img.url)
  const files = images.map((img) => img.file)

  useEffect(() => {
    if (!isEdititionMode) return
    setContent(publication.content)
    async function getFileObjects(): Promise<void> {
      const defaultImages = await Promise.all(
        (publication?.images as IImageModel[]).map(async (img) => ({
          file: await urlToFile(img.urlString, img.originalName),
          url: img.urlString
        }))
      )
      setImages(defaultImages)
    }
    getFileObjects()
      .then(() => console.log('Loaded default images'))
      .catch(() => console.error('Error loading default images'))
  }, [publication])

  const handleUpdateImages = (urls: string[]): void => {
    const updatedImages = images.filter((img) => urls.includes(img.url))
    setImages(updatedImages)
  }

  const handleImageButtonClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.currentTarget.files == null) return
    if (images.length + event.currentTarget.files.length > 4) {
      enqueueSnackbar('M??ximo 4 imagenes', {
        variant: 'error'
      })
      return
    }
    const newImages = [...event.currentTarget.files].map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }))
    setImages((prev) => [...prev, ...newImages])
    event.currentTarget.value = ''
  }

  const chandleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setContent(e.currentTarget.value)
  }

  const handlePostPublication = (): void => {
    if (content.length === 0) return
    if (content.length > 500) {
      enqueueSnackbar('No puedes mandar m??s de 500 car??cteres', {
        variant: 'error'
      })
      return
    }
    if (isEdititionMode) {
      dispatch(
        updatePublication({
          content,
          images: files,
          publicationId: publication.id
        })
      )
      setImages([])
      setContent('')
      return
    }
    dispatch(
      postPublication({
        content,
        images: files
      })
    )
    setImages([])
    setContent('')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Typography>
        {isEdititionMode
          ? 'Edita tu publicaci??n'
          : '??Que es lo que quieres comunicar?'}
      </Typography>
      <TextArea value={content} onChange={chandleContentChange} />
      <ImageLayout
        rowHeight="120px"
        images={imageUrls}
        onRemoveImage={handleUpdateImages}
        editable
      />
      <Box
        sx={{
          gap: '15px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <StandardButton
          sx={{ width: '50px', fontSize: '14px', padding: '8px' }}
          onClick={handleImageButtonClick}
        >
          <ImageOutlinedIcon />
        </StandardButton>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageInputChange}
        />
        <StandardButton
          onClick={handlePostPublication}
          sx={{ width: '120px', fontSize: '14px', padding: '8px 0' }}
        >
          {isEdititionMode ? 'Editar' : 'Publicar'}
        </StandardButton>
      </Box>
    </Box>
  )
}
export default MakePublication
