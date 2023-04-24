import React from 'react'
// Components
import DefaultTemplate from '@/templates/Default/Default.index'
// Contexts
import { Typography } from '@mui/material'

import './HomePage.styles.css'
import useCurrentUser from '@/hooks/useCurrentUser'

const HomePage = () => {
  const { currentUser } = useCurrentUser()

  return (
    <DefaultTemplate>
      <Typography variant='h4'>
        Bem vindo {currentUser?.displayName?.toLocaleUpperCase()}!
      </Typography>

      <Typography variant='h4'>content</Typography>
    </DefaultTemplate>
  )
}

export default HomePage
