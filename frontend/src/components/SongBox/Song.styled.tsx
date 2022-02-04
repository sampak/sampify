import styled from 'styled-components'
import colors from '../../styles/colors'

interface ActiveElement {
  active: boolean
  liked?: boolean
}

export const ListBox = styled.div<ActiveElement>`
  display: grid;
  color: ${(props) => (props.active ? '#FFFFFF' : '#AAAAAA')};
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
  grid-template-columns: 4rem 1fr 1fr 1fr 8rem 8rem auto;
  overflow-x: hidden;

  &:hover {
    color: '#FFFFFF';
  }

  transition: 1s;
`

export const Id = styled.div``
export const Title = styled.div``
export const Artist = styled.div``
export const Album = styled.div``
export const AddDate = styled.div``
export const Length = styled.div``
export const SongOptions = styled.div<ActiveElement>`
  display: flex;
  gap: 1rem;
  width: ${(props) => (props.active ? '2rem' : '0rem')};
  height: 100%;
  color: ${(props) => (props.liked ? `${colors.green}` : '#AAAAAA')};
  transition: width 1s, padding-right 1s;
  text-align: center;
  padding-right: ${(props) => (props.active ? '3rem' : '0rem')};
`
