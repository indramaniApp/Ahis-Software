import React from 'react';
import { FiEye, FiEdit, FiMapPin } from 'react-icons/fi';

function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3">S No</th>
            <th scope="col" className="px-4 py-3">Name</th>
            <th scope="col" className="px-4 py-3">Type</th>
            <th scope="col" className="px-4 py-3">PU</th>
            <th scope="col" className="px-4 py-3">Company</th>
            <th scope="col" className="px-4 py-3">Salt</th>
            <th scope="col" className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
              <td className="px-4 py-3">{product.type}</td>
              <td className="px-4 py-3">{product.pu}</td>
              <td className="px-4 py-3">{product.company}</td>
              <td className="px-4 py-3">{product.salt || '-'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-4">
                  <button className="text-blue-500 hover:text-blue-700"><FiMapPin size={16} /></button>
                  <button className="text-green-500 hover:text-green-700"><FiEye size={16} /></button>
                  <button className="text-yellow-500 hover:text-yellow-700"><FiEdit size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;