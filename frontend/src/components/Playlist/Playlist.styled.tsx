import styled from 'styled-components';
import colors from '../../styles/colors';


interface ActiveElement {
  active?: boolean
}

export const Playlist = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  color: ${colors.fonts.gray};
  padding-left: 5rem;
  padding-right: 5rem;
`;

export const DragAndDrop = styled.div<ActiveElement>`
  position: absolute;
  display: ${props => (props.active ? 'block' : 'none')};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
`;


export const Animation = styled.div`
  position: relative;
  width: 40rem;
  height: 40rem;
  left: 0;
  top: 0;
  margin-left: 50%;
  margin-top: 10rem;
  transform: translateX(-50%);
`;

export const UploadText = styled.div`
  position: relative;
  width: 100%;
  color: white;
  font-size: 4rem;
  text-align: center;
`;

export const PlaylistData = styled.div`
  display: flex;
  padding-top: 6rem;
  align-items: center;
`;

export const PlaylistInformation = styled.div`
  width: 80%;
`;

export const PlaylistTitle = styled.div`
  font-size: 4.1rem;
  font-weight: bold;
  color: ${colors.fonts.dirtyWhite};
`;

export const PlaylistDescription = styled.div`
  padding-top: 2rem;
  /* width: 30rem; */
`;


export const Info = styled.div`
  padding-top: 2rem;
  display: flex;
  gap: 2rem;

  b {
    color: ${colors.fonts.dirtyWhite};
  }
`;

export const CreatedBy = styled.div`
`;

export const Songs = styled.div`
`;

export const PlaylistCover = styled.div`
  text-align: right;
  
  width: 100%;
`;

export const PlaylistImage = styled.img`
  width: 14rem;
  height: 14rem;
  border-radius: 1rem;
`;


export const Options = styled.div`
  display: flex;
  padding-top: 4rem;
`;

export const SearchBar = styled.div`
  display: flex;

  width: 70%;
  height: 3.2rem;
`;

export const SearchBox = styled.div`
  background: rgba(16, 16, 16, 1);
  height: 3.4rem;
  padding-left: 1rem;
  padding-right: 2rem;
  line-height: 3.4rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

export const Input = styled.input`
  height: 3.2rem;
  width: 50rem;
  background: rgba(16, 16, 16, 1);
  color: white;
  border: none;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  outline: none;
`;

export const Settings = styled.div`
  display: flex;
  justify-content: right;
  width: 30%;
`;

export const Box = styled.div`
  display: block;
  position: relative;
  font-size: 1.4rem;
  color: ${colors.fonts.gray};
  padding-top: 1rem;
  margin-right: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1rem;
  background: rgba(16, 16, 16, 1);
  border: none;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background: rgba(21, 21, 21, 1);
    color: white;
  }
`;

export const TextWithPadding = styled.span`
  padding-left: 0.5rem;
`;


export const SongList = styled.div`
  padding-top: 4rem;
  height: calc(100% - 33rem);
`;