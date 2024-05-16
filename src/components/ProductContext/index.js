import React, { useState, useEffect, createContext } from 'react';
import sampleProducts from '../sampleProducts';

import { v4 as uuidv4 } from 'uuid';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch products data from an API or set it from sample data
    setProducts(sampleProducts);

    // Extract unique categories from products and set them
    const uniqueCategories = [...new Set(sampleProducts.map(product => product.category))];
    setCategories(uniqueCategories);
  }, []);

  const addProduct = (newProduct) => {
    const updatedNewProduct = {id: uuidv4(), ...newProduct}
    setProducts(prevProducts => [...prevProducts, updatedNewProduct]);

    console.log(updatedNewProduct)
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct, setProducts, setCategories }}>
      {children}
    </ProductContext.Provider>
  );
};
