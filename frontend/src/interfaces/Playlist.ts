import Song from './Song'

export interface Playlist {
  playlistGuid: string
  songs?: Song[]
}
