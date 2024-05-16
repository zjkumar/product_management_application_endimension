// ProductFilter.js
import React, { useState } from 'react';
import { Input, Select } from 'antd';

import './index.css'

const { Option } = Select;

const ProductFilter = ({ products, setFilteredProducts, categories }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Implement filtering logic

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
    </div>
  );
};

export default ProductFilter;
