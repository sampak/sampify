import styled from 'styled-components'

interface ButtonProps {
  isError?: boolean
}

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 5rem;
  width: 100%;
  min-height: 3.2rem;
`

export const IconBox = styled.div<ButtonProps>`
  background: rgba(16, 16, 16, 1);
  color: white;
  height: 4.4rem;
  padding-left: 1rem;
  padding-right: 2rem;
  line-height: 4.4rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;

  border-left: ${(props) => (props.isError ? 'solid red 1px' : 'none')};
  border-top: ${(props) => (props.isError ? 'solid red 1px' : 'none')};
  border-bottom: ${(props) => (props.isError ? 'solid red 1px' : 'none')};
`

export const LoginInput = styled.input<ButtonProps>`
  height: 4.2rem;
  width: 70rem;
  background: rgba(16, 16, 16, 1);
  color: white;
  border: none;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  outline: none;

  border-top: ${(props) => (props.isError ? 'solid red 1px' : 'none')};
  border-bottom: ${(props) => (props.isError ? 'solid red 1px' : 'none')};
  border-right: ${(props) => (props.isError ? 'solid red 1px' : 'none')};
`

export const ButtonWrapper = styled.div`
  width: 50%;
  margin: auto;
`
