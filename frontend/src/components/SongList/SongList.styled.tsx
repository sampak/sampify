import styled from 'styled-components'

export const SongList = styled.div`
  width: 100%;
  height: 90%;
`

export const Header = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: 4rem 1fr 1fr 1fr 8rem 8rem;
`

export const List = styled.div`
  padding-top: 2rem;
  max-height: 100%;
  /* background: red; */
  overflow: overlay;

  /* Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba(12, 12, 12, 1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(21, 21, 21, 1);
    border-radius: 10px;
  }
`
export const Id = styled.div``
export const Title = styled.div``
export const Artist = styled.div``
export const Album = styled.div``
export const AddDate = styled.div``
export const Length = styled.div``
export const SongOptions = styled.div``
