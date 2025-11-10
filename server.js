require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Seed data endpoint (for initial setup)
app.post('/api/seed', async (req, res) => {
  const Product = require('./models/Product');
  
  const sampleProducts = [
    {
      name: "Wireless Headphones",
      description: "Premium wireless headphones with noise cancellation and 30-hour battery life",
      price: 199.99,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
        "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500"
      ],
      stock: 50,
      rating: 4.5,
      reviews: 128
    },
    {
      name: "Smart Watch",
      description: "Fitness tracking smartwatch with heart rate monitor and GPS",
      price: 299.99,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500"
      ],
      stock: 35,
      rating: 4.7,
      reviews: 256
    },
    {
      name: "Classic Cotton T-Shirt",
      description: "Comfortable 100% cotton t-shirt available in multiple colors",
      price: 29.99,
      category: "Clothing",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500"
      ],
      stock: 100,
      rating: 4.3,
      reviews: 89
    },
    {
      name: "Running Shoes",
      description: "Lightweight running shoes with superior cushioning and breathability",
      price: 89.99,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500"
      ],
      stock: 60,
      rating: 4.6,
      reviews: 342
    },
    {
      name: "Laptop Backpack",
      description: "Durable backpack with padded laptop compartment and USB charging port",
      price: 49.99,
      category: "Other",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500"
      ],
      stock: 45,
      rating: 4.4,
      reviews: 67
    },
    {
      name: "Coffee Maker",
      description: "Programmable coffee maker with thermal carafe and auto-shutoff",
      price: 79.99,
      category: "Home",
      images: [
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
      ],
      stock: 30,
      rating: 4.2,
      reviews: 154
    }
  ];

  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});