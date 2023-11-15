import React, { FormEvent, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { browserLocalPersistence, setPersistence } from 'firebase/auth'
import { firebaseAuth } from '@/services/firebase/initializer'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import { FlatIcon } from '@/components/FlatIcon/FlatIcon'
import svgGoogleSrc from '@/assets/icons/google.svg'
import svgFacebookSrc from '@/assets/icons/facebook.svg'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/Router'

const SocialButton = ({ src, onClick }: { src: string; onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='flex p-2 cursor-pointer bg-white border-2 border-gray-200 border-solid rounded-full shadow-sm border-opacity-40
      hover:shadow-md'
    >
      <FlatIcon src={src} size='2xl' />
    </button>
  )
}

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(firebaseAuth)
  const [signInWithFacebook, fbUser, fbLoading, fbError] = useSignInWithFacebook(firebaseAuth)
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(firebaseAuth)
  const handleUserSignIn = (event: FormEvent) => {
    event.preventDefault()
    setPersistence(firebaseAuth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(email, password)
      })
      .catch((error) => console.error(error))
  }

  async function signInWithGoogleFirebase() {
    try {
      await signInWithGoogle()
    } catch (err) {}
  }

  async function signInWithFacebookFirebase() {
    try {
      await signInWithFacebook()
    } catch (err) {}
  }

  function renderErrorMessage() {
    console.log(error)
    return error?.message || 'I guess something is wrong ...'
  }

  // function handleSignUp() {
  //   console.log('MOTHERFUCKER')
  //   navigate('/responsive/sign-up')
  // }

  return (
    <ResponsiveLayout options={{ header: true, tabBar: false }}>
      <section className='flex flex-col'>
        <h2 className='m-0 mt-20 font-bold text-center'>Sign in</h2>
        <h3 className='m-0 font-normal text-center'>Sign in to your account</h3>
        <Box component='form' onSubmit={handleUserSignIn} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin='normal' error={Boolean(error)}>
            <TextField
              required
              fullWidth
              error={!!error}
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </FormControl>
          <FormControl fullWidth margin='normal' error={Boolean(error)}>
            <TextField
              error={!!error}
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                value={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                color='primary'
              />
            }
            label='Remember me'
          />
          {error && (
            <Typography variant={'subtitle1'} color={'error'}>
              {renderErrorMessage()}
            </Typography>
          )}
          <Button type='submit' size='large' fullWidth variant='contained' sx={{ mt: 8, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </section>
      <div className='flex flex-col justify-end flex-grow gap-10 py-6'>
        <div className='relative flex flex-col items-center'>
          <hr className='absolute top-0 z-10 w-full' />
          <span className='relative top-0 z-20 px-3 bg-white'>Or Login With</span>
        </div>
        <section className='flex justify-center gap-14'>
          <SocialButton src={svgFacebookSrc} onClick={signInWithFacebookFirebase} />
          <SocialButton src={svgGoogleSrc} onClick={signInWithGoogleFirebase} />
        </section>
        <span className='text-lg '>
          Don{"'"}t have an account ?{' '}
          <Link href={ROUTES.RESPONSIVE.SIGNUP}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Sign Up
          </Link>
        </span>
      </div>
    </ResponsiveLayout>
  )
}
