import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({
  addToCart,
  loadingMessage = "Loading product...",
  addedMessage = "Added to Cart ✓",
  addBtnLabel = "Add to Cart"
}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () =>
    setQuantity((prev) => Math.min(product.stock, prev + 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) return <p className="product-details__status">{loadingMessage}</p>;
  if (error) return <p className="product-details__status product-details__status--error">{error}</p>;
  if (!product) return null;

  return (
    <div className="product-details">
      <div className="product-details__image-wrap">
        <img src={product.thumbnail} alt={product.title} className="product-details__image" />
      </div>

      <div className="product-details__info">
        <span className="product-details__category">{product.category}</span>
        <h1 className="product-details__title">{product.title}</h1>
        <p className="product-details__price">${product.price}</p>
        <p className="product-details__description">{product.description}</p>
        <p className="product-details__stock">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>

        {product.stock > 0 && (
          <>
            <div className="product-details__quantity">
              <button type="button" onClick={decreaseQuantity} aria-label="Decrease quantity">
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={increaseQuantity} aria-label="Increase quantity">
                +
              </button>
            </div>

            <button
              type="button"
              className="product-details__add-btn"
              onClick={handleAddToCart}
            >
              {added ? addedMessage : addBtnLabel}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;