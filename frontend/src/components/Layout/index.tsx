import { Menu } from '../Menu'
import * as SC from './Layout.styled'
// import * as userService from '../../services/user'

function Layout({ children }: any) {
  return (
    <SC.Layout>
      <Menu />
      {children}
    </SC.Layout>
  )
}

export default Layout
