import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({
  cart,
  clearCart,
  heading = "Checkout",
  emptyCartMessage = "Your cart is empty. Add products before checking out.",
  successMessage = "Order placed successfully! Redirecting you home...",
  submitBtnLabel = "Place Order",
  submittingBtnLabel = "Placing Order..."
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "card"
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.phone.trim().length < 7) newErrors.phone = "Enter a valid phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: formData,
        items: cart,
        total
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order submission failed");
        return res.json();
      })
      .then(() => {
        setSubmitting(false);
        setSuccess(true);
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => {
        setSubmitting(false);
        setSubmitError(err.message);
      });
  };

  if (cart.length === 0 && !success) {
    return <p className="checkout__status">{emptyCartMessage}</p>;
  }

  if (success) {
    return <p className="checkout__status checkout__status--success">{successMessage}</p>;
  }

  return (
    <div className="checkout">
      <h1 className="checkout__heading">{heading}</h1>

      <form className="checkout__form" onSubmit={handleSubmit}>
        <div className="checkout__field">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="checkout__error">{errors.name}</span>}
        </div>

        <div className="checkout__field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="checkout__error">{errors.email}</span>}
        </div>

        <div className="checkout__field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="checkout__error">{errors.phone}</span>}
        </div>

        <div className="checkout__field">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <span className="checkout__error">{errors.address}</span>}
        </div>

        <div className="checkout__field">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="card">Card</option>
            <option value="cash">Cash on Delivery</option>
            <option value="transfer">Bank Transfer</option>
          </select>
        </div>

        {submitError && <p className="checkout__error checkout__error--submit">{submitError}</p>}

        <div className="checkout__summary">
          <p>Total: ${total.toFixed(2)}</p>
        </div>

        <button type="submit" className="checkout__submit-btn" disabled={submitting}>
          {submitting ? submittingBtnLabel : submitBtnLabel}
        </button>
      </form>
    </div>
  );
}

export default Checkout;