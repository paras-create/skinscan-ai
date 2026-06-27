import { Product } from "../data/products";
import { formatConditionName } from "../utils/recommender";
import { Star } from "lucide-react";

interface ProductCardsProps {
  products: Product[];
  detectedConditions: string[];
}

function ProductCards({ products, detectedConditions }: ProductCardsProps) {
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.pexels.com/photos/3641056/pexels-photo-3641056.jpeg?auto=compress&cs=tinysrgb&w=150";
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
