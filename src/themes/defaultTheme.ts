import { createTheme } from '@mui/material'
import { globalTheme } from './globalTheme'

export const defaultTheme = createTheme(
  {
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: globalTheme.palette.layout.mintCream,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            display: 'flex',
            boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.15)'
          }
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: '100%',
            maxHeight: '36px'
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            maxHeight: '36px'
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            top: '-10px'
          },
          shrink: {
            top: 0
          }
        }
      }
    }
  },
  globalTheme
)
