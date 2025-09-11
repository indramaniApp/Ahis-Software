import React, { useState, useEffect, useRef, useMemo } from 'react';
// Zaroori Icons
import { FiEye, FiPrinter, FiPlus, FiTrash2, FiEdit, FiCopy } from 'react-icons/fi';

// LIST VIEW KE LIYE PURA DATA (Ismein koi badlav nahi)
const allPurchaseData = [];
for (let i = 1; i <= 50; i++) {
    allPurchaseData.push({
        s_no: i,
        invoice_date: `10/09/2025 20:00`,
        created_on: `10/09/2025 20:00`,
        supplier_name: `Supplier Name ${i}`,
        invoice_no: `INV-00${i}`,
        grn_no: 200 + i,
        po_id: 'N/A',
        bill_amount: `₹${(Math.random() * 5000).toFixed(2)}`,
        paid_amount: '₹0.00',
        description: `Description for item ${i}`,
        created_by: 'Mr. Pawan Singh'
    });
}


//=====================================================================
//--- 1. ADD PURCHASE FORM COMPONENT (YE COMPONENT AAPKE IMAGE KE HISAB SE BANAYA GAYA HAI) ---
//=====================================================================

// New initial item state that matches the form's table columns
const initialItem = {
    id: 1, // Will be replaced by a unique key
    product: '',
    hsn: '',
    batch: '',
    qty: '',
    schmPack: '',
    mrp: '',
    expiry: '',
    rate: '',
    sgst: '0', // Using string to allow dropdown selection
    cgst: '0',
    dis: '',
    schemeAmt: '',
    amount: 0,
};

// Helper component for the summary fields to avoid repetition
const SummaryField = ({ label, value, isTotal = false }) => (
    <div>
        <label className={`block text-sm capitalize text-gray-700 ${isTotal ? 'font-bold' : 'font-medium'}`}>{label}</label>
        <input
            type="text"
            value={`₹${(value || 0).toFixed(2)}`}
            disabled
            className={`mt-1 p-2 bg-gray-100 rounded-md w-full text-right text-sm ${isTotal ? 'font-bold' : ''}`}
        />
    </div>
);


const AddPurchaseForm = ({ onBackClick }) => {
    // State for top-level form data
    const [formData, setFormData] = useState({
        supplier: '',
        invoiceDate: '',
        invoiceNo: '',
        gstType: 'exclusive',
        enableTcs: false,
        description: '',
    });

    // State for the table items, starting with 4 empty rows as in the image
    const [items, setItems] = useState([
        {...initialItem, id: Date.now() + 1 },
        {...initialItem, id: Date.now() + 2 },
        {...initialItem, id: Date.now() + 3 },
        {...initialItem, id: Date.now() + 4 },
    ]);

    // State for the calculated summary at the bottom
    const [summary, setSummary] = useState({
        grossAmount: 0,
        discount: 0,
        sgst: 0,
        cgst: 0,
        schemeAmt: 0,
        total: 0,
    });

    // This effect recalculates the summary whenever the items change
    useEffect(() => {
        let gross = 0;
        let totalItemDiscount = 0;
        let totalSgst = 0;
        let totalCgst = 0;
        let totalScheme = 0;

        items.forEach(item => {
            const qty = parseFloat(item.qty) || 0;
            const rate = parseFloat(item.rate) || 0;
            const disPercent = parseFloat(item.dis) || 0;

            const baseAmount = qty * rate;
            const discountValue = baseAmount * (disPercent / 100);
            const amountAfterDiscount = baseAmount - discountValue;

            gross += amountAfterDiscount;
            totalItemDiscount += discountValue;
            totalSgst += amountAfterDiscount * (parseFloat(item.sgst) / 100);
            totalCgst += amountAfterDiscount * (parseFloat(item.cgst) / 100);
            totalScheme += parseFloat(item.schemeAmt) || 0;
        });

        const finalTotal = gross + totalSgst + totalCgst;

        setSummary({
            grossAmount: gross,
            discount: totalItemDiscount,
            sgst: totalSgst,
            cgst: totalCgst,
            schemeAmt: totalScheme,
            total: finalTotal,
        });

    }, [items]);

    // Handles changes in the top-level form fields
    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handles changes within the items table
    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...items];

        // Update the specific field for the item
        newItems[index][name] = value;

        // Recalculate the 'amount' for the current row immediately
        const qty = parseFloat(newItems[index].qty) || 0;
        const rate = parseFloat(newItems[index].rate) || 0;
        const disPercent = parseFloat(newItems[index].dis) || 0;
        newItems[index].amount = (qty * rate) * (1 - disPercent / 100);

        setItems(newItems);
    };

    const handleSave = () => {
        console.log("Saving Data:", { formData, items, summary });
        alert("Data saved! Check the console for details.");
    };

    // Options for GST dropdowns. Can be expanded.
    const gstOptions = [0, 5, 12, 18, 28];

    return (
        <div className="bg-white border border-gray-200 rounded-md p-4 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 mb-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Add Purchase</h2>
                <button onClick={onBackClick} className="text-sm font-medium text-gray-700 hover:text-blue-600">Back</button>
            </div>

            {/* Top Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-4 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Supplier <span className="text-red-500">*</span></label>
                    <select name="supplier" value={formData.supplier} onChange={handleFormChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                        <option value="">Select Supplier</option>
                        <option value="supplier1">HealthKare Distributors</option>
                        <option value="supplier2">PharmaPlus Inc.</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Invoice Date <span className="text-red-500">*</span></label>
                    <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleFormChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Invoice No <span className="text-red-500">*</span></label>
                    <input type="text" name="invoiceNo" placeholder="invoice no." value={formData.invoiceNo} onChange={handleFormChange} className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
                </div>
                <div className="flex items-center justify-start space-x-4">
                    <div className="flex items-center gap-4 text-sm">
                        <label className="flex items-center"><input type="radio" name="gstType" value="inclusive" checked={formData.gstType === 'inclusive'} onChange={handleFormChange} className="mr-1"/> GST Inclusive</label>
                        <label className="flex items-center"><input type="radio" name="gstType" value="exclusive" checked={formData.gstType === 'exclusive'} onChange={handleFormChange} className="mr-1"/> GST Exclusive</label>
                    </div>
                     <label className="flex items-center text-sm"><input type="checkbox" name="enableTcs" checked={formData.enableTcs} onChange={handleFormChange} className="mr-1"/> Enable TCS</label>
                </div>
            </div>

            {/* Upload Button */}
            <div className="mb-4">
                <button className="bg-blue-500 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-600">Upload Files</button>
            </div>

            {/* Items Table */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Add Items</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                {['S No.', 'Product', 'HSN', 'Batch', 'Qty', 'Schm Pack', 'Mrp', 'Expiry', 'Rate', 'Sgst(%)', 'Cgst(%)', 'Dis(%)', 'Scheme Amt', 'Amount'].map(header => (
                                    <th key={header} className="p-2 text-left text-xs font-semibold text-gray-600 border border-gray-200">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="p-1 border border-gray-200 w-12"><input type="text" value={index + 1} readOnly className="p-1 w-full text-center bg-gray-100 rounded-sm"/></td>
                                    <td className="p-1 border border-gray-200 w-48"><select name="product" value={item.product} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm"><option value="">Search Product</option><option value="prod1">Paracetamol 500mg</option><option value="prod2">Aspirin 75mg</option></select></td>
                                    <td className="p-1 border border-gray-200 w-24"><input name="hsn" value={item.hsn} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm"/></td>
                                    <td className="p-1 border border-gray-200 w-24"><input name="batch" value={item.batch} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm"/></td>
                                    <td className="p-1 border border-gray-200 w-20"><input name="qty" type="number" placeholder="0" value={item.qty} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm text-right"/></td>
                                    <td className="p-1 border border-gray-200 w-20"><input name="schmPack" type="number" placeholder="0" value={item.schmPack} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm text-right"/></td>
                                    <td className="p-1 border border-gray-200 w-20"><input name="mrp" type="number" placeholder="0" value={item.mrp} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm text-right"/></td>
                                    <td className="p-1 border border-gray-200 w-28"><input name="expiry" type="date" value={item.expiry} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm"/></td>
                                    <td className="p-1 border border-gray-200 w-20"><input name="rate" type="number" placeholder="0" value={item.rate} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm text-right"/></td>
                                    <td className="p-1 border border-gray-200 w-20"><select name="sgst" value={item.sgst} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm">{gstOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></td>
                                    <td className="p-1 border border-gray-200 w-20"><select name="cgst" value={item.cgst} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm">{gstOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></td>
                                    <td className="p-1 border border-gray-200 w-20"><input name="dis" type="number" placeholder="0" value={item.dis} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm text-right"/></td>
                                    <td className="p-1 border border-gray-200 w-24"><input name="schemeAmt" type="number" placeholder="0" value={item.schemeAmt} onChange={e => handleItemChange(index, e)} className="p-1 w-full border-gray-300 rounded-sm text-right"/></td>
                                    <td className="p-1 border border-gray-200 w-24"><input value={item.amount.toFixed(2)} readOnly className="p-1 w-full bg-gray-100 text-right rounded-sm"/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full md:w-1/3">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" placeholder="description" rows="4" value={formData.description} onChange={handleFormChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm"></textarea>
                </div>
                <div className="w-full md:w-2/3 flex flex-col items-end">
                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4 w-full">
                        <SummaryField label="gross amount" value={summary.grossAmount} />
                        <SummaryField label="discount" value={summary.discount} />
                        <SummaryField label="sgst" value={summary.sgst} />
                        <SummaryField label="cgst" value={summary.cgst} />
                        <SummaryField label="scheme amt" value={summary.schemeAmt} />
                        <SummaryField label="total" value={summary.total} isTotal={true} />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => console.log("Getting Rates...")} className="py-2 px-6 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 text-sm">Get Rates</button>
                        <button onClick={handleSave} className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 text-sm">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


//==============================================================
//--- 2. NAYA MULTI-SELECT DROPDOWN COMPONENT (Ismein koi badlav nahi) ---
//==============================================================
const MultiSelectDropdown = ({ options, selectedOptions, onChange, placeholder = "Select Options" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    useEffect(() => { const handleClickOutside = (event) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { setIsOpen(false); } }; document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, []);
    const handleSelect = (option) => { let newSelectedOptions; if (selectedOptions.includes(option)) { newSelectedOptions = selectedOptions.filter(o => o !== option); } else { newSelectedOptions = [...selectedOptions, option]; } onChange(newSelectedOptions); };
    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()) );
    const handleSelectAll = () => { if (selectedOptions.length === filteredOptions.length) { onChange([]); } else { onChange(filteredOptions); } };
    return (
        <div className="relative w-full flex-1" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 border border-gray-300 rounded-md text-sm w-full bg-white text-left flex justify-between items-center" >
                <span className="text-gray-700">{selectedOptions.length > 0 ? `${selectedOptions.length} selected` : placeholder}</span><span className="text-gray-500">▼</span>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="p-2"><input type="text" placeholder="Search..." className="w-full p-2 border border-gray-300 rounded-md text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                    <div className="p-2 border-b border-gray-200"><label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={selectedOptions.length === filteredOptions.length && filteredOptions.length > 0} onChange={handleSelectAll} className="form-checkbox h-4 w-4 text-indigo-600" /><span className="text-sm font-medium text-gray-800">Select All</span></label></div>
                    <ul className="max-h-60 overflow-y-auto p-2">{filteredOptions.map(option => (<li key={option} className="hover:bg-gray-100 rounded-md"><label className="flex items-center space-x-2 p-2 cursor-pointer"><input type="checkbox" checked={selectedOptions.includes(option)} onChange={() => handleSelect(option)} className="form-checkbox h-4 w-4 text-indigo-600" /><span className="text-sm text-gray-700">{option}</span></label></li>))}</ul>
                </div>
            )}
        </div>
    );
};


//==============================================================
//--- 3. Main "Purchase" Component (Ismein koi badlav nahi) ---
//==============================================================
function Purchase() {
    const [showAddForm, setShowAddForm] = useState(false); // Set to true to see the form by default
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
   
    // NAYE STATES FILTER KE LIYE
    const [grnSearch, setGrnSearch] = useState('');
    const [invoiceSearch, setInvoiceSearch] = useState('');
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);

    const allSuppliers = useMemo(() =>
        [...new Set(allPurchaseData.map(item => item.supplier_name))],
        []
    );

    // FILTERED DATA LOGIC
    const filteredData = useMemo(() => {
        return allPurchaseData.filter(item => {
            const matchesGrn = item.grn_no.toString().includes(grnSearch);
            const matchesInvoice = item.invoice_no.toLowerCase().includes(invoiceSearch.toLowerCase());
            const matchesSupplier = selectedSuppliers.length === 0 || selectedSuppliers.includes(item.supplier_name);
            return matchesGrn && matchesInvoice && matchesSupplier;
        });
    }, [grnSearch, invoiceSearch, selectedSuppliers]);

    // FILTER BADALNE PAR PAGE 1 PAR RESET KARNA
    useEffect(() => {
        setCurrentPage(1);
    }, [grnSearch, invoiceSearch, selectedSuppliers]);

    // PAGINATION AB FILTERED DATA PAR KAAM KAREGA
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-3 bg-gray-100 font-sans min-h-screen">
            {showAddForm ? (
                <AddPurchaseForm onBackClick={() => setShowAddForm(false)} />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold text-gray-800">Purchases</h2>
                        <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-2xl shadow-md flex-shrink-0" title="Add New Purchase">
                            <FiPlus />
                        </button>
                    </div>
                   
                    {/* --- Filters Card --- */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            {/* INPUTS KO STATE SE BIND KIYA GAYA */}
                            <input type="text" placeholder="search GRN no." className="p-2 border border-gray-300 rounded-md text-sm w-full flex-1" value={grnSearch} onChange={(e) => setGrnSearch(e.target.value)} />
                            <input type="text" placeholder="search Invoice no" className="p-2 border border-gray-300 rounded-md text-sm w-full flex-1" value={invoiceSearch} onChange={(e) => setInvoiceSearch(e.target.value)} />
                        </div>
                        <div className="font-semibold text-base mb-2.5 text-gray-700">Filters</div>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            {/* NAYA FILTER COMPONENT */}
                            <MultiSelectDropdown
                                options={allSuppliers}
                                selectedOptions={selectedSuppliers}
                                onChange={setSelectedSuppliers}
                                placeholder="Select/Search Supplier Name"
                            />
                            <button className="py-2 px-5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-md font-semibold text-sm flex-shrink-0 w-full sm:w-auto">Search</button>
                        </div>
                    </div>

                    {/* --- Table Card --- */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200 font-semibold text-base text-gray-800">Purchases</div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm table-fixed">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[5%]">S No</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[10%]">Invoice Date</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[10%]">Created On</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[15%]">Supplier Name</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[10%]">Invoice No</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[8%]">GRN No.</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[6%]">PO ID</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[9%]">Bill Amt</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[9%]">Paid Amt</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[8%]">Desc</th>
                                        <th className="p-2 text-left font-semibold text-gray-600 w-[10%]">Created By</th>
                                        <th className="p-2 text-center font-semibold text-gray-600 w-[10%]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {currentItems.map((item) => (
                                        <tr key={item.s_no} className="hover:bg-gray-50">
                                            <td className="p-3 truncate">{item.s_no}</td>
                                            <td className="p-3 truncate">{item.invoice_date}</td>
                                            <td className="p-3 truncate">{item.created_on}</td>
                                            <td className="p-3 truncate" title={item.supplier_name}>{item.supplier_name}</td>
                                            <td className="p-3 truncate" title={item.invoice_no}>{item.invoice_no}</td>
                                            <td className="p-3 truncate">{item.grn_no}</td>
                                            <td className="p-3 truncate">{item.po_id}</td>
                                            <td className="p-3 truncate">{item.bill_amount}</td>
                                            <td className="p-3 truncate">{item.paid_amount}</td>
                                            <td className="p-3 truncate" title={item.description}>{item.description || '-'}</td>
                                            <td className="p-3 truncate" title={item.created_by}>{item.created_by}</td>
                                            <td className="p-3">
                                                <div className="flex gap-1 items-center justify-center">
                                                    <FiEye className="cursor-pointer text-gray-600 hover:text-blue-600" title="View" />
                                                    <FiEdit className="cursor-pointer text-gray-600 hover:text-yellow-600" title="Edit" />
                                                    <FiPrinter className="cursor-pointer text-gray-600 hover:text-green-600" title="Print" />
                                                    <FiCopy className="cursor-pointer text-gray-600 hover:text-purple-600" title="Copy" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                   
                    {/* --- DYNAMIC PAGINATION --- */}
                    <div className="flex justify-end items-center py-5 gap-2">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="border border-gray-300 bg-white py-1.5 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" >&lt;</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                            <button key={number} onClick={() => paginate(number)} className={`py-1.5 px-3 rounded-md text-sm font-medium ${currentPage === number ? 'border border-indigo-700 bg-indigo-700 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`} >{number}</button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="border border-gray-300 bg-white py-1.5 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" >&gt;</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Purchase;