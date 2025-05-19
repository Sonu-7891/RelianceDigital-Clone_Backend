const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/category.model");
const Product = require("./models/product.model");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample categories data
const categories = [
  {
    name: "Air Conditioners",
    description: "Latest air conditioners from top brands",
    image: "https://example.com/air-conditioners.jpg",
  },
  {
    name: "Coolers",
    description: "Personal and desert air coolers for effective cooling",
    image: "https://example.com/coolers.jpg",
  },
  {
    name: "Dust Free",
    description: "Vacuum cleaners and cleaning solutions",
    image: "https://example.com/dust-free.jpg",
  },
  {
    name: "Smartphones",
    description: "Latest smartphones from top brands",
    image: "https://example.com/smartphones.jpg",
  },
  {
    name: "Laptops",
    description: "High-performance laptops for work and gaming",
    image: "https://example.com/laptops.jpg",
  },
  {
    name: "Earphones",
    description: "Wireless and wired earphones for every need",
    image: "https://example.com/earphones.jpg",
  },
  {
    name: "Printers",
    description: "High-quality printing solutions for home and office",
    image: "https://example.com/printers.jpg",
  },
  {
    name: "Refrigerators",
    description: "Latest refrigerators from top brands",
    image: "https://example.com/refrigerators.jpg",
  },
  {
    name: "Sound Systems",
    description: "Premium sound systems and soundbars",
    image: "https://example.com/soundsystems.jpg",
  },
  {
    name: "Tablets",
    description: "Latest tablets with amazing features",
    image: "https://example.com/tablets.jpg",
  },
  {
    name: "Televisions",
    description: "Best deals on smart TVs",
    image: "https://example.com/televisions.jpg",
  },
  {
    name: "Washing Machines",
    description: "Smart washing solutions",
    image: "https://example.com/washingmachines.jpg",
  },
  {
    name: "Watches",
    description: "Best in smart watches",
    image: "https://example.com/watches.jpg",
  },
  {
    name: "Water Filters",
    description: "Pure & safe drinking water",
    image: "https://example.com/waterfilters.jpg",
  },
];

// Sample products data
const products = [
  // Air Conditioners
  {
    name: "LG 1.5 Ton 5 Star Split AC, US-Q19CNZE (Dual Inverter)",
    brand: "LG",
    price: 45490,
    description: "5 Star rated split AC with dual inverter technology",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/0HED31BMrJ-lg-sac-581110843-i-1-1200wx1200h.jpeg",
    ],
    stock: 50,
    features: ["5 Star Rating", "Dual Inverter", "Energy Efficient"],
    specifications: {
      Capacity: "1.5 Ton",
      Type: "Split AC",
      "Star Rating": "5 Star",
    },
  },
  {
    name: "Godrej 1.5 Ton 3 Star 5-in-1 Convertible Inverter Split AC",
    brand: "Godrej",
    price: 31490,
    description: "3 Star rated convertible inverter split AC",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/JAbJLY3Dcx-godrej-sac-15t-581110297-i-1-1200wx1200h.jpeg",
    ],
    stock: 45,
    features: ["3 Star Rating", "5-in-1 Convertible", "Inverter Technology"],
    specifications: {
      Capacity: "1.5 Ton",
      Type: "Split AC",
      "Star Rating": "3 Star",
    },
  },
  {
    name: "LG 1.5 Ton 3 Star Split AC, US-Q18DNXE (Dual Inverter)",
    brand: "LG",
    price: 36490,
    description: "3 Star rated split AC with dual inverter technology",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/nwtp_QINeb-lg-sac-581110840-i-1-1200wx1200h.jpeg",
    ],
    stock: 40,
    features: ["3 Star Rating", "Dual Inverter", "Energy Efficient"],
    specifications: {
      Capacity: "1.5 Ton",
      Type: "Split AC",
      "Star Rating": "3 Star",
    },
  },
  {
    name: "Voltas 1.5 Ton 5 Star 5-in-1 Convertible Inverter Split AC",
    brand: "Voltas",
    price: 40390,
    description: "5 Star rated convertible inverter split AC",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/w17PQ9ZXzd-voltas-sac-581110354-i-1-1200wx1200h.jpeg",
    ],
    stock: 35,
    features: ["5 Star Rating", "5-in-1 Convertible", "Inverter Technology"],
    specifications: {
      Capacity: "1.5 Ton",
      Type: "Split AC",
      "Star Rating": "5 Star",
    },
  },
  {
    name: "LG 1.5 Ton 5 Star Split AC, US-Q19KWZE (Dual Inverter)",
    brand: "LG",
    price: 49990,
    description: "5 Star rated split AC with dual inverter technology",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/dEXA98_sJT-lg-sac-581110845-i-1-1200wx1200h.jpeg",
    ],
    stock: 30,
    features: ["5 Star Rating", "Dual Inverter", "Energy Efficient"],
    specifications: {
      Capacity: "1.5 Ton",
      Type: "Split AC",
      "Star Rating": "5 Star",
    },
  },
  // Coolers
  {
    name: "Kenstar 45 L Personal Air Cooler, Tall DE",
    brand: "Kenstar",
    price: 5299,
    description: "Personal air cooler with 45L water tank capacity",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/wLZP30WRGs-kenstar-tallde-personal-air-cooler-494338810-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["45L Tank", "Personal Cooler", "Energy Efficient"],
    specifications: {
      Type: "Personal Cooler",
      "Tank Capacity": "45L",
      "Power Consumption": "230W",
    },
  },
  {
    name: "Livpure Coolmist 48L Personal Air Cooler",
    brand: "Livpure",
    price: 4999,
    description: "Personal air cooler with 48L water tank capacity",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/4jHcYF6hC4-livpure-personal-cooleer-coolmist-48l-494338941-i-1-1200wx1200h.jpeg",
    ],
    stock: 30,
    features: ["48L Tank", "2300 CMH Air Delivery", "Energy Efficient"],
    specifications: {
      Type: "Personal Cooler",
      "Tank Capacity": "48L",
      "Air Delivery": "2300 CMH",
    },
  },
  {
    name: "Symphony Sumo 75XL Desert Air Cooler",
    brand: "Symphony",
    price: 13499,
    description: "Desert air cooler with i-Pure technology",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/l9Nmk3YFfD-symphony-75xl-air-cooler-491666297-i-1-1200wx1200h.jpeg",
    ],
    stock: 20,
    features: ["i-Pure Technology", "Desert Cooler", "Large Coverage"],
    specifications: {
      Type: "Desert Cooler",
      "Tank Capacity": "75L",
      Technology: "i-Pure",
    },
  },
  {
    name: "Havells Kace 80 Desert Cooler",
    brand: "Havells",
    price: 11299,
    description: "80L desert cooler with powerful cooling",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/xiVlmETkq8-havells-desert-air-cooler-494510024-i-1-1200wx1200h.jpeg",
    ],
    stock: 15,
    features: ["80L Tank", "Desert Cooler", "Powerful Cooling"],
    specifications: {
      Type: "Desert Cooler",
      "Tank Capacity": "80L",
      Color: "White & Grey",
    },
  },
  {
    name: "Symphony Diet 3D 55i+ Desert Air Cooler",
    brand: "Symphony",
    price: 12490,
    description: "55L desert air cooler with advanced features",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/E-ABKory6h-symphony-diet-air-cooler-491666305-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["55L Tank", "3D Technology", "Desert Cooler"],
    specifications: {
      Type: "Desert Cooler",
      "Tank Capacity": "55L",
      Technology: "3D",
    },
  },
  // Dust Free Products
  {
    name: "Dyson V15 Detect Absolute",
    brand: "Dyson",
    price: 49999,
    description: "Premium cordless vacuum cleaner with advanced detection",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/OjjxchUTaq-forbes-super-clean-vacuumcleaners-491296776-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Cordless", "Laser Detection", "Advanced Filtration"],
    specifications: {
      Type: "Cordless Vacuum",
      Power: "230AW",
      "Battery Life": "60 mins",
    },
  },
  {
    name: "Mi Robot Vacuum Cleaner",
    brand: "Xiaomi",
    price: 19999,
    description: "Smart robot vacuum cleaner with app control",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/sDeRgMCpzf-eureka-forbes-buddy-vacuum-cleaner-494227418-i-1-1200wx1200h.jpeg",
    ],
    stock: 15,
    features: ["Robot Vacuum", "App Control", "Smart Navigation"],
    specifications: {
      Type: "Robot Vacuum",
      "Battery Life": "120 mins",
      Connectivity: "Wi-Fi",
    },
  },
  {
    name: "Eureka Forbes Quick Clean DX",
    brand: "Eureka Forbes",
    price: 2999,
    description: "Compact and powerful vacuum cleaner",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/s0oHHO2-LS-dyson-v8-absolute-494226752-i-1-1200wx1200h.jpeg",
    ],
    stock: 30,
    features: ["Compact Design", "Powerful Suction", "Easy to Use"],
    specifications: {
      Type: "Upright Vacuum",
      Power: "1000W",
      "Dust Capacity": "2L",
    },
  },
  {
    name: "Philips PowerPro Compact",
    brand: "Philips",
    price: 3999,
    description: "Compact vacuum cleaner with powerful suction",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/YVEQY6vTWw-philips-fc9571-dry-vacuum-493620581-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["Compact Design", "Powerful Suction", "Bagless"],
    specifications: {
      Type: "Upright Vacuum",
      Power: "1200W",
      "Dust Capacity": "1.5L",
    },
  },
  {
    name: "Kent Force Cyclonic",
    brand: "Kent",
    price: 3499,
    description: "Cyclonic vacuum cleaner with advanced filtration",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/mVCR_C9ty2-eureka-forbes-wet-and-dry-zeal-vacuum-cleaner-492391697-i-1-1200wx1200h.jpeg",
    ],
    stock: 20,
    features: ["Cyclonic Technology", "Advanced Filtration", "Bagless"],
    specifications: {
      Type: "Upright Vacuum",
      Power: "1000W",
      Filtration: "HEPA",
    },
  },

  // Smartphones
  {
    name: "iPhone 15 Pro Max 256GB Natural Titanium",
    brand: "Apple",
    price: 149900,
    description: "Latest iPhone with A17 Pro chip and titanium design",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww",
    ],
    stock: 50,
    features: ["A17 Pro chip", "Titanium design", "48MP camera"],
    specifications: {
      Storage: "256GB",
      Color: "Natural Titanium",
      Display: "6.7-inch Super Retina XDR",
    },
  },
  {
    name: "Samsung Galaxy S24 Ultra 256GB Titanium Black",
    brand: "Samsung",
    price: 129999,
    description: "Premium Android smartphone with advanced AI features",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Ftc3VuZyUyMGdhbGF4eXxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 45,
    features: ["AI features", "S Pen", "200MP camera"],
    specifications: {
      Storage: "256GB",
      Color: "Titanium Black",
      Display: "6.8-inch Dynamic AMOLED",
    },
  },
  {
    name: "OnePlus 12 256GB Flowy Emerald",
    brand: "OnePlus",
    price: 64999,
    description: "Flagship killer with Hasselblad camera system",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b25lcGx1cyUyMHBob25lfGVufDB8fDB8fHww",
    ],
    stock: 40,
    features: ["Snapdragon 8 Gen 3", "Hasselblad camera", "100W charging"],
    specifications: {
      Storage: "256GB",
      Color: "Flowy Emerald",
      Display: "6.82-inch AMOLED",
    },
  },
  {
    name: "iPhone 15 128GB Black",
    brand: "Apple",
    price: 79900,
    description: "Latest iPhone with A16 Bionic chip",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww",
    ],
    stock: 35,
    features: ["A16 Bionic", "48MP camera", "USB-C"],
    specifications: {
      Storage: "128GB",
      Color: "Black",
      Display: "6.1-inch Super Retina XDR",
    },
  },
  {
    name: "Samsung Galaxy S24+ 256GB Marble Gray",
    brand: "Samsung",
    price: 99999,
    description: "Premium Android smartphone with AI features",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Ftc3VuZyUyMGdhbGF4eXxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 30,
    features: ["AI features", "50MP camera", "Fast charging"],
    specifications: {
      Storage: "256GB",
      Color: "Marble Gray",
      Display: "6.7-inch Dynamic AMOLED",
    },
  },
  {
    name: "OnePlus 12R 128GB Iron Gray",
    brand: "OnePlus",
    price: 39999,
    description: "Value flagship with premium features",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b25lcGx1cyUyMHBob25lfGVufDB8fDB8fHww",
    ],
    stock: 25,
    features: ["Snapdragon 8 Gen 2", "50MP camera", "100W charging"],
    specifications: {
      Storage: "128GB",
      Color: "Iron Gray",
      Display: "6.78-inch AMOLED",
    },
  },
  {
    name: "iPhone 14 128GB Midnight",
    brand: "Apple",
    price: 69900,
    description: "Powerful iPhone with A15 Bionic chip",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww",
    ],
    stock: 20,
    features: ["A15 Bionic", "12MP camera", "MagSafe"],
    specifications: {
      Storage: "128GB",
      Color: "Midnight",
      Display: "6.1-inch Super Retina XDR",
    },
  },
  {
    name: "Samsung Galaxy S23 FE 256GB Mint",
    brand: "Samsung",
    price: 49999,
    description: "Fan Edition with flagship features",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Ftc3VuZyUyMGdhbGF4eXxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 15,
    features: ["Snapdragon 8 Gen 1", "50MP camera", "IP68 rating"],
    specifications: {
      Storage: "256GB",
      Color: "Mint",
      Display: "6.4-inch Dynamic AMOLED",
    },
  },
  {
    name: "Google Pixel 8 Pro 256GB Obsidian",
    brand: "Google",
    price: 89999,
    description: "Best camera smartphone with AI features",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww",
    ],
    stock: 10,
    features: ["Google Tensor G3", "50MP camera", "AI features"],
    specifications: {
      Storage: "256GB",
      Color: "Obsidian",
      Display: "6.7-inch LTPO OLED",
    },
  },
  {
    name: "Nothing Phone 2 256GB White",
    brand: "Nothing",
    price: 44999,
    description: "Unique design with Glyph interface",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b25lcGx1cyUyMHBob25lfGVufDB8fDB8fHww",
    ],
    stock: 25,
    features: ["Snapdragon 8+ Gen 1", "Glyph interface", "50MP camera"],
    specifications: {
      Storage: "256GB",
      Color: "White",
      Display: "6.7-inch LTPO OLED",
    },
  },
  // Laptops
  {
    name: "Lenovo IdeaPad Gaming 3 AMD Ryzen 5 5600H",
    brand: "Lenovo",
    price: 44990,
    description: "Gaming laptop with powerful AMD processor",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    ],
    stock: 20,
    features: ["AMD Ryzen 5", "NVIDIA GPU", "15.6-inch FHD"],
    specifications: {
      Processor: "AMD Ryzen 5 5600H",
      Display: "15.6-inch FHD IPS",
      Graphics: "NVIDIA GTX 1650",
    },
  },
  {
    name: "Apple MacBook Air M1 13.3-inch",
    brand: "Apple",
    price: 89990,
    description: "Powerful laptop with M1 chip",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    ],
    stock: 15,
    features: ["M1 chip", "Retina display", "18-hour battery"],
    specifications: {
      Processor: "Apple M1",
      Display: "13.3-inch Retina",
      Storage: "256GB SSD",
    },
  },
  {
    name: "HP Pavilion Gaming 15.6-inch FHD",
    brand: "HP",
    price: 54990,
    description: "Gaming laptop with powerful specs",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    ],
    stock: 25,
    features: ["Intel Core i5", "NVIDIA GPU", "15.6-inch FHD"],
    specifications: {
      Processor: "Intel Core i5",
      Display: "15.6-inch FHD",
      Graphics: "NVIDIA GTX 1650",
    },
  },
  {
    name: "Dell Inspiron 15 3000 Series",
    brand: "Dell",
    price: 39990,
    description: "Reliable laptop for everyday use",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 30,
    features: ["Intel Core i3", "15.6-inch HD", "Windows 11"],
    specifications: {
      Processor: "Intel Core i3",
      Display: "15.6-inch HD",
      Storage: "256GB SSD",
    },
  },
  {
    name: "ASUS VivoBook 15 Intel Core i3 11th Gen",
    brand: "ASUS",
    price: 34990,
    description: "Slim and lightweight laptop",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 20,
    features: ["Intel Core i3", "15.6-inch FHD", "Slim design"],
    specifications: {
      Processor: "Intel Core i3 11th Gen",
      Display: "15.6-inch FHD",
      Storage: "256GB SSD",
    },
  },
  {
    name: "Acer Aspire 5 Intel Core i5 11th Gen",
    brand: "Acer",
    price: 42990,
    description: "Powerful laptop for work and entertainment",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 15,
    features: ["Intel Core i5", "15.6-inch FHD", "Backlit keyboard"],
    specifications: {
      Processor: "Intel Core i5 11th Gen",
      Display: "15.6-inch FHD",
      Storage: "512GB SSD",
    },
  },
  {
    name: "MSI Gaming GF63 Thin Intel Core i5 10th Gen",
    brand: "MSI",
    price: 49990,
    description: "Thin gaming laptop with powerful specs",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    ],
    stock: 10,
    features: ["Intel Core i5", "NVIDIA GPU", "15.6-inch FHD"],
    specifications: {
      Processor: "Intel Core i5 10th Gen",
      Display: "15.6-inch FHD",
      Graphics: "NVIDIA GTX 1650",
    },
  },
  {
    name: "Lenovo ThinkPad E14 Intel Core i5 11th Gen",
    brand: "Lenovo",
    price: 54990,
    description: "Business laptop with premium features",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    ],
    stock: 20,
    features: ["Intel Core i5", "14-inch FHD", "Fingerprint reader"],
    specifications: {
      Processor: "Intel Core i5 11th Gen",
      Display: "14-inch FHD",
      Storage: "512GB SSD",
    },
  },
  {
    name: "HP Envy x360 Intel Core i7 11th Gen",
    brand: "HP",
    price: 69990,
    description: "Convertible laptop with premium features",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    ],
    stock: 15,
    features: ["Intel Core i7", "13.3-inch FHD", "360° hinge"],
    specifications: {
      Processor: "Intel Core i7 11th Gen",
      Display: "13.3-inch FHD Touch",
      Storage: "512GB SSD",
    },
  },
  {
    name: "Dell XPS 13 Intel Core i7 11th Gen",
    brand: "Dell",
    price: 89990,
    description: "Premium ultrabook with stunning display",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D",
    ],
    stock: 10,
    features: ["Intel Core i7", "13.4-inch 4K", "InfinityEdge display"],
    specifications: {
      Processor: "Intel Core i7 11th Gen",
      Display: "13.4-inch 4K UHD",
      Storage: "512GB SSD",
    },
  },
  // Earphones
  {
    name: "Apple USB Type C EarPods with mic",
    brand: "Apple",
    price: 1549,
    description: "Wired earphones with USB Type-C connector",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/JcEnQVxBlv-apple-usb-typec-earpods-494422743-i-1-1200wx1200h.jpeg",
    ],
    stock: 50,
    features: ["USB Type-C", "Built-in mic", "Sweat resistant"],
    specifications: {
      Type: "Wired",
      Connector: "USB Type-C",
      "Water Resistance": "Sweat resistant",
    },
  },
  {
    name: "boAt Nirvana Ion ANC Truly Wireless",
    brand: "boAt",
    price: 1999,
    description: "ANC earbuds with long battery life",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/IK3w4Hs00d-boat-nirvana-ion-earbud-494249958-i-1-1200wx1200h.jpeg",
    ],
    stock: 45,
    features: ["Active Noise Cancellation", "120H Playtime", "Bluetooth 5.3"],
    specifications: {
      Type: "True Wireless",
      "Battery Life": "120 hours",
      Connectivity: "Bluetooth 5.3",
    },
  },
  {
    name: "Realme Buds Air 5 In-ear Wireless",
    brand: "Realme",
    price: 2299,
    description: "Wireless earbuds with long battery life",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/pvHyUpHquz-realme-tws-anc-buds-494249583-i-1-1200wx1200h.jpeg",
    ],
    stock: 40,
    features: ["38H Playtime", "Bluetooth 5.3", "Touch controls"],
    specifications: {
      Type: "True Wireless",
      "Battery Life": "38 hours",
      Connectivity: "Bluetooth 5.3",
    },
  },
  {
    name: "boAt Stone 358 Bluetooth Speaker",
    brand: "boAt",
    price: 1199,
    description: "Portable Bluetooth speaker with powerful sound",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/2VVd3KObra-boat-stone-358-black-speaker-493842115-i-1-1200wx1200h.jpeg",
    ],
    stock: 35,
    features: ["10W RMS", "IPX7", "12H Playtime"],
    specifications: {
      Type: "Bluetooth Speaker",
      Power: "10W RMS",
      "Battery Life": "12 hours",
    },
  },
  {
    name: "OnePlus Bullets Z2 Bluetooth Wireless",
    brand: "OnePlus",
    price: 1599,
    description: "Wireless neckband with premium sound",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/ZT2cb26C0H-oneplus-bullets-z2-wireless-earphone-492796790-i-1-1200wx1200h.jpeg",
    ],
    stock: 30,
    features: ["30H Playtime", "Bluetooth 5.0", "Fast charging"],
    specifications: {
      Type: "Neckband",
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.0",
    },
  },
  {
    name: "Sony WH-1000XM4 Wireless Headphones",
    brand: "Sony",
    price: 24999,
    description: "Premium noise-cancelling headphones",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/JcEnQVxBlv-apple-usb-typec-earpods-494422743-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["ANC", "30H Battery", "Hi-Res Audio"],
    specifications: {
      Type: "Over-ear",
      "Battery Life": "30 hours",
      "Noise Cancellation": "Active",
    },
  },
  {
    name: "Jabra Elite 75t True Wireless",
    brand: "Jabra",
    price: 8999,
    description: "Premium wireless earbuds with ANC",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/IK3w4Hs00d-boat-nirvana-ion-earbud-494249958-i-1-1200wx1200h.jpeg",
    ],
    stock: 20,
    features: ["ANC", "28H Battery", "IP55"],
    specifications: {
      Type: "True Wireless",
      "Battery Life": "28 hours",
      "Water Resistance": "IP55",
    },
  },
  {
    name: "Samsung Galaxy Buds2 Pro",
    brand: "Samsung",
    price: 14999,
    description: "Premium wireless earbuds with ANC",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/pvHyUpHquz-realme-tws-anc-buds-494249583-i-1-1200wx1200h.jpeg",
    ],
    stock: 15,
    features: ["ANC", "IPX7", "24-bit Hi-Fi"],
    specifications: {
      Type: "True Wireless",
      "Battery Life": "18 hours",
      "Water Resistance": "IPX7",
    },
  },
  {
    name: "Apple AirPods Pro 2nd Gen",
    brand: "Apple",
    price: 24900,
    description: "Premium wireless earbuds with ANC",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/2VVd3KObra-boat-stone-358-black-speaker-493842115-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["ANC", "IPX4", "Spatial Audio"],
    specifications: {
      Type: "True Wireless",
      "Battery Life": "24 hours",
      "Water Resistance": "IPX4",
    },
  },
  {
    name: "Nothing Ear (1) True Wireless",
    brand: "Nothing",
    price: 5999,
    description: "Unique design with premium sound",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/ZT2cb26C0H-oneplus-bullets-z2-wireless-earphone-492796790-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["ANC", "34H Battery", "IPX4"],
    specifications: {
      Type: "True Wireless",
      "Battery Life": "34 hours",
      "Water Resistance": "IPX4",
    },
  },
  // Printers
  {
    name: "HP LaserJet Pro M404dn",
    brand: "HP",
    price: 14999,
    description: "Professional monochrome laser printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/6qdMpluFrm-canon-pixma-printers-aio-wifi-e470-491282647-i-1-1200wx1200h.jpeg",
    ],
    stock: 20,
    features: ["Laser printing", "Duplex printing", "Network ready"],
    specifications: {
      Type: "Laser",
      "Print Speed": "38 ppm",
      Connectivity: "Network",
    },
  },
  {
    name: "Canon PIXMA G3770",
    brand: "Canon",
    price: 12999,
    description: "All-in-one ink tank printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/HvzF4L1VXz-hp-printer-2820-494352988-i-1-1200wx1200h.jpeg",
    ],
    stock: 15,
    features: ["Ink tank", "Wi-Fi", "Scanner"],
    specifications: {
      Type: "Ink Tank",
      Functions: "Print, Scan, Copy",
      Connectivity: "Wi-Fi",
    },
  },
  {
    name: "Epson L3250",
    brand: "Epson",
    price: 9999,
    description: "All-in-one ink tank printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/TydsA4eqnj-hp-smart-tank-all-in-one585-printer-493664592-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["Ink tank", "Wi-Fi", "Mobile printing"],
    specifications: {
      Type: "Ink Tank",
      Functions: "Print, Scan, Copy",
      Connectivity: "Wi-Fi",
    },
  },
  {
    name: "Brother DCP-T720DW",
    brand: "Brother",
    price: 11999,
    description: "All-in-one ink tank printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/mzCd_1zuDN-hp-laser-printer-493837969-i-1-1200wx1200h.jpeg",
    ],
    stock: 20,
    features: ["Ink tank", "Wi-Fi", "Duplex printing"],
    specifications: {
      Type: "Ink Tank",
      Functions: "Print, Scan, Copy",
      Connectivity: "Wi-Fi",
    },
  },
  {
    name: "HP DeskJet 2331",
    brand: "HP",
    price: 3999,
    description: "Compact all-in-one printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/oW8gTtRmvb-canon-pixma-printers-mono-lbp6030w-491838157-i-1-1200wx1200h.jpeg",
    ],
    stock: 30,
    features: ["Compact", "Wi-Fi", "Mobile printing"],
    specifications: {
      Type: "Inkjet",
      Functions: "Print, Scan, Copy",
      Connectivity: "Wi-Fi",
    },
  },
  {
    name: "Canon TS207",
    brand: "Canon",
    price: 3499,
    description: "Compact single-function printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/oW8gTtRmvb-canon-pixma-printers-mono-lbp6030w-491838157-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["Compact", "USB", "Easy setup"],
    specifications: {
      Type: "Inkjet",
      Functions: "Print",
      Connectivity: "USB",
    },
  },
  {
    name: "Epson L121",
    brand: "Epson",
    price: 7999,
    description: "Single-function ink tank printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/oW8gTtRmvb-canon-pixma-printers-mono-lbp6030w-491838157-i-1-1200wx1200h.jpeg",
    ],
    stock: 20,
    features: ["Ink tank", "USB", "Low cost per page"],
    specifications: {
      Type: "Ink Tank",
      Functions: "Print",
      Connectivity: "USB",
    },
  },
  {
    name: "Brother HL-L2321D",
    brand: "Brother",
    price: 8999,
    description: "Monochrome laser printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/oW8gTtRmvb-canon-pixma-printers-mono-lbp6030w-491838157-i-1-1200wx1200h.jpeg",
    ],
    stock: 15,
    features: ["Laser printing", "Duplex printing", "USB"],
    specifications: {
      Type: "Laser",
      "Print Speed": "24 ppm",
      Connectivity: "USB",
    },
  },
  {
    name: "HP LaserJet 1020 Plus",
    brand: "HP",
    price: 10999,
    description: "Classic monochrome laser printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/oW8gTtRmvb-canon-pixma-printers-mono-lbp6030w-491838157-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Laser printing", "USB", "Compact"],
    specifications: {
      Type: "Laser",
      "Print Speed": "14 ppm",
      Connectivity: "USB",
    },
  },
  {
    name: "Canon MF3010",
    brand: "Canon",
    price: 6999,
    description: "Compact monochrome laser printer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/oW8gTtRmvb-canon-pixma-printers-mono-lbp6030w-491838157-i-1-1200wx1200h.jpeg",
    ],
    stock: 25,
    features: ["Laser printing", "USB", "Compact"],
    specifications: {
      Type: "Laser",
      "Print Speed": "18 ppm",
      Connectivity: "USB",
    },
  },
  // Refrigerators (10 products)
  {
    name: "LG 224 litres 5 Star Single Door Refrigerator, Scarlet Charm GL-B201ASPY",
    brand: "LG",
    price: 22490,
    description: "5 Star Single Door Refrigerator, Scarlet Charm",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/LVbIxsmBKp-whirlpool-3s-impc-refrigerator-493692323-i-1-1200wx1200h.jpeg",
    ],
    stock: 20,
    features: ["5 Star", "Single Door", "Scarlet Charm"],
    specifications: { Capacity: "224L", Type: "Single Door", Star: "5 Star" },
  },
  {
    name: "Samsung 183 litres 3 Star Single Door Refrigerator, Elegant Inox RR20C1824SL",
    brand: "Samsung",
    price: 16090,
    description: "3 Star Single Door Refrigerator, Elegant Inox",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/LVbIxsmBKp-whirlpool-3s-impc-refrigerator-493692323-i-1-1200wx1200h.jpeg",
    ],
    stock: 18,
    features: ["3 Star", "Single Door", "Elegant Inox"],
    specifications: { Capacity: "183L", Type: "Single Door", Star: "3 Star" },
  },
  {
    name: "Whirlpool 184 Litre 3 Star Direct Cool Single Door Refrigerator, Argus Grey",
    brand: "Whirlpool",
    price: 14490,
    description: "3 Star Direct Cool Single Door, Argus Grey",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/LVbIxsmBKp-whirlpool-3s-impc-refrigerator-493692323-i-1-1200wx1200h.jpeg",
    ],
    stock: 15,
    features: ["3 Star", "Direct Cool", "Argus Grey"],
    specifications: { Capacity: "184L", Type: "Single Door", Star: "3 Star" },
  },
  {
    name: "Haier 265 L 2 Star Double Door Refrigerator, Black Glass, HRB-2764BG",
    brand: "Haier",
    price: 30990,
    description: "2 Star Double Door, Black Glass",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/LVbIxsmBKp-whirlpool-3s-impc-refrigerator-493692323-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["2 Star", "Double Door", "Black Glass"],
    specifications: { Capacity: "265L", Type: "Double Door", Star: "2 Star" },
  },
  {
    name: "Godrej 272 Litre 2 Star Frost Free Double Door Refrigerator, Black",
    brand: "Godrej",
    price: 29190,
    description: "2 Star Frost Free Double Door, Black",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/tS3I-45Q6u-godrej-rteoncrystal310b-refrigerator-493692411-i-1-1200wx1200h.jpeg",
    ],
    stock: 12,
    features: ["2 Star", "Frost Free", "Double Door"],
    specifications: { Capacity: "272L", Type: "Double Door", Star: "2 Star" },
  },
  {
    name: "LG 190 L 4 Star Inverter Direct-Cool Single Door Refrigerator",
    brand: "LG",
    price: 15490,
    description: "4 Star Inverter Direct-Cool Single Door",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/tS3I-45Q6u-godrej-rteoncrystal310b-refrigerator-493692411-i-1-1200wx1200h.jpeg",
    ],
    stock: 14,
    features: ["4 Star", "Inverter", "Direct-Cool"],
    specifications: { Capacity: "190L", Type: "Single Door", Star: "4 Star" },
  },
  {
    name: "Samsung 198 L 4 Star Inverter Direct Cool Single Door Refrigerator",
    brand: "Samsung",
    price: 17990,
    description: "4 Star Inverter Direct Cool Single Door",
    images: [
      "https://images.samsung.com/is/image/samsung/p6pim/in/rr20c1824sl-hl/gallery/in-top-mount-freezer-rr20c1824sl-hl-535678991?$650_519_PNG$",
    ],
    stock: 16,
    features: ["4 Star", "Inverter", "Direct Cool"],
    specifications: { Capacity: "198L", Type: "Single Door", Star: "4 Star" },
  },
  {
    name: "Haier 320 L 3 Star Frost Free Double Door Refrigerator, Black Glass",
    brand: "Haier",
    price: 34990,
    description: "3 Star Frost Free Double Door, Black Glass",
    images: [
      "https://www.haier.com/in/images/product/202203/1647339649632.jpg",
    ],
    stock: 8,
    features: ["3 Star", "Frost Free", "Double Door"],
    specifications: { Capacity: "320L", Type: "Double Door", Star: "3 Star" },
  },
  {
    name: "Whirlpool 265 L 3 Star Frost Free Double Door Refrigerator",
    brand: "Whirlpool",
    price: 27990,
    description: "3 Star Frost Free Double Door",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/LVbIxsmBKp-whirlpool-3s-impc-refrigerator-493692323-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["3 Star", "Frost Free", "Double Door"],
    specifications: { Capacity: "265L", Type: "Double Door", Star: "3 Star" },
  },
  {
    name: "Godrej 185 L 4 Star Inverter Direct Cool Single Door Refrigerator",
    brand: "Godrej",
    price: 15990,
    description: "4 Star Inverter Direct Cool Single Door",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/tS3I-45Q6u-godrej-rteoncrystal310b-refrigerator-493692411-i-1-1200wx1200h.jpeg",
    ],
    stock: 9,
    features: ["4 Star", "Inverter", "Direct Cool"],
    specifications: { Capacity: "185L", Type: "Single Door", Star: "4 Star" },
  },
  // Sound Systems (10 products)
  {
    name: "Sony HT-A7000 Soundbar",
    brand: "Sony",
    price: 49999,
    description: "Premium soundbar with immersive audio",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/dG_TS3SZIg-samsung-sb-prm-q990d-494410400-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Soundbar", "Dolby Atmos", "Wireless Subwoofer"],
    specifications: { Type: "Soundbar", Brand: "Sony" },
  },
  {
    name: "Bose Smart Soundbar 900",
    brand: "Bose",
    price: 69999,
    description: "Smart soundbar with Alexa and Google Assistant",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/b7LFlOYijt-jbl-bar-2-1deepbassmk2-soundbar-493666766-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["Smart Soundbar", "Voice Assistant", "Wireless"],
    specifications: { Type: "Soundbar", Brand: "Bose" },
  },
  {
    name: "JBL Bar 5.1",
    brand: "JBL",
    price: 29999,
    description: "5.1 channel soundbar with surround speakers",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/5vSwe4i-4O-sony-5-1-ch-soundbar-home-theatre-s20r-black-491666475-i-1-1200wx1200h.jpeg",
    ],
    stock: 12,
    features: ["5.1 Channel", "Wireless Subwoofer", "Detachable Speakers"],
    specifications: { Type: "Soundbar", Brand: "JBL" },
  },
  {
    name: "Samsung HW-Q800B",
    brand: "Samsung",
    price: 39999,
    description: "Dolby Atmos soundbar with wireless subwoofer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/LkxiyatJLs-jbl-bar-500-pro-soundbar-493666767-i-1-1200wx1200h.jpeg",
    ],
    stock: 9,
    features: ["Dolby Atmos", "Wireless Subwoofer", "Q-Symphony"],
    specifications: { Type: "Soundbar", Brand: "Samsung" },
  },
  {
    name: "LG SP9YA",
    brand: "LG",
    price: 44999,
    description: "High-end soundbar with Meridian technology",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/xDyws3odHK-jbl-soundbar-494410620-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["Meridian", "Dolby Atmos", "Wireless"],
    specifications: { Type: "Soundbar", Brand: "LG" },
  },
  {
    name: "Philips TAPB603",
    brand: "Philips",
    price: 19999,
    description: "Soundbar with wireless subwoofer",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/xDyws3odHK-jbl-soundbar-494410620-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Wireless Subwoofer", "Bluetooth", "Dolby Audio"],
    specifications: { Type: "Soundbar", Brand: "Philips" },
  },
  {
    name: "Yamaha YAS-209",
    brand: "Yamaha",
    price: 24999,
    description: "Soundbar with built-in Alexa",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/LkxiyatJLs-jbl-bar-500-pro-soundbar-493666767-i-1-1200wx1200h.jpeg",
    ],
    stock: 6,
    features: ["Alexa Built-in", "Wireless Subwoofer", "DTS Virtual:X"],
    specifications: { Type: "Soundbar", Brand: "Yamaha" },
  },
  {
    name: "TCL TS8131",
    brand: "TCL",
    price: 17999,
    description: "Soundbar with Dolby Atmos",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/5vSwe4i-4O-sony-5-1-ch-soundbar-home-theatre-s20r-black-491666475-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["Dolby Atmos", "Bluetooth", "HDMI ARC"],
    specifications: { Type: "Soundbar", Brand: "TCL" },
  },
  {
    name: "Mi Soundbar",
    brand: "Mi",
    price: 15999,
    description: "Affordable soundbar with powerful sound",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/b7LFlOYijt-jbl-bar-2-1deepbassmk2-soundbar-493666766-i-1-1200wx1200h.jpeg",
    ],
    stock: 15,
    features: ["Powerful Sound", "Bluetooth", "Affordable"],
    specifications: { Type: "Soundbar", Brand: "Mi" },
  },
  {
    name: "OnePlus Soundbar",
    brand: "OnePlus",
    price: 21999,
    description: "New launch soundbar with premium features",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/dG_TS3SZIg-samsung-sb-prm-q990d-494410400-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Premium", "Bluetooth", "HDMI ARC"],
    specifications: { Type: "Soundbar", Brand: "OnePlus" },
  },

  // Tablets (10 products)
  {
    name: "Apple iPad Pro 12.9-inch (6th Generation)",
    brand: "Apple",
    price: 99999,
    description: "Latest iPad Pro with M2 chip",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/HL261JuJW9-samsung-tab-s9-fe-494268092-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["M2 Chip", "12.9-inch", "ProMotion"],
    specifications: { Type: "Tablet", Brand: "Apple" },
  },
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    brand: "Samsung",
    price: 89999,
    description: "Flagship Android tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/k3ME9uJRHR-lenovo-m11-20-tablet-494352968-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["S Pen", "AMOLED", "Ultra"],
    specifications: { Type: "Tablet", Brand: "Samsung" },
  },
  {
    name: "Lenovo Tab P12 Pro",
    brand: "Lenovo",
    price: 49999,
    description: "Premium Lenovo tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/S4tSOeYi49-oneplus-pad-go-8-gb-ram-128-gb-twin-mint-wi-fi-tablet-494268170-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["AMOLED", "Dolby Vision", "Snapdragon"],
    specifications: { Type: "Tablet", Brand: "Lenovo" },
  },
  {
    name: "Xiaomi Pad 6 Pro",
    brand: "Xiaomi",
    price: 39999,
    description: "High-performance Xiaomi tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/my_nplQwPy-ipad-11th-gen-wifi-494494353-i-1-1200wx1200h.jpeg",
    ],
    stock: 9,
    features: ["Snapdragon", "120Hz", "Dolby Atmos"],
    specifications: { Type: "Tablet", Brand: "Xiaomi" },
  },
  {
    name: "Realme Pad X",
    brand: "Realme",
    price: 24999,
    description: "Affordable Realme tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/2Jy1lhrI60-apple-ipad-air-m3-wifi-tablet-494494381-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Snapdragon", "11-inch", "Dolby Atmos"],
    specifications: { Type: "Tablet", Brand: "Realme" },
  },
  {
    name: "OnePlus Pad",
    brand: "OnePlus",
    price: 37999,
    description: "Premium OnePlus tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/2Jy1lhrI60-apple-ipad-air-m3-wifi-tablet-494494381-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["11.6-inch", "Dolby Vision", "Fast Charging"],
    specifications: { Type: "Tablet", Brand: "OnePlus" },
  },
  {
    name: "iQOO Pad",
    brand: "iQOO",
    price: 29999,
    description: "High-performance iQOO tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/my_nplQwPy-ipad-11th-gen-wifi-494494353-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["Snapdragon", "11-inch", "Dolby Atmos"],
    specifications: { Type: "Tablet", Brand: "iQOO" },
  },
  {
    name: "OPPO Pad Air",
    brand: "OPPO",
    price: 19999,
    description: "Affordable OPPO tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/S4tSOeYi49-oneplus-pad-go-8-gb-ram-128-gb-twin-mint-wi-fi-tablet-494268170-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Snapdragon", "10.3-inch", "Dolby Atmos"],
    specifications: { Type: "Tablet", Brand: "OPPO" },
  },
  {
    name: "Vivo Pad",
    brand: "Vivo",
    price: 27999,
    description: "Vivo tablet with great display",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/k3ME9uJRHR-lenovo-m11-20-tablet-494352968-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["Snapdragon", "11-inch", "Dolby Atmos"],
    specifications: { Type: "Tablet", Brand: "Vivo" },
  },
  {
    name: "Honor Pad X8",
    brand: "Honor",
    price: 15999,
    description: "Affordable Honor tablet",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/HL261JuJW9-samsung-tab-s9-fe-494268092-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["MediaTek", "10.1-inch", "Dolby Atmos"],
    specifications: { Type: "Tablet", Brand: "Honor" },
  },

  // Televisions (10 products)
  {
    name: "Redmi 81.28 cm (32 inch) Smart Fire TV, Black, ELA5577IN, 2024",
    brand: "Redmi",
    price: 10990,
    description: "Smart Fire TV, 2024 Edition",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 10,
    features: ["Smart TV", "Fire TV", "32 inch"],
    specifications: { Type: "LED", Size: "32 inch" },
  },
  {
    name: "Samsung wondertainment 80 cm (32 Inch) HD Ready LED Smart TV",
    brand: "Samsung",
    price: 13989,
    description: "HD Ready LED Smart TV",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 8,
    features: ["HD Ready", "LED", "Smart TV"],
    specifications: { Type: "LED", Size: "32 inch" },
  },
  {
    name: "NVY 109 cm (43 inch) QLED Smart TV, NVO43SFR1, Black",
    brand: "NVY",
    price: 14999,
    description: "QLED Smart TV, 43 inch",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 7,
    features: ["QLED", "Smart TV", "43 inch"],
    specifications: { Type: "QLED", Size: "43 inch" },
  },
  {
    name: "Xiaomi A Series 81.28 cm (32 inches) HD Ready Smart Google TV",
    brand: "Xiaomi",
    price: 11999,
    description: "HD Ready Smart Google TV",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 9,
    features: ["HD Ready", "Google TV", "32 inch"],
    specifications: { Type: "LED", Size: "32 inch" },
  },
  {
    name: "TCL 81.28 cm (32 inch) Full HD QLED Google TV, 32S5K",
    brand: "TCL",
    price: 15990,
    description: "Full HD QLED Google TV",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 10,
    features: ["Full HD", "QLED", "Google TV"],
    specifications: { Type: "QLED", Size: "32 inch" },
  },
  {
    name: "LG 80 cm (32 inch) HD Ready Smart LED TV",
    brand: "LG",
    price: 12999,
    description: "HD Ready Smart LED TV",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 8,
    features: ["HD Ready", "LED", "Smart TV"],
    specifications: { Type: "LED", Size: "32 inch" },
  },
  {
    name: "Samsung 80 cm (32 inch) HD Ready Smart TV",
    brand: "Samsung",
    price: 13999,
    description: "HD Ready Smart TV",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 7,
    features: ["HD Ready", "Smart TV", "32 inch"],
    specifications: { Type: "LED", Size: "32 inch" },
  },
  {
    name: "Redmi 81.28 cm (32 inch) Smart Fire TV, Black, ELA5577IN, 2024",
    brand: "Redmi",
    price: 10990,
    description: "Smart Fire TV, 2024 Edition",
    images: [
      "https://rukminim2.flixcart.com/image/416/416/xif0q/television/0/6/6/-original-imagwzrgzqzqzqzq.jpeg",
    ],
    stock: 10,
    features: ["Smart TV", "Fire TV", "32 inch"],
    specifications: { Type: "LED", Size: "32 inch" },
  },
  {
    name: "Philips 32PHT6815/94 32 inch HD Ready LED TV",
    brand: "Philips",
    price: 11999,
    description: "HD Ready LED TV",
    images: [
      "https://images.philips.com/is/image/PhilipsConsumer/32PHT6815_94-IMS-en_IN?$jpglarge$&wid=1250",
    ],
    stock: 8,
    features: ["HD Ready", "LED", "32 inch"],
    specifications: { Type: "LED", Size: "32 inch" },
  },
  {
    name: "Sony Bravia 80 cm (32 inch) HD Ready Smart TV",
    brand: "Sony",
    price: 15990,
    description: "HD Ready Smart TV",
    images: [
      "https://www.sony.co.in/image/2e7e2e7e2e7e2e7e2e7e2e7e2e7e2e7e?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
    ],
    stock: 10,
    features: ["HD Ready", "Smart TV", "32 inch"],
    specifications: { Type: "LED", Size: "32 inch" },
  },

  // Washing Machines (10 products)
  {
    name: "Samsung 8.5 kg Fully Automatic Front Load",
    brand: "Samsung",
    price: 39999,
    description: "8.5 kg Fully Automatic Front Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/iHXOfv5i0--lg-t70spsf2z-washing-machines-491903052-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Front Load", "Fully Automatic", "8.5 kg"],
    specifications: { Type: "Front Load", Capacity: "8.5 kg" },
  },
  {
    name: "LG 7 kg Fully Automatic Front Load",
    brand: "LG",
    price: 29999,
    description: "7 kg Fully Automatic Front Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/OQtnTzVRKO-lg-washing-machine-493858072-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["Front Load", "Fully Automatic", "7 kg"],
    specifications: { Type: "Front Load", Capacity: "7 kg" },
  },
  {
    name: "Whirlpool 7.5 kg Fully Automatic Top Load",
    brand: "Whirlpool",
    price: 24999,
    description: "7.5 kg Fully Automatic Top Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/askH-1tdpR-samsung-wa70bg4441bytl-washing-machine-493620577-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["Top Load", "Fully Automatic", "7.5 kg"],
    specifications: { Type: "Top Load", Capacity: "7.5 kg" },
  },
  {
    name: "Bosch 7 kg Fully Automatic Front Load",
    brand: "Bosch",
    price: 34999,
    description: "7 kg Fully Automatic Front Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/GWnzE2677f-wa80bg4542bdtl-493666482-i-1-1200wx1200h.jpeg",
    ],
    stock: 9,
    features: ["Front Load", "Fully Automatic", "7 kg"],
    specifications: { Type: "Front Load", Capacity: "7 kg" },
  },
  {
    name: "IFB 6.5 kg Fully Automatic Front Load",
    brand: "IFB",
    price: 27999,
    description: "6.5 kg Fully Automatic Front Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/6lKNyNznEs-t70ajmb1z-493858073-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Front Load", "Fully Automatic", "6.5 kg"],
    specifications: { Type: "Front Load", Capacity: "6.5 kg" },
  },
  {
    name: "Haier 6.2 kg Fully Automatic Top Load",
    brand: "Haier",
    price: 19999,
    description: "6.2 kg Fully Automatic Top Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/6lKNyNznEs-t70ajmb1z-493858073-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["Top Load", "Fully Automatic", "6.2 kg"],
    specifications: { Type: "Top Load", Capacity: "6.2 kg" },
  },
  {
    name: "Panasonic 6.5 kg Fully Automatic Top Load",
    brand: "Panasonic",
    price: 21999,
    description: "6.5 kg Fully Automatic Top Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/6lKNyNznEs-t70ajmb1z-493858073-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["Top Load", "Fully Automatic", "6.5 kg"],
    specifications: { Type: "Top Load", Capacity: "6.5 kg" },
  },
  {
    name: "Godrej 6.5 kg Fully Automatic Top Load",
    brand: "Godrej",
    price: 18999,
    description: "6.5 kg Fully Automatic Top Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/6lKNyNznEs-t70ajmb1z-493858073-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["Top Load", "Fully Automatic", "6.5 kg"],
    specifications: { Type: "Top Load", Capacity: "6.5 kg" },
  },
  {
    name: "Voltas Beko 7 kg Fully Automatic Top Load",
    brand: "Voltas Beko",
    price: 20999,
    description: "7 kg Fully Automatic Top Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/6lKNyNznEs-t70ajmb1z-493858073-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["Top Load", "Fully Automatic", "7 kg"],
    specifications: { Type: "Top Load", Capacity: "7 kg" },
  },
  {
    name: "Candy 7 kg Fully Automatic Top Load",
    brand: "Candy",
    price: 17999,
    description: "7 kg Fully Automatic Top Load Washing Machine",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/6lKNyNznEs-t70ajmb1z-493858073-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["Top Load", "Fully Automatic", "7 kg"],
    specifications: { Type: "Top Load", Capacity: "7 kg" },
  },

  // Watches (10 products)
  {
    name: "Apple Watch Series 9 GPS 41mm Midnight Aluminium Case",
    brand: "Apple",
    price: 41900,
    description: "Latest Apple Watch Series 9",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 10,
    features: ["GPS", "41mm", "Midnight Aluminium"],
    specifications: { Type: "Smartwatch", Brand: "Apple" },
  },
  {
    name: "Samsung Galaxy Watch 6 Classic 47mm Bluetooth",
    brand: "Samsung",
    price: 34999,
    description: "Galaxy Watch 6 Classic 47mm Bluetooth",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHdhdGNofGVufDB8fDB8fHww",
    ],
    stock: 8,
    features: ["Bluetooth", "47mm", "Classic"],
    specifications: { Type: "Smartwatch", Brand: "Samsung" },
  },
  {
    name: "Fitbit Sense 2 Advanced Health Smartwatch",
    brand: "Fitbit",
    price: 24999,
    description: "Advanced Health Smartwatch",
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    ],
    stock: 7,
    features: ["Health Tracking", "Smartwatch"],
    specifications: { Type: "Smartwatch", Brand: "Fitbit" },
  },
  {
    name: "Apple Watch SE GPS 40mm Midnight Aluminium Case",
    brand: "Apple",
    price: 29900,
    description: "Apple Watch SE GPS 40mm",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 10,
    features: ["GPS", "40mm", "Midnight Aluminium"],
    specifications: { Type: "Smartwatch", Brand: "Apple" },
  },
  {
    name: "Samsung Galaxy Watch 6 40mm Bluetooth",
    brand: "Samsung",
    price: 24999,
    description: "Galaxy Watch 6 40mm Bluetooth",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHdhdGNofGVufDB8fDB8fHww",
    ],
    stock: 8,
    features: ["Bluetooth", "40mm"],
    specifications: { Type: "Smartwatch", Brand: "Samsung" },
  },
  {
    name: "Garmin Venu Sq 2 Music Edition Smartwatch",
    brand: "Garmin",
    price: 29999,
    description: "Music Edition Smartwatch",
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    ],
    stock: 7,
    features: ["Music Edition", "Smartwatch"],
    specifications: { Type: "Smartwatch", Brand: "Garmin" },
  },
  {
    name: "Apple Watch Series 8 GPS 45mm Starlight Aluminium Case",
    brand: "Apple",
    price: 45900,
    description: "Apple Watch Series 8 GPS 45mm",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 10,
    features: ["GPS", "45mm", "Starlight Aluminium"],
    specifications: { Type: "Smartwatch", Brand: "Apple" },
  },
  {
    name: "Samsung Galaxy Watch 5 Pro 45mm Bluetooth",
    brand: "Samsung",
    price: 39999,
    description: "Galaxy Watch 5 Pro 45mm Bluetooth",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHdhdGNofGVufDB8fDB8fHww",
    ],
    stock: 8,
    features: ["Bluetooth", "45mm", "Pro"],
    specifications: { Type: "Smartwatch", Brand: "Samsung" },
  },

  // Water Filters (10 products)
  {
    name: "Kent Grand Plus RO Water Purifier",
    brand: "Kent",
    price: 15999,
    description: "RO Water Purifier with multiple purification",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/X4xWujPOSJ-livpure-water-purifiers-blue-494226777-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["RO", "Multiple Purification"],
    specifications: { Type: "RO", Brand: "Kent" },
  },
  {
    name: "Aquaguard Aura RO+UV+UF",
    brand: "Aquaguard",
    price: 13999,
    description: "RO+UV+UF Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/j9A4xcgxzh-havells-delite-kopere-494405096-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["RO+UV+UF", "Multiple Purification"],
    specifications: { Type: "RO+UV+UF", Brand: "Aquaguard" },
  },
  {
    name: "Pureit Advanced RO+UV+MF",
    brand: "Pureit",
    price: 11999,
    description: "RO+UV+MF Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/QLx61cFxtL-aquaguard-jazz-water-purifiers-492284154-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["RO+UV+MF", "Multiple Purification"],
    specifications: { Type: "RO+UV+MF", Brand: "Pureit" },
  },
  {
    name: "Livpure Glo RO+UV",
    brand: "Livpure",
    price: 9999,
    description: "RO+UV Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/7zNlekVBAW-aquaguard-superio-water-purifier-493692085-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["RO+UV", "Multiple Purification"],
    specifications: { Type: "RO+UV", Brand: "Livpure" },
  },
  {
    name: "Blue Star Aristo RO+UV",
    brand: "Blue Star",
    price: 8999,
    description: "RO+UV Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/1f4z0rZ3yo-ao-smith-z2-pro-494226748-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["RO+UV", "Multiple Purification"],
    specifications: { Type: "RO+UV", Brand: "Blue Star" },
  },
  {
    name: "Havells Max RO+UV+UF",
    brand: "Havells",
    price: 7999,
    description: "RO+UV+UF Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/1f4z0rZ3yo-ao-smith-z2-pro-494226748-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["RO+UV+UF", "Multiple Purification"],
    specifications: { Type: "RO+UV+UF", Brand: "Havells" },
  },
  {
    name: "AO Smith Z8 RO+UV",
    brand: "AO Smith",
    price: 10999,
    description: "RO+UV Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/1f4z0rZ3yo-ao-smith-z2-pro-494226748-i-1-1200wx1200h.jpeg",
    ],
    stock: 7,
    features: ["RO+UV", "Multiple Purification"],
    specifications: { Type: "RO+UV", Brand: "AO Smith" },
  },
  {
    name: "Eureka Forbes Aquasure",
    brand: "Eureka Forbes",
    price: 6999,
    description: "Aquasure Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/1f4z0rZ3yo-ao-smith-z2-pro-494226748-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["Aquasure", "Multiple Purification"],
    specifications: { Type: "Aquasure", Brand: "Eureka Forbes" },
  },
  {
    name: "Whirlpool Pure RO+UV",
    brand: "Whirlpool",
    price: 8999,
    description: "RO+UV Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/1f4z0rZ3yo-ao-smith-z2-pro-494226748-i-1-1200wx1200h.jpeg",
    ],
    stock: 8,
    features: ["RO+UV", "Multiple Purification"],
    specifications: { Type: "RO+UV", Brand: "Whirlpool" },
  },
  {
    name: "Aquafresh RO+UV+UF",
    brand: "Aquafresh",
    price: 5999,
    description: "RO+UV+UF Water Purifier",
    images: [
      "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:250/1f4z0rZ3yo-ao-smith-z2-pro-494226748-i-1-1200wx1200h.jpeg",
    ],
    stock: 10,
    features: ["RO+UV+UF", "Multiple Purification"],
    specifications: { Type: "RO+UV+UF", Brand: "Aquafresh" },
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log("Categories seeded successfully");

    // Map category names to their IDs
    const categoryMap = {};
    createdCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    // Add category IDs to products
    const productsWithCategories = products.map((product) => {
      let categoryId;
      if (
        product.name.toLowerCase().includes("iphone") ||
        product.name.toLowerCase().includes("samsung galaxy") ||
        product.name.toLowerCase().includes("oneplus") ||
        product.name.toLowerCase().includes("google pixel") ||
        product.name.toLowerCase().includes("nothing phone")
      ) {
        categoryId = categoryMap["Smartphones"];
      } else if (
        product.name.toLowerCase().includes("laptop") ||
        product.name.toLowerCase().includes("macbook") ||
        product.name.toLowerCase().includes("thinkpad") ||
        product.name.toLowerCase().includes("inspiron") ||
        product.name.toLowerCase().includes("vivo")
      ) {
        categoryId = categoryMap["Laptops"];
      } else if (
        product.name.toLowerCase().includes("earpod") ||
        product.name.toLowerCase().includes("buds") ||
        product.name.toLowerCase().includes("headphone") ||
        product.name.toLowerCase().includes("speaker") ||
        product.name.toLowerCase().includes("wireless")
      ) {
        categoryId = categoryMap["Earphones"];
      } else {
        categoryId = categoryMap["Printers"];
      }
      return { ...product, category: categoryId };
    });

    // Insert products
    await Product.insertMany(productsWithCategories);
    console.log("Products seeded successfully");

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
