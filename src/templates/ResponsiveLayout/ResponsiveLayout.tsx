import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { FoodSVG, HomeSVG, MealSVG, ProfileSVG } from '@/icons'
import { extend } from 'lodash'
import { generateKey } from '@/utils/generateKey'

interface ResponsiveLayoutProps {
  options?: {
    tabBar?: boolean
    header?: boolean
  }
  children: ReactNode
}

interface Link {
  label: string
  to: string
  icon: (props: any) => ReactNode
}

const getBaseRoute = (route: string) => '/responsive/' + route.replace('/', '')

const LINKS: Array<Link> = [
  {
    label: 'Home',
    icon: (props) => <HomeSVG {...props} />,
    to: getBaseRoute('/'),
  },
  {
    label: 'Meals',
    icon: (props) => <MealSVG {...props} />,
    to: getBaseRoute('meals'),
  },
  {
    label: 'Foods',
    icon: (props) => <FoodSVG {...props} />,
    to: getBaseRoute('ingredients'),
  },
  {
    label: 'Profile',
    icon: (props) => <ProfileSVG {...props} />,
    to: getBaseRoute('profile'),
  },
]

interface NavButtonProps extends Link {}

function NavButton({ icon, label, to }: NavButtonProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'flex flex-col justify-center items-center p-3 pb-0 rounded' +
        ' ' +
        (isActive ? 'bg-m-green bg-opacity-30' : 'items-start')
      }
    >
      {({ isActive }) => {
        return (
          <>
            {icon({ className: isActive ? 'fill-m-green' : 'fill-m-gray' })}
            <span className='text-xs'>{label}</span>
          </>
        )
      }}
    </NavLink>
  )
}

export function ResponsiveLayout({
  children,
  options = { header: true, tabBar: true },
}: ResponsiveLayoutProps) {
  return (
    <>
      {options.header && (
        <header className={'py-2 shadow-md'}>
          <h1 className={'text-center text-green-950 font-black text-3xl'}>Meal.me</h1>
        </header>
      )}
      <main className={'flex flex-col px-3.5 flex-grow'}>{children}</main>
      {options.tabBar && (
        <nav
          id='tab-bar'
          className={
            'fixed bottom-0 right-0 left-0 border-t-2 border-slate-200 border-opacity-20 h-16'
          }
        >
          <div className='relative z-50 flex items-center justify-between h-full px-12 bg-white'>
            {LINKS.map((link) => (
              <NavButton {...link} key={generateKey()} />
            ))}
          </div>
        </nav>
      )}
    </>
  )
}
