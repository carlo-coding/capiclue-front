import { createTheme } from '@mui/material'
export const globalTheme = createTheme({
  palette: {
    layout: {
      gunmetal: '#122C34',
      indigoDye: '#224870',
      carolinaBlue: '#4EA5D9',
      chipiC: '#6CCED9',
      babyPowder: '#FCFFFC',
      mintCream: '#ECEDEC',
      rubyRed: 'rgba(223, 0, 40, 0.9)'
    }
  }
})

declare module '@mui/material' {
  interface Palette {
    layout: {
      gunmetal: string
      indigoDye: string
      carolinaBlue: string
      chipiC: string
      babyPowder: string
      mintCream: string
      rubyRed: string
    }
  }
  interface PaletteOptions {
    layout?: {
      gunmetal?: string
      indigoDye?: string
      carolinaBlue?: string
      chipiC?: string
      babyPowder?: string
      mintCream?: string
      rubyRed?: string
    }
  }
}
