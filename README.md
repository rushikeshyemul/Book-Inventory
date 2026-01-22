# 📚 Book Inventory Management System

A production-ready full-stack web application for managing a book collection with complete CRUD functionality. Built with React frontend and Node.js + MongoDB backend following industry best practices.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete books
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Smooth loading indicators for better UX
- **Confirmation Dialogs**: Safe deletion with confirmation prompts
- **Toast Notifications**: Real-time feedback for user actions

## 🛠 Tech Stack

### Frontend
- **React 18** (Functional Components + Hooks)
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Hook Form + Yup** for form validation
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Express Validator** for server-side validation
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 📁 Project Structure

```
book-inventory-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── bookController.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── books.js
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-inventory-system
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/book_inventory
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

5. **Run the application**
   ```bash
   # Run both frontend and backend concurrently
   npm run dev
   
   # Or run them separately:
   # Backend (from root directory)
   npm run server
   
   # Frontend (from root directory)
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get book by ID |
| POST | `/api/books` | Create new book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |
| GET | `/api/health` | Health check |

## 📋 Book Schema

```javascript
{
  title: String (required),
  authorName: String (required),
  authorAge: Number (required, 1-150),
  authorEmail: String (required, unique, valid email),
  publisher: String (required),
  publishedDate: Date (required),
  overview: String (required, 10-1000 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## ✅ Validation Rules

### Frontend Validation
- All fields are required
- Author age must be an integer between 1-150
- Email must be valid format
- Title and names contain only allowed characters
- Overview must be 10-1000 characters
- Published date cannot be in the future

### Backend Validation
- Express-validator middleware
- Mongoose schema validation
- Unique email constraint
- Proper error responses (400, 404, 500)

## 🎨 UI Features

- **Responsive Table**: Scrollable and mobile-friendly book listing
- **Modal Confirmations**: Safe deletion with confirmation dialogs
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Spinners and disabled states during API calls
- **Toast Notifications**: Success and error messages
- **Breadcrumb Navigation**: Clear navigation paths
- **Clean Design**: Modern, professional interface

## 🛡 Error Handling

- **Centralized Error Handler**: Consistent error responses
- **Validation Errors**: Detailed field-specific error messages
- **Network Errors**: Graceful handling of API failures
- **404 Handling**: Proper not found pages
- **Loading States**: User feedback during operations

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # React development server
```

### Production Build
```bash
cd frontend
npm run build  # Creates optimized production build
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Production Deployment

1. **Environment Variables**: Update `.env` with production values
2. **Database**: Use MongoDB Atlas or production MongoDB instance
3. **Frontend Build**: Run `npm run build` in frontend directory
4. **Server**: Deploy backend to your preferred hosting service
5. **Static Files**: Serve frontend build files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**