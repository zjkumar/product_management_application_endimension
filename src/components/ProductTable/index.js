// ProductTable.js
import React, { useContext } from 'react';
import { Table, Button } from 'antd';
import { ProductContext } from '../ProductContext';
const ProductTable = ({ products, onEdit, onDelete }) => {
  const { categoryColors } = useContext(ProductContext);

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => {
        return {
          children: text,
          props: {
            style: { backgroundColor: categoryColors[text] || 'inherit' },
          },
        };
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return <Table dataSource={products} columns={columns} bordered />;
};

export default ProductTable;
