import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Skincare from "./Pages/Skincare";
import About from "./Pages/About";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar brandName="GLOWMART" cartCount={0} />

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                eyebrow="Skincare · Cosmetics"
                heading="Quiet rituals,"
                accentWord="radiant skin."
                subtext="Small-batch formulas made with sage, oat milk and porcelain clay — built for a routine you'll actually keep."
                primaryBtnLabel="Shop the Edit"
                badgeLabel="Bestseller"
                badgeName="Porcelain Clay Mask"
              />
            }
          />

          <Route path="/shop" element={<Shop />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Page not found</h1>}/>
        </Routes>

      </main>
    </BrowserRouter>
  );
}

export default App;
