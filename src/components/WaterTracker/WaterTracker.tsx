import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'

interface WaterConsumption {
  timestamp: string
  quantity: number
}

const WaterTracker: React.FC = () => {
  const [waterQuantity, setWaterQuantity] = useState<number>(0)
  const [waterConsumptionList, setWaterConsumptionList] = useState<WaterConsumption[]>([])
  const [waterHistory, setWaterHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const handleWaterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    setWaterQuantity(value || 0)
  }

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('waterConsumption') || '[]')
    setWaterConsumptionList(history)
    // setWaterQuantity(history.reduce((acc, value) => acc + value))
  }, [])

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

    setWaterHistory(history)
    setShowHistory((prev) => !prev)
  }

  return (
    <Card>
      <CardHeader title={'Water Consumption Tracker'} subheader={'Stay hydrated'} />
      <CardContent>
        <Typography variant='body1' className={'mb-4'}>
          Total Water Consumed: {getTotalWaterConsumed()} ml
        </Typography>
        <TextField
          label='Water Quantity (ml)'
          variant='outlined'
          type='number'
          value={waterQuantity}
          onChange={handleWaterInputChange}
        />
        {waterConsumptionList.length > 0 && showHistory && (
          <div className={'pt-6 flex flex-col gap-2'}>
            {waterHistory.map((val, index) => (
              <div className={'flex justify-between'}>
                <span>{val.quantity} ml</span>
                <span>
                  {new Date(val.timestamp).toISOString().slice(0, 16).replace('T', ' * ')}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button variant='contained' onClick={handleWaterSubmit}>
          Add Water
        </Button>
        {waterConsumptionList.length > 0 && (
          <Button variant='outlined' onClick={showWaterHistory}>
            {showHistory ? 'Hide History' : 'Show History'}
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default WaterTracker
