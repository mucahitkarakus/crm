import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"

const Layout = ({ children }) => {
  return (
    <div>
        <div>
        <Sidebar />
        </div>
        <Navbar />
        { children }
    </div>
  )
}

export default Layout