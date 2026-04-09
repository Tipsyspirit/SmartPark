# 🚀 Complete Setup Guide - Smart Parking System

This guide will walk you through setting up the complete Smart Parking System from scratch.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start (5 minutes)](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [API Keys Configuration](#api-keys-configuration)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **MongoDB 6.0+** - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Git** - [Download](https://git-scm.com/downloads)
- ✅ **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Required Accounts (Free)
- ✅ **MongoDB Atlas** - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- ✅ **Firebase** - [Sign up](https://console.firebase.google.com/)
- ✅ **Razorpay** - [Sign up](https://dashboard.razorpay.com/signup)
- ✅ **Google Cloud** - [Sign up](https://console.cloud.google.com/)

---

## Quick Start (5 minutes)

```bash
# 1. Clone and install
git clone <your-repo-url>
cd smart-parking-system
npm run install:all

# 2. Configure (copy and edit .env files)
cd backend && cp .env.example .env
cd ../frontend-pwa && cp .env.example .env

# 3. Add your API keys to both .env files

# 4. Start MongoDB (if local)
mongod

# 5. Seed database
cd backend && npm run seed

# 6. Start both servers
cd .. && npm run dev

# 7. Open browser
# Frontend: http://localhost:8000
# Backend: http://localhost:5000
```

---

## Detailed Setup

### Step 1: Install Node.js

1. Download from [nodejs.org](https://nodejs.org/)
2. Install LTS version (18.x or higher)
3. Verify installation:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### Step 2: Install MongoDB

**Option A: Local Installation**
1. Download from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install MongoDB Community Edition
3. Start MongoDB:
```bash
# Windows
mongod --dbpath C:\data\db

# Mac/Linux
mongod --dbpath /data/db
```

**Option B: MongoDB Atlas (Recommended)**
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free cluster (M0)
3. Add database user
4. Whitelist IP address (0.0.0.0/0 for testing)
5. Get connection string

### Step 3: Clone Repository

```bash
git clone https://github.com/yourusername/smart-parking-system.git
cd smart-parking-system
```

### Step 4: Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install:all

# Or install separately
cd backend && npm install
cd ../frontend-pwa && npm install
```

---

## API Keys Configuration

### 1. MongoDB Connection String

**If using local MongoDB:**
```env
# backend/.env
MONGODB_URI=mongodb://localhost:27017/parking_db
```

**If using MongoDB Atlas:**
```env
# backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parking_db?retryWrites=true&w=majority
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing
3. Add a web app
4. Copy configuration:

**For Backend** (`backend/.env`):
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
```

**For Frontend** (`frontend-pwa/.env`):
```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Get Backend Private Key:**
1. Firebase Console → Project Settings
2. Service Accounts tab
3. Click "Generate new private key"
4. Download JSON file
5. Copy values to backend/.env

### 3. Razorpay Configuration

1. Sign up at [Razorpay](https://dashboard.razorpay.com/signup)
2. Go to Settings → API Keys
3. Generate Test Keys

**For Backend** (`backend/.env`):
```env
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
```

**For Frontend** (`frontend-pwa/.env`):
```env
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
```

**Important:** Never put Key Secret in frontend!

### 4. Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
4. Create API Key
5. Restrict key:
   - **For Backend**: IP addresses
   - **For Frontend**: HTTP referrers (yourdomain.com/*, localhost:8000/*)

**For Backend** (`backend/.env`):
```env
GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**For Frontend** (`frontend-pwa/.env`):
```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Also add in `frontend-pwa/index.html` (line 28):
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places,geometry"></script>
```

### 5. JWT Secrets

Generate secure random strings:

```bash
# Method 1: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 2: OpenSSL
openssl rand -base64 32
```

Add to `backend/.env`:
```env
JWT_SECRET=your_generated_secret_here
JWT_REFRESH_SECRET=another_generated_secret_here
```

### 6. Email Configuration (Optional)

**Gmail:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

Get app-specific password: [Google Account](https://myaccount.google.com/apppasswords)

---

## Database Setup

### Option 1: Automatic Seed

```bash
cd backend
npm run seed
```

This creates:
- Admin account (admin@smartpark.com / Admin@12345)
- 200+ sample parking spots
- Sample bookings
- Sample users

### Option 2: Manual Setup

```bash
# Connect to MongoDB
mongosh "mongodb://localhost:27017/parking_db"

# Or for Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/parking_db"

# Create indexes
use parking_db
db.users.createIndex({ email: 1 }, { unique: true })
db.parkingspots.createIndex({ spotNumber: 1 }, { unique: true })
db.bookings.createIndex({ user: 1, status: 1 })
```

---

## Running the Application

### Development Mode

**Option 1: Run both servers together**
```bash
# From root directory
npm run dev
```

**Option 2: Run separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend-pwa
npm start
```

### Access Points

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:5000/api
- **API Health**: http://localhost:5000/api/health
- **Test Page**: http://localhost:8000/test.html

### Production Mode

```bash
# Backend
cd backend
NODE_ENV=production npm start

# Frontend (build first)
cd frontend-pwa
npm run build
# Deploy dist/ folder to hosting
```

---

## Testing

### Test with Sample Data

**Login as Admin:**
- Email: admin@smartpark.com
- Password: Admin@12345

**Test Payment:**
- Card: 4111 1111 1111 1111
- Expiry: 12/25
- CVV: 123
- OTP: 123456

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend-pwa
npm test

# All tests
npm run test
```

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
mongod --dbpath /data/db
```

**2. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill process on that port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**3. Firebase Error**
```
Error: Failed to parse private key
```
**Solution**: Make sure private key has correct format with \n
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**4. Google Maps Not Loading**
```
Google Maps JavaScript API error: RefererNotAllowedMapError
```
**Solution**: Add your domain to API key restrictions

**5. Razorpay Payment Fails**
```
Error: Invalid key
```
**Solution**: 
- Check you're using test key (rzp_test_)
- Verify key ID is correct
- Make sure you're NOT using key secret in frontend

### Getting Help

1. Check logs:
```bash
# Backend logs
cd backend/logs
tail -f combined.log

# Check for errors
tail -f error.log
```

2. Enable debug mode:
```env
# backend/.env
LOG_LEVEL=debug

# frontend-pwa/.env
VITE_DEBUG_MODE=true
```

3. Test API endpoints:
```bash
# Health check
curl http://localhost:5000/api/health

# Get parking spots
curl http://localhost:5000/api/parking/spots
```

---

## Next Steps

1. **Customize Branding**
   - Update logos in `frontend-pwa/assets/icons/`
   - Change colors in `frontend-pwa/css/styles.css`
   - Update app name in manifest.json

2. **Configure Email**
   - Set up SendGrid or Gmail
   - Test notification emails

3. **Set Up Monitoring**
   - Add Sentry for error tracking
   - Configure Google Analytics

4. **Deploy to Production**
   - Follow deployment guide
   - Set up CI/CD pipeline
   - Configure SSL certificates

5. **Add Real IoT Sensors**
   - Connect sensors to Firebase
   - Update sensor sync logic
   - Test real-time updates

---

## Support

Need help? Contact us:
- 📧 Email: support@smartpark.com
- 💬 Discord: [Join Server](https://discord.gg/yourserver)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/smart-parking-system/issues)

---

**Congratulations! Your Smart Parking System is now set up! 🎉**
