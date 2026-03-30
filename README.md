# 🛒 QuickCart - Modern E-Commerce Platform

A full-stack, modern e-commerce platform built with Next.js 15, featuring user authentication, product management, shopping cart, wishlist functionality, and seller dashboard.

## ✨ Features

### 🛍️ Core E-Commerce Features
- **Product Catalog** - Dynamic product listing with categories and search
- **Product Details** - Individual product pages with image galleries
- **Shopping Cart** - Add/remove/update item quantities with persistence
- **Wishlist** - Save favorite products across sessions
- **Order Management** - Complete order processing workflow
- **User Authentication** - Secure login/signup with Clerk

### 👨‍💼 Seller Features
- **Seller Dashboard** - Product management interface
- **Product Upload** - Add new products with image upload
- **Order Tracking** - View and manage seller orders
- **Analytics** - Basic sales insights

### 🎨 User Experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Loading States** - Visual feedback during operations
- **Error Handling** - User-friendly error messages and recovery

### 🔧 Technical Features
- **Real-time Updates** - Optimistic UI updates
- **Image Optimization** - Cloudinary integration for fast loading
- **API Security** - Protected routes and input validation
- **Database Integration** - MongoDB with proper schema design

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15.5.6 (App Router)
- **UI Library:** React 19.2.0
- **Styling:** Tailwind CSS 3.4.1
- **Icons & Assets:** Custom SVG icons
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Next.js API Routes (Serverless)
- **Database:** MongoDB 8.19.2 with Mongoose ODM
- **Authentication:** Clerk 6.36.7
- **Image Hosting:** Cloudinary 2.8.0
- **Background Jobs:** Inngest 3.47.0

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Clerk account for authentication
- Cloudinary account for image hosting

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quickcart.git
   cd quickcart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Public Environment Variables
   NEXT_PUBLIC_CURRENCY=$
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

   # Private Environment Variables
   CLERK_SECRET_KEY=your_clerk_secret_key
   MONGODB_URI=your_mongodb_connection_string
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   INNGEST_EVENT_KEY=your_inngest_event_key

   # Cloudinary (Optional)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Database Setup**
   - Create a MongoDB database (Atlas recommended)
   - Update the `MONGODB_URI` in your `.env` file

5. **Authentication Setup**
   - Create a Clerk application
   - Add your Clerk keys to the `.env` file
   - Configure Clerk redirect URLs

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
quickcart/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── cart/                 # Cart management
│   │   ├── Product/              # Product CRUD
│   │   ├── Order/                # Order processing
│   │   └── user/                 # User management
│   ├── cart/                     # Shopping cart page
│   ├── product/[id]/             # Product detail page
│   ├── wishlist/                 # Wishlist page
│   ├── seller/                   # Seller dashboard
│   └── layout.js                 # Root layout
├── components/                   # Reusable UI components
│   ├── ProductCard.jsx           # Product display card
│   ├── Navbar.jsx                # Navigation bar
│   ├── OrderSummary.jsx          # Checkout summary
│   └── seller/                   # Seller-specific components
├── context/                      # React Context for state management
│   └── AppContext.jsx            # Global app state
├── models/                       # MongoDB schemas
│   ├── Product.js                # Product schema
│   ├── user.js                   # User schema
│   ├── Order.js                  # Order schema
│   └── Address.js                # Address schema
├── assets/                       # Static assets and data
│   ├── assets.js                 # Icon exports
│   └── productData.js            # Sample product data
├── config/                       # Configuration files
│   ├── db.js                     # Database connection
│   └── inngest.js                # Background job config
├── lib/                          # Utility functions
├── public/                       # Static files
├── styles/                       # Global styles
└── middleware.ts                 # Next.js middleware
```

## 🔌 API Documentation

### Authentication Required Endpoints
All user-specific endpoints require Bearer token authentication:

```
Authorization: Bearer <clerk_jwt_token>
```

### Product Endpoints
- `GET /api/Product/list` - Get all products
- `POST /api/Product/add` - Add new product (seller only)

### Cart Endpoints
- `POST /api/cart/update` - Update cart items

### User Endpoints
- `GET /api/user/data` - Get user profile and cart/wishlist
- `POST /api/user/wishlist` - Update wishlist
- `POST /api/user/add-address` - Add delivery address

### Order Endpoints
- `POST /api/Order/create` - Create new order
- `GET /api/Order/list` - Get user orders
- `GET /api/Order/seller-orders` - Get seller orders


## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for database
- [Cloudinary](https://cloudinary.com/) for image hosting



