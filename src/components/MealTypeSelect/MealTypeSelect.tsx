import { Button, Menu, MenuItem, Typography } from '@mui/material'
import Iconify from '../iconify/Iconify'
import { useEffect, useState } from 'react'
import { Box } from '@mui/system'

const MEAL_TYPES = [
  { value: 'solid', label: 'Solid' },
  { value: 'liquid', label: 'Liquid' },
]

export function MealTypeSelect({ setMealType }: any) {
  const [open, setOpen] = useState(null)
  const [mealTypeSelected, setMealTypeSelected] = useState('solid')

  useEffect(() => {
    setMealType('solid')
  }, [])

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleSelectMealType = (option: any) => {
    setMealTypeSelected(option.value)
    setMealType(option.value)
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
          {mealTypeSelected}
        </Typography>
      </Button>
      <Menu
        keepMounted
        defaultValue={'liquid'}
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {MEAL_TYPES.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === mealTypeSelected}
            onClick={() => handleSelectMealType(option)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
