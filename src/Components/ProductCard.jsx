import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import "./ProductCard.css";

function ProductCard({ product, addToCart, toggleFavorite, isFavorite }) {
  const { id, title, price, thumbnail, stock } = product;
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const favorited = isFavorite ? isFavorite(id) : false;

  const decreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className="product-card">
      <button
        type="button"
        className={`product-card__favorite-btn ${favorited ? "active" : ""}`}
        onClick={handleToggleFavorite}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={16} fill={favorited ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${id}`} className="product-card__link">
        <div className="product-card__image-wrap">
          <img src={thumbnail} alt={title} className="product-card__image" />
        </div>
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__price">${price}</p>
        <p className="product-card__stock">
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>
      </Link>

      {stock > 0 && (
        <div className="product-card__cart-controls">
          <div className="product-card__quantity">
            <button type="button" onClick={decreaseQuantity} aria-label="Decrease quantity">
              −
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={increaseQuantity} aria-label="Increase quantity">
              +
            </button>
          </div>

          <button type="button" className="product-card__add-btn" onClick={handleAddToCart}>
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;