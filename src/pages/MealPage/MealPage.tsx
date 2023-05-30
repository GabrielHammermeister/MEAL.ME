import Iconify from '@/components/iconify/Iconify'
import { IconButton, MenuItem, Popover, Typography } from '@mui/material'
import DefaultTemplate from '@/templates/Default/Default.index'
import { useState } from 'react'
import './styles.css'

export function MealPage() {
  const [open, setOpen] = useState(null)

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }
  const handleCloseMenu = (event) => {
    setOpen(null)
  }
  const handleDeleteMeal = () => {
    console.log('delteed')
    handleCloseMenu()
    //redirect to MEALS
  }

  return (
    <DefaultTemplate>
      <section className={'meal-header'}>
        <Typography variant={'h4'}>Meal Name</Typography>
        <IconButton size='large' color='inherit' onClick={handleOpenMenu}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>

        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteMeal}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </section>
    </DefaultTemplate>
  )
}
