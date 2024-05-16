// ProductListPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Button, Row, Col, Modal, Empty, Form, Input, Select, message } from 'antd';
import { Link } from 'react-router-dom'; // Assuming using React Router for navigation


import ProductFilter from '../ProductFilter';
import ProductTable from '../ProductTable';
import { ProductContext } from '../ProductContext';
import sampleProducts from '../sampleProducts';


import './index.css'


const {Option} = Select

const ProductListPage = () => {
    const { products, categories, setProducts, setCategories } = useContext(ProductContext);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
   
    
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);
    const [form] = Form.useForm();


    //   const applyFilters = (filteredProducts) => {
    //     setFilteredProducts(filteredProducts);
    //     setShowFiltersModal(false); // Close modal after applying filters
    //   };
    

    useEffect(() => {
        setFilteredProducts(products); // Initialize filteredProducts with products
    }, [products]);

    const applyFilters = (filteredProducts) => {
        setFilteredProducts(filteredProducts);
        setShowFiltersModal(false);
    };

    const handleEdit = (product) => {
        
        setProductToEdit(product)
        setEditModalVisible(true);
        form.setFieldsValue({
            name: product.name,
            category: product.category,
            description: product.description,
            price: product.price,
        });
    };

    const handleDelete = (product) => {
        setProductToDelete(product);
        setDeleteModalVisible(true);
    };

    


    const confirmDelete = () => {
        // Filter out the deleted product from the list
        const updatedProducts = products.filter(p => p !== productToDelete);
        
        setProducts(updatedProducts);

        const updatedCategories = [...new Set(updatedProducts.map(product => product.category))];

        setCategories(updatedCategories);

            
        
        setFilteredProducts(updatedProducts);
        // Remove the product from the sample products data
        const updatedSampleProducts = sampleProducts.filter(p => p !== productToDelete);
        // You may want to update the context or make an API call to delete the product permanently
        
        setDeleteModalVisible(false);
    };

    const cancelDelete = () => {
        setProductToDelete(null);
        setDeleteModalVisible(false);
    };


    const handleEditSubmit = () => {
        form.validateFields()
            .then((values) => {
                // Update product information
                const updatedProduct = {
                    ...productToEdit,
                    name: values.name,
                    category: values.category,
                    description: values.description,
                    price: values.price,
                };
                // Find the product with the matching ID
                const updatedProducts = products.map((product) => {
                    if (product.id === updatedProduct.id) {
                        
                        return updatedProduct;
                    }
                    return product;
                });
                // Update sampleProducts with the updated product
                setProducts(updatedProducts);
                // Close the modal
                setEditModalVisible(false);
                // Show success message
                message.success('Product updated successfully');
                // Update the filtered products
                setFilteredProducts(updatedProducts);
            })
            .catch((error) => {
                console.error('Validation Error:', error);
            });
    };

    const cancelEdit = () => {
        
        setEditModalVisible(false);
    };


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
            
            {/* Check if there are products to display */}
            {filteredProducts.length > 0 && (
                            <ProductTable products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {/* Use Empty component if there are no products */}
            {filteredProducts.length === 0 && (
                <Empty description="No products available" />
            )}

          </div>
        </Col>
      </Row>
      {/* Modals */}
      <Modal
        title="Product Filters"
        open={showFiltersModal}
        onCancel={() => setShowFiltersModal(false)}
        footer={null}
      >
        <ProductFilter products={products} setFilteredProducts={applyFilters} categories={categories} />
      </Modal>
      <Modal
            title="Edit Product"
            open={editModalVisible}
            onOk={handleEditSubmit}
            onCancel={cancelEdit}
            okText="Save"
            cancelText="Cancel"
      >
        {/* Render edit form */}
        <Form form={form} layout="vertical">
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the product name' }]}
            >
                <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select placeholder="Select a category">
                    {categories.map((category) => (
                        <Option key={category} value={category}>
                            {category}
                        </Option>
                    ))}
                </Select>
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
        </Form>
      </Modal>
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        cancelText="Cancel"
    >
        <p>Are you sure you want to delete {productToDelete && productToDelete.name}?</p>
      </Modal>


    </div>
  );
};

export default ProductListPage;
