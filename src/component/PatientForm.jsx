// PatientFormStyled.js
import React from "react";

function PatientFormStyled() {
  return (
    <div className="bg-teal-300 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto text-sm font-sans">
      <h2 className="text-center font-bold text-lg mb-4 border-b pb-2">
        IPD Patient Registration
      </h2>

      <form className="grid grid-cols-2 gap-4">
        {/* Left Side */}
        <div>
          <label className="block mb-1 font-medium">Patient ID</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Patient Name</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Father/Husband</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input type="number" className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Sex</label>
          <select className="w-full border border-gray-400 rounded px-2 py-1 bg-white">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Extra Charge</label>
          <select className="w-full border border-gray-400 rounded px-2 py-1 bg-white">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">History</label>
          <textarea className="w-full border border-gray-400 rounded px-2 py-1 bg-white"></textarea>
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Diagnosis</label>
          <textarea className="w-full border border-gray-400 rounded px-2 py-1 bg-white"></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Advance</label>
          <input type="number" className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Patient Type</label>
          <select className="w-full border border-gray-400 rounded px-2 py-1 bg-white">
            <option>None</option>
            <option>IPD</option>
            <option>OPD</option>
          </select>
        </div>

        {/* Right Side */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mobile</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Entry Date</label>
          <input type="datetime-local" className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Referred By</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Ward No</label>
          <select className="w-full border border-gray-400 rounded px-2 py-1 bg-white">
            <option>GENERAL WARD BED-1</option>
            <option>GENERAL WARD BED-2</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Treatment By</label>
          <input className="w-full border border-gray-400 rounded px-2 py-1 bg-white" />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-medium">Remark</label>
          <textarea className="w-full border border-gray-400 rounded px-2 py-1 bg-white"></textarea>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex flex-wrap gap-2 mt-4 justify-end">
          <button className="bg-gray-700 text-white px-3 py-1 rounded">Add</button>
          <button className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
          <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          <button className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
          <button className="bg-gray-800 text-white px-3 py-1 rounded">Close</button>
          <button className="bg-yellow-500 text-white px-3 py-1 rounded">Discharge</button>
        </div>
      </form>
    </div>
  );
}

export default PatientFormStyled;
