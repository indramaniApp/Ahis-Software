// Modal.js
import React from "react";

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[700px] max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="font-semibold text-gray-700">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
