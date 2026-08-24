import { NavLink } from "react-router-dom";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import "./Navbar.css";

function Navbar({
  brandName = "GLOWMART",
  cartCount = 0,
  favoritesCount = 0,
  searchTerm,
  setSearchTerm
}) 
{
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
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </nav>

        <div className="navbar__search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" aria-label="Search">
            <Search size={16} />
          </button>
        </div>

        <div className="navbar__icons">
          <NavLink to="/login" className="navbar__icon-btn" aria-label="Account">
            <User size={18} />
          </NavLink>

          <NavLink to="/favorites" className="navbar__icon-btn" aria-label="Favorites">
            <Heart size={18} />
              <span className="navbar__cart-count">{favoritesCount}</span>
          
          </NavLink>

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