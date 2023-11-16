import { Step, StepLabel, Stepper } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import GoalTypeForm from '@/pages/Responsive/CreateGoalPage/components/GoalTypeForm'
import BMRForm from '@/pages/Responsive/CreateGoalPage/components/BMR_Form'
import DefineGoalForm from '@/pages/Responsive/CreateGoalPage/components/DefineGoalForm'
import Resume_Step from '@/pages/Responsive/CreateGoalPage/components/Resume_Step'

const steps = ['Goal Type', 'Basal Metabolic Rate', 'Define Goal', 'Resume']

export const CreateGoalPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [displayUserGoalStepper, setDisplayUserGoalStepper] = useState(false)
  const [bmrValue, setBmrValue] = useState(0)
  const navigate = useNavigate()
  const [goal, setGoal] = useState({})
  console.log('CURRENT GOAL: ', goal)

  function handleNextStep() {
    setActiveStep((prevState) => prevState + 1)
  }

  function handlePreviousStep() {
    setActiveStep((prevState) => prevState - 1)
  }

  function renderStepContent(step: number) {
    switch (step) {
      case 0: {
        return <GoalTypeForm handleNextStep={handleNextStep} setGoal={setGoal} />
      }
      case 1: {
        return (
          <BMRForm
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            setBmrValue={setBmrValue}
            setGoal={setGoal}
          />
        )
      }
      case 2: {
        return (
          <DefineGoalForm
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
            bmrValue={bmrValue}
            setGoal={setGoal}
            createdGoal={goal}
          />
        )
      }
      case 3: {
        return (
          <Resume_Step
            handlePreviousStep={handlePreviousStep}
            createdGoal={goal}
            bmrValue={bmrValue}
          />
        )
      }
    }
  }

  return (
    <ResponsiveLayout>
      <section className={'h-full flex flex-col pt-20'}>
        <>
          <Stepper activeStep={activeStep} alternativeLabel title={'Profile Goal'}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStepContent(activeStep)}
        </>
      </section>
    </ResponsiveLayout>
  )
}
