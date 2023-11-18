import { Children, cloneElement, ReactElement } from 'react'

type Type = 'rounded' | 'rectangle'

interface IconBaseProps {
  type?: Type
  children: ReactElement
  color?: string
}

const StyleInjector = ({ children, color }: { children: any; color?: string }) => {
  let classList = 'fill-m-gray'
  if (color) {
    classList = color
  }
  const StyledChildren = () =>
    Children.map(children, (child) =>
      cloneElement(child, {
        className: `${child.props.className} ${classList}`,
      }),
    )

  return <StyledChildren />
}

export const IconBase = ({ type = 'rectangle', children, color }: IconBaseProps) => {
  function changeType(type: Type) {
    if (type === 'rectangle') {
      return 'rounded-lg'
    } else if (type === 'rounded') {
      return 'rounded-full'
    }
  }

  return (
    <div className={`inline-flex  p-2 ${changeType(type)} bg-m-gray bg-opacity-30`}>
      <StyleInjector color={color}>{children}</StyleInjector>
    </div>
  )
}
