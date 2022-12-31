import { Box } from '@mui/material'

interface ITextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {}

function TextArea({
  rows = 7,
  placeholder = 'Escribe algo ...',
  ...props
}: ITextAreaProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        '& textarea': {
          border: '1px solid',
          borderColor: 'layout.carolinaBlue',
          width: '100%',
          outline: 'none',
          borderRadius: '3px',
          padding: '5px',
          font: 'inherit',
          fontSize: '14px'
        }
      }}
    >
      <textarea rows={rows} placeholder={placeholder} {...props}></textarea>
    </Box>
  )
}
export default TextArea
