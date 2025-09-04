import React from 'react';

function ProductFilters({ filters, onFilterChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-6">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={onFilterChange}
        placeholder="Search product name"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="company"
        value={filters.company}
        onChange={onFilterChange}
        placeholder="Search company name"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="salt"
        value={filters.salt}
        onChange={onFilterChange}
        placeholder="Search salt"
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2 lg:col-start-5">
        <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
          Export
        </button>
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Search
        </button>
      </div>
    </div>
  );
}

export default ProductFilters;