import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { id, title, price, thumbnail, stock } = product;

  return (
    <div className="product-card">
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
    </div>
  );
}

export default ProductCard;