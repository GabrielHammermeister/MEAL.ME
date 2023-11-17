import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface WaterConsumption {
  timestamp: string
  quantity: number
}

const WaterTracker: React.FC = () => {
  const [waterQuantity, setWaterQuantity] = useState<number>(0)
  const [waterConsumptionList, setWaterConsumptionList] = useState<WaterConsumption[]>([])

  const handleWaterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    setWaterQuantity(value || 0)
  }

  const handleWaterSubmit = () => {
    const currentTime = new Date().toISOString()
    const newWaterConsumption: WaterConsumption = {
      timestamp: currentTime,
      quantity: waterQuantity,
    }
    setWaterConsumptionList([...waterConsumptionList, newWaterConsumption])
    setWaterQuantity(0)

    // Save to local storage
    localStorage.setItem(
      'waterConsumption',
      JSON.stringify([...waterConsumptionList, newWaterConsumption]),
    )
  }

  const getTotalWaterConsumed = (): number => {
    return waterConsumptionList.reduce((total, consumption) => total + consumption.quantity, 0)
  }

  const showWaterHistory = () => {
    const history = JSON.parse(localStorage.getItem('waterConsumption') || '[]')
    console.log('Water Consumption History:', history)
    // Display the history using a dialog or another UI component
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Water Consumption Tracker
        </Typography>
        <Typography variant='body1' gutterBottom>
          Total Water Consumed: {getTotalWaterConsumed()} ml
        </Typography>
        <TextField
          label='Water Quantity (ml)'
          variant='outlined'
          type='number'
          value={waterQuantity}
          onChange={handleWaterInputChange}
        />
        <Button variant='contained' onClick={handleWaterSubmit}>
          Add Water
        </Button>
        <Button variant='outlined' onClick={showWaterHistory}>
          Show History
        </Button>
      </CardContent>
    </Card>
  )
}

export default WaterTracker
