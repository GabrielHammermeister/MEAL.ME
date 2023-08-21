import { Children, ReactElement, ReactNode, cloneElement } from 'react'

type Type = 'rounded' | 'rectangle'

interface IconBaseProps {
  type?: Type
  children: ReactElement
}

const StyleInjector = ({ children }) => {
  const classList = 'fill-m-gray'
  const StyledChildren = () =>
    Children.map(children, (child) =>
      cloneElement(child, {
        className: `${child.props.className} ${classList}`,
      }),
    )

  return <StyledChildren />
}

export const IconBase = ({ type = 'rectangle', children }: IconBaseProps) => {
  function changeType(type: Type) {
    if (type === 'rectangle') {
      return 'rounded-lg'
    } else if (type === 'rounded') {
      return 'rounded-full'
    }
  }

  return (
    <div className={`inline-flex  p-2 ${changeType(type)} bg-m-gray bg-opacity-30`}>
      <StyleInjector>{children}</StyleInjector>
    </div>
  )
}
