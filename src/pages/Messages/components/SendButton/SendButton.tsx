import { Box } from '@mui/material'
import { SendIcon } from '../../../../components'

function SendButton(): JSX.Element {
  return (
    <Box
      component="button"
      type="submit"
      sx={{
        border: '1px solid',
        borderColor: 'layout.carolinaBlue',
        cursor: 'pointer',
        backgroundColor: 'layout.mintCream',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <SendIcon />
    </Box>
  )
}
export default SendButton
