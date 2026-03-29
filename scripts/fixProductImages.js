// Run this script with: node scripts/fixProductImages.js
// Make sure to set your MONGODB_URI in the environment or hardcode it below.

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vanshikazawar_db_user:3POJQ22xzV0gDZcC@cluster0.467xlcz.mongodb.net/quickcart?retryWrites=true&w=majority';

const productSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  category: String,
  price: Number,
  offerPrice: Number,
  images: [String],
  date: Number
});

const Product = mongoose.models.product || mongoose.model('product', productSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);
  const products = await Product.find({});
  for (const product of products) {
    if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
      // Set a default image or add your own logic here
      product.images = [
        'https://via.placeholder.com/300x300.png?text=No+Image'
      ];
      await product.save();
      console.log(`Updated product: ${product.name}`);
    }
  }
  await mongoose.disconnect();
  console.log('Done updating products.');
}

main().catch(console.error);
