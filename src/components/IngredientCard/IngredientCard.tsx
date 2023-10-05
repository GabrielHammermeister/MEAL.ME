import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Ingredient } from '@/context/Ingredient.provider'
import { getIngredientImage } from '@/services/spoonacular/getIngredientImage.service'

type IngredientCardProps = {
  ingredient: Ingredient
}

function IngredientCard({ ingredient }: IngredientCardProps) {
  const navigate = useNavigate()
  const goToIngredient = () => {
    return navigate(String(ingredient.id))
  }

  return (
    <Card
    // sx={{
    //   maxWidth: 345,
    //   width: 240,
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'space-between',
    // }}
    >
      <CardActionArea onClick={goToIngredient}>
        <CardMedia
          sx={{ height: 120, backgroundSize: 'contain' }}
          image={getIngredientImage(ingredient.image)}
        />

        <CardContent sx={{ p: 2 }}>
          <Box
          // sx={{
          //   height: 60,
          //   textOverflow: 'ellipsis',
          //   p: 0,
          //   overflow: 'hidden',
          //   whiteSpace: 'wrap',
          //   display: 'flex',
          //   alignItems: 'flex-end',
          // }}
          >
            <Typography variant='h6' className={'text-base text-center'}>
              {ingredient.name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default IngredientCard
