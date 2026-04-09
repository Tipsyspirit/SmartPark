# 🅿️ Smart Parking Management System

A complete, production-ready smart parking management solution with Progressive Web App (PWA) frontend, Node.js backend, MongoDB database, and real-time IoT integration.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)

## 🌟 Features

### For Drivers
- 🗺️ **Real-time Parking Availability** - See available spots on interactive map
- 📱 **PWA Support** - Install on mobile/desktop, works offline
- 💳 **Seamless Payments** - Razorpay integration with UPI, cards, wallets
- 📷 **QR Code Entry/Exit** - Contactless gate access
- 🔔 **Smart Notifications** - Booking reminders, expiry alerts
- 🚗 **Vehicle Management** - Save multiple vehicles
- ⭐ **Favorite Spots** - Quick rebooking of preferred locations
- 📊 **Booking History** - Track all past parkings
- 🧭 **Navigation** - Integrated Google Maps directions

### For Administrators
- 📈 **Analytics Dashboard** - Occupancy, revenue, user metrics
- 👥 **User Management** - View and manage user accounts
- 🅿️ **Spot Management** - Add, edit, disable parking spots
- 💰 **Revenue Reports** - Daily, weekly, monthly earnings
- 📧 **Notification Center** - Send alerts to users
- 🔧 **System Configuration** - Pricing, availability, features
- 📊 **Occupancy Heatmaps** - Historical data visualization
- 🚨 **Issue Tracking** - Monitor reported problems

### Technical Features
- ⚡ **Real-time Updates** - WebSocket integration
- 🔥 **Firebase Integration** - IoT sensor sync
- 🔒 **Secure** - JWT auth, encrypted data
- 🌍 **Multi-language** - English, Hindi, Tamil, Telugu
- 📱 **Responsive** - Mobile-first design
- 🔄 **Offline Support** - Service worker caching
- 🎨 **Modern UI** - Clean, intuitive interface
- 📊 **RESTful API** - Well-documented endpoints

## 📁 Project Structure

```
smart-parking-system/
├── backend/                 # Node.js Express API
│   ├── config/             # Database, Firebase, Razorpay config
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, validation, error handling
│   ├── services/           # External services (email, SMS, payment)
│   ├── utils/              # Helper functions
│   ├── jobs/               # Cron jobs
│   └── tests/              # Unit & integration tests
│
├── frontend-pwa/           # Progressive Web App
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript modules
│   ├── assets/             # Icons, images, fonts
│   ├── pages/              # HTML pages
│   └── locales/            # Translation files
│
├── docs/                   # Documentation
│   ├── api/                # API documentation
│   ├── deployment/         # Deployment guides
│   └── user-guide/         # User manuals
│
├── scripts/                # Utility scripts
└── .github/                # CI/CD workflows
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB 6.0+ (local or Atlas)
- Git
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/smart-parking-system.git
cd smart-parking-system
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend-pwa
npm install
```

3. **Configure environment variables**

**Backend** (`backend/.env`):
```bash
cd backend
cp .env.example .env
# Edit .env and add your API keys
```

**Frontend** (`frontend-pwa/.env`):
```bash
cd frontend-pwa
cp .env.example .env
# Edit .env and add your API keys
```

4. **Set up database**
```bash
# Start MongoDB (if running locally)
mongod --dbpath ./data

# Seed database with sample data
cd backend
npm run seed
```

5. **Start development servers**

**Option A: Start both servers**
```bash
# From root directory
npm run dev
```

**Option B: Start separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend-pwa
npm start
```

6. **Access the application**
- Frontend: http://localhost:8000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api-docs

## 🔑 API Keys Required

### MongoDB
- **Local**: No key needed
- **Atlas**: Get connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project → Add web app
3. Get configuration from Project Settings
4. Download service account JSON for backend

### Razorpay
1. Sign up at [Razorpay](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test keys for development
4. Generate Live keys after KYC for production

### Google Maps
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API, Places API, Geocoding API
3. Create API key
4. Restrict key by HTTP referrer

### Email (Optional)
- Gmail: Use app-specific password
- SendGrid: Get API key from [SendGrid](https://sendgrid.com/)

## 📖 Documentation

- [API Documentation](docs/api/README.md)
- [Deployment Guide](docs/deployment/production.md)
- [User Manual](docs/user-guide/driver.md)
- [Admin Guide](docs/user-guide/admin.md)
- [Architecture](docs/architecture/overview.md)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# With coverage
npm run test:coverage

# Frontend tests
cd frontend-pwa
npm test
```

## 🚀 Deployment

### Backend (Heroku)
```bash
cd backend
heroku create your-app-name
git push heroku main
heroku config:set NODE_ENV=production
```

### Frontend (Netlify)
```bash
cd frontend-pwa
npm run build
netlify deploy --prod
```

### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d

# Access services
# Frontend: http://localhost:80
# Backend: http://localhost:5000
# MongoDB: mongodb://localhost:27017
```

### Detailed deployment guides:
- [Production Deployment](docs/deployment/production.md)
- [Docker Deployment](docs/deployment/docker.md)
- [Kubernetes](docs/deployment/kubernetes.md)

## 🔒 Security

- ✅ JWT authentication with refresh tokens
- ✅ Password hashing with bcrypt
- ✅ Rate limiting on API endpoints
- ✅ CORS properly configured
- ✅ Input validation and sanitization
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ HTTPS enforced in production
- ✅ API key restrictions
- ✅ Payment signature verification

## 📊 Performance

- ⚡ API response time: <100ms average
- 📱 PWA Lighthouse score: 95+
- 🗄️ Database queries optimized with indexes
- 🔄 Redis caching (optional)
- 📦 Gzip compression enabled
- 🖼️ Image optimization
- 🚀 CDN ready

## 🌍 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Your Name** - Initial work - [@yourhandle](https://github.com/yourhandle)

See also the list of [contributors](https://github.com/yourusername/smart-parking-system/contributors) who participated in this project.

## 🙏 Acknowledgments

- Firebase for real-time database
- Google Maps Platform
- Razorpay for payment gateway
- MongoDB Atlas for cloud database
- All open-source contributors

## 📞 Support

- 📧 Email: support@smartpark.com
- 💬 Discord: [Join our server](https://discord.gg/yourserver)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/smart-parking-system/issues)
- 📖 Wiki: [Project Wiki](https://github.com/yourusername/smart-parking-system/wiki)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core parking functionality
- ✅ Payment integration
- ✅ User authentication
- ✅ Admin dashboard

### Phase 2 (Next)
- ⏳ License plate recognition
- ⏳ Mobile apps (Flutter)
- ⏳ Advanced analytics
- ⏳ Multi-facility support

### Phase 3 (Future)
- 🔮 AI-powered predictions
- 🔮 Dynamic pricing
- 🔮 EV charging integration
- 🔮 Valet service

## 📈 Statistics

- **Code**: ~15,000+ lines
- **API Endpoints**: 40+
- **Database Collections**: 7
- **Languages**: JavaScript, HTML, CSS
- **Dependencies**: 50+

---

**Made with ❤️ for smart cities**

⭐ Star this repo if you find it helpful!
