import React from 'react'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { ResponsiveLayout } from '@/templates/ResponsiveLayout/ResponsiveLayout'
import SettingsIcon from '@mui/icons-material/Settings'
import FlagIcon from '@mui/icons-material/Flag'
import InfoIcon from '@mui/icons-material/Info'
import { UserSettingsTab } from '@/pages/Responsive/Profile/components/UserSettingsTab'
import { UserGoalsTab } from '@/pages/Responsive/Profile/components/UserGoalsTab'
import { UserInfoTab } from '@/pages/Responsive/Profile/components/UserInfoTab'
import { Avatar, Tabs } from '@mui/material'

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
