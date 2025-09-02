import React, { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../../assets/ahis.png'; // Ensure the logo path is correct

// Helper function to create URL-friendly slugs from sidebar text
const toUrlSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');

const PharmacyLayout = () => {
    const location = useLocation();
    const sidebarLinks = useMemo(() => [
        'Salt', 'Product', 'Supplier', 'Purchase Order', 'Purchase', 'Retail',
        'Department Allocation', 'Purchase Return', 'Retail Return', 'Ipd List',
        'Indents', 'Indents Return', 'Reports', 'Expiry', 'Sales Revenue',
    ], []);

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-sm">
            <aside className="w-64 bg-white shadow-lg flex-shrink-0 overflow-y-auto">
                <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-center items-center">
                    <img src={logo} alt="AHIS Logo" className="h-10" />
                </div>
                <nav className="p-2">
                    <ul>
                        {sidebarLinks.map(linkText => {
                            // Creates the correct path, e.g., "/pharmacy/product"
                            const path = `/pharmacy/${toUrlSlug(linkText)}`;
                            
                            // Checks if the current URL matches the link's path
                            const isActive = location.pathname === path;

                            return (
                                <li key={linkText}>
                                    {/* Use the Link component to handle navigation */}
                                    <Link
                                        to={path}
                                        className={`
                                            relative px-4 py-3 my-1 rounded-lg cursor-pointer flex items-center gap-3 font-medium
                                            transition-all duration-200
                                            ${isActive
                                                ? 'bg-[#D055D5] text-white shadow-lg'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        {isActive && <span className="absolute left-0 top-2 h-6 w-1 bg-purple-200/80 rounded-r-full"></span>}
                                        <span className="pl-2">{linkText}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm flex-shrink-0 z-10">
                    <div className="bg-red-500 text-white w-full text-center py-1 text-xs font-semibold shadow-inner">
                        <span>Invoice #N/A has been generated with due date N/A. Kindly make payment to avoid service disruption.</span>
                    </div>
                    <div className="flex justify-end items-center p-4 border-b">
                        <div className="text-right">
                            <span className="font-semibold text-gray-700 cursor-pointer">Mr. Indramani Mishra ▼</span>
                        </div>
                    </div>
                </header>

                <div className="p-6 overflow-y-auto bg-slate-50">
                    {/* The correct page component will render here based on the URL */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default PharmacyLayout;

