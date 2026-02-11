# ⚡ Quick Start Guide - Get Running in 5 Minutes

Follow these steps to get the Smart Parking PWA running immediately.

## 🎯 Goal
Get the app running on your local machine and test basic functionality.

---

## Step 1: Extract Files (30 seconds)

Make sure you have all these files in one folder:
```
smart-parking-pwa/
├── index.html          ✓
├── styles.css          ✓
├── app.js              ✓
├── manifest.json       ✓
├── service-worker.js   ✓
├── test.html           ✓
├── README.md           ✓
├── SETUP-GUIDE.md      ✓
└── QUICKSTART.md       ✓ (this file)
```

---

## Step 2: Get API Keys (5 minutes)

### Google Maps API Key

1. Go to: https://console.cloud.google.com/
2. Create project → Enable "Maps JavaScript API"
3. Create API key → Copy it
4. **Open `app.js`** and replace `YOUR_GOOGLE_MAPS_API_KEY` with your key

### Razorpay Key (Optional - can skip for now)

1. Go to: https://dashboard.razorpay.com/signup
2. Sign up → Get Test Key ID
3. **Open `app.js`** and replace `YOUR_RAZORPAY_KEY_ID` with your key

**OR skip this step** - the app will work, but payment won't process.

---

## Step 3: Run Local Server (1 minute)

### Option A: VS Code Live Server (Easiest)
```
1. Open folder in VS Code
2. Right-click index.html
3. Click "Open with Live Server"
```

### Option B: Python
```bash
cd smart-parking-pwa
python -m http.server 8000
# Open: http://localhost:8000
```

### Option C: Node.js
```bash
cd smart-parking-pwa
npx serve
# Open the URL shown
```

---

## Step 4: Test the App (2 minutes)

1. **Open test.html first:**
   - Should see all green checkmarks ✓
   - Click "Test JavaScript" - should work
   - Click "Open Main App"

2. **On main app:**
   - Should see loading screen
   - Should see parking facility info
   - Click "View Available Spots"
   - Should see Google Map (if API key is set)
   - Click a green marker
   - Click "Book This Spot"

3. **Test payment** (if Razorpay key is set):
   - Select duration
   - Click "Continue to Payment"
   - Use card: `4111 1111 1111 1111`
   - Enter any expiry/CVV
   - Should see success!

---

## ✅ You're Done!

The app is now running locally. 

### What Works Right Now:
- ✅ Interactive parking map
- ✅ Real-time spot selection
- ✅ Booking flow
- ✅ Google Maps integration (if key added)
- ✅ Razorpay payments (if key added)
- ✅ PWA functionality
- ✅ Offline support
- ✅ Mobile responsive

### Next Steps:
- Read `SETUP-GUIDE.md` for detailed configuration
- Read `README.md` for full documentation
- Customize branding and colors
- Create app icons
- Deploy to production

---

## 🐛 Quick Troubleshooting

**Map not showing?**
- Check console (F12) for errors
- Verify Google Maps API key is correct
- Make sure "Maps JavaScript API" is enabled

**Payment not working?**
- Check Razorpay Key ID is correct
- Use test card: `4111 1111 1111 1111`
- Try in incognito mode

**App not loading?**
- Make sure you're using a web server (not file://)
- Check all files are in same folder
- Clear browser cache

**Need help?**
- Check the full `SETUP-GUIDE.md`
- Look at browser console (F12) for errors
- Make sure both API keys are configured

---

## 📱 Install as PWA

**Desktop:**
1. Look for install icon in address bar
2. Click → Install

**Mobile:**
1. Open menu
2. "Add to Home Screen"
3. App icon appears on home screen!

---

## 🎨 Quick Customization

Want to change colors? Edit `styles.css`:

```css
:root {
    --primary-color: #3B82F6;  /* Main color */
    --success-color: #10B981;  /* Success/available */
    /* Change these values! */
}
```

Want to change pricing? Edit `app.js`:

```javascript
const CONFIG = {
    HOURLY_RATE: 50,        // ₹50 per hour
    DAILY_MAX: 300,         // ₹300 daily max
    RESERVATION_FEE: 20     // ₹20 fee
};
```

---

## 🚀 Ready to Deploy?

See `README.md` section on deployment for:
- Netlify (easiest)
- Vercel
- GitHub Pages

---

**That's it! Enjoy your Smart Parking PWA! 🅿️**

*For detailed setup: Read SETUP-GUIDE.md*  
*For full documentation: Read README.md*
