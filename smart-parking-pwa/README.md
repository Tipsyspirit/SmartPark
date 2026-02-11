# Smart Parking PWA 🅿️

A comprehensive Progressive Web App for smart parking management with QR code access, real-time availability, Google Maps integration, and Razorpay payment processing.

## ✨ Features

### Core Features
- ✅ **QR Code Access** - Instant access by scanning QR codes at parking entrances
- ✅ **Real-time Availability** - Live parking spot status updates
- ✅ **Interactive Map** - Google Maps integration with spot markers
- ✅ **Smart Booking** - Reserve spots in advance or book immediately
- ✅ **Razorpay Integration** - Secure payment processing in INR
- ✅ **PWA Support** - Installable, works offline, push notifications
- ✅ **Mobile-First Design** - Responsive UI optimized for all devices

### Advanced Features
- Multiple parking levels/floors
- Spot filtering (Available, EV, Handicap, Near Exit)
- Vehicle management
- Booking history
- Favorite spots
- Navigation to spot
- Dynamic pricing
- Toast notifications
- Dark mode ready

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (Live Server, Python server, or similar)
- Google Maps API key
- Razorpay API key

### Installation

1. **Download/Clone the project**
   ```bash
   cd smart-parking-pwa
   ```

2. **Set up API Keys**
   
   Edit `app.js` and replace the placeholder API keys:
   
   ```javascript
   const CONFIG = {
       GOOGLE_MAPS_API_KEY: 'YOUR_ACTUAL_GOOGLE_MAPS_API_KEY',
       RAZORPAY_KEY_ID: 'YOUR_ACTUAL_RAZORPAY_KEY_ID',
       // ... rest of config
   };
   ```

3. **Create placeholder icon images** (or use your own)
   
   Create an `icons` folder with the following files:
   ```
   icons/
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

4. **Run with a local server**

   **Option A: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

   **Option B: Python Server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Then open: http://localhost:8000
   ```

   **Option C: Node.js Server**
   ```bash
   npx serve
   
   # Or install globally
   npm install -g serve
   serve
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🔑 Getting API Keys

### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Restrict the API key:
   - Application restrictions: HTTP referrers
   - Add your domain (e.g., `localhost:8000/*`, `yourdomain.com/*`)
   - API restrictions: Select the enabled APIs above
6. Copy the API key

**Free Tier:** 
- $200 monthly credit
- ~28,000 map loads per month free
- Monitor usage in Google Cloud Console

### Razorpay API Key

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up / Log in
3. Switch to "Test Mode" for development
4. Go to Settings → API Keys
5. Generate Test API Key
6. Copy the **Key ID** (starts with `rzp_test_`)
7. For production:
   - Complete KYC verification
   - Switch to "Live Mode"
   - Generate Live API Key

**Test Mode:**
- Use test card: `4111 1111 1111 1111`
- Any future expiry date
- Any CVV
- No actual money is charged

## 📁 Project Structure

```
smart-parking-pwa/
│
├── index.html              # Main HTML file
├── styles.css              # All styles (9000+ lines)
├── app.js                  # Main application logic
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── README.md               # This file
│
├── icons/                  # App icons (create this)
│   ├── icon-72.png
│   ├── icon-192.png
│   ├── icon-512.png
│   └── favicon.png
│
└── screenshots/            # Optional: App screenshots
    ├── screenshot1.png
    └── screenshot2.png
```

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3B82F6;      /* Main blue */
    --primary-dark: #2563EB;       /* Darker blue */
    --success-color: #10B981;      /* Green */
    --error-color: #EF4444;        /* Red */
    /* ... more colors */
}
```

### Pricing
Edit in `app.js`:
```javascript
const CONFIG = {
    HOURLY_RATE: 50,        // ₹50 per hour
    DAILY_MAX: 300,         // ₹300 daily maximum
    RESERVATION_FEE: 20     // ₹20 reservation fee
};
```

### Parking Spots
Modify `generateSampleParkingSpots()` function in `app.js` to:
- Change number of spots
- Adjust levels/floors
- Modify spot types
- Set custom locations

## 📱 PWA Installation

### Mobile (Android/iOS)
1. Open the app in Chrome/Safari
2. Tap the browser menu (⋮ or Share icon)
3. Select "Add to Home Screen" or "Install App"
4. The app icon will appear on your home screen

### Desktop (Chrome/Edge)
1. Open the app in Chrome/Edge
2. Look for install icon in address bar
3. Click "Install"
4. Or click menu → "Install Smart Parking"

## 🧪 Testing

### Test QR Code Flow
1. Click "Scan QR Code" button
2. Allow camera access
3. Show a QR code with this JSON:
   ```json
   {
     "type": "entrance",
     "facilityId": "fac_abc123",
     "facilityName": "Test Parking",
     "gateId": "gate_a1",
     "level": 1
   }
   ```

### Test Booking Flow
1. Go to "View Available Spots"
2. Click any green (available) spot
3. Click "Book This Spot"
4. Select duration
5. Click "Continue to Payment"
6. Use Razorpay test card:
   - Card: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)

### Test Offline Mode
1. Open Chrome DevTools (F12)
2. Go to "Network" tab
3. Select "Offline" from dropdown
4. Refresh page - should still work (cached)
5. Bookings page should show cached data

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   netlify deploy --prod
   ```

3. **Or use Netlify UI**
   - Drag and drop the project folder
   - Configure build settings (none needed for static site)

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to GitHub Pages

1. **Create repository**
2. **Push code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Source: main branch
   - Save

4. **Update API Keys** - Don't commit real keys!
   - Use environment variables
   - Or restrict keys to your domain

### Important: Secure Your API Keys

**For Production:**
1. Create backend API endpoints
2. Store API keys on server
3. Never expose keys in frontend code
4. Use environment variables
5. Restrict API keys by domain/IP

**Example Backend Setup:**
```javascript
// server.js (Node.js example)
app.post('/api/create-payment', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    
    // Create payment order
    const order = await razorpay.orders.create({
        amount: req.body.amount,
        currency: 'INR'
    });
    
    res.json(order);
});
```

## 🔧 Troubleshooting

### Google Maps Not Loading
- ✅ Check API key is correct
- ✅ Check Maps JavaScript API is enabled
- ✅ Check browser console for errors
- ✅ Verify domain restrictions allow your URL

### Razorpay Not Working
- ✅ Check Key ID is correct (starts with `rzp_test_` or `rzp_live_`)
- ✅ Verify you're in correct mode (Test/Live)
- ✅ Check browser console for errors
- ✅ Test with Razorpay test cards

### PWA Not Installing
- ✅ Must use HTTPS (localhost is OK for testing)
- ✅ Check manifest.json is valid
- ✅ Verify service worker is registered
- ✅ Check Chrome DevTools → Application → Manifest

### Camera Not Working for QR
- ✅ Must use HTTPS (or localhost)
- ✅ Allow camera permissions
- ✅ Check browser supports getUserMedia API
- ✅ Try different browser if issues persist

### Offline Mode Not Working
- ✅ Check service worker is registered
- ✅ Verify assets are cached
- ✅ Check Chrome DevTools → Application → Service Workers
- ✅ Clear cache and hard reload (Ctrl+Shift+R)

## 📊 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 80+     | ✅ Full |
| Firefox | 75+     | ✅ Full |
| Safari  | 13+     | ✅ Full |
| Edge    | 80+     | ✅ Full |
| Samsung Internet | 12+ | ✅ Full |

**Required Features:**
- Service Workers
- Web App Manifest
- Push Notifications
- geolocation API
- getUserMedia (for QR scanning)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core parking functionality
- ✅ QR code access
- ✅ Google Maps integration
- ✅ Razorpay payments
- ✅ PWA support

### Phase 2 (Planned)
- ⏳ Backend API integration
- ⏳ User authentication (Firebase)
- ⏳ Real-time spot updates (WebSocket)
- ⏳ Push notifications
- ⏳ Analytics dashboard

### Phase 3 (Future)
- 🔮 IoT sensor integration
- 🔮 License plate recognition
- 🔮 Dynamic pricing
- 🔮 Multi-facility support
- 🔮 Mobile apps (React Native)

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 💬 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@smartparking.com (example)
- Documentation: [Link to docs]

## 🙏 Credits

Built with:
- Google Maps Platform
- Razorpay Payment Gateway
- Html5-QRCode library
- Font Awesome icons

---

**Made with ❤️ for Smart Parking**

*Last updated: February 2026*
