import { Link } from "react-router-dom";
import "./Favorites.css";

function Favorites({
  favorites,
  toggleFavorite,
  addToCart,
  heading = "Your Favorites",
  emptyMessage = "You haven't added any favorites yet.",
  shopLinkLabel = "Browse the Shop →"
}) {
  if (favorites.length === 0) {
    return (
      <div className="favorites favorites--empty">
        <p>{emptyMessage}</p>
        <Link to="/shop" className="favorites__shop-link">
          {shopLinkLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1 className="favorites__heading">{heading}</h1>

      <div className="favorites__list">
        {favorites.map((product) => (
          <div className="favorite-item" key={product.id}>
            <Link to={`/product/${product.id}`} className="favorite-item__link">
              <img src={product.thumbnail} alt={product.title} className="favorite-item__image" />
              <div className="favorite-item__info">
                <h3 className="favorite-item__title">{product.title}</h3>
                <p className="favorite-item__price">${product.price}</p>
              </div>
            </Link>

            <div className="favorite-item__actions">
              <button type="button" className="favorite-item__add-btn" onClick={() => addToCart(product, 1)}>
                Add to Cart
              </button>
              <button type="button" className="favorite-item__remove-btn" onClick={() => toggleFavorite(product)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;