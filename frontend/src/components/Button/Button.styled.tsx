import styled from 'styled-components';
import colors from '../../styles/colors';


interface ButtonProps {
  disabled?: boolean;
  isLoading?: boolean; 
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 5rem;
  border-radius: 5rem;
  border: none;
  color: ${colors.white};
  background: ${colors.green};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  text-align: center;
  transition: opacity 0.5s;
`
