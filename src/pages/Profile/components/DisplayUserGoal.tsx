import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import '../styles.css'
export function DisplayUserGoal() {
  return (
    <>
      <Card sx={{ width: 'fit-content', p: 2 }}>
        <CardHeader title={'Your current Goal'} />
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}
        >
          <div className={'goal-item'}>
            <Typography variant={'overline'}>Goal type: </Typography>
            <div className={'item'}>
              <Typography variant={'caption'}>Lose Weight </Typography>
            </div>
          </div>

          <div className={'goal-item'}>
            <Typography variant={'overline'}>Weight Goal: </Typography>
            <div className={'item'}>
              <Typography variant={'caption'}>{99} kg</Typography>
            </div>
          </div>

          <div className={'goal-item'}>
            <Typography variant={'overline'}>Deadline: </Typography>
            <div className={'item'}>
              <Typography variant={'caption'}>{12} months</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
