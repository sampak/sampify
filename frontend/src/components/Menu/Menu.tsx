import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faSearch,
  faStream,
  faCompactDisc,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import * as SC from './Menu.styled'
import Avatar from '../../assets/avatar.jpg'
import { Link, useLocation } from 'react-router-dom'
function Menu() {
  const location = useLocation()
  const [mouseOnUser, setMouseOnUser] = useState(false)

  return (
    <SC.Menu>
      <SC.User
        mouseIn={mouseOnUser}
        onMouseEnter={() => {
          setMouseOnUser(true)
        }}
        onMouseLeave={() => {
          setMouseOnUser(false)
        }}
      >
        <SC.Avatar mouseIn={mouseOnUser} src={Avatar} />
      </SC.User>

      <SC.Options>
        <Link to={'/'}>
          <SC.Option active={location.pathname === '/'}>
            <FontAwesomeIcon icon={faHome} />
            <SC.OptionLabel>Home</SC.OptionLabel>
          </SC.Option>
        </Link>
        <Link to={'/liked'}>
          <SC.Option active={location.pathname === '/liked'}>
            <FontAwesomeIcon icon={faHeart} />
            <SC.OptionLabel>Liked</SC.OptionLabel>
          </SC.Option>
        </Link>
        <SC.Option>
          <FontAwesomeIcon icon={faSearch} />
          <SC.OptionLabel>Browse</SC.OptionLabel>
        </SC.Option>
        <SC.Option>
          <FontAwesomeIcon icon={faCompactDisc} />
          <SC.OptionLabel>Playlists</SC.OptionLabel>
        </SC.Option>
        <SC.Option>
          <FontAwesomeIcon icon={faStream} />
          <SC.OptionLabel>Library</SC.OptionLabel>
        </SC.Option>
      </SC.Options>
    </SC.Menu>
  )
}

export default Menu
