import React, { ReactNode } from 'react'

export interface MuiCustomCardProps {
  children: ReactNode
  onClick?: () => void
}

export const MuiCustomCard: React.FC<MuiCustomCardProps> = ({ children, onClick }) => {
  const hoverEffect = 'cursor-pointer hover:bg-slate-100'
  return (
    <div
      onClick={onClick}
      className={`flex w-full gap-3 px-6 py-3 border-gray-300 shadow-md border-[1px] border-solid rounded-2xl h-28 ${
        onClick && hoverEffect
      }`}
    >
      {children}
    </div>
  )
}
