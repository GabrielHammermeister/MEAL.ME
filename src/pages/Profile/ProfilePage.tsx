import DefaultTemplate from '@/templates/Default/Default.index'
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useState } from 'react'
import './styles.css'
import EmptyState from '@/components/EmptyState/EmptyState.index'
import noGoalSvg from '@/assets/goal.svg'
import { DisplayUserGoal } from '@/pages/Profile/components/DisplayUserGoal'

const steps = ['Goal Type', 'Basal Metabolic Rate', 'Define Goal']

function GoalTypeOptions() {
  return (
    <div className={'step-container'}>
      <Typography></Typography>
      <Button size={'large'} variant={'outlined'} sx={{ mb: 3 }}>
        Gain Weight
      </Button>
      <Button size={'large'} variant={'outlined'}>
        Lose Weight
      </Button>
    </div>
  )
}
function BMRForm() {
  return (
    <div className={'step-container'}>
      <div>
        <TextField
          label='Weight'
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position='start'>kg</InputAdornment>,
          }}
        />
        <TextField
          label='Height'
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position='start'>cm</InputAdornment>,
          }}
        />
      </div>
      <div>
        <TextField
          label='Age'
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position='start'>years</InputAdornment>,
          }}
        />
        <TextField
          sx={{ m: 1, width: '25ch' }}
          select
          label='Sex'
          defaultValue='male'
          helperText='Please select your biological sex'
        >
          <MenuItem key={'male'} value={'male'}>
            Male
          </MenuItem>
          <MenuItem key={'female'} value={'female'}>
            Female
          </MenuItem>
        </TextField>
      </div>
    </div>
  )
}
function DefineGoal() {
  return (
    <div className={'step-container'}>
      <div>
        <TextField
          label='Deadline'
          type={'number'}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position='start'>months</InputAdornment>,
          }}
          helperText={'Set a deadline for your goal'}
        />
        <TextField
          label='Weight Goal'
          type={'number'}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position='start'>kg</InputAdornment>,
          }}
          helperText={'Set a weight goal'}
        />
      </div>
    </div>
  )
}

export function ProfilePage() {
  const { currentUser } = useCurrentUser()
  const [activeStep, setActiveStep] = useState(0)
  const [displayUserGoalStepper, setDisplayUserGoalStepper] = useState(false)
  const isLastStep = activeStep === steps.length - 1
  const userGoal = false

  function handleNextStep() {
    if (activeStep === 2) setActiveStep(0)
    else setActiveStep((prevState) => prevState + 1)
  }

  function renderStepContent(step) {
    switch (step) {
      case 0: {
        return <GoalTypeOptions />
      }
      case 1: {
        return <BMRForm />
      }
      case 2: {
        return <DefineGoal />
      }
    }
  }

  function handleSubmit() {
    if (isLastStep) {
      // submit form
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  function addUserGoal() {
    setDisplayUserGoalStepper(true)
  }

  return (
    <>
      <DefaultTemplate>
        <Typography variant={'h4'}>Welcome {currentUser?.displayName}!</Typography>

        <section className={'profile-section'}>
          {userGoal ? (
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

              <Box sx={{ marginLeft: 'auto', marginRight: 25 }}>
                <Button variant={'contained'} onClick={handleNextStep}>
                  next
                </Button>
              </Box>
            </>
          )}
        </section>
      </DefaultTemplate>
    </>
  )
}
