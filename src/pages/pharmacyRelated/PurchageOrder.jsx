import React from 'react';

// Plus icon component for the button
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

function PurchaseOrder() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      
      {/* Page Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Purchase Orders</h1>
        <button className="text-purple-600 hover:text-purple-800 transition-colors">
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
                <div className="lg:col-span-1">
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
                        // In the screenshot it's disabled, here's an active purple button
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
          No Orders Found. <a href="#" className="text-purple-600 font-semibold hover:underline">Click Here to Create One.</a>
        </p>
      </div>

    </div>
  );
}

export default PurchaseOrder;