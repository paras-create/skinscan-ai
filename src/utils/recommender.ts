import { products, Product } from "../data/products";

export function getRecommendations(detectedConditions: string[]): Product[] {
  if (detectedConditions.length === 0) {
    // Return top-rated products if no conditions detected
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }

  // Filter products that target any of the detected conditions
  const matchedProducts = products.filter(product =>
    product.targets.some(target => detectedConditions.includes(target))
  );

  // Sort by rating descending
  const sortedProducts = matchedProducts.sort((a, b) => b.rating - a.rating);

  // Return top 6 products
  return sortedProducts.slice(0, 6);
}

export function getConditionTag(productId: number, detectedConditions: string[]): string | null {
  const product = products.find(p => p.id === productId);
  if (!product) return null;

  const matchedCondition = product.targets.find(t => detectedConditions.includes(t));
  return matchedCondition || null;
}

export function formatConditionName(conditionId: string): string {
  const names: Record<string, string> = {
    dark_circles: "Dark Circles",
    acne: "Acne",
    oily_skin: "Oily Skin",
    pigmentation: "Pigmentation",
    wrinkles: "Wrinkles",
    fine_lines: "Fine Lines"
  };
  return names[conditionId] || conditionId;
}
