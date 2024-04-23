import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation

const Navbar = () => {
    const location = useLocation();  // Get current location

    // Function to determine if the link should be highlighted as active
    const isActive = (path) => {
        // Highlight "/" and "/home" as active when the location is either "/" or "/home"
        if (path === "/home" && (location.pathname === "/" || location.pathname === "/home")) {
            return true;
        }
        return location.pathname === path;
    };

    return (
        <div className="bg-[#171717]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="flex items-center justify-between py-5">
                    <NavLink to="/" className="text-white font-bold text-xl sm:text-2xl">
                        Moe Blog
                    </NavLink> {/* Navigate to root but do not highlight */}
                    <div className="flex items-center space-x-3 leading-5 sm:space-x-5">
                        <NavLink to="/blogs"
                            className={`font-medium text-white sm:block ${isActive('/home') ? 'underline' : ''}`}>
                            Blogs
                        </NavLink>
                        <NavLink to="/tags"
                            className={({ isActive }) => `font-medium text-white sm:block ${isActive ? 'underline' : ''}`}>
                            Tags
                        </NavLink>
                        <NavLink to="/create"
                            className={({ isActive }) => `font-medium text-white sm:block ${isActive ? 'underline' : ''}`}>
                            Create
                        </NavLink>

                    </div>
                </header>
            </div>
        </div>
    );
}

export default Navbar;
