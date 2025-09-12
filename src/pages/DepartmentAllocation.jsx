import React from 'react';
// Icons import karna na bhoolein
import { FaPrint, FaEye, FaSync, FaTrash } from 'react-icons/fa';

// Sample data to populate the table, aap isko API se fetch karenge real application mein
const allocationData = [
  { sNo: 1, billId: 1723, indentId: 'N/A', seqId: 65, deptName: 'Emergency Ward', name: 'GENERAL CONSUMPTION', issueDate: '2025/09/04 15:36:47', total: 885.45, returnAmount: 0.00, finalAmount: 885.45, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 2, billId: 1680, indentId: 'N/A', seqId: 64, deptName: 'OT', name: 'GENERAL CONSUMPTION', issueDate: '2025/09/01 12:27:12', total: 140.14, returnAmount: 0.00, finalAmount: 140.14, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 3, billId: 1679, indentId: 'N/A', seqId: 63, deptName: 'Emergency Ward', name: 'GENERAL CONSUMPTION', issueDate: '2025/09/01 12:26:42', total: 44.66, returnAmount: 0.00, finalAmount: 44.66, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 4, billId: 1617, indentId: 'N/A', seqId: 62, deptName: 'Emergency Ward', name: 'GENERAL CONSUMPTION', issueDate: '2025/08/29 15:15:40', total: 388.08, returnAmount: 0.00, finalAmount: 388.08, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 5, billId: 1603, indentId: 'N/A', seqId: 61, deptName: 'General Ward', name: 'GENERAL CONSUMPTION', issueDate: '2025/08/28 21:04:16', total: 227.82, returnAmount: 0.00, finalAmount: 227.82, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 6, billId: 1528, indentId: 'N/A', seqId: 60, deptName: 'General Ward', name: 'GENERAL CONSUMPTION', issueDate: '2025/08/25 15:01:46', total: 382.80, returnAmount: 0.00, finalAmount: 382.80, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 7, billId: 1527, indentId: 'N/A', seqId: 59, deptName: 'ICU', name: 'GENERAL CONSUMPTION', issueDate: '2025/08/25 15:01:18', total: 637.45, returnAmount: 0.00, finalAmount: 637.45, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 8, billId: 1495, indentId: 'N/A', seqId: 58, deptName: 'Emergency Ward', name: 'N/A', issueDate: '2025/08/23 17:21:29', total: 348.66, returnAmount: 0.00, finalAmount: 348.66, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 9, billId: 1475, indentId: 'N/A', seqId: 57, deptName: 'Emergency Ward', name: 'EMERGENCY INVENTORY', issueDate: '2025/08/22 00:00:00', total: 144.14, returnAmount: 0.00, finalAmount: 144.14, issuedBy: 'Mr. Pawan Singh' },
  { sNo: 10, billId: 1338, indentId: 'N/A', seqId: 56, deptName: 'Emergency Ward', name: 'EMERGENCY INVENTORY', issueDate: '2025/08/16 18:49:58', total: 790.97, returnAmount: 0.00, finalAmount: 790.97, issuedBy: 'Mr. Pawan Singh' },
];

function DepartmentAllocation() {
  return (
    <div className="bg-gray-100 p-6 font-sans">
      <div className="bg-white rounded-lg shadow-md p-6">
        
        {/* ## Header Section */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">Departmental Allocation</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            View Stock Per Department
          </button>
        </div>

        {/* ## Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search bill ID"
            className="col-span-1 md:col-span-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="col-span-1 md:col-span-2 border rounded-md px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select/Search Department</option>
            <option value="emergency">Emergency Ward</option>
            <option value="ot">OT</option>
            <option value="general">General Ward</option>
            <option value="icu">ICU</option>
          </select>
          <button className="col-span-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Search
          </button>
        </div>

        {/* ## Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                {['S No.', 'Bill Id', 'Indent Id', 'Seq Id', 'Department Name', 'Name', 'Issue Date', 'Total', 'Return Amount', 'Final Amount', 'Issued By', ''].map(head => (
                  <th key={head} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allocationData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.sNo}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.billId}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.indentId}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.seqId}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.deptName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.issueDate}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">₹{row.total.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">₹{row.returnAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">₹{row.finalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{row.issuedBy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800"><FaPrint /></button>
                      <button className="text-green-600 hover:text-green-800"><FaEye /></button>
                      <button className="text-gray-500 hover:text-gray-700"><FaSync /></button> {/* Using a different icon for the 3rd button */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ## Pagination Section */}
        <div className="flex justify-end items-center mt-6">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              &laquo;
            </a>
            <a href="#" aria-current="page" className="relative z-10 inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600">
              1
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              7
            </a>
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              &raquo;
            </a>
          </nav>
        </div>

      </div>
    </div>
  );
}

export default DepartmentAllocation;