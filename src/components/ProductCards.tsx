import { Product } from "../data/products";
import { formatConditionName } from "../utils/recommender";
import { Star } from "lucide-react";

interface ProductCardsProps {
  products: Product[];
  detectedConditions: string[];
}

function ProductCards({ products, detectedConditions }: ProductCardsProps) {
  const buildFallbackImage = (product: Product) => {
    const initials = `${product.brand.charAt(0)}${product.name.charAt(0)}`.toUpperCase();
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" fill="none">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#155eef"/>
            <stop offset="100%" stop-color="#12b3a8"/>
          </linearGradient>
        </defs>
        <rect width="600" height="400" rx="32" fill="url(#bg)"/>
        <circle cx="480" cy="90" r="88" fill="rgba(255,255,255,0.12)"/>
        <circle cx="120" cy="320" r="110" fill="rgba(255,255,255,0.08)"/>
        <rect x="186" y="86" width="228" height="228" rx="32" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.28)"/>
        <text x="300" y="215" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff">${initials}</text>
        <text x="300" y="268" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="rgba(255,255,255,0.88)">${product.brand}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="star filled"
            fill="#F59E0B"
            size={16}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="star half"
            fill="#F59E0B"
            size={16}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="star empty"
            size={16}
          />
        );
      }
    }
    return stars;
  };

  const getMatchedCondition = (product: Product): string | null => {
    return product.targets.find(t => detectedConditions.includes(t)) || null;
  };

  const handleViewProduct = (product: Product) => {
    const searchQuery = encodeURIComponent(`${product.brand} ${product.name}`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
  };

  return (
    <div className="product-recommendations">
      <h2 className="products-title">Recommended Products</h2>
      <p className="products-subtitle">
        Based on your skin analysis, we recommend these products:
      </p>

      <div className="products-grid">
        {products.map((product, index) => {
          const matchedCondition = getMatchedCondition(product);

          return (
            <div
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = buildFallbackImage(product);
                  }}
                />
                {matchedCondition && (
                  <span className="condition-tag">
                    For {formatConditionName(matchedCondition)}
                  </span>
                )}
              </div>

              <div className="product-content">
                <div className="product-brand">{product.brand}</div>
                <h3 className="product-name">{product.name}</h3>

                <div className="product-rating">
                  <div className="stars">{renderStars(product.rating)}</div>
                  <span className="rating-value">{product.rating}</span>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button
                    className="view-product-btn"
                    onClick={() => handleViewProduct(product)}
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCards;
