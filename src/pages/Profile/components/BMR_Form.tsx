import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  StepProps,
  TextField,
  useFormControl,
} from '@mui/material'
import calculateBMR from '@/utils/calculateBMR'
import React, { ChangeEvent, FormEvent, useReducer, useRef } from 'react'

type BMRFormProps = {
  handleNextStep: () => void
  handlePreviousStep: () => void
  setBmrValue: (value: number) => void
}

const initialGoal = {}

const initialState = {
  weight: '',
  height: '',
  age: '',
  sex: 'male',
  activityLevel: '',
}

// @ts-ignore
function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      console.log(action)
      return {
        ...state,
        [action.field]: action.value,
      }
    case 'RESET_FORM':
      return initialState
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

export default function BMRForm({ handleNextStep, handlePreviousStep, setBmrValue }: BMRFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    // Perform BMR calculation using the captured parameters
    const bmr = calculateBMR(
      parseFloat(state.weight),
      parseFloat(state.height),
      parseInt(state.age),
      state.sex === 'male',
    )
    console.log(`The BMR is: ${bmr}`)

    // Reset form values
    dispatch({ type: 'RESET_FORM' })
    setBmrValue(bmr)
    handleNextStep()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch({ type: 'CHANGE_FIELD', field: name, value })
  }

  return (
    <div className={'step-container'}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div>
          <TextField
            name='weight'
            value={state.weight}
            label='Weight'
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position='start'>kg</InputAdornment>,
            }}
            onChange={handleChange}
          />
          <TextField
            name={'height'}
            value={state.height}
            label='Height'
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position='start'>cm</InputAdornment>,
            }}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            name={'age'}
            value={state.age}
            label='Age'
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              endAdornment: <InputAdornment position='start'>years</InputAdornment>,
            }}
            onChange={handleChange}
          />
          <TextField
            sx={{ m: 1, width: '25ch' }}
            select
            name={'sex'}
            value={state.sex}
            label='Sex'
            defaultValue='male'
            onChange={handleChange}
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
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 10 }}>
          <Button variant={'outlined'} onClick={handlePreviousStep}>
            Previous Step
          </Button>
          <Button type={'submit'} variant={'contained'}>
            Next Step
          </Button>
        </Box>
      </form>
    </div>
  )
}
