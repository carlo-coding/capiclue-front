import { Box, SxProps } from '@mui/material'

interface IStandardButtonProps extends React.HTMLProps<HTMLButtonElement> {
  sx?: SxProps
}

function StandardButton({
  children,
  sx,
  ...props
}: IStandardButtonProps): JSX.Element {
  return (
    <Box
      component="button"
      sx={{
        backgroundColor: 'layout.carolinaBlue',
        color: 'layout.babyPowder',
        fontSize: '16px',
        fontWeight: '500',
        borderRadius: '10px',
        width: '100%',
        padding: '10px 0',
        border: 'none',
        cursor: 'pointer',
        ...sx
      }}
      {...(props as any)}
    >
      {children}
    </Box>
  )
}
export default StandardButton
