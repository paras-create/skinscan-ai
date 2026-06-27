export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  targets: string[];
  description: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Vitamin C Brightening Serum",
    brand: "CeraVe",
    price: "$18",
    image: "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products/skin-renewing-vitamin-c-serum/vitamin-c-serum_front.jpg?rev=8ccc2b38cf20438a964296327feabb93&w=1024&hash=C1F31E0CC59A1F5474536ADFA07F4C48",
    targets: ["dark_circles", "pigmentation"],
    description: "Reduces dark spots and brightens skin tone with powerful Vitamin C",
    rating: 4.5
  },
  {
    id: 2,
    name: "Retinol Anti-Aging Cream",
    brand: "Olay",
    price: "$24",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    targets: ["wrinkles", "fine_lines"],
    description: "Smooths fine lines and wrinkles with proven retinol formula",
    rating: 4.7
  },
  {
    id: 3,
    name: "Salicylic Acid Acne Treatment",
    brand: "La Roche-Posay",
    price: "$15",
    image: "https://www.laroche-posay.us/on/demandware.static/Sites-lrp-us-Site/-/en_US/v1747218861373/dist/images/icons/search.svg",
    targets: ["acne", "oily_skin"],
    description: "Clears acne and controls oil production with 2% salicylic acid",
    rating: 4.6
  },
  {
    id: 4,
    name: "Niacinamide Pore Minimizer",
    brand: "The Ordinary",
    price: "$6",
    image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dwce8a7cdf/Images/products/The%20Ordinary/rdn-niacinamide-10pct-zinc-1pct-30ml.png?sw=860&sh=860&sm=fit",
    targets: ["oily_skin", "pigmentation"],
    description: "Reduces pore appearance and regulates sebum production",
    rating: 4.4
  },
  {
    id: 5,
    name: "Hyaluronic Acid Eye Cream",
    brand: "Neutrogena",
    price: "$12",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    targets: ["dark_circles", "wrinkles"],
    description: "Hydrates under-eye area to reduce dark circles and fine lines",
    rating: 4.3
  },
  {
    id: 6,
    name: "Alpha Arbutin Dark Spot Serum",
    brand: "The Inkey List",
    price: "$10",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    targets: ["pigmentation", "dark_circles"],
    description: "Fades dark spots and hyperpigmentation effectively",
    rating: 4.5
  },
  {
    id: 7,
    name: "Clay Mask for Oily Skin",
    brand: "Aztec Secret",
    price: "$9",
    image: "https://aztecsecret.com/wp-content/uploads/2021/11/IMG_67671-600x900.jpg",
    targets: ["oily_skin", "acne"],
    description: "Deep cleansing clay mask that absorbs excess oil",
    rating: 4.2
  },
  {
    id: 8,
    name: "Peptide Wrinkle Repair Serum",
    brand: "Peter Thomas Roth",
    price: "$39",
    image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=900&q=80",
    targets: ["wrinkles", "fine_lines"],
    description: "Advanced peptide complex for wrinkle reduction",
    rating: 4.8
  },
  {
    id: 9,
    name: "Benzoyl Peroxide Acne Gel",
    brand: "PanOxyl",
    price: "$8",
    image: "https://panoxyl.com/wp-content/uploads/2022/05/Acne-Foaming-Wash.png",
    targets: ["acne"],
    description: "Maximum strength acne spot treatment",
    rating: 4.3
  },
  {
    id: 10,
    name: "Caffeine Under Eye Solution",
    brand: "The Ordinary",
    price: "$7",
    image: "https://theordinary.com/dw/image/v2/BFKJ_PRD/on/demandware.static/-/Sites-deciem-master/default/dw97d3044c/Images/products/The%20Ordinary/2020-08-17-ORD-Product-Caff-Sol-5pct-ECCG-Eye-Serum.png?sw=860&sh=860&sm=fit",
    targets: ["dark_circles", "puffiness"],
    description: "Depuffs and brightens tired under-eye area",
    rating: 4.4
  },
  {
    id: 11,
    name: "Azelaic Acid Brightening Cream",
    brand: "Paula's Choice",
    price: "$28",
    image: "https://images.unsplash.com/photo-1612817159949-195a8d5f6a7d?auto=format&fit=crop&w=900&q=80",
    targets: ["acne", "pigmentation"],
    description: "Multi-action treatment for acne and dark spots",
    rating: 4.6
  },
  {
    id: 12,
    name: "Matte Control Moisturizer",
    brand: "CeraVe",
    price: "$16",
    image: "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products/moisturizers/pm-facial-moisturizing-lotion/cerave-pm-facial-moisturizing-lotion-front.jpg?rev=9f31f91d2d444d8ca9bafda1c4a7d0db&w=1024&hash=0A4EAF78A2B8E0A05E4A1D29A1A1D6C5",
    targets: ["oily_skin"],
    description: "Oil-free moisturizer for matte finish all day",
    rating: 4.5
  },
  {
    id: 13,
    name: "Collagen Firming Night Cream",
    brand: "L'Oreal Paris",
    price: "$14",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    targets: ["wrinkles", "fine_lines"],
    description: "Restores skin elasticity while you sleep",
    rating: 4.4
  },
  {
    id: 14,
    name: "Tranexamic Acid Dark Spot Treatment",
    brand: "Good Molecules",
    price: "$12",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298b?auto=format&fit=crop&w=900&q=80",
    targets: ["pigmentation"],
    description: "Targeted treatment for stubborn dark spots",
    rating: 4.5
  },
  {
    id: 15,
    name: "Tea Tree Oil Acne Serum",
    brand: "The Body Shop",
    price: "$18",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
    targets: ["acne", "oily_skin"],
    description: "Natural tea tree oil to fight acne bacteria",
    rating: 4.2
  }
];
