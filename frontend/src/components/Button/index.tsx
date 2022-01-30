import * as SC from './Button.styled'
function Button({
  children,
  type = 'button',
  disabled,
}: {
  children: string
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
}) {
  return (
    <SC.Button disabled={disabled} type={type}>
      {children}
    </SC.Button>
  )
}

export default Button
