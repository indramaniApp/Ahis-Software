import React, { useState, useMemo } from 'react';
// Note: Make sure the path to icons is correct based on your folder structure
import { PlusIcon, PencilIcon, TrashIcon } from '../component/icons'

const SaltPage = () => {
    const saltData = useMemo(() => [
        { id: 1, name: 'Metronidazole (500mg)' },
        { id: 2, name: 'Povidone Iodine (4% W/V)' },
        { id: 3, name: 'Flunarizine (10mg)' },
        { id: 4, name: 'Propranolol (40mg)' },
    ], []);

    const [salts, setSalts] = useState(saltData);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSalts = salts.filter(salt =>
        salt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // This component should ONLY return the content for the salt page.
    // DO NOT wrap it in <PharmacyLayout>.
    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Salts</h2>
                <button className="flex items-center gap-2 bg-[#D055D5] text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                    <PlusIcon />
                    <span>Add Salt</span>
                </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
                 <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search salt name..."
                        className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-[#D055D5]/50 focus:border-[#D055D5] transition-shadow duration-200"
                    />
                    <button className="bg-blue-600 text-white font-bold px-8 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200">
                        Search
                    </button>
                </div>
            </div>
             <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="p-4 w-16">S No</th>
                                <th className="p-4">Name</th>
                                <th className="p-4 text-center w-32">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredSalts.map((salt, index) => (
                                <tr key={salt.id} className="hover:bg-purple-50 transition-colors duration-200">
                                    <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                                    <td className="p-4 font-semibold text-gray-800">{salt.name}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center items-center gap-4 text-gray-500">
                                            <button className="hover:text-blue-600" title="Edit Salt"><PencilIcon /></button>
                                            <button className="hover:text-red-600" title="Delete Salt"><TrashIcon /></button>
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
};

export default SaltPage;
