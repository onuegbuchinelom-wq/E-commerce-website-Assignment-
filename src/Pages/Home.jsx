import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroPortrait from "../Images/bg image.png";
import ProductCard from "../Components/ProductCard";
import "./Home.css";

const categories = [
  { label: "All", value: "all" },
  { label: "Beauty", value: "beauty" },
  { label: "Fragrances", value: "fragrances" }
];

function Home({
  eyebrow = "Skincare · Makeup · Fragrance",
  heading = "Everything you need,",
  accentWord = "one ritual at a time.",
  subtext = "From skincare to makeup to fragrance — GLOWMART brings together everyday beauty essentials, made simple.",
  primaryBtnLabel = "Shop the Edit",
  badgeLabel = "Bestseller",
  badgeName = "Porcelain Clay Mask",
  searchTerm,
  addToCart,
  toggleFavorite,
  isFavorite
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const beautyOnly = data.products.filter((product) =>
          ["beauty", "fragrances"].includes(product.category)
        );
        setProducts(beautyOnly);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products
    .filter((product) =>
      activeCategory === "all" ? true : product.category === activeCategory
    )
    .filter((product) =>
      product.title.toLowerCase().includes((searchTerm || "").toLowerCase())
    );

  const handleSeeMore = () => {
    navigate("/shop");
  };

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
        <div className="product-grid__header">
          <span className="product-grid__eyebrow">Featured Picks</span>
          <h2 className="product-grid__heading">Our Bestsellers</h2>
          <p className="product-grid__subtext">
            A curated edit of GLOWMART favorites — loved for their simplicity and results.
          </p>
        </div>

        <div className="product-grid__tabs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`product-grid__tab ${activeCategory === cat.value ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && <p className="product-grid__status">Loading products...</p>}
        {error && <p className="product-grid__status product-grid__status--error">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="product-grid__status">No products found.</p>
        )}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="product-grid__list">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                />
              ))}
            </div>

            <div className="product-grid__see-more">
              <button className="product-grid__see-more-btn" onClick={handleSeeMore}>
                See More →
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;