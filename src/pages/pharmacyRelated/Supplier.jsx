import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// --- Icon Components ---
const PlusIcon = ({ className = "h-5 w-5" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>);
const PencilIcon = ({ className = "h-4 w-4" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>);
const TrashIcon = ({ className = "h-4 w-4" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const EyeIcon = ({ className = "h-5 w-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);
const SearchIcon = ({ className = "h-5 w-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const DotsVerticalIcon = ({ className = "h-5 w-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>);
const XIcon = ({ className = "h-6 w-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

// --- Mock Data ---
const mockSuppliers = [
  { id: 1, name: 'ARHAAN HEALTHCARE', email: 'N/A', contactPerson: 'IMRAN', phone: '8171788698', location: 'N/A' },
  { id: 2, name: 'HOLY DEVINE HEALTH CARE', email: 'N/A', contactPerson: 'RISHABH', phone: '7007234733', location: 'LUCKNOW' },
  { id: 3, name: 'KATIYAR PHARMACY', email: 'N/A', contactPerson: 'SAURABH', phone: '8181813048', location: 'N/A' },
  { id: 4, name: 'BMC HEALTHCARE', email: 'N/A', contactPerson: 'DR SIDHARTH SINGH', phone: '9315276105', location: 'LUCKNOW' },
  { id: 5, name: 'GARIMA SURGICALS', email: 'N/A', contactPerson: 'SANTOSH', phone: '7007234756', location: 'AMINABAD' },
];
const mockTypes = [{id: 1, name: 'Pharma'}, {id: 2, name: 'General'}];
const mockCategories = [{id: 1, name: 'Default'}, {id: 2, name: 'Surgical'}];


function SupplierPage() {
    const [suppliers, setSuppliers] = useState(mockSuppliers);
    const [modalType, setModalType] = useState(null); // 'supplier', 'type', 'category'
    const [modalData, setModalData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState(null);
    const ITEMS_PER_PAGE = 10;
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setOpenMenuId(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const openModal = (type, data = null) => {
        setModalData(data);
        setModalType(type);
        setOpenMenuId(null);
    };
    const closeModal = () => setModalType(null);

    const handleSave = (type, data) => {
        if (type === 'supplier') {
             if (!data.name) { toast.error('Supplier Name is required.'); return; }
             if (modalData) {
                setSuppliers(suppliers.map(s => s.id === modalData.id ? { ...s, ...data } : s));
                toast.success('Supplier updated!');
            } else {
                setSuppliers([{ id: Date.now(), ...data }, ...suppliers]);
                toast.success('Supplier added!');
            }
        }
        // Logic for saving Types and Categories would go here
        if (type === 'type') toast.success('Type saved!');
        if (type === 'category') toast.success('Category saved!');
        closeModal();
    };

    const handleDeleteSupplier = (idToDelete) => {
        setOpenMenuId(null);
        toast((t) => (
             <div className="flex flex-col items-center gap-3 p-2">
                <p className="font-semibold text-gray-800">Delete this supplier?</p>
                <div className="flex gap-4">
                    <button className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-red-600"
                        onClick={() => {
                            setSuppliers(suppliers.filter(s => s.id !== idToDelete));
                            toast.dismiss(t.id);
                            toast.success('Supplier deleted!', { icon: '🗑️' });
                        }}>
                        Delete
                    </button>
                    <button className="bg-gray-200 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-300" onClick={() => toast.dismiss(t.id)}>
                        Cancel
                    </button>
                </div>
            </div>
        ), { icon: '🤔', duration: 6000 });
    };
    
    const filteredSuppliers = useMemo(() => suppliers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [suppliers, searchTerm]);

    const paginatedSuppliers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredSuppliers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredSuppliers, currentPage]);

    const totalPages = Math.ceil(filteredSuppliers.length / ITEMS_PER_PAGE);
    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    
    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-full font-sans">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
                <header className="flex justify-between items-center pb-4 border-b">
                    <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
                    <div className="flex items-center gap-2">
                        <button onClick={() => openModal('type')} className="font-semibold text-sm bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-300">Types</button>
                        <button onClick={() => openModal('category')} className="font-semibold text-sm bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-300">Categories</button>
                        <button onClick={() => openModal('supplier')} className="p-1.5 bg-[#D055D5] text-white rounded-md hover:bg-opacity-80 shadow-lg transform hover:scale-105">
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>
                </header>

                <div className="pt-4 flex items-center gap-4">
                    <div className="relative flex-grow">
                        <input type="text" placeholder="Search here e.g. supplier name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-4 pr-4 py-2.5 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D055D5]/50 focus:border-[#D055D5] transition-all"/>
                    </div>
                    <button className="bg-[#D055D5] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-opacity-80 transition-colors">Search</button>
                    <button className="bg-gray-200 text-gray-800 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors">Export</button>
                    <button className="bg-gray-200 text-gray-800 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors">Show/Hide Columns</button>
                </div>
            </div>
            
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-semibold uppercase">
                        <tr>
                            <th className="p-4 w-16">S.No</th>
                            <th className="p-4">Supplier Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Contact Person</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Location</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <AnimatePresence>
                            {paginatedSuppliers.map((supplier, index) => (
                                <motion.tr variants={itemVariants} key={supplier.id} layout className="hover:bg-[#D055D5]/10">
                                    <td className="p-4">{((currentPage - 1) * ITEMS_PER_PAGE) + index + 1}</td>
                                    <td className="p-4 font-semibold text-gray-900">{supplier.name}</td>
                                    <td className="p-4">{supplier.email}</td>
                                    <td className="p-4">{supplier.contactPerson}</td>
                                    <td className="p-4">{supplier.phone}</td>
                                    <td className="p-4">{supplier.location}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center items-center gap-2 relative" ref={openMenuId === supplier.id ? menuRef : null}>
                                            <button className="p-2 rounded-full hover:text-[#D055D5] hover:bg-[#D055D5]/10" title="View"><EyeIcon /></button>
                                            <button onClick={() => setOpenMenuId(openMenuId === supplier.id ? null : supplier.id)} className="p-2 rounded-full hover:bg-gray-200" title="More">
                                                <DotsVerticalIcon />
                                            </button>
                                            <AnimatePresence>
                                            {openMenuId === supplier.id && (
                                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                                    className="absolute right-8 top-full z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <div className="py-1">
                                                        <a href="#" onClick={(e) => { e.preventDefault(); openModal('supplier', supplier); }} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                                                            <PencilIcon className="inline mr-2" />Edit
                                                        </a>
                                                        <a href="#" onClick={(e) => { e.preventDefault(); handleDeleteSupplier(supplier.id); }} className="text-red-600 block px-4 py-2 text-sm hover:bg-gray-100">
                                                           <TrashIcon className="inline mr-2" />Delete
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                            </AnimatePresence>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {paginatedSuppliers.length === 0 && (
                    <div className="text-center p-12 text-gray-500"><h3 className="text-lg font-medium text-gray-800">No Suppliers Found</h3><p className="mt-1 text-sm">Try a different search or add a new supplier.</p></div>
                )}
            </motion.div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            
            <AnimatePresence>
                {modalType === 'supplier' && <AddEditSupplierModal modalData={modalData} onSave={(data) => handleSave('supplier', data)} onClose={closeModal} />}
                {modalType === 'type' && <GenericModal title="Supplier Type" data={mockTypes} onSave={(data) => handleSave('type', data)} onClose={closeModal} />}
                {modalType === 'category' && <GenericModal title="Supplier Category" data={mockCategories} onSave={(data) => handleSave('category', data)} onClose={closeModal} />}
            </AnimatePresence>
        </div>
    );
}

// --- Reusable Modal Components ---
function AddEditSupplierModal({ modalData, onSave, onClose }) {
    const initialFormState = { name: '', contactPerson: '', designation: '', phone: '', code: '', email: '', location: '', state: 'Uttar Pradesh', taxType: 'N/A', supplierGroup: '', gstin: '', panNo: '', dlNo: '', dlExpiry: '', openingBalance: '', paymentTerms: '', active: true, category: 'Default', type: 'Pharma', notes: '' };
    const [form, setForm] = useState(modalData || initialFormState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} 
                className="bg-white my-8 p-6 rounded-xl shadow-2xl w-full max-w-4xl">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{modalData ? 'Edit Supplier' : 'Add Supplier'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 font-bold">Back</button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                    {/* Row 1 */}
                    <div><label className="block mb-1">Supplier Name <span className="text-red-500">*</span></label><input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">Contact Person <span className="text-red-500">*</span></label><input name="contactPerson" value={form.contactPerson} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">Designation</label><input name="designation" value={form.designation} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">Phone <span className="text-red-500">*</span></label><input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    {/* Row 2 */}
                    <div><label className="block mb-1">Code</label><input name="code" value={form.code} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">Email-Id</label><input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">Location</label><input name="location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">State <span className="text-red-500">*</span></label><select name="state" value={form.state} onChange={handleChange} className="w-full p-2 border rounded-md bg-white"><option>Uttar Pradesh</option><option>Delhi</option></select></div>
                    {/* Row 3 */}
                    <div><label className="block mb-1">Tax Type <span className="text-red-500">*</span></label><select name="taxType" value={form.taxType} onChange={handleChange} className="w-full p-2 border rounded-md bg-white"><option>N/A</option><option>GST</option></select></div>
                    <div><label className="block mb-1">Supplier Group</label><input name="supplierGroup" value={form.supplierGroup} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">GST In</label><input name="gstin" value={form.gstin} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">PAN No.</label><input name="panNo" value={form.panNo} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    {/* Row 4 */}
                    <div><label className="block mb-1">DL No.</label><input name="dlNo" value={form.dlNo} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">DL Expiry Date</label><input type="date" name="dlExpiry" value={form.dlExpiry} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">Opening Balance</label><input type="number" name="openingBalance" value={form.openingBalance} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    <div><label className="block mb-1">Payment Terms (In Days)</label><input type="number" name="paymentTerms" value={form.paymentTerms} onChange={handleChange} className="w-full p-2 border rounded-md"/></div>
                    {/* Row 5 */}
                    <div className="flex items-center gap-2 pt-4"><input type="checkbox" name="active" checked={form.active} onChange={handleChange} id="activeCheck" className="h-4 w-4" /><label htmlFor="activeCheck">Active?</label></div>
                    <div className="col-span-3"></div>
                    {/* Row 6 */}
                    <div><label className="block mb-1">Category</label><select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded-md bg-white"><option>Default</option><option>Surgical</option></select></div>
                    <div><label className="block mb-1">Type</label><select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded-md bg-white"><option>Pharma</option><option>General</option></select></div>
                    <div className="col-span-2"><label className="block mb-1">Notes</label><textarea name="notes" value={form.notes} onChange={handleChange} rows="1" className="w-full p-2 border rounded-md"></textarea></div>
                    
                    <div className="flex justify-end gap-4 mt-4 pt-4 border-t col-span-4">
                        <button type="submit" className="bg-[#D055D5] text-white font-bold px-6 py-2.5 rounded-lg shadow-lg hover:bg-opacity-80">Save</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

function GenericModal({ title, data, onSave, onClose }) {
    const [name, setName] = useState('');
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-20 p-4">
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} 
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xl relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XIcon />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">{title}</h2>
                <div className="flex items-end gap-4">
                    <div className="flex-grow">
                        <label className="block text-sm mb-1 font-medium">{title.split(' ')[1]} <span className="text-red-500">*</span></label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D055D5]/50 focus:border-[#D055D5]" />
                    </div>
                    <button onClick={() => onSave({ name })} className="bg-[#D055D5] text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-opacity-80">Save</button>
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold px-6 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                </div>
                <div className="mt-4 border-t pt-2 max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-white"><tr><th className="p-2 text-left">S.No</th><th className="p-2 text-left">{title.split(' ')[1]}</th></tr></thead>
                        <tbody>
                            {data.map((item, index) => <tr key={item.id} className="border-b"><td className="p-2">{index + 1}</td><td className="p-2">{item.name}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    const pages = [...Array(totalPages).keys()].map(num => num + 1);
    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            {pages.map(page => (
                <button key={page} onClick={() => onPageChange(page)}
                    className={`h-10 w-10 rounded-lg font-semibold transition-colors ${currentPage === page ? 'bg-[#D055D5] text-white shadow-md' : 'bg-white hover:bg-gray-200'}`}>
                    {page}
                </button>
            ))}
        </div>
    );
}

export default SupplierPage;

