// /* eslint-disable quotes */
// import DefaultTemplate from '@/templates/Default/Default.index'
// import {
//   Box,
//   Button,
//   Divider,
//   InputAdornment,
//   MenuItem,
//   Step,
//   StepContent,
//   StepLabel,
//   Stepper,
//   StepProps,
//   Tab,
//   Tabs,
//   TextField,
//   Typography,
// } from '@mui/material'
// import useCurrentUser from '@/hooks/useCurrentUser'
// import { useState } from 'react'
// import './styles.css'
// import EmptyState from '@/components/EmptyState/EmptyState.index'
// import noGoalSvg from '@/assets/goal.svg'
// import { DisplayUserGoal } from '@/pages/Profile/components/DisplayUserGoal'
// import { signOut } from 'firebase/auth'
// import { firebaseAuth } from '@/services/firebase/initializer'
// import { useNavigate } from 'react-router-dom'
// import { ROUTES } from '@/router/Router'
// import GoalTypeForm from '@/pages/Profile/components/GoalTypeForm'
// import DefineGoalForm from '@/pages/Profile/components/DefineGoalForm'
// import BMRForm from '@/pages/Profile/components/BMR_Form'
// import calculateBMR from '@/utils/calculateBMR'
// import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
//
// const steps = ['Goal Type', 'Basal Metabolic Rate', 'Define Goal']
//
// export function ProfilePage() {
//   const { currentUser } = useCurrentUser()
//   const [activeStep, setActiveStep] = useState(0)
//   const [displayUserGoalStepper, setDisplayUserGoalStepper] = useState(false)
//   const [bmrValue, setBmrValue] = useState(0)
//   const navigate = useNavigate()
//
//   const isLastStep = activeStep === steps.length - 1
//   const userGoal = false
//
//   function handleNextStep() {
//     if (activeStep === 2) navigate('/' + ROUTES.HOME)
//     else setActiveStep((prevState) => prevState + 1)
//   }
//   function handlePreviousStep() {
//     setActiveStep((prevState) => prevState - 1)
//   }
//
//   function renderStepContent(step: number) {
//     switch (step) {
//       case 0: {
//         return <GoalTypeForm handleNextStep={handleNextStep} />
//       }
//       case 1: {
//         return (
//           <BMRForm
//             handleNextStep={handleNextStep}
//             handlePreviousStep={handlePreviousStep}
//             setBmrValue={setBmrValue}
//           />
//         )
//       }
//       case 2: {
//         return (
//           <DefineGoalForm
//             handleNextStep={handleNextStep}
//             handlePreviousStep={handlePreviousStep}
//             bmrValue={bmrValue}
//           />
//         )
//       }
//     }
//   }
//
//   const handleUserSignOut = () => {
//     signOut(firebaseAuth).then(() => console.log('user signed out'))
//     navigate(ROUTES.LOGIN)
//   }
//
//   function addUserGoal() {
//     setDisplayUserGoalStepper(true)
//   }
//
//   return (
//     <>
//       <ResponsiveLayout>
//         <section className={'profile-header'}>
//           <Typography variant={'h4'}>Welcome {currentUser?.displayName}!</Typography>
//           <Button onClick={handleUserSignOut} variant={'contained'}>
//             Sign Out
//           </Button>
//         </section>
//
//         <section className={'profile-section'}>
//           {userGoal ? (
//             <DisplayUserGoal />
//           ) : (
//             <>
//               {!displayUserGoalStepper && (
//                 <EmptyState
//                   imgSrc={noGoalSvg}
//                   imgAlt={'user with no goal'}
//                   title={"You don't have a goal"}
//                   description={'Add a goal to your profile.'}
//                   handleOnClickButton={addUserGoal}
//                   buttonLabel={'Create goal'}
//                 />
//               )}
//             </>
//           )}
//           {displayUserGoalStepper && (
//             <>
//               <Stepper activeStep={activeStep} alternativeLabel title={'Profile Goal'}>
//                 {steps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//               {renderStepContent(activeStep)}
//
//               {/* <Box sx={{ marginLeft: 'auto', marginRight: 25, display: 'flex', gap: 4 }}> */}
//               {/*   <Button variant={'contained'} onClick={handlePreviousStep}> */}
//               {/*     back */}
//               {/*   </Button> */}
//               {/*   <Button variant={'contained'} onClick={handleNextStep}> */}
//               {/*     next */}
//               {/*   </Button> */}
//               {/* </Box> */}
//             </>
//           )}
//         </section>
//       </ResponsiveLayout>
//     </>
//   )
// }

import React from 'react'
import Avatar from '@mui/material/Avatar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import SettingsIcon from '@mui/icons-material/Settings'
import FlagIcon from '@mui/icons-material/Flag'
import InfoIcon from '@mui/icons-material/Info'
import { UserSettingsTab } from '@/pages/Responsive/Profile/components/UserSettingsTab'
import { UserGoalsTab } from '@/pages/Responsive/Profile/components/UserGoalsTab'
import { UserInfoTab } from '@/pages/Responsive/Profile/components/UserInfoTab'

export const UserProfilePage = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <ResponsiveLayout>
      <header className='bg-emerald-600 text-white py-8 mx-[-0.875rem]'>
        <div className='container mx-auto text-center'>
          <Avatar
            alt='Gabriel Hammer Avatar'
            src='/profile-pic.png'
            sx={{ width: 140, height: 140 }}
            className={'mx-auto outline-[#34d39938] outline-opacity-80 outline-8 outline'}
          />
          <Typography variant='h4' className='mt-4'>
            Gabriel Hammer
          </Typography>
          <Typography variant='body2'>gabriel@example.com</Typography>
        </div>
      </header>

      <main className='container mt-4'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant={'fullWidth'}
        >
          <Tab label='Informações' icon={<InfoIcon />} />
          <Tab label='Metas' icon={<FlagIcon />} />
          <Tab label='Configurações' icon={<SettingsIcon />} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <UserInfoTab />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <UserGoalsTab />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <UserSettingsTab />
        </TabPanel>
      </main>
    </ResponsiveLayout>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}
