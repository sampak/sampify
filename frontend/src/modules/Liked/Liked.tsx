import Playlist from "../../components/Playlist";
function Liked(){
  return (
    <>
      <Playlist refetch={() => {}} songs={[]} />
    </>
  )
}

export default Liked;