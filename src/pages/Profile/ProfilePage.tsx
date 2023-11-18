/* eslint-disable quotes */
// @ts-nocheck

import DefaultTemplate from '@/templates/Default/Default.index'
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useState } from 'react'
import './styles.css'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import noGoalSvg from '@/assets/goal.svg'
import { DisplayUserGoal } from '@/pages/Profile/components/DisplayUserGoal'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '@/services/firebase/initializer'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/Router'
import GoalTypeForm from '@/pages/Profile/components/GoalTypeForm'
import DefineGoalForm from '@/pages/Profile/components/DefineGoalForm'
import BMRForm from '@/pages/Profile/components/BMR_Form'
import { isEmpty } from '@/utils/isEmpty'

const steps = ['Goal Type', 'Basal Metabolic Rate', 'Define Goal']

export function ProfilePage() {
  const { currentUser } = useCurrentUser()
  const [activeStep, setActiveStep] = useState(0)
  const [displayUserGoalStepper, setDisplayUserGoalStepper] = useState(false)
  const [bmrValue, setBmrValue] = useState(0)
  const navigate = useNavigate()
  const isLastStep = activeStep === steps.length - 1
  const userGoal = false

  function handleNextStep() {
    if (activeStep === 2) navigate('/' + ROUTES.HOME)
    else setActiveStep((prevState) => prevState + 1)
  }

  function handlePreviousStep() {
    setActiveStep((prevState) => prevState - 1)
  }

  function renderStepContent(step: number) {
    switch (step) {
      case 0: {
        return <GoalTypeForm handleNextStep={handleNextStep} />
      }
      case 1: {
        return (
          <BMRForm
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            setBmrValue={setBmrValue}
          />
        )
      }
      case 2: {
        return (
          <DefineGoalForm
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            bmrValue={bmrValue}
          />
        )
      }
    }
  }

  const handleUserSignOut = () => {
    signOut(firebaseAuth).then()
    navigate(ROUTES.LOGIN)
  }

  function addUserGoal() {
    setDisplayUserGoalStepper(true)
  }

  return (
    <>
      <DefaultTemplate>
        <section className={'profile-header'}>
          <Typography variant={'h4'}>Welcome {currentUser?.displayName}!</Typography>
          <Button onClick={handleUserSignOut} variant={'contained'}>
            Sign Out
          </Button>
        </section>

        <section className={'profile-section'}>
          {isEmpty(currentUser?.goals) ? (
            <DisplayUserGoal />
          ) : (
            <>
              {!displayUserGoalStepper && (
                <EmptyState
                  imgSrc={noGoalSvg}
                  imgAlt={'user with no goal'}
                  title={"You don't have a goal"}
                  description={'Add a goal to your profile.'}
                  handleOnClickButton={addUserGoal}
                  buttonLabel={'Create goal'}
                />
              )}
            </>
          )}
          {displayUserGoalStepper && (
            <>
              <Stepper activeStep={activeStep} alternativeLabel title={'Profile Goal'}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {renderStepContent(activeStep)}

              {/* <Box sx={{ marginLeft: 'auto', marginRight: 25, display: 'flex', gap: 4 }}> */}
              {/*   <Button variant={'contained'} onClick={handlePreviousStep}> */}
              {/*     back */}
              {/*   </Button> */}
              {/*   <Button variant={'contained'} onClick={handleNextStep}> */}
              {/*     next */}
              {/*   </Button> */}
              {/* </Box> */}
            </>
          )}
        </section>
      </DefaultTemplate>
    </>
  )
}
