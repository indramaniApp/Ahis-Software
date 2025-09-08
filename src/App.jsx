// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// Import your main layout
import PharmacyLayout from "./pages/pharmacyRelated/PharmacyLayout"; 

// Import the page component you want to show inside the layout
import ProductsPage from "./pages/pharmacyRelated/ProductsPage";
import SaltPage from "./pages/pharmacyRelated/SaltPage";
import Supplier from "./pages/pharmacyRelated/Supplier";
import PurchaseOrder from "./pages/pharmacyRelated/PurchageOrder";
import Purchase from "./pages/pharmacyRelated/Purchase";
import Retail from "./pages/pharmacyRelated/Retail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Your other routes */}
        <Route path="/" element={<HomePage />} />

        <Route path="/pharmacy" element={<PharmacyLayout />}>
          
        
          <Route path="product" element={<ProductsPage />} />
          
          {/* Example for another route */}
          <Route path="salt" element={<SaltPage />} />
          <Route path="supplier" element={<Supplier />} />
   <Route path="purchase-order" element={<PurchaseOrder />} />
      <Route path="purchase" element={<Purchase/>} />
      <Route path="retail" element={<Retail/>} />
 

        </Route>
      </Routes>
    </Router>
  );
}

export default App;