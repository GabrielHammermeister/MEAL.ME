// @ts-nocheck
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button, Card, CardContent, CardHeader } from '@mui/material'
import useCurrentUser from '@/hooks/useCurrentUser'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { IconBase } from '@/components/IconBase/IconBase'
import { updateGoal } from '@/services/mealApi/goalsService'

const DailyWeightTracker: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('')
  const [previousWeight, setPreviousWeight] = useState<number | null>(null) // Estado para armazenar o peso anterior
  const [isEditing, setIsEditing] = useState(false) // Estado para controle de edição
  const { setCurrentUser, currentUser } = useCurrentUser()
  const [weightSubmited, setWeightSubmited] = useState(false)

  useEffect(() => {
    const storedWeight = localStorage.getItem('dailyWeight')
    const snapshotDate = localStorage.getItem('snapshotDate')
    const currentSnapshot = new Date()
    let lastSnapshot = null
    let areDatesSameDay = null
    if (snapshotDate) {
      lastSnapshot = new Date(snapshotDate)
      areDatesSameDay =
        lastSnapshot.getFullYear() === currentSnapshot.getFullYear() &&
        lastSnapshot.getMonth() === currentSnapshot.getMonth() &&
        lastSnapshot.getDate() === currentSnapshot.getDate()
    }

    if (areDatesSameDay && !storedWeight) setWeightSubmited(true)

    console.log('areDatesSameDay', areDatesSameDay, 'storedWeight', storedWeight)

    setWeight(storedWeight ? Number(storedWeight) : '')
    setPreviousWeight(storedWeight ? Number(storedWeight) : null)
  }, [])

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // const newValue = value ? parseFloat(Number(value).toFixed(2)) : ''
    setWeight(value)
  }

  // Function to submit data to an API and take a snapshot
  const submitDataToAPI = async () => {
    const storedWeight = localStorage.getItem('dailyWeight')
    const snapshotDate = localStorage.getItem('snapshotDate')

    // If there's no stored weight, do not proceed with API submission
    if (!storedWeight || !snapshotDate) {
      console.log('No weight data available to submit.')
      return
    }
    if (!currentUser) return

    const newCheckpoints = currentUser?.goals?.checkpoint || []
    newCheckpoints?.push({
      date: snapshotDate,
      weight: parseFloat(storedWeight),
    })

    // @ts-ignore
    const newGoal = {
      ...currentUser?.goals,
      checkpoint: [...newCheckpoints],
    }

    console.log('NEW GOAL', newGoal)

    await updateGoal(newGoal, currentUser?.uid)
    setCurrentUser({
      ...currentUser,
      goals: newGoal,
    })

    localStorage.removeItem('dailyWeight')
    setWeightSubmited(true)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Verifique se já foi registrado um valor para o dia atual
    const storedWeight = localStorage.getItem('dailyWeight')
    const snapshotDate = localStorage.getItem('snapshotDate')
    const currentSnapshot = new Date()
    const lastSnapshot = new Date(snapshotDate ? snapshotDate : currentSnapshot)

    const secondTime = !!snapshotDate

    const areDatesSameDay =
      lastSnapshot.getFullYear() === currentSnapshot.getFullYear() &&
      lastSnapshot.getMonth() === currentSnapshot.getMonth() &&
      lastSnapshot.getDate() === currentSnapshot.getDate()

    if (!isEditing && areDatesSameDay && secondTime && storedWeight) {
      alert('Only one weight record per day is allowed. Use the Edit button to make changes.')
      return
    }

    // Se já houver um registro para o dia, habilite a edição
    if (!isEditing) {
      localStorage.setItem('dailyWeight', weight as string)
      localStorage.setItem('snapshotDate', currentSnapshot.toISOString())
      setPreviousWeight(Number(weight))
    }

    // Limpe o campo após o envio
    setIsEditing(false)
  }

  const handleEdit = () => {
    const currentSnapshot = new Date()

    localStorage.setItem('dailyWeight', weight as string)
    localStorage.setItem('snapshotDate', currentSnapshot.toISOString())
    setIsEditing(true)
  }

  return (
    <Card>
      {weightSubmited ? (
        <>
          <CardHeader
            action={
              <IconBase>
                <CheckCircleOutlineIcon className={'border-l-m-'} />
              </IconBase>
            }
            title={'Weight Saved!'}
            subheader={'You can add your weight tommorow'}
          />
        </>
      ) : (
        <CardHeader title={'Daily Weight Tracker'} subheader={'Insert your current weight'} />
      )}
      {!weightSubmited && (
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Weight(kg)'
              type='text'
              value={weight}
              onChange={handleWeightChange}
              required
              fullWidth
              disabled={weightSubmited}
            />
            {!(previousWeight !== null) && !weightSubmited && (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                style={{ marginTop: '16px' }}
                disabled={isEditing}
              >
                {isEditing ? 'Edit weight' : 'Save weight'}
              </Button>
            )}
            {previousWeight !== null && !weightSubmited && (
              <>
                <Button
                  variant='outlined'
                  style={{ marginTop: '16px', marginLeft: '8px' }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant='contained'
                  style={{ marginTop: '16px', marginLeft: '8px' }}
                  onClick={submitDataToAPI}
                >
                  Submit
                </Button>
              </>
            )}
          </form>
        </CardContent>
      )}
    </Card>
  )
}

export default DailyWeightTracker
