// ProductTable.js
import React from 'react';
import { Table, Button } from 'antd';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
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

  return <Table dataSource={products} columns={columns} />;
};

export default ProductTable;
