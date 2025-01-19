import { Outlet } from "react-router";
import { NavbarComponent } from "./NavbarComponent.tsx";

export function RootLayout() {
    return (
        <>
            <div className="grid grid-cols-[250px_auto] min-h-screen">
                {/* Header (NavbarComponent) */}
                <header className=''>
                    <NavbarComponent />
                </header>

                {/* Main Content */}
                <main className="p-3 pt-8">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
