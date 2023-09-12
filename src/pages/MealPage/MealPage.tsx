import Iconify from '@/components/iconify/Iconify'
import { Card, CardHeader, IconButton, MenuItem, Paper, Popover, Typography } from '@mui/material'
import DefaultTemplate from '@/templates/Default/Default.index'
import { useEffect, useState } from 'react'
import './styles.css'
import { MacroSummary } from '@/components/MacroSummary/MacroSummary'
import { Box } from '@mui/system'
import DisplayIngredients from '@/components/DisplayIngredients/DisplayIngredients'
import useIngredients from '@/hooks/useIngredients'

const MOCK_INGREDIENTS = [
  { id: 1, image: 'image.png', name: 'Carrot' },
  { id: 1, image: 'image.png', name: 'Carrot' },
  { id: 1, image: 'image.png', name: 'Carrot' },
  { id: 1, image: 'image.png', name: 'Carrot' },
  { id: 1, image: 'image.png', name: 'Carrot' },
]

const MOCK_MACROS = {
  calories: 123,
  fats: {
    amount: 100,
    unit: 'g',
    percent: 30,
  },
  carbs: {
    amount: 50,
    unit: 'g',
    percent: 40,
  },
  proteins: {
    amount: 80,
    unit: 'g',
    percent: 30,
  },
}
export function MealPage() {
  const [open, setOpen] = useState(null)
  const { setIngredients } = useIngredients()

  useEffect(() => {
    setIngredients(MOCK_INGREDIENTS)
    // TODO:
    // - realizar request da MEAL
    // - popular store com ingredients
  }, [])

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setOpen(null)
  }
  const handleDeleteMeal = () => {
    handleCloseMenu()
    // redirect to MEALS
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
      <section className={'meal-grid'}>
        <Card>
          <CardHeader title={'Macro Nutrients'} />
          <Box p={3}>
            <MacroSummary macros={MOCK_MACROS} />
          </Box>
        </Card>
        <Card>
          <CardHeader title={'Ingredients'} />
          <Box p={3}>
            <DisplayIngredients variant={'small'} />
          </Box>
        </Card>
      </section>
    </DefaultTemplate>
  )
}
