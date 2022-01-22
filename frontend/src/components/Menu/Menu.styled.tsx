import styled from 'styled-components';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


export const Menu = styled.div`
  display: inline-block;
  position: relative;
  min-width: 12rem;
  width: 12rem;
  height: 100%;
  background: ${colors.gray};
  color: ${colors.fonts.gray};
  font-family: ${fonts.roboto.regular};
  overflow: hidden;
  border-bottom-left-radius: 5rem;
  border-bottom-right-radius: 5rem;
`;

interface UserProps {
  mouseIn?: boolean;
}

export const User = styled.div<UserProps>`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 6rem;
  height: 6.2rem;
  /* margin: auto; */
  padding-left: ${(props) => (props.mouseIn ? '1rem' : '3rem')};
  padding-top: 2.4rem;
  transition: padding-left 0.5s;
`;

export const Avatar = styled.img<UserProps>`
  width: ${(props) => (props.mouseIn ? '75%' : '100%')};
  height: ${(props) => (props.mouseIn ? '75%' : '100%')};
  border-radius: 1rem;
  transition: width 0.5s, height 0.5s;
`;


export const Options = styled.div`
  display: grid;
  width: 100%;
  text-align: center;
  padding-top: 2rem;
  flex-flow: wrap;
`;

interface ActiveElement {
  active?: boolean;
}

export const Option = styled.div<ActiveElement>`
  width: 90%;
  margin: auto;
  margin-top: 2rem;
  cursor: pointer;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 1rem;

  background: ${(props) => (props.active ? 'rgba(16, 16, 16, 1)' : colors.gray)};
  color: ${(props) => (props.active ? colors.white : colors.fonts.gray )};

  &:hover {
    background: rgba(16, 16, 16, 1);
    color: ${colors.white};
  }
`;

export const OptionLabel = styled.div`
  padding-top: 0.4rem;
  font-weight: bold;
`;
