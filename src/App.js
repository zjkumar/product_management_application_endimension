import { Route, Routes} from 'react-router-dom'

import { ProductProvider } from './components/ProductContext';
import ProductListPage from './components/ProductListPage';
import AddProductPage from './components/AddProductPage';

import './App.css';

function App() {
  return (
    <div className="App">
        <ProductProvider>
        <Routes> {/* Use Switch to only render the first matched route */}
          <Route exact path="/" element={<ProductListPage />} /> {/* Render ProductListPage at the root route */}
          
          <Route exact path="/add-product" element={<AddProductPage />} /> {/* Render AddProductPage */}
        </Routes>
        </ProductProvider>
    </div>
  );
}

export default App;
