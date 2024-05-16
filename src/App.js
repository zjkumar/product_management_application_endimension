import { Route, Routes} from 'react-router-dom'

import ProductListPage from './components/ProductListPage';
import AddProductPage from './components/AddProductPage';

import './App.css';

function App() {
  return (
    <div className="App">
        <Routes> {/* Use Switch to only render the first matched route */}
          <Route exact path="/" element={<ProductListPage />} /> {/* Render ProductListPage at the root route */}
          
          <Route exact path="/add-product" element={<AddProductPage />} /> {/* Render AddProductPage */}
        </Routes>
    </div>
  );
}

export default App;
