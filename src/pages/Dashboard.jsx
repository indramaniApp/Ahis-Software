import React, { Component } from "react";
import ahis from "../assets/ahis.png";

import PatientForm from "../component/PatientForm";
import AddUserForm from "../component/ AddUserForm";
import ChangePasswordForm from "../component/ChangePasword";
import WardBedDetail from "../component/WardBedDetail";
import "./dashboardAnimations.css";

export class Dashboard extends Component {
  state = {
    activeMenu: "Master",
    activeSubmenu: null,
    showModal: false,
    user: null,
  };

  componentDidMount() {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.setState({ user: JSON.parse(storedUser) });
    }
  }

  menuItems = {
    Master: [
      "Add User",
      "Change Password",
      "Ward/bed Details",
      "Add Hospital Medicine",
      "Add Department",
      "Add Designation",
      "Add Degree",
      "Add Specialist",
      "Add Patient Type",
      "Add Diagnosis",
      "Vendor Details",
      "Item Cost Details",
      "Add Bill Category",
      "Investigation Cost Details",
      "Investigation Category",
    ],
    Employee: [
      "Add Employee",
      "Employee List",
      "Attendance",
      "Leave Management",
      "Payroll",
      "Performance Reviews",
    ],
    Doctor: [
      "Add Doctor",
      "Doctor List",
      "Schedules",
      "Consultation History",
      "Specializations & Certifications",
      "Availability Calendar",
      "Feedback / Appraisal",
    ],
    Patient: [
      "New Patient",
      "Patient List",
      "Appointments",
      "Medical History",
      "Lab Tests / Reports",
      "Prescriptions",
      "Billing Summary",
      "Insurance Details",
    ],
    Pharmacy: [
      "Salt",
      "Product",
      "Supplier",
      "Purchase Order",
      "Purchase",
      "Retail",
      "Department Allocation",
      "Inventory",
      "Purchase Return",
      "Retail Return",
      "Ipd List",
      "Indents",
      "Indents Return",
      "Reports",
    ],
    Billing: [
      "Create Invoice",
      "Payment History",
      "Refund / Credit Notes",
      "Outstanding Payments",
      "Insurance Claims",
    ],
    Accounts: [
      "Ledger",
      "Balance Sheet",
      "Profit & Loss",
      "Cash Flow Statements",
      "Expense Management",
    ],
    Reports: [
        "Expiry",
        "Sales Revenue",
        "Collection",
        "General",
        "Cash Due",
        "Credit Due",
        "New Purchase",
        "New Purchase Order",
        "New Purchase Return",
        "Stock Transfer Report"
    ],
    "View and Search": [
      "Search Patient",
      "Search Doctor",
      "Search Employee",
      "Search Invoice / Payment",
      "Advanced Filters",
    ],
    "For Account": [
      "Settings",
      "User Access",
      "Roles & Permissions",
      "Audit Logs / Activity Tracker",
      "System Configuration",
    ],
    "Member Cards": [
      "Generate Card",
      "Card List",
      "Card Expiry / Renewal",
      "Card Types (Patient, Employee, VIP, Insurance)",
    ],
    Lab: ["Lab Tests", "Lab Reports", "Sample Tracking"],
    Help: [
      "User Guide",
      "About",
      "Contact Support",
      "FAQs",
      "Video Tutorials",
    ],
    Notifications: ["Appointment Alerts", "Stock Alerts", "Due Payments"],
  };

  setActiveMenu = (menu) => {
    this.setState({ activeMenu: menu, activeSubmenu: null, showModal: false });
  };

  setActiveSubmenu = (submenu) => {
    this.setState({ activeSubmenu: submenu, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { activeMenu, activeSubmenu, showModal, user } = this.state;

    return (
      <div className="h-screen flex flex-col font-sans">
        {/* HEADER */}
        <header className="bg-[#D055D5] text-white px-6 py-2 flex justify-between items-center text-sm font-medium shadow-md">
          <div>Advanced Hospital Information System</div>
          <div>
            User Name :{" "}
            <span className="font-semibold">{user?.email || "Guest"}</span> | Role :{" "}
            <span className="font-semibold">{user?.role || "Unknown"}</span>
          </div>
        </header>

        {/* MENU BAR */}
        <nav className="bg-white border-b flex text-sm overflow-x-auto shadow-sm">
          {Object.keys(this.menuItems).map((item, idx) => (
            <button
              key={idx}
              onClick={() => this.setActiveMenu(item)}
              className={`px-4 py-2.5 border-r transition-colors duration-200 flex-shrink-0 ${
                activeMenu === item
                  ? "bg-[#FAF7FF] text-[#8053C6] font-semibold"
                  : "hover:bg-purple-50 text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT SUBMENU */}
          <aside className="w-64 bg-white border-r overflow-y-auto">
            {this.menuItems[activeMenu]?.map((sub, i) => (
              <div
                key={i}
                onClick={() => this.setActiveSubmenu(sub)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm border-b border-gray-100 transition-colors duration-200 
                  ${
                    activeSubmenu === sub
                      ? "bg-purple-50 text-[#8053C6] font-semibold"
                      : "text-gray-600 hover:bg-purple-50"
                  }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#D055D5]"></span>
                {sub}
              </div>
            ))}
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 flex items-center justify-center bg-[#FAF7FF] p-6">
            <div className="text-center">
              <img src={ahis} alt="AHIS Logo" className="w-48 mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-bold text-gray-700">
                {activeSubmenu ? activeSubmenu : `Welcome to the ${activeMenu} Section`}
              </h2>
              <p className="text-gray-500 mt-2">
                Select an option from the left menu to get started.
              </p>
            </div>
          </main>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-zoomIn">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                  <h3 className="text-xl font-bold text-[#8053C6]">
                    {activeSubmenu}
                  </h3>
                  <button
                    onClick={this.closeModal}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Render forms based on activeSubmenu */}
                {activeSubmenu === "New Patient" && <PatientForm />}
                {activeSubmenu === "Add User" && <AddUserForm />}
                {activeSubmenu === "Change Password" && <ChangePasswordForm />}
                {activeSubmenu === "Ward/bed Details" && <WardBedDetail />}
                
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;