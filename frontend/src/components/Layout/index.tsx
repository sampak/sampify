import { Menu } from '../Menu'
import * as SC from './Layout.styled'

function Layout({ children }: any) {
  return (
    <SC.Layout>
      <Menu />
      {children}
    </SC.Layout>
  )
}

export default Layout
