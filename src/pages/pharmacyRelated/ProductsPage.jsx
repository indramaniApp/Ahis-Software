import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// --- Icon Components ---
const PlusIcon = ({ className = "h-5 w-5" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>);
const PencilIcon = ({ className = "h-4 w-4" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>);
const TrashIcon = ({ className = "h-4 w-4" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const SearchIcon = ({ className = "h-5 w-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const BoxIcon = ({ className = "h-8 w-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 8.25h3M12 3v5.25" /></svg>);

// --- Mock Data ---
const mockProducts = [
    { id: 1, name: 'KRPL Metrogyl 100ml', type: 'Infusion', pu: 1, company: 'Kunal Remedies Pvt Ltd', salt: 'Metronidazole (500mg)' },
    { id: 2, name: 'Betadine Solution', type: 'Solution', pu: 1, company: 'Win-Medicare Pvt Ltd', salt: 'Povidone Iodine (4% W/V)' },
    { id: 3, name: 'Gauze Than - 400gram (Life Med)', type: 'Consumables', pu: 1, company: 'Other', salt: 'N/A' },
    { id: 4, name: 'Zinepra 10 Tablet SR', type: 'Tablet', pu: 10, company: 'La Renon Healthcare', salt: 'Propranolol, Flunarizine' },
    { id: 5, name: 'Tynor Walker Aluminium', type: 'Supporter', pu: 1, company: 'Tynor Orthotics Pvt. Ltd.', salt: 'N/A' },
    { id: 6, name: 'Iprasun Respules', type: 'Inhalation', pu: 1, company: 'Sunford Healthcare', salt: 'Ipratropium Bromide' },
];

function ProductsPage() {
    const [products, setProducts] = useState(mockProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null); // For Add/Edit
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    // --- Modal Logic ---
    const openModal = (product = null) => {
        setModalData(product);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    // --- CRUD Logic ---
    const handleSaveProduct = (productData) => {
        if (modalData) { // Edit Mode
            setProducts(products.map(p => p.id === modalData.id ? { ...p, ...productData } : p));
            toast.success('Product updated successfully!');
        } else { // Add Mode
            setProducts([{ id: Date.now(), ...productData }, ...products]);
            toast.success('Product added successfully!');
        }
        closeModal();
    };

    const handleDeleteProduct = (idToDelete) => {
        toast((t) => (
            <div className="flex flex-col items-center gap-3 p-2">
                <p className="font-semibold text-gray-800">Are you sure you want to delete?</p>
                <div className="flex gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-600"
                        onClick={() => {
                            setProducts(products.filter(p => p.id !== idToDelete));
                            toast.dismiss(t.id);
                            toast.success('Product deleted!', { icon: '🗑️' });
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-200 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-300"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { icon: '🤔', duration: 6000 });
    };

    // --- Filtering & Pagination ---
    const filteredProducts = useMemo(() => products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.salt.toLowerCase().includes(searchTerm.toLowerCase())
    ), [products, searchTerm]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    // --- Animation Variants ---
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-full font-sans">
            <Toaster position="top-center" reverseOrder={false} />

            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <BoxIcon className="h-8 w-8 text-[#D055D5]" />
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                </div>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#D055D5] text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg transform hover:scale-105">
                    <PlusIcon /><span className="hidden sm:inline">Add Product</span>
                </button>
            </header>

            <div className="bg-white p-4 rounded-xl shadow-lg mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="text-gray-400" />
                </div>
                <input type="text" placeholder="Search by name, company, or salt..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D055D5]/50 focus:border-[#D055D5] transition-all bg-white"/>
            </div>
            
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-semibold uppercase">
                        <tr>
                            <th className="p-4 w-16">S.No</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Company</th>
                            <th className="p-4">Salt</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <AnimatePresence>
                            {paginatedProducts.length > 0 ? paginatedProducts.map((product, index) => (
                                <motion.tr variants={itemVariants} key={product.id} layout className="hover:bg-[#D055D5]/10">
                                    <td className="p-4 font-medium text-gray-700">{((currentPage - 1) * ITEMS_PER_PAGE) + index + 1}</td>
                                    <td className="p-4">
                                        <div className="font-semibold text-gray-900">{product.name}</div>
                                        <div className="text-xs text-gray-500">{product.type} | PU: {product.pu}</div>
                                    </td>
                                    <td className="p-4 text-gray-600">{product.company}</td>
                                    <td className="p-4 text-gray-600">{product.salt}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center items-center gap-3">
                                            <button onClick={() => openModal(product)} className="p-2 rounded-full text-gray-500 hover:text-[#D055D5] hover:bg-purple-100 transform transition hover:scale-125" title="Edit Product"><PencilIcon /></button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-100 transform transition hover:scale-125" title="Delete Product"><TrashIcon /></button>
                                        </div>
                                    </td>
                                </motion.tr>
                            )) : null}
                        </AnimatePresence>
                    </tbody>
                </table>
                 {paginatedProducts.length === 0 && (
                    <div className="text-center p-12 text-gray-500">
                        <h3 className="mt-2 text-lg font-medium text-gray-800">No Products Found</h3>
                        <p className="mt-1 text-sm">Try adjusting your search or add a new product.</p>
                    </div>
                 )}
            </motion.div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            
            <AnimatePresence>
                {isModalOpen && <AddEditProductModal modalData={modalData} onSave={handleSaveProduct} onClose={closeModal} />}
            </AnimatePresence>
        </div>
    );
}


function AddEditProductModal({ modalData, onSave, onClose }) {
    const initialFormState = {
        name: '', type: '', category: '', packingUnits: '',
        hsnCode: '', rackNo: '', minimum: '', maximum: '',
        packing: '', manufacturer: '', gst: '', roq: '',
        measurable: false
    };

    const [product, setProduct] = useState(modalData || initialFormState);
    const [errors, setErrors] = useState({});
    const isEditMode = !!modalData;

    const validate = () => {
        const newErrors = {};
        if (!product.name) newErrors.name = 'Product Name is Required';
        if (!product.type) newErrors.type = 'Type is Required';
        if (!product.packingUnits) newErrors.packingUnits = 'Packing Units is Required';
        if (!product.packing) newErrors.packing = 'Packing is Required';
        if (!product.manufacturer) newErrors.manufacturer = 'Manufacturer is Required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(product);
        } else {
            toast.error('Please fill all required fields.');
        }
    };

    const FormField = ({ label, name, value, onChange, error, required = false, children, ...props }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input id={name} name={name} value={value} onChange={onChange} {...props} className={`w-full p-2.5 border rounded-lg focus:ring-2 transition-colors ${error ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-[#D055D5]/50 focus:border-[#D055D5]'}`}/>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start p-4 overflow-y-auto">
            <motion.div 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -30 }} 
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-4xl my-8"
            >
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h2 className="text-2xl font-bold text-gray-900">{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
                    <button onClick={onClose} className="text-gray-600 font-semibold hover:text-gray-800">Back</button>
                </div>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
                    <FormField label="Name" name="name" value={product.name} onChange={handleChange} error={errors.name} required placeholder="Product Name"/>
                    <FormField label="Type" name="type" value={product.type} onChange={handleChange} error={errors.type} required placeholder="e.g., Tablet, Syrup"/>
                    <FormField label="Category" name="category" value={product.category} onChange={handleChange} placeholder="Product Category"/>
                    <FormField label="Packing Units" name="packingUnits" value={product.packingUnits} onChange={handleChange} error={errors.packingUnits} required placeholder="e.g., 10"/>
                    
                    <FormField label="HSN Code" name="hsnCode" value={product.hsnCode} onChange={handleChange} placeholder="HSN Code"/>
                    <FormField label="Rack No" name="rackNo" value={product.rackNo} onChange={handleChange} placeholder="Rack Number"/>
                    <FormField label="Minimum" name="minimum" type="number" value={product.minimum} onChange={handleChange} placeholder="Minimum stock"/>
                    <FormField label="Maximum" name="maximum" type="number" value={product.maximum} onChange={handleChange} placeholder="Maximum stock"/>

                    <FormField label="Packing" name="packing" value={product.packing} onChange={handleChange} error={errors.packing} required placeholder="e.g., Strip"/>
                    <FormField label="Manufacturer" name="manufacturer" value={product.manufacturer} onChange={handleChange} error={errors.manufacturer} required placeholder="Manufacturer Name"/>
                    <FormField label="GST" name="gst" type="number" value={product.gst} onChange={handleChange} placeholder="GST %"/>
                    <FormField label="ROQ" name="roq" type="number" value={product.roq} onChange={handleChange} placeholder="Re-order quantity"/>

                    <div className="md:col-span-4 flex items-center gap-3 mt-2">
                        <input type="checkbox" id="measurable" name="measurable" checked={product.measurable} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-[#D055D5] focus:ring-[#D055D5]/50"/>
                        <label htmlFor="measurable" className="text-sm font-medium text-gray-700">Measurable</label>
                    </div>

                    <div className="flex justify-end gap-4 mt-6 pt-4 border-t md:col-span-4">
                        <button type="submit" className="bg-[#D055D5] text-white font-bold px-8 py-2.5 rounded-lg shadow-lg hover:bg-opacity-80 transition-all transform hover:-translate-y-0.5">Save</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

// --- Reusable Pagination Component ---
function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);
    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`h-10 w-10 rounded-lg font-semibold transition-colors ${currentPage === page ? 'bg-[#D055D5] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default ProductsPage;

