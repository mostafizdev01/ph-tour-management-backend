# PH Tour Management Backend

A complete **Backend API** for PH Tour Management system built with **Node.js, TypeScript, and MongoDB**. This project provides APIs for managing users, tours, bookings, payments, divisions, and more.

---

## 🛠 Technologies & Tools

- **Node.js**  
- **TypeScript**  
- **Express.js**  
- **MongoDB / Mongoose**  
- **Redis** (for caching/session management)  
- **Passport.js** (Authentication)  
- **Cloudinary** (Image uploads)  
- **SSLCommerz** (Payment gateway integration)  
- **Zod / Custom Validation** (Request validation)  
- **Vercel** (Deployment)

---

## 📦 Features / Modules

1. **Auth Module**  
   - User registration & login  
   - Password hashing & JWT authentication  
   - Role-based authorization

2. **User Module**  
   - CRUD operations for users  
   - Validation & error handling  

3. **Tour Module**  
   - Create, read, update, delete tours  
   - Tour filtering, search, pagination  

4. **Booking Module**  
   - Manage user bookings  
   - Status updates & validations  

5. **Payment Module**  
   - Integration with **SSLCommerz**  
   - Handle payment confirmation  

6. **Division Module**  
   - Manage divisions  
   - Auto-generate slugs for divisions  

7. **OTP Module**  
   - Send OTP via email for authentication / verification  

8. **Stats Module**  
   - Generate system statistics (bookings, tours, users)  

---

## ⚙️ Setup / Installation

1. Clone the repository:

```bash
git clone https://github.com/mostafizdev01/ph-tour-management-backend.git
cd ph-tour-management-backend
## ⚙️ Install dependencies:
npm install

## ⚙️ Setup / Installation
Create .env file (copy from .env.example) and set your environment variables:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REDIS_URL=your_redis_url
SSL_COMMERZ_STORE_ID=your_store_id
SSL_COMMERZ_STORE_PASSWORD=your_password

## ⚙️ Start the server:
npm run dev
