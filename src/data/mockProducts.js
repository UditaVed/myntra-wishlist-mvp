// Mock Products Catalog - Expanded to 30+ products per category with rich fashion data

const generateProducts = () => {
  const brands = ['Nautica', 'Anouk', 'Louis Philippe Jeans', 'Snitch', 'CAHOOT', 'Roadster', 'Levis', 'HRX', 'Puma', 'MANGO', 'U.S. Polo Assn.', 'Biba', 'W', 'Allen Solly', 'HIGHLANDER', 'Crimsoune Club', 'Mast & Harbour', 'HERE&NOW'];
  
  const menImages = [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80'
  ];

  const womenImages = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&auto=format&fit=crop&q=80'
  ];

  const kidsImages = [
    'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=600&auto=format&fit=crop&q=80'
  ];

  const homeImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80'
  ];

  const productsList = [];
  let idCounter = 1;

  // 1. Generate 35 MEN Products
  const menTitles = [
    'Slim Fit Casual Shirt', 'Men Printed Casual Shirt', 'Regular Fit Cotton Shirt',
    'Striped Pure Cotton Shirt', 'Oversized Streetwear Tee', 'Solid Polo T-shirt',
    'Tapered Fit Denim Jeans', 'Slim Fit Cargo Trousers', 'Biker Leather Jacket',
    'Classic Denim Jacket', 'Athletic Gym Joggers', 'Graphic Printed Hoodie',
    'Linen Casual Blazer', 'Textured Knit Sweater', 'Casual Suede Loafers'
  ];

  for (let i = 0; i < 35; i++) {
    const origPrice = Math.floor(Math.random() * 2000) + 1200;
    const discount = Math.floor(Math.random() * 40) + 30; // 30% - 70%
    const price = Math.round(origPrice * (1 - discount / 100));
    
    productsList.push({
      id: `men-${idCounter++}`,
      category: 'MEN',
      brand: brands[i % brands.length],
      title: menTitles[i % menTitles.length],
      price: price,
      originalPrice: origPrice,
      discountPercent: discount,
      rating: (Math.random() * 1.2 + 3.8).toFixed(1), // 3.8 - 5.0
      ratingCount: `${(Math.random() * 20 + 1).toFixed(1)}k`,
      isAd: i % 4 === 0,
      image: menImages[i % menImages.length],
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blue', 'White', 'Black', 'Olive', 'Navy'],
      lowStockSize: i % 3 === 0 ? 'M' : null,
      stockCount: i % 3 === 0 ? Math.floor(Math.random() * 4) + 1 : 15,
      description: 'Crafted from premium 100% breathable cotton fabric with classic button closure, relaxed tailored fit, and contrast detailing.'
    });
  }

  // 2. Generate 35 WOMEN Products
  const womenTitles = [
    'Floral Printed A-Line Dress', 'Embellished Anarkali Kurta Set', 'High-Rise Wide Leg Jeans',
    'Casual Ribbed Crop Top', 'Solid Chiffon Saree', 'Ethnic Printed Kurti',
    'Pleated Midi Skirt', 'Oversized Knit Sweater', 'Classic Trench Coat',
    'Cotton Loungewear Set', 'Satin Wrap Party Dress', 'Tailored Formal Blazer'
  ];

  for (let i = 0; i < 35; i++) {
    const origPrice = Math.floor(Math.random() * 2500) + 1400;
    const discount = Math.floor(Math.random() * 45) + 30;
    const price = Math.round(origPrice * (1 - discount / 100));

    productsList.push({
      id: `women-${idCounter++}`,
      category: 'WOMEN',
      brand: brands[(i + 3) % brands.length],
      title: womenTitles[i % womenTitles.length],
      price: price,
      originalPrice: origPrice,
      discountPercent: discount,
      rating: (Math.random() * 1.0 + 4.0).toFixed(1),
      ratingCount: `${(Math.random() * 15 + 2).toFixed(1)}k`,
      isAd: i % 5 === 0,
      image: womenImages[i % womenImages.length],
      availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pink', 'Red', 'Yellow', 'Black', 'Beige'],
      lowStockSize: i % 2 === 0 ? 'S' : null,
      stockCount: i % 2 === 0 ? Math.floor(Math.random() * 3) + 1 : 20,
      description: 'Elegant contemporary design tailored from lightweight ultra-soft fabric, offering breathable all-day comfort and high versatility.'
    });
  }

  // 3. Generate 30 KIDS Products
  const kidsTitles = [
    'Boys Printed Cotton T-Shirt', 'Girls Floral Summer Dress', 'Kids Casual Denim Shorts',
    'Boys Ethnic Kurta Set', 'Girls Pleated Party Skirt', 'Kids Fleece Winter Jacket'
  ];

  for (let i = 0; i < 30; i++) {
    const origPrice = Math.floor(Math.random() * 1200) + 800;
    const discount = Math.floor(Math.random() * 35) + 25;
    const price = Math.round(origPrice * (1 - discount / 100));

    productsList.push({
      id: `kids-${idCounter++}`,
      category: 'KIDS',
      brand: brands[(i + 5) % brands.length],
      title: kidsTitles[i % kidsTitles.length],
      price: price,
      originalPrice: origPrice,
      discountPercent: discount,
      rating: (Math.random() * 0.8 + 4.2).toFixed(1),
      ratingCount: `${(Math.random() * 8 + 1).toFixed(1)}k`,
      isAd: i % 6 === 0,
      image: kidsImages[i % kidsImages.length],
      availableSizes: ['2-3Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y'],
      colors: ['Yellow', 'Blue', 'Red', 'Green'],
      lowStockSize: '3-4Y',
      stockCount: 3,
      description: 'Soft 100% skin-safe organic cotton tailored for max play mobility and gentle comfort.'
    });
  }

  // 4. Generate 30 HOME Products
  const homeTitles = [
    '100% Cotton King Bedsheet', 'Handmade Floor Carpet Rug', 'Blackout Window Curtains',
    'Nordic Table Lamp', 'Aroma Diffuser Candle Set', 'Soft Microfiber Bath Towels'
  ];

  for (let i = 0; i < 30; i++) {
    const origPrice = Math.floor(Math.random() * 3000) + 1500;
    const discount = Math.floor(Math.random() * 40) + 30;
    const price = Math.round(origPrice * (1 - discount / 100));

    productsList.push({
      id: `home-${idCounter++}`,
      category: 'HOME',
      brand: 'Home Centre',
      title: homeTitles[i % homeTitles.length],
      price: price,
      originalPrice: origPrice,
      discountPercent: discount,
      rating: (Math.random() * 0.7 + 4.3).toFixed(1),
      ratingCount: `${(Math.random() * 12 + 1).toFixed(1)}k`,
      isAd: false,
      image: homeImages[i % homeImages.length],
      availableSizes: ['Standard', 'Large'],
      colors: ['Beige', 'Grey', 'Navy', 'White'],
      lowStockSize: null,
      stockCount: 10,
      description: 'Premium home furnishing collection designed to elevate interior aesthetics with durable craftsmanship.'
    });
  }

  return productsList;
};

export const MOCK_PRODUCTS = generateProducts();
