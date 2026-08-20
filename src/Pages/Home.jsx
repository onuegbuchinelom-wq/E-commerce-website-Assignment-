import { useState, useEffect } from "react";
import heroPortrait from "../Images/bg image.png";
import ProductCard from "../Components/ProductCard";
import "./Home.css";

function Home({
  eyebrow,
  heading,
  accentWord,
  subtext,
  primaryBtnLabel,
  badgeLabel,
  badgeName
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/beauty")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__text">
          <span className="hero__eyebrow">{eyebrow}</span>
          <h1 className="hero__heading">
            {heading}
            <br />
            <span className="hero__heading-accent">{accentWord}</span>
          </h1>
          <p className="hero__subtext">{subtext}</p>
          <div className="hero__actions">
            <button className="hero__btn-primary">{primaryBtnLabel}</button>
            <a href="#collection" className="hero__btn-secondary">
              View Collection →
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-media">
            <img className="hero__visual-img" src={heroPortrait} alt="SOLÉNE model portrait" />
          </div>
          <div className="hero__badge">
            <span className="hero__badge-label">{badgeLabel}</span>
            <span className="hero__badge-name">{badgeName}</span>
          </div>
        </div>
      </section>

      <section id="collection" className="product-grid">
        {loading && <p className="product-grid__status">Loading products...</p>}
        {error && <p className="product-grid__status product-grid__status--error">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="product-grid__status">No products found.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="product-grid__list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;