// ProductFilter.js
import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';

import './index.css'

const { Option } = Select;

const ProductFilter = ({ products, setFilteredProducts, categories }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Implement filtering logic
  const applyFilter = () => {
    let filteredProducts = [...products];
    if (categoryFilter !== 'All') {
      filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }else if (categoryFilter === "All"){
        filteredProducts = [...products]
    }
    if (nameFilter) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }
    if (descriptionFilter) {
      filteredProducts = filteredProducts.filter(product => product.description.toLowerCase().includes(descriptionFilter.toLowerCase()));
    }
    setFilteredProducts(filteredProducts);
  }


  return (
    <div className='product-filter-container'>
      <Input className='input-box' placeholder="Search by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
      <Input className='input-box' placeholder="Search by Description" value={descriptionFilter} onChange={(e) => setDescriptionFilter(e.target.value)} />
      <Select className='category-selection-box' placeholder="Filter by Category" value={categoryFilter ? categoryFilter : "All"} onChange={(value) => setCategoryFilter(value)}>
        
        <Option key="All" value="All">
          All
        </Option>
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={applyFilter}>Show Results</Button>
    </div>
  );
};

export default ProductFilter;
