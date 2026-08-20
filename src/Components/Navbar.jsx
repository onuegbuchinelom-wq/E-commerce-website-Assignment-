import { NavLink } from "react-router-dom";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import "./Navbar.css";

function Navbar({ brandName = "SOLÉNE", cartCount = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo">
          {brandName}
        </NavLink>

        <nav className="navbar__links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? "active" : ""}>
            Shop
          </NavLink>
          <NavLink to="/skincare" className={({ isActive }) => isActive ? "active" : ""}>
            Skincare
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </nav>

        <div className="navbar__search">
          <input type="text" placeholder="Search products..." />
          <button aria-label="Search">
            <Search size={16} />
          </button>
        </div>

        <div className="navbar__icons">
          <button className="navbar__icon-btn" aria-label="Account">
            <User size={18} />
          </button>
          <button className="navbar__icon-btn" aria-label="Wishlist">
            <Heart size={18} />
          </button>
          <NavLink to="/cart" className="navbar__icon-btn navbar__icon-btn--cart" aria-label="Cart">
            <ShoppingCart size={18} />
            <span className="navbar__cart-count">{cartCount}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;