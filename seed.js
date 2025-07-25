const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Sample product data
const seedProducts = [
  {
    category: "Gift",
    subcategory: "Gift Cards",
    barcode: "1111",
    caseBarcode: "1111C",
    productName: "GIFT CARD",
    quantityOptions: ["$10", "$20"],
    count: 100,
    costPrice: 8.00,
    margin: 25,
    salePrice: 10.00,
    vendor: "CardVendor Inc.",
    vendorContact: "555-1234",
    email: "gift@vendor.com",
    bottleLocation: "Aisle 1"
  },
  {
    category: "Liquor",
    subcategory: "Liquor Mart",
    barcode: "2222",
    caseBarcode: "2222C",
    productName: "LIQUOR MART",
    quantityOptions: ["750ml"],
    count: 50,
    costPrice: 3.50,
    margin: 30,
    salePrice: 5.00,
    vendor: "Liquor Co.",
    vendorContact: "123-9999",
    email: "liquor@vendor.com",
    bottleLocation: "Aisle 5"
  },
  {
    category: "Snacks",
    subcategory: "Chips",
    barcode: "3333",
    caseBarcode: "3333C",
    productName: "LAYS ORIGINAL",
    quantityOptions: ["1.75oz"],
    count: 75,
    costPrice: 1.00,
    margin: 25,
    salePrice: 1.75,
    vendor: "SnackSupply",
    vendorContact: "456-7890",
    email: "lays@vendor.com",
    bottleLocation: "Aisle 4"
  }
];

// Delete existing and insert new products
async function seedDatabase() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log("✅ Seed data inserted successfully!");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
