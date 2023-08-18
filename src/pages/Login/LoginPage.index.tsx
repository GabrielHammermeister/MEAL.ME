import React, { FormEvent, useState } from 'react'
import DefaultTemplate from '@/templates/Default/Default.index'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { ROUTES } from '@/router/Router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '@/services/firebase/initializer'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleUserSignIn = (event: FormEvent) => {
    event.preventDefault()
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        navigate('/' + ROUTES.HOME)
      })
      .catch((err) => console.error(err))
  }
  return (
    <DefaultTemplate>
      <Typography variant='h4'>Login</Typography>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleUserSignIn} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
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
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 8, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href={ROUTES.SIGNUP} variant='body2'>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </DefaultTemplate>
  )
}

export default LoginPage
