import { firebaseAuth } from '@/services/firebase/initializer'
import useCurrentUser from '@/hooks/useCurrentUser'
import { Person } from '@mui/icons-material'
import { Avatar, Box, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.styles.css'
import { ROUTES } from '@/router/Router'

const Sidebar = () => {
  const { currentUser } = useCurrentUser()

  return (
    <nav className='side-bar hidden md:flex'>
      <div className='links'>
        <Typography variant='h4' fontWeight={800}>
          Meal.me
        </Typography>
        <ul>
          <NavLink to='/' className={({ isActive }) => (isActive ? 'activeLink' : 'nav-link')}>
            Home
          </NavLink>

          <NavLink to='/meals' className={({ isActive }) => (isActive ? 'activeLink' : 'nav-link')}>
            Meals
          </NavLink>
          <NavLink
            to='/ingredients'
            className={({ isActive }) => (isActive ? 'activeLink' : 'nav-link')}
          >
            Ingredients
          </NavLink>
        </ul>
      </div>

      <footer className='nav-footer'>
        {currentUser ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <Person />
            </Avatar>
            <NavLink
              to={ROUTES.PROFILE.INDEX}
              // onClick={handleUserSignOut}
              className={({ isActive }) => (isActive ? 'activeLink' : 'nav-link')}
              style={{ height: '35px' }}
            >
              Profile
            </NavLink>
          </Box>
        ) : (
          <NavLink to='/login' className={({ isActive }) => (isActive ? 'activeLink' : 'nav-link')}>
            Login
          </NavLink>
        )}
        <Typography variant='caption' className='copyright'>
          Copyright ©{new Date().getFullYear()} All rights reserved
        </Typography>
      </footer>
    </nav>
  )
}

export default Sidebar
