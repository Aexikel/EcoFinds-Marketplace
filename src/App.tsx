import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { ProductDetail } from './Pages/ProductDetail';
import { AddProduct } from './Pages/AddProduct';
import { EditProduct } from './Pages/EditProduct';
import { MyListings } from './Pages/MyListings';
import { Cart } from './Pages/Cart';
import { Dashboard } from './Pages/Dashboard';
import { Purchases } from './Pages/Purchases.';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <Login />} 
        />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/product/:id" element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        } />
        <Route path="/add-product" element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        } />
        <Route path="/edit-product/:id" element={
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        } />
        <Route path="/my-listings" element={
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/purchases" element={
          <PrivateRoute>
            <Purchases />
          </PrivateRoute>
        } />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;