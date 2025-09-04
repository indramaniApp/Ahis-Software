// src/pages/pharmacy_pages/SaltPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// --- Icon Components ---
const PlusIcon = ({ className = "h-5 w-5" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>);
const PencilIcon = ({ className = "h-5 w-5" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>);
const TrashIcon = ({ className = "h-5 w-5" }) => ( <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const SearchIcon = ({ className = "h-5 w-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const PillIcon = ({ className = "h-8 w-8" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m3 1v5.25c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125V10.5M12 15V9" /></svg>);


function SaltPage() {
    const [salts, setSalts] = useState([ { id: 1, name: 'Metronidazole (500mg)' }, { id: 2, name: 'Povidone Iodine (4% W/V)' }, { id: 3, name: 'Flunarizine (10mg)' }, { id: 4, name: 'Propranolol (40mg)' }, { id: 5, name: 'Lactobacillus Sporogenes (60Million Spores)' }, { id: 6, name: 'Clavulanic Acid (125mg)' }, { id: 7, name: 'Amoxycillin (500mg)' }, { id: 8, name: 'Phenylephrine (5mg/5ml)' }, { id: 9, name: 'Chlorpheniramine Maleate (2mg/5ml)' }, { id: 10, name: 'Voglibose (0.2mg)' }, { id: 11, name: 'Oxcarbazepine (450mg)' }, { id: 12, name: 'Lamotrigine (400mg)' }, { id: 13, name: 'Magnesium Sulphate (50mg)' }, { id: 14, name: 'Calcium Carbonate (200mg)' }, { id: 15, name: 'Vitamin K2-7 (50mcg)' }, { id: 16, name: 'Piroxicam (20mg)' }, { id: 17, name: 'Metoprolol Tartrate (1mg)' }, { id: 18, name: 'Adrenaline (1mg)' } ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null); // Used for both Add and Edit
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // --- Modal Logic ---
    const openModal = (salt = null) => {
        setModalData(salt); // If salt is null, it's 'Add' mode. Otherwise, 'Edit' mode.
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);
    
    // --- CRUD Logic with Toasts ---
    const handleSaveSalt = (saltName) => {
        if (saltName.trim() === '') {
            toast.error('Salt name cannot be empty.');
            return;
        }

        if (modalData) { // Edit Mode
            setSalts(salts.map(s => s.id === modalData.id ? { ...s, name: saltName } : s));
            toast.success('Salt updated successfully!');
        } else { // Add Mode
            setSalts([{ id: Date.now(), name: saltName }, ...salts]);
            toast.success('Salt added successfully!');
        }
        closeModal();
    };

    const handleDeleteSalt = (idToDelete) => {
        toast((t) => (
            <div className="flex flex-col items-center gap-3">
                <p className="font-semibold">Are you sure you want to delete this?</p>
                <div className="flex gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-1 rounded-md text-sm"
                        onClick={() => {
                            setSalts(salts.filter(salt => salt.id !== idToDelete));
                            toast.dismiss(t.id);
                            toast.success('Salt deleted!');
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-200 px-4 py-1 rounded-md text-sm"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { icon: '🤔' });
    };

    // --- Filtering and Pagination Logic ---
    const filteredSalts = useMemo(() => salts.filter(salt =>
        salt.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [salts, searchTerm]);

    const paginatedSalts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredSalts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredSalts, currentPage]);

    const totalPages = Math.ceil(filteredSalts.length / ITEMS_PER_PAGE);
    
    // Reset to page 1 when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // --- Framer Motion Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-full font-sans transition-colors duration-300">
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <PillIcon className="h-8 w-8 text-[#D055D5]" />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Salts Management</h1>
                </div>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-[#D055D5] text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-lg transform hover:scale-105"><PlusIcon /><span className="hidden sm:inline">Add Salt</span></button>
            </header>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-6 relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className="text-gray-400" /></div><input type="text" placeholder="Search by salt name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D055D5]/50 focus:border-[#D055D5] transition-all bg-white dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"/></div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full text-sm text-left"><thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold uppercase"><tr><th className="p-4 w-16">S No</th><th className="p-4">Name</th><th className="p-4 text-center w-32">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                            {paginatedSalts.length > 0 ? paginatedSalts.map((salt, index) => (
                                <motion.tr variants={itemVariants} key={salt.id} layout className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{((currentPage - 1) * ITEMS_PER_PAGE) + index + 1}</td>
                                    <td className="p-4 font-semibold text-gray-900 dark:text-white">{salt.name}</td>
                                    <td className="p-4"><div className="flex justify-center items-center gap-3"><button onClick={() => openModal(salt)} className="p-2 rounded-full text-gray-500 hover:text-[#D055D5] hover:bg-purple-100 dark:hover:bg-gray-600 transform transition hover:scale-125" title="Edit Salt"><PencilIcon /></button><button onClick={() => handleDeleteSalt(salt.id)} className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 transform transition hover:scale-125" title="Delete Salt"><TrashIcon /></button></div></td>
                                </motion.tr>
                            )) : null}
                        </AnimatePresence>
                    </tbody>
                </table>
                 {paginatedSalts.length === 0 && (
                    <div className="text-center p-12 text-gray-500 dark:text-gray-400">
                         <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Salts Found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add a new salt.</p>
                        <div className="mt-6"><button onClick={() => openModal()} className="flex mx-auto items-center gap-2 bg-[#D055D5] text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all shadow-lg transform hover:scale-105"><PlusIcon />Add New Salt</button></div>
                    </div>
                 )}
            </motion.div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

            <AnimatePresence>
                {isModalOpen && <AddEditSaltModal modalData={modalData} onSave={handleSaveSalt} onClose={closeModal} />}
            </AnimatePresence>
        </div>
    );
}

// Reusable Modal Component
function AddEditSaltModal({ modalData, onSave, onClose }) {
    const [name, setName] = useState(modalData?.name || '');
    const isEditMode = !!modalData;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(name);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b dark:border-gray-700 pb-3">{isEditMode ? 'Edit Salt' : 'Add New Salt'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="saltName" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Salt Name <span className="text-red-500">*</span></label>
                        <input id="saltName" type="text" placeholder="e.g., Paracetamol (500mg)" value={name} onChange={(e) => setName(e.target.value)} autoFocus className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#D055D5] focus:ring-2 focus:ring-[#D055D5]/50"/>
                    </div>
                    <div className="flex justify-end gap-4 mt-6 pt-4 border-t dark:border-gray-700">
                        <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold px-6 py-2.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all shadow-sm transform hover:-translate-y-0.5">Cancel</button>
                        <button type="submit" className="bg-[#D055D5] text-white font-bold px-6 py-2.5 rounded-lg shadow-lg hover:bg-opacity-80 transition-all transform hover:-translate-y-0.5">Save</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

// Reusable Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);
    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`h-10 w-10 rounded-lg font-semibold transition-colors ${currentPage === page ? 'bg-[#D055D5] text-white shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default SaltPage;

