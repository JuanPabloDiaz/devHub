/**
Renders a container component that wraps its children with styling and optional custom element type.
@component
@param {Object} props - The component props.
@param {string} [props.as='div'] - The HTML element type to be used as the container. Defaults to 'div'.
@param {ReactNode} props.children - The content to be wrapped inside the container.
@param {string} [props.className] - Additional CSS classes to be applied to the container.
@param {string} [props.size='md'] - Size of the container: 'sm', 'md', 'lg', 'xl', or 'full'.
@param {any} [props.rest] - Any other props to be spread onto the container element.
@returns {JSX.Element} The rendered container component.
*/

export const Container = ({
  as: Element = 'div',
  children,
  className,
  size = 'md',
  ...rest
}) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  }

  return (
    <Element
      {...rest}
      className={`px-4 sm:px-6 w-full ${sizeClasses[size]} mx-auto ${className || ''}`}
    >
      {children}
    </Element>
  )
}
