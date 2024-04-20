import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export function Layout() {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div>
                <Outlet />
            </div>
            <div>© Markéta Hájek</div>
        </>
    );
}
