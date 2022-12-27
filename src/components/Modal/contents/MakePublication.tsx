import { Box, Typography } from '@mui/material'
import { StandardButton } from '../../StandardButton'
import { TextArea } from '../../TextArea'
import { useState, useRef, useEffect } from 'react'
import { ImageLayout } from '../../Publication'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { enqueueSnackbar } from 'notistack'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { postPublication, updatePublication } from '../../../features'
import { IImageModel } from '../../../models'
import { urlToFile } from '../../../utils/urlToFile'

interface IPublicationImage {
  file: File
  url: string
}

function MakePublication(): JSX.Element {
  const publication = useAppSelector(
    (state) => state.modal.metadata.publication
  )
  const isEdititionMode = publication !== undefined

  const dispatch = useAppDispatch()
  const [content, setContent] = useState('')
  const [images, setImages] = useState<IPublicationImage[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const imageUrls = images.map((img) => img.url)
  const files = images.map((img) => img.file)

  useEffect(() => {
    if (!isEdititionMode) return
    setContent(publication.content as string)
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
    if (images.length + event.currentTarget.files.length > 3) {
      enqueueSnackbar('Máximo 3 imagenes', {
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
    if (content.length > 500) {
      enqueueSnackbar('No puedes mandar más de 500 carácteres', {
        variant: 'error'
      })
      return
    }
    if (isEdititionMode) {
      dispatch(
        updatePublication({
          content,
          images: files,
          publicationId: publication.id as number
        })
      )
      return
    }
    dispatch(
      postPublication({
        content,
        images: files
      })
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}
    >
      <Typography>
        {isEdititionMode
          ? 'Edita tu publicación'
          : '¿Que es lo que quieres comunicar?'}
      </Typography>
      <TextArea value={content} onChange={chandleContentChange} />
      <ImageLayout
        rowHeight="80px"
        images={imageUrls}
        onRemoveImage={handleUpdateImages}
        editable
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
