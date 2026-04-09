# ⚡ QUICKSTART - Get Running in 10 Minutes

This guide gets you up and running as fast as possible.

## 🎯 Prerequisites Check

```bash
# Check Node.js (need 18+)
node --version

# Check npm
npm --version

# Check MongoDB (or use Atlas)
mongod --version
```

Don't have these? [Full Setup Guide](SETUP-GUIDE.md)

---

## 🚀 Steps

### 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone <repository-url>
cd smart-parking-system

# Install all dependencies
npm run install:all
```

### 2. Configure API Keys (5 minutes)

**Backend** - Edit `backend/.env`:
```bash
cd backend
cp .env.example .env
nano .env  # or use your editor
```

**Minimum required:**
```env
MONGODB_URI=mongodb://localhost:27017/parking_db
JWT_SECRET=put_any_long_random_string_here
RAZORPAY_KEY_ID=rzp_test_YourKeyHere
GOOGLE_MAPS_API_KEY=AIzaSy...YourKeyHere
```

**Frontend** - Edit `frontend-pwa/.env`:
```bash
cd ../frontend-pwa
cp .env.example .env
nano .env
```

**Minimum required:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_YourKeyHere
VITE_GOOGLE_MAPS_API_KEY=AIzaSy...YourKeyHere
```

Also edit `frontend-pwa/index.html` (line ~28):
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places,geometry"></script>
```

### 3. Start Database (1 minute)

**Option A: Local MongoDB**
```bash
mongod --dbpath ./data
```

**Option B: MongoDB Atlas**
- Sign up at mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Add to backend/.env: `MONGODB_URI=mongodb+srv://...`

### 4. Seed Database (1 minute)

```bash
cd backend
npm run seed
```

Creates:
- Admin user: admin@smartpark.com / Admin@12345
- 200+ parking spots
- Sample data

### 5. Start Both Servers (1 minute)

```bash
# From root directory
npm run dev
```

OR separately:
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend-pwa && npm start
```

---

## ✅ Test It!

### Open Browser

- **Frontend**: http://localhost:8000
- **Backend**: http://localhost:5000/api/health
- **Test Page**: http://localhost:8000/test.html

### Test Login

- Email: `admin@smartpark.com`
- Password: `Admin@12345`

### Test Payment

Use Razorpay test card:
- Card: `4111 1111 1111 1111`
- Expiry: `12/25`
- CVV: `123`

---

## 🔧 Quick Fixes

### "MongoDB Connection Failed"
```bash
# Make sure MongoDB is running
mongod --dbpath ./data

# Or check Atlas connection string
```

### "Port 5000 Already in Use"
```bash
# Kill process (Mac/Linux)
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

### "Google Maps Not Loading"
```bash
# 1. Check API key in both .env files
# 2. Check API key in index.html
# 3. Enable required APIs in Google Cloud Console
```

---

## 📁 File Structure

```
smart-parking-system/
├── backend/                # Node.js API
│   ├── .env               # ← Add your API keys here
│   ├── server.js
│   └── ...
├── frontend-pwa/          # PWA Frontend
│   ├── .env               # ← Add your API keys here
│   ├── index.html         # ← Update Google Maps key (line 28)
│   └── ...
└── package.json
```

---

## 🔑 Where to Get API Keys

### Google Maps (Required)
1. Go to: https://console.cloud.google.com/
2. Create project → Enable "Maps JavaScript API"
3. Create API key
4. Add to both .env files

### Razorpay (Required for payments)
1. Go to: https://dashboard.razorpay.com/signup
2. Get Test keys
3. Add Key ID (NOT secret) to both .env files

### Firebase (Optional)
1. Go to: https://console.firebase.google.com/
2. Create project
3. Get config
4. Add to both .env files

### MongoDB Atlas (Optional - use if not running local MongoDB)
1. Go to: https://mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to backend/.env

---

## 📖 Next Steps

- [Full Setup Guide](SETUP-GUIDE.md) - Detailed configuration
- [API Documentation](docs/api/README.md) - API endpoints
- [Deployment Guide](docs/deployment/production.md) - Go to production

---

## 💡 Tips

1. **Start with test keys** - Use Razorpay test mode
2. **Use MongoDB Atlas** - Easier than local MongoDB
3. **Check console logs** - F12 in browser for errors
4. **Test incrementally** - Start backend first, then frontend

---

## 🆘 Still Stuck?

1. Check [SETUP-GUIDE.md](SETUP-GUIDE.md) for detailed steps
2. Look at error messages in console (F12)
3. Check [Troubleshooting section](SETUP-GUIDE.md#troubleshooting)
4. Open an issue on GitHub

---

**Ready? Let's go! 🚀**

```bash
npm run dev
```

Then open: http://localhost:8000
