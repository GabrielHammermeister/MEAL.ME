import React from 'react'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'

interface InputProps {
  icon: JSX.Element
  label: string
  onChange: (e: any) => void
}

const Input = ({ icon, label, onChange }: InputProps) => {
  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel htmlFor={`input-${label}`}>{label}</InputLabel>
      <OutlinedInput
        id={`input-${label}`}
        type='text'
        label={label}
        onChange={(e) => onChange(e)}
        endAdornment={<InputAdornment position='end'>{icon}</InputAdornment>}
      />
    </FormControl>
  )
}

export default Input
