export const productsData = [
  {
    id: 1,
    title: "Apex Smart Watch Series X",
    price: 299.99,
    originalPrice: 349.99,
    stock: 45,
    category: "Wearables",
    imageSrc: "/images/watch.png",
    status: "Active",
    reviews: 124,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Quantum Noise-Cancelling Headphones",
    price: 199.50,
    originalPrice: 249.00,
    stock: 12,
    category: "Audio",
    imageSrc: "/images/headphones.png",
    status: "Low Stock",
    reviews: 356,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Nexus Pro Tablet 11\"",
    price: 599.00,
    originalPrice: null,
    stock: 89,
    category: "Tablets",
    imageSrc: "/images/tablet.png",
    status: "Active",
    reviews: 89,
    rating: 4.5,
  },
  {
    id: 4,
    title: "UltraCharge Power Bank 20k",
    price: 49.99,
    originalPrice: 59.99,
    stock: 0,
    category: "Accessories",
    imageSrc: "/images/powerbank.png",
    status: "Out of Stock",
    reviews: 412,
    rating: 4.2,
  },
];

export const usersData = [
  {
    id: "USR-001",
    name: "Alex Thompson",
    email: "alex.t@example.com",
    role: "Admin",
    status: "Active",
    joined: "2023-11-12",
  },
  {
    id: "USR-002",
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    role: "Customer",
    status: "Active",
    joined: "2024-01-05",
  },
  {
    id: "USR-003",
    name: "Marcus Johnson",
    email: "mjohnson88@example.com",
    role: "Customer",
    status: "Suspended",
    joined: "2024-02-18",
  },
  {
    id: "USR-004",
    name: "Elena Rodriguez",
    email: "erodriguez@example.com",
    role: "Manager",
    status: "Active",
    joined: "2023-09-30",
  },
];

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: string;
  items: number;
  itemsList: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  phone: string;
}

export const ordersData: Order[] = [
  {
    id: "ORD-9482",
    customer: "Samantha Lee",
    email: "sam.lee@example.com",
    date: "2024-06-02",
    total: 349.98,
    status: "Processing",
    items: 2,
    itemsList: [
      { name: "Apex Smart Watch Series X", price: 299.99, quantity: 1, image: "/images/watch.png" },
      { name: "UltraCharge Power Bank 20k", price: 49.99, quantity: 1, image: "/images/powerbank.png" },
    ],
    shippingAddress: "123 Oak Street, San Francisco, CA 94102",
    paymentMethod: "Visa •••• 4242",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "ORD-9481",
    customer: "David Chen",
    email: "d.chen@example.com",
    date: "2024-06-01",
    total: 199.50,
    status: "Shipped",
    items: 1,
    itemsList: [
      { name: "Quantum Noise-Cancelling Headphones", price: 199.50, quantity: 1, image: "/images/headphones.png" },
    ],
    shippingAddress: "456 Maple Ave, New York, NY 10001",
    paymentMethod: "Mastercard •••• 8888",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "ORD-9480",
    customer: "Elena Rodriguez",
    email: "elena.r@example.com",
    date: "2024-05-30",
    total: 898.99,
    status: "Delivered",
    items: 3,
    itemsList: [
      { name: "Nexus Pro Tablet 11\"", price: 599.00, quantity: 1, image: "/images/tablet.png" },
      { name: "Quantum Noise-Cancelling Headphones", price: 199.50, quantity: 1, image: "/images/headphones.png" },
      { name: "UltraCharge Power Bank 20k", price: 49.99, quantity: 1, image: "/images/powerbank.png" },
    ],
    shippingAddress: "789 Pine Lane, Los Angeles, CA 90001",
    paymentMethod: "Apple Pay",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "ORD-9479",
    customer: "Marcus Johnson",
    email: "mjohnson88@example.com",
    date: "2024-05-29",
    total: 49.99,
    status: "Cancelled",
    items: 1,
    itemsList: [
      { name: "UltraCharge Power Bank 20k", price: 49.99, quantity: 1, image: "/images/powerbank.png" },
    ],
    shippingAddress: "321 Elm Street, Chicago, IL 60601",
    paymentMethod: "PayPal",
    phone: "+1 (555) 321-0987",
  },
];

export const reviewsData = [
  {
    id: 1,
    product: "Quantum Noise-Cancelling Headphones",
    customer: "John Doe",
    rating: 5,
    comment: "Best headphones I've ever owned. The noise cancellation is unreal!",
    status: "Approved",
    date: "2024-06-01",
  },
  {
    id: 2,
    product: "UltraCharge Power Bank 20k",
    customer: "Sarah Williams",
    rating: 2,
    comment: "Takes way too long to charge itself. Disappointed.",
    status: "Pending",
    date: "2024-06-02",
  },
  {
    id: 3,
    product: "Apex Smart Watch Series X",
    customer: "Mike Peterson",
    rating: 4,
    comment: "Great watch, battery life could be a bit better but overall solid.",
    status: "Approved",
    date: "2024-05-28",
  },
];
