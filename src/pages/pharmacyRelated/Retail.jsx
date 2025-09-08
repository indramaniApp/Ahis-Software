import React from 'react';

// Icons as separate components for better readability
const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ReloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.13-6.36M20 15a9 9 0 01-14.13 6.36" />
    </svg>
);


const PrintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);


// Sample data updated to match all columns from the image
const retailData = [
  { sNo: 1, billDate: '08/09/2025 15:14:47', billId: 1761, seqId: 761, visitSeq: 622, patientName: 'SHALU SHUKLA', phone: '9935581691', doctor: 'N/A', billType: 'Direct', billTotal: '₹53.00', category: 'Cash', paymentMode: 'Credit', createdOn: '08/09/2025 15:14', createdBy: 'Mr. Pawan Singh' },
  { sNo: 2, billDate: '08/09/2025 15:07:21', billId: 1760, seqId: 248, visitSeq: 621, patientName: 'Kiran Singh', phone: '8586071381', doctor: 'N/A', billType: 'Direct', billTotal: '₹861.00', category: 'Credit', paymentMode: 'N/A', createdOn: '08/09/2025 15:08', createdBy: 'Mr. Pawan Singh' },
  { sNo: 3, billDate: '08/09/2025 14:03:55', billId: 1758, seqId: 1447, visitSeq: 620, patientName: 'Pravesh', phone: '6392587681', doctor: 'N/A', billType: 'Direct', billTotal: '₹216.00', category: 'Cash', paymentMode: 'Paytm', createdOn: '08/09/2025 14:05', createdBy: 'Mr. Pawan Singh' },
  { sNo: 4, billDate: '08/09/2025 13:57:12', billId: 1757, seqId: 1446, visitSeq: 619, patientName: 'Pravesh', phone: '6392587681', doctor: 'N/A', billType: 'Direct', billTotal: '₹138.00', category: 'Cash', paymentMode: 'Paytm', createdOn: '08/09/2025 14:01', createdBy: 'Mr. Pawan Singh' },
  { sNo: 5, billDate: '08/09/2025 14:00:14', billId: 1757, seqId: 1445, visitSeq: 618, patientName: 'ABHINAY', phone: '6386071355', doctor: 'N/A', billType: 'Direct', billTotal: '₹56.00', category: 'Cash', paymentMode: 'Paytm', createdOn: '08/09/2025 14:00', createdBy: 'Mr. Pawan Singh' },
  // Add more data as needed...
];

function Retail() {
  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
        {/* Warning Banner */}
        
        
        {/* Main Content Card */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Retail</h2>
            
            {/* Search and Filters Section */}
            <div className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <input type="text" placeholder="search name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="search phone" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="search bill id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="search seq id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="search visit seq id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="w-full sm:w-auto">
                        <label htmlFor="filters" className="sr-only">Filters</label>
                        <select id="filters" className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Filters</option>
                            {/* Add other filter options here */}
                        </select>
                    </div>
                    <button className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-md transition duration-300">
                        Search
                    </button>
                </div>
            </div>

            <hr className="my-6" />

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            {['S. No', 'Bill Date', 'Bill Id', 'Seq Id', 'Visit Seq', 'Patient Name', 'Phone', 'Doctor', 'Bill Type', 'Bill Total', 'Category', 'Payment Mode', 'Created On', 'Created By', 'Actions'].map((head) => (
                                <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {retailData.map((item) => (
                            <tr key={item.sNo} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.sNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.billDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.billId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.seqId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.visitSeq}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.patientName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.doctor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.billType}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{item.billTotal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.paymentMode}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.createdOn}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.createdBy}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-4 text-gray-500">
                                        <button className="hover:text-blue-600 transition-colors" title="View Details"><ViewIcon /></button>
                                        <button className="hover:text-green-600 transition-colors" title="Reload"><ReloadIcon /></button>
                                        <button className="hover:text-purple-600 transition-colors" title="Print Invoice"><PrintIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default Retail;