import React, { useState, useEffect, createContext } from 'react';
import sampleProducts from '../sampleProducts';


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
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
