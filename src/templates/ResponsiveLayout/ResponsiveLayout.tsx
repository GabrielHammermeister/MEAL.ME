import { ReactNode } from 'react'

interface ResponsiveLayoutProps {
  children: ReactNode
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return (
    <>
      <header className={'py-2 shadow-md'}>
        <h1 className={'text-center text-green-950 font-black text-3xl'}>Meal.me</h1>
      </header>
      <main className={'px-3.5 flex-grow'}>{children}</main>
      {/* <nav className={'shadow-2xl shadow-green-600 h-20'}></nav>*/}
    </>
  )
}
