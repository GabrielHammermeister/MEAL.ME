import { Typography } from '@mui/material'
import React from 'react'

export function PageTitle({ text }: { text: string }) {
  return (
    <>
      <Typography variant='h4' className={'py-4 pb-8 text-xl text-center md:text-2xl lg:text-3xl'}>
        {text}
      </Typography>
    </>
  )
}
