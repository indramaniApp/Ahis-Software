import React from 'react';
// Icons ke liye library import karein
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

// Screenshot se liya gaya mock data
const purchaseData = [
    {
        s_no: 1,
        invoice_date: '06/09/2025 12:00',
        created_on: '06/09/2025 15:10',
        supplier_name: 'BETTER LIFE DEVICES',
        invoice_no: 'BLD002024',
        grn_no: 202,
        po_id: 'N/A',
        bill_amount: '₹1,346.69',
        paid_amount: '₹0.00',
        description: '',
        created_by: 'Mr. Pawan Singh',
    },
    {
        s_no: 2,
        invoice_date: '06/08/2025 12:00',
        created_on: '06/08/2025 15:00',
        supplier_name: 'AADVIK PHARMACY',
        invoice_no: 'R006152',
        grn_no: 201,
        po_id: 'N/A',
        bill_amount: '₹115.36',
        paid_amount: '₹0.00',
        description: '',
        created_by: 'Mr. Pawan Singh',
    },
    {
        s_no: 3,
        invoice_date: '05/09/2025 12:00',
        created_on: '05/09/2025 13:30',
        supplier_name: 'AGARWAL PHARMA',
        invoice_no: '250007300103704',
        grn_no: 200,
        po_id: 'N/A',
        bill_amount: '₹3,110.93',
        paid_amount: '₹0.00',
        description: '',
        created_by: 'Mr. Pawan Singh',
    },
    {
        s_no: 4,
        invoice_date: '04/09/2025 12:00',
        created_on: '06/09/2025 09:45',
        supplier_name: 'VARDAN ASSOCIATES',
        invoice_no: 'A000049',
        grn_no: 199,
        po_id: 'N/A',
        bill_amount: '₹5,001.92',
        paid_amount: '₹0.00',
        description: '',
        created_by: 'Mr. Pawan Singh',
    },
    {
        s_no: 5,
        invoice_date: '05/09/2025 12:00',
        created_on: '06/09/2025 09:41',
        supplier_name: 'AADVIK PHARMACY',
        invoice_no: 'R006134',
        grn_no: 198,
        po_id: 'N/A',
        bill_amount: '₹589.76',
        paid_amount: '₹0.00',
        description: '',
        created_by: 'Mr. Pawan Singh',
    },
    {
        s_no: 6,
        invoice_date: '04/09/2025 12:00',
        created_on: '06/09/2025 09:38',
        supplier_name: 'SRIVARDHAN PHARMA',
        invoice_no: 'TO02613',
        grn_no: 197,
        po_id: 'N/A',
        bill_amount: '₹650.03',
        paid_amount: '₹0.00',
        description: '',
        created_by: 'Mr. Pawan Singh',
    },
    {
        s_no: 7,
        invoice_date: '05/09/2025 12:00',
        created_on: '05/09/2025 13:36',
        supplier_name: 'AADVIK PHARMACY',
        invoice_no: 'R006100',
        grn_no: 196,
        po_id: 'N/A',
        bill_amount: '₹627.20',
        paid_amount: '₹0.00',
        description: '',
        created_by: 'Mr. Krishna Yadav',
    },
];

// Styles object for easy styling
const styles = {
    container: {
        padding: '24px',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    header: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    filtersContainer: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
    },
    searchButton: {
        padding: '10px 20px',
        backgroundColor: '#34495e',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        justifySelf: 'start', // Aligns button to the start of the grid cell
    },
    tabs: {
        borderBottom: '1px solid #dee2e6',
        marginBottom: '20px',
    },
    activeTab: {
        padding: '10px 20px',
        border: '1px solid #dee2e6',
        borderBottom: '2px solid white',
        backgroundColor: 'white',
        display: 'inline-block',
        position: 'relative',
        top: '1px',
        borderRadius: '4px 4px 0 0',
        fontWeight: '500',
        color: '#34495e',
    },
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px',
    },
    th: {
        backgroundColor: '#f2f2f2',
        padding: '12px 15px',
        border: '1px solid #ddd',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    td: {
        padding: '12px 15px',
        border: '1px solid #ddd',
        textAlign: 'left',
        verticalAlign: 'middle',
    },
    trHover: {
        // This would require a CSS file or a library like styled-components for hover effects
    },
    actions: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        cursor: 'pointer',
        color: '#555',
        fontSize: '18px',
    },
};

function Purchase() {
  return (
    <div style={styles.container}>
        <h2 style={styles.header}>Purchases</h2>

        <div style={styles.filtersContainer}>
            <input type="text" placeholder="search GRN no." style={styles.input} />
            <input type="text" placeholder="search Invoice no" style={styles.input} />
            <select style={styles.input}>
                <option value="">Select/Search Supplier Name</option>
                {/* Yahan aap suppliers ki list daal sakte hain */}
            </select>
            <button style={styles.searchButton}>Search</button>
        </div>

        <div style={styles.tabs}>
            <div style={styles.activeTab}>
                Purchases
            </div>
        </div>
        
        <div style={styles.tableContainer}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>S No</th>
                        <th style={styles.th}>Invoice Date</th>
                        <th style={styles.th}>Created On</th>
                        <th style={styles.th}>Supplier Name</th>
                        <th style={styles.th}>Invoice No</th>
                        <th style={styles.th}>GRN No.</th>
                        <th style={styles.th}>PO ID</th>
                        <th style={styles.th}>Bill Amount</th>
                        <th style={styles.th}>Paid Amount</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Created By</th>
                        <th style={styles.th}></th> {/* Action icons ke liye khali header */}
                    </tr>
                </thead>
                <tbody>
                    {purchaseData.map((item) => (
                        <tr key={item.s_no}>
                            <td style={styles.td}>{item.s_no}</td>
                            <td style={styles.td}>{item.invoice_date}</td>
                            <td style={styles.td}>{item.created_on}</td>
                            <td style={styles.td}>{item.supplier_name}</td>
                            <td style={styles.td}>{item.invoice_no}</td>
                            <td style={styles.td}>{item.grn_no}</td>
                            <td style={styles.td}>{item.po_id}</td>
                            <td style={styles.td}>{item.bill_amount}</td>
                            <td style={styles.td}>{item.paid_amount}</td>
                            <td style={styles.td}>{item.description}</td>
                            <td style={styles.td}>{item.created_by}</td>
                            <td style={styles.td}>
                                <div style={styles.actions}>
                                    <FiEye style={styles.icon} title="View" />
                                    <FiEdit style={styles.icon} title="Edit" />
                                    <FiTrash2 style={styles.icon} title="Delete" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default Purchase;