import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import React from 'react'
import { Add, Mail } from '@mui/icons-material'

const Meal = () => {
  return (
    <Badge
      color='secondary'
      badgeContent={1}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant='h6' gutterBottom component='h6'>
            Heading 6
          </Typography>

          <Typography variant='overline' display='block' gutterBottom>
            500 kcal
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions>
        <IconButton aria-label='add'>
          <Add />
        </IconButton>
      </Card>
    </Badge>
  )
}

export default Meal
