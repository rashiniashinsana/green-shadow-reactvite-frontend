import { Outlet, useLocation } from "react-router-dom";
import { NavbarComponent } from "./NavbarComponent";


export function RootLayout() {
    const location = useLocation();
    const hideNavbarPaths = ["/", "/register"];
    const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);


    return (
        <>
            <div className="grid grid-cols-[250px_auto] min-h-screen">
                  {!shouldHideNavbar && (
                    <header>
                        <NavbarComponent />
                    </header>
                )}
                <main className="p-6 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
