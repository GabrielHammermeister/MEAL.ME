import React, { ReactNode } from 'react'
import { Card, CardTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export const MuiCustomCard = (props: any) => (
  <Card className={'bg-white p-4 mt-4 rounded-lg shadow-md ' + props.className} {...props} />
)
