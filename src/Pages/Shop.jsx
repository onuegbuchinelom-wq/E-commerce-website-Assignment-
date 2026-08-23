import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import "./Shop.css";

function Shop({
  eyebrow = "Full Collection",
  heading = "Shop the Full Collection",
  subtext = "Skincare, makeup, fragrance and body care — everything GLOWMART carries, all in one place.",
  searchPlaceholder = "Search skincare, makeup, fragrance...",
  addToCart,
  toggleFavorite,
  isFavorite
}) {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
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

  const beautyCategories = ["beauty", "fragrances"];

  const filteredProducts = products
    .filter((product) => beautyCategories.includes(product.category))
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="shop">
      <section className="shop__header">
        <span className="shop__eyebrow">{eyebrow}</span>
        <h1 className="shop__heading">{heading}</h1>
        <p className="shop__subtext">{subtext}</p>

        <div className="shop__search">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <section className="shop__grid-section">
        {loading && <p className="shop__status">Loading products...</p>}
        {error && <p className="shop__status shop__status--error">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="shop__status">No products match your search.</p>
        )}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="shop__grid">
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
        )}
      </section>
    </div>
  );
}

export default Shop;