import { Outlet } from "react-router";
import { Navigation } from "./Navigation";

export function RootLayout() {
    return (
        <>
            <div className="grid grid-cols-[250px_auto] min-h-screen">
                {/* Header (Navigation) */}
                <header className=''>
                    <Navigation />
                </header>

                {/* Main Content */}
                <main className="p-3 pt-8">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
