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
    const filteredProducts = products.filter(product => {
        let match = true;
        if (nameFilter && !product.name.toLowerCase().includes(nameFilter.toLowerCase())) {
          match = false;
        }
        if (descriptionFilter && !product.description.toLowerCase().includes(descriptionFilter.toLowerCase())) {
          match = false;
        }
        if (categoryFilter && product.category !== categoryFilter) {
          match = false;
        }
        return match;
      });
    setFilteredProducts(filteredProducts);
  }

  return (
    <div className='product-filter-container'>
      <Input className='input-box' placeholder="Search by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
      <Input className='input-box' placeholder="Search by Description" value={descriptionFilter} onChange={(e) => setDescriptionFilter(e.target.value)} />
      <Select placeholder="Filter by Category" value={categoryFilter} onChange={(value) => setCategoryFilter(value)}>
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
