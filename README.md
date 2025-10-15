# 📚 Books API

A robust RESTful API for managing books with authentication, authorization, and role-based access control. Built with Node.js, Express.js, and MongoDB.

## ✨ Features

- **🔐 JWT Authentication** - Secure user authentication with access and refresh tokens
- **👥 Role-Based Access Control** - Three user roles: Admin, Editor, and User
- **📖 CRUD Operations** - Complete Create, Read, Update, Delete operations for books
- **🛡️ Input Validation** - Request validation using express-validator
- **🍪 Cookie Management** - Secure token storage with httpOnly cookies
- **🌐 CORS Support** - Configurable Cross-Origin Resource Sharing
- **📝 Error Handling** - Comprehensive error handling and status codes

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Validation**: express-validator
- **Development**: nodemon for hot reloading

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abddo17/BooksAPI.git
   cd booksapi
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3500
   MONGODB_URI=mongodb://localhost:27017/booksapi
   ACCESS_TOKEN_SECRET=your_access_token_secret_here
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3500` (or the port specified in your `.env` file).

## 📚 API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint         | Description           | Access  |
| ------ | ---------------- | --------------------- | ------- |
| POST   | `/auth/register` | Register a new user   | Public  |
| POST   | `/auth/login`    | User login            | Public  |
| POST   | `/auth/logout`   | User logout           | Public  |
| GET    | `/auth/refresh`  | Refresh access token  | Public  |
| GET    | `/auth/me`       | Get current user info | Private |

### Books Routes (`/books`)

| Method | Endpoint     | Description     | Access        |
| ------ | ------------ | --------------- | ------------- |
| GET    | `/books`     | Get all books   | Public        |
| GET    | `/books/:id` | Get book by ID  | Public        |
| POST   | `/books`     | Create new book | Admin, Editor |
| PATCH  | `/books/:id` | Update book     | Admin, Editor |
| DELETE | `/books/:id` | Delete book     | Admin only    |

## 🔑 User Roles

- **Admin (5150)**: Full access to all operations including book deletion
- **Editor (1984)**: Can create and update books
- **User (2001)**: Can only view books

## 📖 Book Model

```javascript
{
  title: String,
  author: String,
  publishedYear: Number,
  genre: String,
  available: Boolean
}
```

## 🔐 Authentication Flow

1. **Register/Login**: Users register or login to receive access and refresh tokens
2. **Token Storage**: Tokens are stored in httpOnly cookies for security
3. **Protected Routes**: JWT middleware verifies tokens for protected endpoints
4. **Role Verification**: Role-based middleware checks user permissions
5. **Token Refresh**: Refresh tokens are used to generate new access tokens

## 📝 Example Usage

### Register a new user

```bash
curl -X POST http://localhost:3500/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3500/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

### Get all books

```bash
curl -X GET http://localhost:3500/books
```

### Create a new book (requires authentication)

```bash
curl -X POST http://localhost:3500/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedYear": 1925,
    "genre": "Fiction",
    "available": true
  }'
```

## 🏗️ Project Structure

```
BooksAPI/
├── config/
│   ├── corsOptions.js      # CORS configuration
│   ├── db.js              # Database connection
│   └── roles_list.js      # User roles definition
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── booksController.js  # Books CRUD operations
│   ├── logoutController.js # Logout functionality
│   ├── refreshTokenController.js # Token refresh
│   └── registerController.js # User registration
├── middleware/
│   ├── verifyJWT.js       # JWT verification
│   └── verifyRoles.js     # Role-based access control
├── models/
│   ├── book.js           # Book schema
│   └── user.js           # User schema
├── routes/
│   └── api/
│       ├── auth.js       # Authentication routes
│       └── books.js      # Books routes
├── validators/
│   ├── authValidator.js  # Authentication validation
│   └── bookValidator.js  # Book data validation
├── utils/               # Utility functions
├── app.js              # Main application file
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 🧪 Testing

Currently, the project doesn't include automated tests. To add testing:

```bash
npm install --save-dev jest supertest
```

## 🚀 Deployment

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

```env
NODE_ENV=production
PORT=3500
MONGODB_URI=your_production_mongodb_uri
ACCESS_TOKEN_SECRET=your_strong_access_token_secret
REFRESH_TOKEN_SECRET=your_strong_refresh_token_secret
```

### Deployment Options

- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment
- **AWS**: EC2 with RDS or DocumentDB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

**Your Name**

- GitHub: [@Abddo17](https://github.com/Abddo17)
- Email: elhasnaouiabdelilah8@gmail.com

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- MongoDB team for the robust database solution
- JWT.io for token-based authentication standards

---

⭐ If you found this project helpful, please give it a star!
