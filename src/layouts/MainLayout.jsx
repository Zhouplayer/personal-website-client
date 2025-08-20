import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"

function MainLayout() {
    const location = useLocation();

    // if it's birthday page, hide navbar
    const hideNavbar = location.pathname.startsWith("/birthday");

    return (
        <div>
            {!hideNavbar && <Navbar />}
            <Outlet />
        </div>
    );

}

export default MainLayout