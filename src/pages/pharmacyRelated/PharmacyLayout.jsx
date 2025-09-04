import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';

const toUrlSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');

const PharmacyLayout = () => {
    const location = useLocation();

    const sidebarLinks = [
        'Salt', 'Product', 'Supplier', 'Purchase Order', 'Purchase', 'Retail',
        'Department Allocation', 'Purchase Return', 'Retail Return', 'Ipd List',
        'Indents', 'Indents Return', 'Reports', 'Expiry', 'Sales Revenue',
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-sm">
            <aside className="w-64 bg-white shadow-lg flex-shrink-0 overflow-y-auto">
                <div className="p-5 border-b sticky top-0 bg-white z-10">
                    <h1 className="text-2xl font-extrabold text-[#D055D5]">AHIS</h1>
                </div>
                <nav className="p-2">
                    <ul>
                        {sidebarLinks.map(linkText => {
                            const path = `/pharmacy/${toUrlSlug(linkText)}`;
                            const isActive = location.pathname === path;
                            return (
                                <Link to={path} key={linkText}>
                                    <li className={`
                                        relative px-4 py-3 my-1 rounded-lg cursor-pointer flex items-center gap-3 font-medium
                                        transition-all duration-200
                                        ${isActive
                                            ? 'bg-[#D055D5] text-white shadow-lg'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        {isActive && <span className="absolute left-0 top-2 h-6 w-1 bg-purple-200/80 rounded-r-full"></span>}
                                        <span className="pl-2">{linkText}</span>
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="bg-white shadow-sm flex-shrink-0 z-10 sticky top-0">
                    
                    {/* Stylish Notification Bar */}
                    <div className="bg-red-500 text-white w-full flex items-center justify-center gap-2 py-0.5 text-xs font-semibold">
                        {/* Info Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                        <span>Invoice #N/A has been generated with due date N/A. Kindly make payment to avoid service disruption.</span>
                    </div>

                    <div className="flex justify-end items-center p-4 border-b">
                        <div className="text-right">
                            <span className="font-semibold text-gray-700 cursor-pointer">Mr. Indramani Mishra ▼</span>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default PharmacyLayout;