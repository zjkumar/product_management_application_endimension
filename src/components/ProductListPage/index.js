// ProductListPage.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Modal } from 'antd';
import { Link } from 'react-router-dom'; // Assuming using React Router for navigation


import ProductFilter from '../ProductFilter';
import ProductTable from '../ProductTable';

import './index.css'

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [showResultsButton, setShowResultsButton] = useState(false);
  
  useEffect(() => {
    // Fetch products and categories data from API
    // Update state accordingly
  }, []);

  const handleShowResults = () => {
    // Apply filters to product list
    setShowFiltersModal(false); // Close modal after applying filters
    setShowResultsButton(false); // Hide "Show Results" button
  };

  // Define functions for filtering, editing, and deleting products

  return (
    <div>
      <h1>Product List</h1>
      
      <Row gutter={[16, 16]}>
        {/* Filters Button for xs and sm devices */}
        <Col xs={24} sm={24} md={0} style={{ marginBottom: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={() => setShowFiltersModal(true)}>Filters</Button>
          </div>
        </Col>
        {/* Product Filter for md and larger devices */}
        <Col xs={0} sm={0} md={8}>
          <div style={{ padding: '10px', backgroundColor: '#f0f2f5' }}>
            <ProductFilter products={products} setFilteredProducts={setFilteredProducts} categories={categories} />
            {window.innerWidth >= 768 && <Button type="primary" onClick={handleShowResults} style={{ marginTop: '10px' }}>Show Results</Button>}
          </div>
        </Col>
        {/* Product Table */}
        <Col xs={24} sm={24} md={16}>
          <div style={{ padding: '10px', backgroundColor: '#f0f2f5' }}>
          <div className='statistics-container'>
            <span className='statistics'>Total Products: {products.length}</span>
            <span className='statistics'>Total Categories: {categories.length}</span>
            <Button type="primary" style={{ marginBottom: '10px' }}><Link to="/add-product">Add Product</Link></Button>
          </div>
            
            <ProductTable products={filteredProducts.length > 0 ? filteredProducts : products} />
          </div>
        </Col>
      </Row>
      {/* Modal for Filters */}
      <Modal
        title="Product Filters"
        open={showFiltersModal}
        onCancel={() => setShowFiltersModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowFiltersModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => setShowResultsButton(true)}>
            Show Results
          </Button>,
        ]}
      >
        <ProductFilter products={products} setFilteredProducts={setFilteredProducts} categories={categories} />
      </Modal>
    </div>
  );
};

export default ProductListPage;
