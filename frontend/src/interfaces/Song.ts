export default interface Song {
  guid: string
  title: string | null
  addTime: number
  duration: number
  liked?: boolean
  likedGuid?: string
}
