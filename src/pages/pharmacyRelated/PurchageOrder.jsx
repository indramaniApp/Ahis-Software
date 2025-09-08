import React, { useState } from 'react';

// Plus icon component for the button
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Form for adding a new supplier
const AddSupplierForm = ({ onBack }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full animate-fade-in">
            {/* Form Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Add Supplier</h1>
                <button
                    onClick={onBack}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Back
                </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Supplier Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="supplier name" className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                     {/* Contact Person */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="contact person name" className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                        <input type="text" placeholder="designation" className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="mobile" className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                        <p className="text-xs text-red-500 mt-1">Contact Number Is Required!</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                        <input type="text" placeholder="code" className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    {/* Email-Id */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email-Id</label>
                        <input type="email" placeholder="email-id" className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" placeholder="location" className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" />
                    </div>
                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-white">
                            <option value="">Select State</option>
                            {/* Add state options here */}
                        </select>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Tax Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Type <span className="text-red-500">*</span></label>
                        <input type="text" defaultValue="N/A" className="w-full p-2 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    </div>
                    {/* Supplier Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Group</label>
                        <input type="text" placeholder="supplier group" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    {/* GST No. */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST No.</label>
                        <input type="text" placeholder="gstin" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    {/* PAN No. */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PAN No.</label>
                        <input type="text" placeholder="PAN no." className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                     {/* DL No. */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">DL No.</label>
                        <input type="text" placeholder="dl no" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                     {/* DL Expiry Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">DL Expiry Date</label>
                        <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                     {/* Opening Balance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Opening Balance</label>
                        <input type="text" placeholder="opening balance" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                     {/* Payment Terms */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms (In Days)</label>
                        <input type="number" placeholder="Days" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    {/* Active Checkbox */}
                    <div className="flex items-center">
                        <input id="active" type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                        <label htmlFor="active" className="ml-2 block text-sm font-medium text-gray-700">Active?</label>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            <option value="">Select Category</option>
                        </select>
                    </div>
                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            <option value="">Select Type</option>
                        </select>
                    </div>
                    {/* Notes */}
                    <div className="md:col-span-1">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea placeholder="notes" rows="3" className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                        className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md hover:bg-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};


// The main view for listing purchase orders
const PurchaseOrderView = ({ onAddClick }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full animate-fade-in">

            {/* Page Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-800">Purchase Orders</h1>
                <button 
                    onClick={onAddClick}
                    className="text-purple-600 hover:text-purple-800 transition-colors transform hover:scale-110"
                >
                    <PlusIcon />
                </button>
            </div>

            {/* Search and Filters Section */}
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Search PO ID Input */}
                    <div>
                        <label htmlFor="po-id" className="sr-only">Search PO ID</label>
                        <input
                            type="text"
                            id="po-id"
                            placeholder="search PO ID"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-base font-semibold text-gray-700">Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2 items-end">
                        {/* Supplier Dropdown */}
                        <div className="lg-col-span-1">
                            <label htmlFor="supplier" className="block text-sm font-medium text-gray-600 mb-1">Supplier</label>
                            <select
                                id="supplier"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition bg-white"
                            >
                                <option value="">Select Supplier</option>
                                {/* Add other supplier options here */}
                            </select>
                        </div>

                        {/* Search Button */}
                        <div className="lg:col-span-1">
                            <button
                                className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty State Message */}
            <div className="text-center py-20 mt-10 border-t border-gray-200">
                <p className="text-gray-500">
                    No Orders Found. <a href="#" onClick={(e) => { e.preventDefault(); onAddClick(); }} className="text-purple-600 font-semibold hover:underline">Click Here to Create One.</a>
                </p>
            </div>
        </div>
    );
}

// Main App component to manage state
export default function App() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-4">
            <div className="max-w-7xl mx-auto">
                {isFormVisible ? (
                    <AddSupplierForm onBack={() => setIsFormVisible(false)} />
                ) : (
                    <PurchaseOrderView onAddClick={() => setIsFormVisible(true)} />
                )}
            </div>
        </div>
    );
}

