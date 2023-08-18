/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Typography } from '@mui/material'
import React from 'react'
// @ts-ignore
import { container, illustration } from './EmptyState.module.css'

interface EmptyStateProps {
  imgSrc: string
  imgAlt: string
  title: string
  description: string
  handleOnClickButton?: () => void
  buttonLabel?: string
}

const EmptyState = ({
  imgSrc,
  imgAlt,
  title,
  description,
  handleOnClickButton,
  buttonLabel,
}: EmptyStateProps) => {
  return (
    <div className={container}>
      <img src={imgSrc} alt={imgAlt} className={illustration} />
      <Typography variant='h5'>{title}</Typography>
      <Typography variant='body1' align='center'>
        {description}
      </Typography>
      {handleOnClickButton && (
        <Button
          sx={{ marginTop: '10px' }}
          size='large'
          variant='contained'
          onClick={handleOnClickButton}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
