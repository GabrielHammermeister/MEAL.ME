import { Button, Menu, MenuItem, Typography } from '@mui/material'
import Iconify from '../iconify/Iconify'
import { useState } from 'react'
import { Box } from '@mui/system'

const MEAL_TYPES = [
  { value: 'solid', label: 'Solid' },
  { value: 'liquid', label: 'Liquid' },
]

export function MealTypeSelect() {
  const [open, setOpen] = useState(null)

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget)
  }

  const handleClose = (option) => {
    console.log('option selected: ', option)
    setOpen(null)
  }

  return (
    <Box p={2} paddingLeft={0}>
      <Button
        color='inherit'
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Meal Type:&nbsp;&nbsp;
        <Typography
          component='span'
          variant='subtitle2'
          sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
        >
          Solid
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {MEAL_TYPES.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === 'solid'}
            onClick={() => handleClose(option)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
