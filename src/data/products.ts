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
    image: "https://images.pexels.com/photos/3641056/pexels-photo-3641056.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["dark_circles", "pigmentation"],
    description: "Reduces dark spots and brightens skin tone with powerful Vitamin C",
    rating: 4.5
  },
  {
    id: 2,
    name: "Retinol Anti-Aging Cream",
    brand: "Olay",
    price: "$24",
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["wrinkles", "fine_lines"],
    description: "Smooths fine lines and wrinkles with proven retinol formula",
    rating: 4.7
  },
  {
    id: 3,
    name: "Salicylic Acid Acne Treatment",
    brand: "La Roche-Posay",
    price: "$15",
    image: "https://images.pexels.com/photos/3783379/pexels-photo-3783379.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["acne", "oily_skin"],
    description: "Clears acne and controls oil production with 2% salicylic acid",
    rating: 4.6
  },
  {
    id: 4,
    name: "Niacinamide Pore Minimizer",
    brand: "The Ordinary",
    price: "$6",
    image: "https://images.pexels.com/photos/4298095/pexels-photo-4298095.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["oily_skin", "pigmentation"],
    description: "Reduces pore appearance and regulates sebum production",
    rating: 4.4
  },
  {
    id: 5,
    name: "Hyaluronic Acid Eye Cream",
    brand: "Neutrogena",
    price: "$12",
    image: "https://images.pexels.com/photos/4460374/pexels-photo-4460374.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["dark_circles", "wrinkles"],
    description: "Hydrates under-eye area to reduce dark circles and fine lines",
    rating: 4.3
  },
  {
    id: 6,
    name: "Alpha Arbutin Dark Spot Serum",
    brand: "The Inkey List",
    price: "$10",
    image: "https://images.pexels.com/photos/4460375/pexels-photo-4460375.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["pigmentation", "dark_circles"],
    description: "Fades dark spots and hyperpigmentation effectively",
    rating: 4.5
  },
  {
    id: 7,
    name: "Clay Mask for Oily Skin",
    brand: "Aztec Secret",
    price: "$9",
    image: "https://images.pexels.com/photos/4041393/pexels-photo-4041393.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["oily_skin", "acne"],
    description: "Deep cleansing clay mask that absorbs excess oil",
    rating: 4.2
  },
  {
    id: 8,
    name: "Peptide Wrinkle Repair Serum",
    brand: "Peter Thomas Roth",
    price: "$39",
    image: "https://images.pexels.com/photos/4041394/pexels-photo-4041394.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["wrinkles", "fine_lines"],
    description: "Advanced peptide complex for wrinkle reduction",
    rating: 4.8
  },
  {
    id: 9,
    name: "Benzoyl Peroxide Acne Gel",
    brand: "PanOxyl",
    price: "$8",
    image: "https://images.pexels.com/photos/4041395/pexels-photo-4041395.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["acne"],
    description: "Maximum strength acne spot treatment",
    rating: 4.3
  },
  {
    id: 10,
    name: "Caffeine Under Eye Solution",
    brand: "The Ordinary",
    price: "$7",
    image: "https://images.pexels.com/photos/4041396/pexels-photo-4041396.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["dark_circles", "puffiness"],
    description: "Depuffs and brightens tired under-eye area",
    rating: 4.4
  },
  {
    id: 11,
    name: "Azelaic Acid Brightening Cream",
    brand: "Paula's Choice",
    price: "$28",
    image: "https://images.pexels.com/photos/4041397/pexels-photo-4041397.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["acne", "pigmentation"],
    description: "Multi-action treatment for acne and dark spots",
    rating: 4.6
  },
  {
    id: 12,
    name: "Matte Control Moisturizer",
    brand: "CeraVe",
    price: "$16",
    image: "https://images.pexels.com/photos/4041398/pexels-photo-4041398.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["oily_skin"],
    description: "Oil-free moisturizer for matte finish all day",
    rating: 4.5
  },
  {
    id: 13,
    name: "Collagen Firming Night Cream",
    brand: "L'Oreal Paris",
    price: "$14",
    image: "https://images.pexels.com/photos/4298100/pexels-photo-4298100.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["wrinkles", "fine_lines"],
    description: "Restores skin elasticity while you sleep",
    rating: 4.4
  },
  {
    id: 14,
    name: "Tranexamic Acid Dark Spot Treatment",
    brand: "Good Molecules",
    price: "$12",
    image: "https://images.pexels.com/photos/4298101/pexels-photo-4298101.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["pigmentation"],
    description: "Targeted treatment for stubborn dark spots",
    rating: 4.5
  },
  {
    id: 15,
    name: "Tea Tree Oil Acne Serum",
    brand: "The Body Shop",
    price: "$18",
    image: "https://images.pexels.com/photos/4298102/pexels-photo-4298102.jpeg?auto=compress&cs=tinysrgb&w=150",
    targets: ["acne", "oily_skin"],
    description: "Natural tea tree oil to fight acne bacteria",
    rating: 4.2
  }
];
