import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Favorites from "./Pages/Favorites";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product, quantity) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (product) => {
    const alreadyFavorited = favorites.find((item) => item.id === product.id);

    if (alreadyFavorited) {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const isFavorite = (productId) => favorites.some((item) => item.id === productId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <Navbar brandName="GLOWMART" cartCount={cartCount} favoritesCount={favorites.length} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} addToCart={addToCart} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cart={cart} clearCart={clearCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>

      <Footer brandName="GLOWMART" />
    </BrowserRouter>
  );
}

export default App;