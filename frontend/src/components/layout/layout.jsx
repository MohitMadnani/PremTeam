import Sidebar from "../Sidebar/Sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="layout">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;