interface IconProps {
  src: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const FlatIcon: React.FC<IconProps> = ({ src, size = 'md' }) => {
  const sizes = {
    md: 'w-6 h-6',
    sm: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  }
  return <img src={src} className={sizes[size]} />
}
