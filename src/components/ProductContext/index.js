import React, { useState, useEffect, createContext } from 'react';
import sampleProducts from '../sampleProducts';

import { v4 as uuidv4 } from 'uuid';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});

  useEffect(() => {
    // set products data from sample data
    setProducts(sampleProducts);

    // Extract unique categories from products and set them
    const uniqueCategories = [...new Set(sampleProducts.map(product => product.category))];
    setCategories(uniqueCategories);

    // Generate initial colors for sample categories
    const initialCategoryColors = {};
    uniqueCategories.forEach(category => {
      initialCategoryColors[category] = generateRandomColor();
    });
    setCategoryColors(initialCategoryColors);

  }, []);

  const generateRandomColor = () => {
    // Generate a random hexadecimal color code
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  
  const addProduct = (newProduct) => {
    const updatedNewProduct = {id: uuidv4(), ...newProduct}
    setProducts(prevProducts => [...prevProducts, updatedNewProduct]);

    console.log(updatedNewProduct)
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct, setProducts, setCategories, categoryColors }}>
      {children}
    </ProductContext.Provider>
  );
};
