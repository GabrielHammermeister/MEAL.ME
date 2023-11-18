// @ts-nocheck

import { useState } from 'react'
import {
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '@/services/firebase/initializer'

export const UserSettingsTab = () => {
  const navigate = useNavigate()

  const [userSettings, setUserSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    emailFrequency: 'daily',
  })

  // Função para atualizar as configurações do usuário
  const updateSettings = () => {
    // Simulação de envio das configurações para a nuvem (substitua com sua lógica real)
    // Normalmente, você faria uma chamada de API para atualizar as configurações no servidor
    // Aqui, apenas mostramos as configurações no console como exemplo.
    console.log('Configurações Atualizadas:', userSettings)
  }

  const logOutUser = () => {
    signOut(firebaseAuth).then(() => {
      navigate('/responsive/login')
    })
  }

  // Função para lidar com mudanças nas configurações
  const handleSettingChange = (settingName, value) => {
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [settingName]: value,
    }))
  }

  return (
    <main className='container mx-auto mt-4'>
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <Typography variant='subtitle2' className='mb-3'>
          Preferências de Notificação
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={userSettings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
            }
            label='Receber Notificações'
          />
        </FormGroup>
      </div>

      <div className='bg-white p-4 mt-4 rounded-lg shadow-md'>
        <Typography variant='subtitle2' className='mb-3'>
          Modo Escuro
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={userSettings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
            }
            label='Ativar Modo Escuro'
          />
        </FormGroup>
      </div>

      <div className='bg-white p-4 mt-4 rounded-lg shadow-md'>
        <Typography variant='subtitle2' className='mb-3'>
          Configurações de Idioma
        </Typography>
        <Select
          value={userSettings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          className='w-full'
        >
          <MenuItem value='en'>Inglês</MenuItem>
          <MenuItem value='es'>Espanhol</MenuItem>
          <MenuItem value='fr'>Francês</MenuItem>
          <MenuItem value='pt'>Português</MenuItem>
        </Select>
      </div>

      <div className={'flex justify-between'}>
        <Button
          variant='contained'
          color='primary'
          onClick={updateSettings}
          className='mt-4'
          startIcon={<EditIcon />}
        >
          Salvar
        </Button>

        <Button
          variant='outlined'
          color='error'
          onClick={logOutUser}
          className='mt-4'
          startIcon={<LogoutIcon />}
        >
          Log Out
        </Button>
      </div>
    </main>
  )
}
