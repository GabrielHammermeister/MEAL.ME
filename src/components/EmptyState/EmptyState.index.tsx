/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Typography } from '@mui/material';
import React from 'react';
// @ts-ignore
import { container, illustration } from './EmptyState.module.css';

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
    <div className='flex flex-col items-center justify-center h-full'>
      <img src={imgSrc} alt={imgAlt} className='w-40 h-40 mb-4' />
      <Typography variant='h5' align='center' className='mb-2'>
        {title}
      </Typography>
      <Typography variant='body1' align='center' className='mb-4'>
        {description}
      </Typography>
      {handleOnClickButton && (
        <Button
          size='large'
          variant='contained'
          onClick={handleOnClickButton}
          className='px-6 py-2'
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
