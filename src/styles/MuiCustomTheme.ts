import MuiCustomLink from '@/components/Custom/MuiLink/MuiLink.index'
import { Card, CardProps, LinkProps, ThemeOptions } from '@mui/material'
import { MuiCustomCard } from '@/components/Custom/Card/MuiCustomCard'

export const MuiCustomTheme: ThemeOptions = {
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#008064',
    },
    secondary: {
      main: '#64c5b1',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: MuiCustomLink,
      } as LinkProps,
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' },
      },
    },
    MuiCard: {
      defaultProps: {
        component: MuiCustomCard,
      } as unknown as CardProps,
    },
  },
}
