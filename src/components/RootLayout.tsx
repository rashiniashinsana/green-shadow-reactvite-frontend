import {Outlet, useLocation} from "react-router";
import { NavbarComponent } from "./NavbarComponent.tsx";
import {useEffect} from "react";

export function RootLayout() {
    const location = useLocation();

    useEffect(() => {
        const element = document.querySelector("body > div");

        if (element && element instanceof HTMLElement) {
            if (location.pathname === "/" || location.pathname === "/register") {
                element.style.width = "75%";
                element.style.height = "80%";
            } else {
                element.style.width = "90%";
                element.style.height = "90%";
            }
        }
    }, [location]);

    return (
        <>
            <div className="grid grid-cols-[250px_auto] min-h-screen">
                <header className=''>
                    <NavbarComponent />
                </header>

                <main className="p-3 pt-8">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
