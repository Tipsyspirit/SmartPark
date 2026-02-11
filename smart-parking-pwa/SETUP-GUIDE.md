# 🚀 Smart Parking PWA - Complete Setup Guide

This guide will walk you through setting up the Smart Parking PWA from scratch.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Google Maps API Setup](#google-maps-api-setup)
4. [Razorpay Setup](#razorpay-setup)
5. [Creating App Icons](#creating-app-icons)
6. [Running Locally](#running-locally)
7. [Testing the App](#testing-the-app)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

Before you begin, make sure you have:

- ✅ A code editor (VS Code recommended)
- ✅ A modern web browser (Chrome/Firefox/Safari/Edge)
- ✅ Google account (for Maps API)
- ✅ Indian bank account or credit card (for Razorpay - test mode works without)
- ✅ Basic knowledge of HTML/CSS/JavaScript (helpful but not required)

---

## 2. Project Setup

### Step 1: Download the Files

You should have these files:
```
smart-parking-pwa/
├── index.html
├── styles.css
├── app.js
├── manifest.json
├── service-worker.js
├── README.md
├── SETUP-GUIDE.md
└── test.html
```

### Step 2: Verify File Structure

Open `test.html` in your browser (just double-click it) to verify all files are present.

---

## 3. Google Maps API Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `Smart Parking App`
4. Click "Create"
5. Wait for project creation (30 seconds)

### Step 2: Enable Required APIs

1. In the search bar, type "Maps JavaScript API"
2. Click on it → Click "Enable"
3. Repeat for these APIs:
   - **Maps JavaScript API** (for displaying maps)
   - **Places API** (for location search)
   - **Directions API** (for navigation)
   - **Geocoding API** (for address conversion)

### Step 3: Create API Key

1. Click "Credentials" in left sidebar
2. Click "Create Credentials" → "API Key"
3. Copy the API key (starts with `AIza...`)
4. Click "Restrict Key" (IMPORTANT!)

### Step 4: Restrict API Key (Security)

**Application Restrictions:**
1. Select "HTTP referrers (web sites)"
2. Add these referrers:
   ```
   localhost:*
   127.0.0.1:*
   http://localhost:*/*
   https://yourdomain.com/*  (when you deploy)
   ```

**API Restrictions:**
1. Select "Restrict key"
2. Choose these APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
3. Click "Save"

### Step 5: Add API Key to App

1. Open `app.js` in your code editor
2. Find this line (around line 15):
   ```javascript
   GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
   ```
3. Replace with your actual key:
   ```javascript
   GOOGLE_MAPS_API_KEY: 'AIzaSyD..._your_actual_key_here',
   ```
4. Save the file

### Step 6: Update index.html

1. Open `index.html`
2. Find this line (around line 28):
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places,geometry"></script>
   ```
3. Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key
4. Save the file

---

## 4. Razorpay Setup

### Step 1: Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/signup)
2. Sign up with email/phone
3. Verify your email/phone
4. You'll be in **Test Mode** by default (perfect for development)

### Step 2: Get Test API Keys

1. In Razorpay Dashboard, go to "Settings" (gear icon)
2. Click "API Keys" in sidebar
3. Click "Generate Test Key"
4. You'll see two keys:
   - **Key ID** (starts with `rzp_test_`) - Use this in frontend
   - **Key Secret** (starts with `rzp_test_`) - Keep this secret!

### Step 3: Add Razorpay Key to App

1. Open `app.js`
2. Find this line:
   ```javascript
   RAZORPAY_KEY_ID: 'YOUR_RAZORPAY_KEY_ID',
   ```
3. Replace with your test key:
   ```javascript
   RAZORPAY_KEY_ID: 'rzp_test_xxxxxxxxxx',
   ```
4. Save the file

### Step 4: Test Payment Cards

In test mode, use these cards:

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)
- Name: Any name

**Failed Payment:**
- Card: `4000 0000 0000 0002`

**3D Secure:**
- Card: `4000 0025 0000 3155`
- Enter any OTP when prompted

---

## 5. Creating App Icons

You need icons for the PWA to work properly.

### Option A: Use Online Icon Generator (Easiest)

1. Go to [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload a logo/image (512x512 px recommended)
3. Generate icons
4. Download the package
5. Extract and place icons in `icons/` folder

### Option B: Create Simple Icons with Code

Create this folder structure:
```
smart-parking-pwa/
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    └── favicon.png
```

Use any image editor to create these sizes, or:

1. Use [Canva](https://canva.com)
2. Create design: 512x512px
3. Add parking icon (🅿️) or custom design
4. Download as PNG
5. Use [ResizeImage.net](https://resizeimage.net/) to create all sizes

### Option C: Use Placeholder (For Testing)

For quick testing, you can skip icons. The app will still work, but:
- ❌ Can't install as PWA
- ❌ No app icon on home screen
- ✅ All functionality works in browser

---

## 6. Running Locally

### Option A: VS Code Live Server (Recommended)

1. Install [VS Code](https://code.visualstudio.com/)
2. Install "Live Server" extension:
   - Open VS Code
   - Press `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (Mac)
   - Search "Live Server"
   - Click "Install"
3. Open project folder in VS Code
4. Right-click `index.html` → "Open with Live Server"
5. Browser opens automatically at `http://127.0.0.1:5500/`

### Option B: Python Server

**If you have Python installed:**

```bash
# Navigate to project folder
cd path/to/smart-parking-pwa

# Python 3
python -m http.server 8000

# Open browser manually:
# http://localhost:8000
```

### Option C: Node.js Server

**If you have Node.js installed:**

```bash
# Navigate to project folder
cd path/to/smart-parking-pwa

# Install serve globally (one time)
npm install -g serve

# Run server
serve

# Or use npx (no installation)
npx serve
```

### Option D: Chrome Web Server (No Install)

1. Install [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
2. Launch the app
3. Click "Choose Folder" → Select project folder
4. Click the Web Server URL (e.g., `http://127.0.0.1:8887`)

---

## 7. Testing the App

### Step 1: Run Test Page

1. Open `http://localhost:PORT/test.html`
2. Check all items are green ✓
3. Click "Test JavaScript" - should show success
4. Click "Test Styles" - should show blue box
5. Click "Open Main App"

### Step 2: Test Landing Page

1. App should load with loading screen
2. Should show "Campus West Parking"
3. Should show availability count
4. Click "View Available Spots"

### Step 3: Test Map View

1. Should see Google Map (if API key is correct)
2. Should see colored markers (green, red, blue)
3. Click on a green marker
4. Should open spot details modal

### Step 4: Test Booking

1. Click green spot on map
2. Click "Book This Spot"
3. Select duration (e.g., "2h")
4. Click "Continue to Payment"
5. Razorpay popup should appear
6. Enter test card: `4111 1111 1111 1111`
7. Enter any expiry (future), CVV, name
8. Click "Pay"
9. Should show success confirmation with QR code

### Step 5: Test PWA Installation

**On Desktop (Chrome):**
1. Look for install icon in address bar (⊕)
2. Click it → Click "Install"
3. App opens in standalone window
4. Check: Start menu / Applications folder has new icon

**On Mobile (Chrome/Safari):**
1. Open menu (⋮ or Share icon)
2. Tap "Add to Home Screen" / "Install App"
3. Tap "Add" / "Install"
4. Check home screen for new icon
5. Tap icon to open app

### Step 6: Test Offline Mode

1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Click "Service Workers" in sidebar
4. Check "Offline" checkbox
5. Refresh page (Ctrl+R)
6. App should still load (from cache)
7. Uncheck "Offline" to restore

---

## 8. Deployment

### Deploy to Netlify (Free, Easiest)

1. **Sign up:** Go to [Netlify](https://netlify.com) → Sign up
2. **Drag & Drop:**
   - Click "Add new site" → "Deploy manually"
   - Drag project folder into upload area
   - Wait for deployment (30 seconds)
3. **Update API Keys:**
   - Go to Site Settings → Build & Deploy → Environment
   - Add environment variables (if using backend)
4. **Custom Domain (Optional):**
   - Site Settings → Domain Management
   - Add custom domain
   - Update Google Maps API key restrictions

### Deploy to Vercel (Free)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```
2. **Deploy:**
   ```bash
   cd smart-parking-pwa
   vercel --prod
   ```
3. **Follow prompts** (create account if needed)
4. **Done!** You'll get a URL like `https://your-app.vercel.app`

### Deploy to GitHub Pages (Free)

1. **Create GitHub account** (if you don't have one)
2. **Create new repository**
   - Name: `smart-parking-pwa`
   - Public repository
3. **Upload files:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/smart-parking-pwa.git
   git push -u origin main
   ```
4. **Enable GitHub Pages:**
   - Go to repository → Settings → Pages
   - Source: `main` branch
   - Click "Save"
5. **Access:** `https://yourusername.github.io/smart-parking-pwa/`

### IMPORTANT: Update API Keys After Deployment

1. **Google Maps:**
   - Add your production URL to API key restrictions
   - Example: `https://your-app.netlify.app/*`

2. **Razorpay:**
   - For production: Switch to "Live Mode"
   - Complete KYC verification
   - Generate Live API keys
   - Update `app.js` with live keys

---

## 9. Troubleshooting

### ❌ Google Maps Not Showing

**Problem:** Blank gray box instead of map

**Solutions:**
1. ✅ Check browser console (F12) for errors
2. ✅ Verify API key is correct
3. ✅ Check "Maps JavaScript API" is enabled
4. ✅ Verify domain is in API key restrictions
5. ✅ Try key in incognito mode (cache issue)

**Common Errors:**
```
Google Maps JavaScript API error: InvalidKeyMapError
→ API key is wrong or restricted

Google Maps JavaScript API error: ApiNotActivatedMapError
→ Maps JavaScript API is not enabled
```

### ❌ Razorpay Payment Not Working

**Problem:** Payment button doesn't open popup

**Solutions:**
1. ✅ Check console for errors
2. ✅ Verify Key ID is correct (starts with `rzp_test_`)
3. ✅ Check you're in Test Mode in dashboard
4. ✅ Ensure Razorpay script is loaded (check Network tab)
5. ✅ Try different browser
6. ✅ Disable browser extensions (some block payment gateways)

### ❌ Camera Not Working for QR Scanner

**Problem:** "Camera access denied" or blank screen

**Solutions:**
1. ✅ Must use HTTPS or localhost (not http://192.168.x.x)
2. ✅ Check browser permissions (Settings → Site Settings)
3. ✅ Try different browser
4. ✅ On mobile: Check app permissions in phone settings
5. ✅ Some browsers require HTTPS even on LAN

### ❌ PWA Not Installing

**Problem:** No install prompt appears

**Solutions:**
1. ✅ Must use HTTPS (localhost is OK)
2. ✅ Check manifest.json is accessible
3. ✅ Verify service worker is registered
4. ✅ Icons must exist (at least 192x192 and 512x512)
5. ✅ Check Chrome DevTools → Application → Manifest
6. ✅ Some browsers require app to be opened multiple times

### ❌ App Not Loading at All

**Problem:** White screen or errors

**Solutions:**
1. ✅ Open browser console (F12) and check errors
2. ✅ Verify all files are in correct location
3. ✅ Check file names match exactly (case-sensitive)
4. ✅ Ensure running on web server (not file://)
5. ✅ Clear browser cache (Ctrl+Shift+Delete)
6. ✅ Try in incognito mode

### ❌ Service Worker Errors

**Problem:** Service worker registration failed

**Solutions:**
1. ✅ Must use HTTPS or localhost
2. ✅ Check service-worker.js is in root folder
3. ✅ Verify no syntax errors in service-worker.js
4. ✅ Chrome DevTools → Application → Service Workers
5. ✅ Click "Unregister" → Refresh → Re-register

---

## 📞 Getting Help

If you're still stuck:

1. **Check console errors:**
   - Press F12 in browser
   - Look at Console tab
   - Copy exact error message

2. **Common error solutions:**
   - `Failed to load resource` → File path is wrong
   - `CORS error` → Need to use local server
   - `Uncaught ReferenceError` → JavaScript file not loaded
   - `ERR_BLOCKED_BY_CLIENT` → Ad blocker blocking scripts

3. **Test in different browser:**
   - Chrome (best support)
   - Firefox (good support)
   - Safari (iOS only, some limitations)
   - Edge (same as Chrome)

4. **Resources:**
   - Google Maps Docs: https://developers.google.com/maps/documentation
   - Razorpay Docs: https://razorpay.com/docs/
   - PWA Docs: https://web.dev/progressive-web-apps/

---

## ✅ Success Checklist

Before deploying to production, verify:

- [ ] All tests pass in test.html
- [ ] Google Maps loads correctly
- [ ] Can book a spot
- [ ] Razorpay payment works with test card
- [ ] PWA installs on mobile/desktop
- [ ] Works offline (cached pages)
- [ ] All API keys are restricted to your domain
- [ ] Icons display correctly
- [ ] App works on different browsers
- [ ] Mobile responsive (test on phone)

---

## 🎉 Congratulations!

If you've made it this far, your Smart Parking PWA should be fully functional!

**Next steps:**
- Customize colors and branding
- Add real parking data
- Set up backend API
- Enable push notifications
- Deploy to production
- Market your app!

---

*Last updated: February 2026*
