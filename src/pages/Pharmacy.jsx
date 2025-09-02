import React, { useState, useEffect, useMemo } from 'react';
import logo from '../assets/ahis.png';
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);
const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-3m6 3v-3" />
    </svg>
);
const ResetIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
    </svg>
);


// --- Add Product Form Component (Now with Validation!) ---
const AddProductForm = ({ onBack, onAddProduct }) => {
    const [formData, setFormData] = useState({
        name: '', type: '', packingUnits: '', manufacturer: '', packing: ''
    });
    const [errors, setErrors] = useState({});

    const inputStyle = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#D055D5] focus:ring-1 focus:ring-[#D055D5] transition duration-200";
    const errorInputStyle = "block w-full px-3 py-2 bg-white border border-red-500 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200";
    const requiredTextStyle = "text-red-500 text-xs mt-1";

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product Name is required";
        if (!formData.type) newErrors.type = "Type is required";
        if (!formData.packingUnits) newErrors.packingUnits = "Packing Units are required";
        if (!formData.packing) newErrors.packing = "Packing is required";
        if (!formData.manufacturer) newErrors.manufacturer = "Manufacturer is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onAddProduct(formData); 
            onBack(); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>
                <button onClick={onBack} className="font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    &larr; Back
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name*</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className={errors.name ? errorInputStyle : inputStyle} />
                        {errors.name && <p className={requiredTextStyle}>{errors.name}</p>}
                    </div>
                    {/* Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Type*</label>
                        <select name="type" value={formData.type} onChange={handleChange} className={errors.type ? errorInputStyle : inputStyle}>
                            <option value="">-- Select Type --</option>
                            <option value="Infusion">Infusion</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Solution">Solution</option>
                        </select>
                        {errors.type && <p className={requiredTextStyle}>{errors.type}</p>}
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <select className={inputStyle}><option>-- Select Category --</option></select>
                    </div>
                    {/* Packing Units */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Packing Units*</label>
                        <input type="number" name="packingUnits" value={formData.packingUnits} onChange={handleChange} placeholder="e.g., 10" className={errors.packingUnits ? errorInputStyle : inputStyle} />
                        {errors.packingUnits && <p className={requiredTextStyle}>{errors.packingUnits}</p>}
                    </div>
                    {/* ... other fields can be added here with state management ... */}
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={onBack} className="bg-gray-200 text-gray-800 font-bold px-8 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200">
                        Cancel
                    </button>
                    <button type="submit" className="bg-[#D055D5] text-white font-bold px-8 py-2 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:-translate-y-0.5">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Products Page Component (Now with real filtering!) ---
const ProductsPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const initialProducts = useMemo(() => [
        { id: 1, name: 'KRPL Metrogyl 100ml', type: 'Infusion', company: 'Kunal Remedies Pvt Ltd', salt: 'Metronidazole (500mg)' },
        { id: 2, name: 'Betadine Solution', type: 'Solution', company: 'Win-Medicare Pvt Ltd', salt: 'Povidone Iodine (4% W/V)' },
        { id: 3, name: 'Gauze Than - 400gram', type: 'Consumables', company: 'Other', salt: '' },
        { id: 4, name: 'Zinepra 10 Tablet SR', type: 'Tablet', company: 'La Renon Healthcare', salt: 'Propranolol (40mg)' },
    ], []);
    
    const [productsData, setProductsData] = useState(initialProducts);
    const [filters, setFilters] = useState({ name: '', company: '', salt: '' });

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        product.company.toLowerCase().includes(filters.company.toLowerCase()) &&
        product.salt.toLowerCase().includes(filters.salt.toLowerCase())
    );

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const resetFilters = () => {
        setFilters({ name: '', company: '', salt: '' });
    };

    const handleAddProduct = (newProduct) => {
        setProductsData(prev => [{ id: prev.length + 1, ...newProduct, company: 'New Company', salt:'New Salt' }, ...prev]);
    };

    const inputStyle = "border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-[#D055D5]/50 focus:border-[#D055D5] transition-shadow duration-200 placeholder-gray-400";

    if (showAddForm) {
        return <AddProductForm onBack={() => setShowAddForm(false)} onAddProduct={handleAddProduct} />;
    }

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-[#D055D5] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                    <PlusIcon />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="mb-4 font-semibold text-gray-700 text-lg border-b pb-3">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Search Product Name..." className={inputStyle} />
                    <input type="text" name="company" value={filters.company} onChange={handleFilterChange} placeholder="Search Company Name..." className={inputStyle} />
                    <input type="text" name="salt" value={filters.salt} onChange={handleFilterChange} placeholder="Search Salt..." className={inputStyle} />
                    <select className={inputStyle}><option>All Categories</option></select>
                </div>
                <div className="flex justify-end items-center mt-5 gap-3">
                    <button onClick={resetFilters} className="flex items-center gap-2 bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                        <ResetIcon/> Reset
                    </button>
                    <button className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200">Export</button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="p-4">S No</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Company</th>
                                <th className="p-4">Salt</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-purple-50 transition-colors duration-200">
                                        <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                                        <td className="p-4 font-semibold text-gray-800">{product.name}</td>
                                        <td className="p-4 text-gray-600">{product.type}</td>
                                        <td className="p-4 text-gray-600">{product.company}</td>
                                        <td className="p-4 text-gray-600">{product.salt || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex justify-center items-center gap-2 text-gray-600">
                                                <button className="p-2 rounded-full hover:bg-purple-100 hover:text-[#D055D5] transition-colors duration-200" title="Map Salt"><MapIcon/></button>
                                                <button className="p-2 rounded-full hover:bg-purple-100 hover:text-[#D055D5] transition-colors duration-200" title="View Details"><EyeIcon /></button>
                                                <button className="p-2 rounded-full hover:bg-purple-100 hover:text-[#D055D5] transition-colors duration-200" title="Edit Product"><PencilIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-8 text-gray-500">
                                        No products found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


// --- Main Pharmacy Component ---
function Pharmacy() {
    const [activeLink, setActiveLink] = useState('Product');

    const sidebarLinks = [
        'Salt', 'Product', 'Supplier', 'Purchase Order', 'Purchase', 'Retail',
        'Department Allocation', 'Purchase Return', 'Retail Return', 'Ipd List',
        'Indents', 'Indents Return', 'Reports', 'Expiry', 'Sales Revenue',
        'Collection', 'General', 'Cash Due', 'Credit Due', 'New Purchase',
    ];

    const renderContent = () => {
        switch (activeLink) {
            case 'Product':
                return <ProductsPage />;
            default:
                return <div className="text-center p-10"><h1 className="text-3xl font-bold text-gray-700 animate-fade-in">Welcome to {activeLink}</h1><p className="text-gray-500 mt-2">Content for this page will be displayed here.</p></div>;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-sm">
            <aside className="w-64 bg-white shadow-lg flex-shrink-0 overflow-y-auto">
                <div className="p-5 border-b sticky top-0 bg-white z-10">
                    <h1 className="text-2xl font-extrabold text-[#D055D5]">AHIS</h1>
                </div>
                <nav className="p-2">
                    <ul>
                        {sidebarLinks.map(link => (
                            <li key={link} onClick={() => setActiveLink(link)} className={`
                                relative px-4 py-3 my-1 rounded-lg cursor-pointer flex items-center gap-3 font-medium
                                transition-all duration-200
                                ${activeLink === link
                                    ? 'bg-[#D055D5] text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                {activeLink === link && <span className="absolute left-0 top-2 h-6 w-1 bg-purple-200/80 rounded-r-full"></span>}
                                <span className="pl-2">{link}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm flex-shrink-0 z-10">
                    {/* Gradient Red Banner */}
                    <div className="bg-red-500 text-white w-full text-center py- text-xs font-semibold shadow-inner">
                        <span>Invoice #N/A has been generated with due date N/A. Kindly make payment to avoid service disruption.</span>
                    </div>
                    <div className="flex justify-end items-center p-4 border-b">
                        <div className="text-right">
                            <span className="font-semibold text-gray-700 cursor-pointer">Mr. Indramani Mishra ▼</span>
                        </div>
                    </div>
                </header>

                <div className="p-6 overflow-y-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

export default Pharmacy;