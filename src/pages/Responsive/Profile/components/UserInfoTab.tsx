import { Button, Divider, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { firebaseAuth } from '@/services/firebase/initializer'

export const UserInfoTab = () => {
  const [userProfile, setUserProfile] = useState({
    name: {
      data: firebaseAuth.currentUser?.displayName,
      unit: '',
    },
    weight: { data: null, unit: 'Kg' },
    age: { data: null, unit: 'anos' },
    height: { data: null, unit: 'cm' },
    sex: { data: null, unit: '' },
    email: { data: firebaseAuth.currentUser?.email, unit: '' },
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
    // Aqui você pode adicionar a lógica para salvar as informações editadas.
  }

  return (
    <main className='container mx-auto mt-4'>
      <div className='bg-white p-4 rounded-lg shadow-md flex flex-col gap-4'>
        <UserInfo userProfileInfo={userProfile.name} label={'Name'} />
        <Divider />
        <UserInfo userProfileInfo={userProfile.email} label={'Email'} />
        <Divider />
        <UserInfo userProfileInfo={userProfile.weight} label={'Current Weight'} />
        <Divider />
        <UserInfo userProfileInfo={userProfile.age} label={'Age'} />
        <Divider />
        <UserInfo userProfileInfo={userProfile.height} label={'Height'} />
        <Divider />
        <UserInfo userProfileInfo={userProfile.sex} label={'Sex'} />

        {isEditing && (
          <Button variant='contained' color='primary' onClick={handleSaveClick} className='mt-2'>
            Salvar
          </Button>
        )}
      </div>
    </main>
  )
}

const UserInfo = ({ userProfileInfo, label, setUserProfile, isEditing }: any) => {
  return (
    <div className={'flex flex-wrap justify-between items-baseline'}>
      <Typography variant='subtitle1'>{label}:</Typography>
      {isEditing ? (
        <TextField
          variant='outlined'
          size='small'
          value={userProfileInfo.data}
          onChange={(e) =>
            setUserProfile({
              ...userProfileInfo,
              firstName: e.target.value,
            })
          }
        />
      ) : (
        <Typography variant='subtitle2'>
          {userProfileInfo.data === null ? '-' : `${userProfileInfo.data} ${userProfileInfo.unit}`}
        </Typography>
      )}
    </div>
  )
}
