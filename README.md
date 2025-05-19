# Reliance Digital Clone - Backend

This is the backend server for the Reliance Digital Clone project, built with Node.js, Express, and MongoDB.

## 🚀 Features

- RESTful API endpoints for products, categories, and user management
- MongoDB database integration
- JWT authentication
- File upload support for product images
- Search and filtering capabilities
- Pagination support
- Error handling middleware
- CORS enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Sonu-7891/RelianceDigital-Clone.git
cd RelianceDigital-Clone/Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/reliance-digital
JWT_SECRET=your_jwt_secret
```

4. Seed the database (optional):

```bash
node seed.js
```

## 🏃‍♂️ Running the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## 📁 Project Structure

```
Backend/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── utils/          # Utility functions
├── app.js          # Express app configuration
├── server.js       # Server entry point
└── seed.js         # Database seeder
```

## 🔌 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category (Admin only)

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## 🛠️ Error Handling

The API uses a centralized error handling mechanism. All errors are returned in the following format:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## 📝 Database Schema

### Product Schema

```javascript
{
  name: String,
  description: String,
  price: Number,
  mrp: Number,
  category: String,
  brand: String,
  images: [String],
  features: [String],
  specifications: Object,
  stock: Number,
  label: String,
  labelColor: String
}
```

### User Schema

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  addresses: [Object],
  orders: [Object]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Reliance Digital for inspiration
- All contributors who have helped shape this project
