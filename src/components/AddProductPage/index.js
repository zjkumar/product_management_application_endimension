// AddProductPage.js
import React, { useState, useContext } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import sampleProducts from '../sampleProducts';
import { ProductContext } from '../ProductContext';

const { Option } = Select;

const AddProductPage = () => {
const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const handleSubmit = (values) => {
    
    // sampleProducts.push(newProduct);
    addProduct(values)
    message.success('Product added successfully');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Add Product</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            {/* Render dropdown options for categories */}
            <Option value="Electronics">Electronics</Option>
            <Option value="Home & Kitchen">Home & Kitchen</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Toys & Games">Toys & Games</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the product description' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the product price' }]}
        >
          <Input type="number" placeholder="Enter product price" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
