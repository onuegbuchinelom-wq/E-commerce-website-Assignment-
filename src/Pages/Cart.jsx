import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({
  cart,
  removeFromCart,
  updateQuantity,
  heading = "Your Cart",
  emptyMessage = "Your cart is empty.",
  continueShoppingLabel = "Continue Shopping →",
  checkoutBtnLabel = "Proceed to Checkout"
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart cart--empty">
        <p>{emptyMessage}</p>
        <Link to="/shop" className="cart__shop-link">
          {continueShoppingLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart__heading">{heading}</h1>

      <div className="cart__list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.thumbnail} alt={item.title} className="cart-item__image" />

            <div className="cart-item__info">
              <h3 className="cart-item__title">{item.title}</h3>
              <p className="cart-item__price">${item.price}</p>
            </div>

            <div className="cart-item__quantity">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <p className="cart-item__subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              type="button"
              className="cart-item__remove"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart__summary">
        <p className="cart__total">Total: ${total.toFixed(2)}</p>
        <Link to="/checkout" className="cart__checkout-btn">
          {checkoutBtnLabel}
        </Link>
      </div>
    </div>
  );
}

export default Cart;