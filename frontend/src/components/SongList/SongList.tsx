import * as SC from './SongList.styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'

import Song from '../../interfaces/Song'
import SongBox from '../SongBox'

function SongList({
  songs,
  playlistGuid,
  refetch,
}: {
  songs: Song[]
  playlistGuid: string
  refetch?: () => void
}) {
  return (
    <SC.SongList>
      <SC.Header>
        <SC.Id></SC.Id>
        <SC.Title>Song</SC.Title>
        <SC.Artist>Artist</SC.Artist>
        <SC.Album>Album</SC.Album>
        <SC.AddDate style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faCalendar} />
        </SC.AddDate>
        <SC.Length style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon={faClock} />
        </SC.Length>
      </SC.Header>

      <SC.List>
        {songs &&
          songs.map((song) => (
            <SongBox
              refetch={refetch}
              song={song}
              playlistGuid={playlistGuid}
            />
          ))}
      </SC.List>
    </SC.SongList>
  )
}

export default SongList
