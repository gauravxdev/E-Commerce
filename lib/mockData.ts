export const products = [
  {
    id: 1,
    imageSrc: "https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=500&q=80",
    title: "Light Gorsun Headphones",
    reviews: 2836,
    originalPrice: 248.00,
    price: 188.00,
    bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100",
    badges: ["Today's Deal", "10% off"],
    description: "Experience unparalleled sound quality with the Light Gorsun Headphones. Designed for audiophiles who demand both performance and style, these headphones feature advanced noise-cancellation technology and a lightweight, ergonomic design for all-day comfort.",
    features: [
      { title: "Active Noise Cancellation", description: "Block out the world and immerse yourself in your music." },
      { title: "30-Hour Battery Life", description: "Listen all day and night on a single charge." },
      { title: "Bluetooth 5.2", description: "Seamless, low-latency wireless connectivity." }
    ],
    specs: {
      "Weight": "250g",
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Connectivity": "Bluetooth 5.2, 3.5mm Aux"
    },
    ratings: {
      average: 4.8,
      fiveStar: 80,
      fourStar: 15,
      threeStar: 3,
      twoStar: 1,
      oneStar: 1
    }
  },
  {
    id: 2,
    imageSrc: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    title: "Blue version airpods",
    reviews: 2836,
    originalPrice: 248.00,
    price: 188.00,
    bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
    badges: ["Best Seller"],
    description: "Compact, powerful, and truly wireless. These premium earbuds deliver exceptional audio clarity with deep bass and crisp highs. The sleek blue finish adds a touch of personality to your daily commute or workout routine.",
    features: [
      { title: "True Wireless", description: "No cables, no limits. Complete freedom of movement." },
      { title: "Water Resistant", description: "IPX4 rated to withstand sweat and light rain." },
      { title: "Touch Controls", description: "Easily manage playback and calls with intuitive touch gestures." }
    ],
    specs: {
      "Weight": "4g per earbud",
      "Driver Size": "10mm dynamic",
      "Battery": "6 hours (24h with case)",
      "Charging": "USB-C & Qi Wireless"
    },
    ratings: {
      average: 4.6,
      fiveStar: 75,
      fourStar: 20,
      threeStar: 3,
      twoStar: 1,
      oneStar: 1
    }
  },
  {
    id: 3,
    imageSrc: "https://images.unsplash.com/photo-1603898037225-9ba6900f0ce1?w=500&q=80",
    title: "iphone 15 pro Max",
    reviews: 2836,
    originalPrice: 248.00,
    price: 188.00,
    bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
    description: "The ultimate smartphone experience. Featuring a stunning aerospace-grade titanium design, a revolutionary camera system, and the bleeding-edge A17 Pro chip for unprecedented performance in mobile gaming and productivity.",
    features: [
      { title: "Titanium Design", description: "Strong, lightweight, and absolutely beautiful." },
      { title: "A17 Pro Chip", description: "Console-level gaming in the palm of your hand." },
      { title: "Pro Camera System", description: "Shoot incredible spatial video and professional portraits." }
    ],
    specs: {
      "Display": "6.7-inch Super Retina XDR",
      "Processor": "A17 Pro",
      "Storage": "256GB / 512GB / 1TB",
      "Camera": "48MP Main, 12MP Ultrawide, 12MP Telephoto"
    },
    ratings: {
      average: 4.9,
      fiveStar: 90,
      fourStar: 8,
      threeStar: 1,
      twoStar: 0,
      oneStar: 1
    }
  },
  {
    id: 4,
    imageSrc: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    title: "Electronics Sound Speakers",
    reviews: 2836,
    originalPrice: 248.00,
    price: 188.00,
    bgColor: "bg-gradient-to-br from-yellow-100 to-amber-100",
    badges: ["New Arrival"],
    description: "Fill your room with rich, immersive audio. This smart speaker combines elegant design with powerful acoustic engineering to deliver room-filling sound. Built-in smart assistant capabilities let you control your smart home effortlessly.",
    features: [
      { title: "360° Sound", description: "Uniform audio distribution throughout any space." },
      { title: "Smart Home Hub", description: "Control lights, locks, and more with your voice." },
      { title: "Multi-room Audio", description: "Sync multiple speakers for a whole-home audio setup." }
    ],
    specs: {
      "Output Power": "50W RMS",
      "Connectivity": "Wi-Fi, Bluetooth 5.0",
      "Microphones": "4 far-field mic array",
      "Dimensions": "150mm x 150mm x 200mm"
    },
    ratings: {
      average: 4.5,
      fiveStar: 70,
      fourStar: 20,
      threeStar: 5,
      twoStar: 3,
      oneStar: 2
    }
  }
];

// Helper function to get product by id
export const getProductById = (id: number) => {
  // If we only have 4 detailed mock items, fallback to item 1 for other IDs to prevent crashing
  const product = products.find(p => p.id === id);
  return product || { ...products[0], id, title: `Mocked Product ${id}` };
};

// Shared mock cart data
export const cartItems = [
  {
    id: 1,
    imageSrc: "https://images.unsplash.com/photo-1546435770-a3e426fa47ce?w=500&q=80",
    title: "Light Gorsun Headphones",
    price: 188.00,
    quantity: 1,
    bgColor: "bg-gradient-to-br from-blue-100 to-indigo-100",
  },
  {
    id: 5,
    imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    title: "Snopex Studio Pro",
    price: 249.00,
    quantity: 2,
    bgColor: "bg-gradient-to-br from-red-100 to-orange-100",
  }
];
