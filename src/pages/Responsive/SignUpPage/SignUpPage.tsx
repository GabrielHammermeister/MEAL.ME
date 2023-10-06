import React, { FormEvent, useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Link, TextField } from '@mui/material'
import { ROUTES } from '@/router/Router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { firebaseAuth } from '@/services/firebase/initializer'
import { useNavigate } from 'react-router-dom'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { FlatIcon } from '@/components/FlatIcon/FlatIcon'
import svgGoogleSrc from '@/assets/icons/google.svg'
import svgFacebookSrc from '@/assets/icons/facebook.svg'
import { string } from 'prop-types'

const SocialButton = ({ src }: { src: string }) => {
  return (
    <button className='flex p-2 bg-white border-2 border-gray-200 border-solid rounded-full shadow-lg border-opacity-20'>
      <FlatIcon src={src} size='2xl' />
    </button>
  )
}

export const SignUpPage = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleUserSignUp = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        updateProfile(user, {
          displayName: name + ' ' + lastName,
        })
        navigate('/' + ROUTES.HOME)
      })
      .catch((err) => console.error(err))
  }

  return (// mudei os className h2/h3, add 
    <ResponsiveLayout options={{ header: true, tabBar: false }}>
      <section className='flex flex-col'>
        <h2 className='m-0 mt-20 font-bold text-center'>Sign up</h2>
        <h3 className='m-0 font-normal text-center'>Sign up to your account</h3>
        <Box component='form' onSubmit={handleUserSignUp} noValidate sx={{ mt: 1 }}>
          <Box display="flex">
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              style={{ marginRight: 18 }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='lastName'
              autoFocus
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </Box>
          <TextField
            margin='normal'
            required
            fullWidth
            name='email'
            label='Email Address'
            type='email'
            id='email'
            autoComplete='email'
            value={password}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Button type='submit' size='large' fullWidth variant='contained' sx={{ mt: 8, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </section>
      <div className='flex flex-col justify-end flex-grow gap-10 py-6'>
        <div className='relative flex flex-col items-center'>
          <hr className='absolute top-0 z-10 w-full' />
          <span className='relative top-0 z-20 px-3 bg-white'>Or Register With</span>
        </div>
        <section className='flex justify-center gap-14'>
          <SocialButton src={svgFacebookSrc} />
          <SocialButton src={svgGoogleSrc} />
        </section>
        <span className='text-lg '>
          Already have an account?{' '}
          <Link href={'responsive/login'}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Sign In
          </Link>
        </span>
      </div>
    </ResponsiveLayout>
  )
}
