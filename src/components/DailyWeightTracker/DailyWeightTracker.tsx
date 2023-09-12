import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Card, CardContent, CardHeader } from '@mui/material'

const DailyWeightTracker: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('')
  const [previousWeight, setPreviousWeight] = useState<number | null>(null) // Estado para armazenar o peso anterior
  const [isEditing, setIsEditing] = useState(false) // Estado para controle de edição

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    setWeight(newValue)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Verifique se já foi registrado um valor para o dia atual
    if (!isEditing && previousWeight !== null) {
      alert(
        'Apenas um registro de peso por dia é permitido. Use o botão Editar para fazer alterações.',
      )
      return
    }

    // Faça algo com o valor do peso, como armazená-lo em um banco de dados ou em um histórico
    console.log('Peso Diário:', weight)

    // Se já houver um registro para o dia, habilite a edição
    if (!isEditing) {
      setPreviousWeight(weight as number)
    }

    // Limpe o campo após o envio
    setWeight('')
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  return (
    <Card>
      <CardHeader title={'Daily Weight Tracker'} subheader={'Insert your current weight'} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label='Peso (em kg)'
            type='number'
            value={weight}
            onChange={handleWeightChange}
            required
            fullWidth
            disabled={isEditing}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: '16px' }}
            disabled={isEditing}
          >
            {isEditing ? 'Editar Peso' : 'Registrar Peso'}
          </Button>
          {!isEditing && previousWeight !== null && (
            <Button
              variant='outlined'
              style={{ marginTop: '16px', marginLeft: '8px' }}
              onClick={handleEdit}
            >
              Editar
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default DailyWeightTracker
