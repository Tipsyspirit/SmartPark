// ================================================
// SMART PARKING PWA - MAIN APPLICATION
// Google Maps + Razorpay Integration
// ================================================

console.log("✅ app.js loaded successfully");

// ===== CONFIGURATION =====
const CONFIG = {
    // Replace with your actual API keys
    GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
    RAZORPAY_KEY_ID: 'YOUR_RAZORPAY_KEY_ID',
    
    // API Endpoints (replace with your backend)
    API_BASE_URL: 'https://api.smartparking.com',
    
    // Parking Facility
    FACILITY_ID: 'fac_abc123',
    FACILITY_NAME: 'Campus West Parking',
    FACILITY_LOCATION: {
        lat: 19.1929,
        lng: 72.9633
    },
    
    // Pricing
    HOURLY_RATE: 50, // ₹50 per hour
    DAILY_MAX: 300, // ₹300 daily maximum
    RESERVATION_FEE: 20 // ₹20 reservation fee
};

// ===== GLOBAL STATE =====
const APP_STATE = {
    currentPage: 'landing',
    isAuthenticated: false,
    user: null,
    selectedSpot: null,
    activeBooking: null,
    parkingSpots: [],
    currentLevel: 2,
    filters: {
        available: true,
        ev: false,
        handicap: false,
        nearExit: false
    },
    googleMap: null,
    markers: []
};

// ===== DOM ELEMENTS =====
const DOM = {
    loadingScreen: document.getElementById('loading-screen'),
    app: document.getElementById('app'),
    
    // Header
    menuBtn: document.getElementById('menu-btn'),
    notificationsBtn: document.getElementById('notifications-btn'),
    
    // Side Menu
    sideMenu: document.getElementById('side-menu'),
    menuOverlay: document.getElementById('menu-overlay'),
    closeMenuBtn: document.getElementById('close-menu'),
    menuItems: document.querySelectorAll('.menu-item'),
    
    // Pages
    pages: document.querySelectorAll('.page'),
    
    // Landing Page
    viewMapBtn: document.getElementById('view-map-btn'),
    guestContinueBtn: document.getElementById('guest-continue-btn'),
    signinBtn: document.getElementById('signin-btn'),
    scanQRBtn: document.getElementById('scan-qr-btn'),
    
    // Map Page
    levelSelector: document.getElementById('level-selector'),
    filterBtn: document.getElementById('filter-btn'),
    refreshMapBtn: document.getElementById('refresh-map-btn'),
    filterOptions: document.getElementById('filter-options'),
    googleMap: document.getElementById('google-map'),
    parkingGrid: document.getElementById('parking-grid'),
    toggleViewBtn: document.getElementById('toggle-view-btn'),
    
    // Modals
    spotModal: document.getElementById('spot-modal'),
    bookingModal: document.getElementById('booking-modal'),
    qrScannerModal: document.getElementById('qr-scanner-modal'),
    modalCloseBtns: document.querySelectorAll('.modal-close'),
    
    // Toast
    toastContainer: document.getElementById('toast-container'),
    
    // Bottom Nav
    bottomNavItems: document.querySelectorAll('.bottom-nav .nav-item'),
    
    // PWA Install
    installPWABtn: document.getElementById('install-pwa-btn')
};

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM loaded");
    
    // Hide loading screen
    setTimeout(() => {
        DOM.loadingScreen.style.display = 'none';
        DOM.app.style.display = 'flex';
        initializeApp();
    }, 1500);
});

function initializeApp() {
    console.log("✅ Initializing app...");
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize parking data
    initializeParkingData();
    
    // Initialize Google Maps
    initializeGoogleMaps();
    
    // Check authentication
    checkAuthentication();
    
    // Setup PWA install
    setupPWAInstall();
    
    // Simulate QR code scan (for demo)
    simulateQRScan();
    
    console.log("✅ App initialized");
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Menu
    DOM.menuBtn.addEventListener('click', openMenu);
    DOM.closeMenuBtn.addEventListener('click', closeMenu);
    DOM.menuOverlay.addEventListener('click', closeMenu);
    
    // Menu navigation
    DOM.menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            if (page) {
                navigateToPage(page);
                closeMenu();
            }
        });
    });
    
    // Bottom navigation
    DOM.bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            if (page) {
                navigateToPage(page);
            }
        });
    });
    
    // Landing page buttons
    DOM.viewMapBtn.addEventListener('click', () => navigateToPage('map'));
    DOM.guestContinueBtn.addEventListener('click', continueAsGuest);
    DOM.signinBtn.addEventListener('click', showSignIn);
    DOM.scanQRBtn.addEventListener('click', openQRScanner);
    
    // Map controls
    DOM.levelSelector.addEventListener('change', (e) => {
        APP_STATE.currentLevel = parseInt(e.target.value);
        updateParkingDisplay();
    });
    
    DOM.filterBtn.addEventListener('click', toggleFilters);
    DOM.refreshMapBtn.addEventListener('click', refreshParkingData);
    DOM.toggleViewBtn.addEventListener('click', toggleMapView);
    
    // Filter checkboxes
    document.getElementById('filter-available').addEventListener('change', (e) => {
        APP_STATE.filters.available = e.target.checked;
        updateParkingDisplay();
    });
    
    document.getElementById('filter-ev').addEventListener('change', (e) => {
        APP_STATE.filters.ev = e.target.checked;
        updateParkingDisplay();
    });
    
    document.getElementById('filter-handicap').addEventListener('change', (e) => {
        APP_STATE.filters.handicap = e.target.checked;
        updateParkingDisplay();
    });
    
    document.getElementById('filter-near-exit').addEventListener('change', (e) => {
        APP_STATE.filters.nearExit = e.target.checked;
        updateParkingDisplay();
    });
    
    // Modal close buttons
    DOM.modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Click outside modal to close
    [DOM.spotModal, DOM.bookingModal, DOM.qrScannerModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
}

// ===== NAVIGATION =====
function navigateToPage(pageName) {
    // Update current page
    APP_STATE.currentPage = pageName;
    
    // Hide all pages
    DOM.pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`${pageName}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update menu active state
    DOM.menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });
    
    // Update bottom nav active state
    DOM.bottomNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });
    
    // Page-specific actions
    if (pageName === 'map') {
        setTimeout(() => {
            if (APP_STATE.googleMap) {
                google.maps.event.trigger(APP_STATE.googleMap, 'resize');
            }
        }, 100);
    } else if (pageName === 'bookings') {
        loadBookings();
    } else if (pageName === 'vehicles') {
        loadVehicles();
    }
}

function openMenu() {
    DOM.sideMenu.classList.add('active');
    DOM.menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    DOM.sideMenu.classList.remove('active');
    DOM.menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== PARKING DATA =====
function initializeParkingData() {
    // Generate sample parking spots
    APP_STATE.parkingSpots = generateSampleParkingSpots();
    updateAvailabilityCounts();
}

function generateSampleParkingSpots() {
    const spots = [];
    const spotTypes = ['regular', 'handicap', 'ev'];
    const statuses = ['available', 'occupied', 'reserved'];
    
    // Generate 200 spots across 3 levels
    for (let level = 1; level <= 3; level++) {
        for (let i = 1; i <= 67; i++) {
            const spotNumber = ((level - 1) * 67 + i).toString();
            let type = 'regular';
            
            // Special spots
            if (i % 20 === 19) {
                type = 'handicap';
            } else if (i % 15 === 0) {
                type = 'ev';
            }
            
            // Random status (70% available, 20% occupied, 10% reserved)
            const rand = Math.random();
            let status = 'available';
            if (rand > 0.7 && rand <= 0.9) {
                status = 'occupied';
            } else if (rand > 0.9) {
                status = 'reserved';
            }
            
            spots.push({
                id: `spot_${spotNumber}`,
                number: spotNumber,
                level: level,
                type: type,
                status: status,
                size: 'standard',
                distanceToElevator: Math.floor(Math.random() * 100) + 20,
                distanceToExit: Math.floor(Math.random() * 80) + 15,
                hourlyRate: CONFIG.HOURLY_RATE,
                location: {
                    lat: CONFIG.FACILITY_LOCATION.lat + (Math.random() - 0.5) * 0.002,
                    lng: CONFIG.FACILITY_LOCATION.lng + (Math.random() - 0.5) * 0.002
                }
            });
        }
    }
    
    return spots;
}

function updateAvailabilityCounts() {
    const spots = APP_STATE.parkingSpots.filter(s => s.level === APP_STATE.currentLevel);
    
    const availableCount = spots.filter(s => s.status === 'available').length;
    const regularAvailable = spots.filter(s => s.status === 'available' && s.type === 'regular').length;
    const handicapAvailable = spots.filter(s => s.status === 'available' && s.type === 'handicap').length;
    const evAvailable = spots.filter(s => s.status === 'available' && s.type === 'ev').length;
    
    // Update UI
    document.getElementById('available-count').textContent = availableCount;
    document.getElementById('total-spots').textContent = spots.length;
    
    if (document.getElementById('regular-available')) {
        document.getElementById('regular-available').textContent = regularAvailable;
    }
    if (document.getElementById('handicap-available')) {
        document.getElementById('handicap-available').textContent = handicapAvailable;
    }
    if (document.getElementById('ev-available')) {
        document.getElementById('ev-available').textContent = evAvailable;
    }
}

function refreshParkingData() {
    showToast('Refreshing parking data...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Randomly update some spot statuses
        APP_STATE.parkingSpots.forEach(spot => {
            if (Math.random() > 0.95) {
                const statuses = ['available', 'occupied', 'reserved'];
                spot.status = statuses[Math.floor(Math.random() * statuses.length)];
            }
        });
        
        updateParkingDisplay();
        updateAvailabilityCounts();
        showToast('Parking data updated', 'success');
    }, 1000);
}

// ===== GOOGLE MAPS INTEGRATION =====
function initializeGoogleMaps() {
    if (typeof google === 'undefined' || !google.maps) {
        console.error('❌ Google Maps not loaded');
        showToast('Google Maps failed to load', 'error');
        return;
    }
    
    // Create map
    APP_STATE.googleMap = new google.maps.Map(DOM.googleMap, {
        center: CONFIG.FACILITY_LOCATION,
        zoom: 18,
        mapTypeId: 'roadmap',
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Add facility marker
    new google.maps.Marker({
        position: CONFIG.FACILITY_LOCATION,
        map: APP_STATE.googleMap,
        title: CONFIG.FACILITY_NAME,
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
    });
    
    // Add parking spot markers
    updateParkingMarkers();
    
    console.log('✅ Google Maps initialized');
}

function updateParkingMarkers() {
    // Clear existing markers
    APP_STATE.markers.forEach(marker => marker.setMap(null));
    APP_STATE.markers = [];
    
    if (!APP_STATE.googleMap) return;
    
    // Get filtered spots
    const spots = getFilteredSpots();
    
    // Add markers for each spot
    spots.forEach(spot => {
        let icon, color;
        
        switch (spot.status) {
            case 'available':
                color = '#10B981'; // Green
                break;
            case 'occupied':
                color = '#EF4444'; // Red
                break;
            case 'reserved':
                color = '#3B82F6'; // Blue
                break;
            default:
                color = '#6B7280'; // Gray
        }
        
        // Custom marker icon
        icon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: color,
            fillOpacity: 0.8,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
        };
        
        const marker = new google.maps.Marker({
            position: spot.location,
            map: APP_STATE.googleMap,
            title: `Spot #${spot.number}`,
            icon: icon,
            optimized: true
        });
        
        // Add click listener
        marker.addListener('click', () => {
            showSpotDetails(spot);
        });
        
        APP_STATE.markers.push(marker);
    });
}

function getFilteredSpots() {
    let spots = APP_STATE.parkingSpots.filter(s => s.level === APP_STATE.currentLevel);
    
    // Apply filters
    if (APP_STATE.filters.available) {
        spots = spots.filter(s => s.status === 'available');
    }
    
    if (APP_STATE.filters.ev) {
        spots = spots.filter(s => s.type === 'ev');
    }
    
    if (APP_STATE.filters.handicap) {
        spots = spots.filter(s => s.type === 'handicap');
    }
    
    if (APP_STATE.filters.nearExit) {
        spots = spots.filter(s => s.distanceToExit < 50);
    }
    
    return spots;
}

function updateParkingDisplay() {
    updateParkingMarkers();
    updateParkingGrid();
    updateAvailabilityCounts();
}

function updateParkingGrid() {
    const spots = getFilteredSpots();
    const grid = DOM.parkingGrid;
    grid.innerHTML = '';
    
    spots.forEach(spot => {
        const spotEl = document.createElement('div');
        spotEl.className = `parking-spot ${spot.status} ${spot.type}`;
        spotEl.innerHTML = `
            ${getSpotIcon(spot.type)}
            ${spot.number}
        `;
        spotEl.addEventListener('click', () => showSpotDetails(spot));
        grid.appendChild(spotEl);
    });
}

function getSpotIcon(type) {
    switch (type) {
        case 'handicap':
            return '<i class="fas fa-wheelchair"></i>';
        case 'ev':
            return '<i class="fas fa-charging-station"></i>';
        default:
            return '';
    }
}

function toggleFilters() {
    DOM.filterOptions.style.display = 
        DOM.filterOptions.style.display === 'none' ? 'flex' : 'none';
}

function toggleMapView() {
    const isGridView = DOM.parkingGrid.style.display !== 'none';
    
    if (isGridView) {
        // Show map
        DOM.parkingGrid.style.display = 'none';
        DOM.googleMap.style.display = 'block';
        DOM.toggleViewBtn.innerHTML = '<i class="fas fa-th"></i>';
        
        // Trigger map resize
        if (APP_STATE.googleMap) {
            google.maps.event.trigger(APP_STATE.googleMap, 'resize');
        }
    } else {
        // Show grid
        DOM.googleMap.style.display = 'none';
        DOM.parkingGrid.style.display = 'grid';
        DOM.toggleViewBtn.innerHTML = '<i class="fas fa-map"></i>';
    }
}

// ===== SPOT DETAILS =====
function showSpotDetails(spot) {
    APP_STATE.selectedSpot = spot;
    
    const modalBody = document.getElementById('spot-modal-body');
    const modalTitle = document.getElementById('modal-spot-title');
    
    modalTitle.textContent = `Spot #${spot.number}`;
    
    const statusIcon = getStatusIcon(spot.status);
    const statusText = getStatusText(spot.status);
    
    modalBody.innerHTML = `
        <div class="spot-details">
            <div class="status-badge ${spot.status}">
                ${statusIcon} ${statusText}
            </div>
            
            ${spot.status === 'occupied' ? `
                <p class="estimated-available">Est. available: ~45 min</p>
            ` : ''}
            
            <div class="details-section">
                <h4>Spot Details</h4>
                <div class="detail-item">
                    <i class="fas fa-ruler"></i>
                    <span>Size: ${capitalizeFirst(spot.size)} (9×18ft)</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-door-open"></i>
                    <span>To Exit: ${spot.distanceToExit}ft</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-elevator"></i>
                    <span>To Elevator: ${spot.distanceToElevator}ft</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-layer-group"></i>
                    <span>Level: ${spot.level}</span>
                </div>
            </div>
            
            <div class="details-section">
                <h4>Pricing</h4>
                <div class="detail-item">
                    <i class="fas fa-rupee-sign"></i>
                    <span>₹${spot.hourlyRate} / hour</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar-day"></i>
                    <span>Daily max: ₹${CONFIG.DAILY_MAX}</span>
                </div>
            </div>
            
            ${spot.status === 'available' ? `
                <button class="btn btn-primary btn-large" onclick="bookSpot('${spot.id}')">
                    <i class="fas fa-check"></i> Book This Spot
                </button>
                <div style="margin-top: 12px; display: flex; gap: 8px;">
                    <button class="btn btn-outline" onclick="addToFavorites('${spot.id}')">
                        <i class="fas fa-star"></i> Add to Favorites
                    </button>
                    <button class="btn btn-outline" onclick="navigateToSpot('${spot.id}')">
                        <i class="fas fa-directions"></i> Navigate
                    </button>
                </div>
            ` : `
                <button class="btn btn-secondary btn-large" onclick="notifyWhenAvailable('${spot.id}')">
                    <i class="fas fa-bell"></i> Notify When Available
                </button>
                
                <div class="similar-spots" style="margin-top: 24px;">
                    <h4>Similar Available Spots</h4>
                    ${getSimilarAvailableSpots(spot).map(s => `
                        <div class="similar-spot-item" onclick="showSpotDetails(APP_STATE.parkingSpots.find(spot => spot.id === '${s.id}'))">
                            <span>Spot #${s.number}</span>
                            <button class="btn btn-sm btn-primary">Book Now</button>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
    
    DOM.spotModal.classList.add('active');
}

function getStatusIcon(status) {
    switch (status) {
        case 'available':
            return '🟢';
        case 'occupied':
            return '🔴';
        case 'reserved':
            return '🔵';
        default:
            return '⚪';
    }
}

function getStatusText(status) {
    return capitalizeFirst(status);
}

function getSimilarAvailableSpots(spot) {
    return APP_STATE.parkingSpots
        .filter(s => 
            s.level === spot.level && 
            s.type === spot.type && 
            s.status === 'available' &&
            s.id !== spot.id
        )
        .slice(0, 3);
}

// ===== BOOKING FLOW =====
function bookSpot(spotId) {
    const spot = APP_STATE.parkingSpots.find(s => s.id === spotId);
    if (!spot) return;
    
    closeAllModals();
    
    const modalBody = document.getElementById('booking-modal-body');
    
    modalBody.innerHTML = `
        <div class="booking-flow">
            <div class="booking-summary">
                <h4>Booking Summary</h4>
                <div class="summary-item">
                    <span>Spot:</span>
                    <strong>#${spot.number} - Level ${spot.level}</strong>
                </div>
                <div class="summary-item">
                    <span>Type:</span>
                    <strong>${capitalizeFirst(spot.type)}</strong>
                </div>
            </div>
            
            <div class="booking-section">
                <h4>When?</h4>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="booking-time" value="now" checked>
                        <span>Now (immediate)</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="booking-time" value="later">
                        <span>Schedule for later</span>
                    </label>
                </div>
                
                <div id="schedule-options" style="display: none; margin-top: 16px;">
                    <label>
                        Date
                        <input type="date" id="booking-date" class="form-input" min="${getTodayDate()}">
                    </label>
                    <label>
                        Start Time
                        <input type="time" id="booking-time" class="form-input">
                    </label>
                </div>
            </div>
            
            <div class="booking-section">
                <h4>Duration</h4>
                <div class="duration-buttons">
                    <button class="duration-btn active" data-hours="1">1h</button>
                    <button class="duration-btn" data-hours="2">2h</button>
                    <button class="duration-btn" data-hours="4">4h</button>
                    <button class="duration-btn" data-hours="8">8h</button>
                    <button class="duration-btn" data-hours="24">24h</button>
                </div>
                <label style="margin-top: 12px;">
                    <input type="radio" name="duration-type" value="custom">
                    Custom hours: <input type="number" id="custom-hours" min="1" max="168" value="3" class="form-input" style="width: 80px; display: inline-block; margin-left: 8px;">
                </label>
            </div>
            
            <div class="pricing-summary">
                <h4>Pricing Summary</h4>
                <div class="price-item">
                    <span>Duration:</span>
                    <span id="booking-duration">1 hour</span>
                </div>
                <div class="price-item">
                    <span>Parking:</span>
                    <span id="parking-cost">₹${spot.hourlyRate}</span>
                </div>
                <div class="price-item">
                    <span>Reservation fee:</span>
                    <span>₹${CONFIG.RESERVATION_FEE}</span>
                </div>
                <div class="price-item total">
                    <span>Total:</span>
                    <strong id="total-cost">₹${spot.hourlyRate + CONFIG.RESERVATION_FEE}</strong>
                </div>
            </div>
            
            <p class="info-text">
                <i class="fas fa-clock"></i> Spot held for 15 minutes
            </p>
            
            <button class="btn btn-primary btn-large" onclick="proceedToPayment('${spot.id}')">
                Continue to Payment
            </button>
        </div>
    `;
    
    DOM.bookingModal.classList.add('active');
    
    // Setup dynamic pricing updates
    setupBookingListeners();
}

function setupBookingListeners() {
    // Duration buttons
    document.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateBookingPrice();
        });
    });
    
    // Custom hours
    const customHoursInput = document.getElementById('custom-hours');
    if (customHoursInput) {
        customHoursInput.addEventListener('input', updateBookingPrice);
    }
    
    // Booking time radio
    document.querySelectorAll('input[name="booking-time"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const scheduleOptions = document.getElementById('schedule-options');
            scheduleOptions.style.display = this.value === 'later' ? 'block' : 'none';
        });
    });
}

function updateBookingPrice() {
    const activeBtn = document.querySelector('.duration-btn.active');
    const customHours = document.getElementById('custom-hours');
    
    let hours = 1;
    if (activeBtn) {
        hours = parseInt(activeBtn.dataset.hours);
    } else if (customHours) {
        hours = parseInt(customHours.value) || 1;
    }
    
    const parkingCost = Math.min(hours * CONFIG.HOURLY_RATE, CONFIG.DAILY_MAX);
    const total = parkingCost + CONFIG.RESERVATION_FEE;
    
    document.getElementById('booking-duration').textContent = `${hours} hour${hours > 1 ? 's' : ''}`;
    document.getElementById('parking-cost').textContent = `₹${parkingCost}`;
    document.getElementById('total-cost').textContent = `₹${total}`;
}

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// ===== RAZORPAY PAYMENT INTEGRATION =====
function proceedToPayment(spotId) {
    const spot = APP_STATE.parkingSpots.find(s => s.id === spotId);
    if (!spot) return;
    
    // Calculate total amount
    const activeBtn = document.querySelector('.duration-btn.active');
    const customHours = document.getElementById('custom-hours');
    
    let hours = 1;
    if (activeBtn) {
        hours = parseInt(activeBtn.dataset.hours);
    } else if (customHours) {
        hours = parseInt(customHours.value) || 1;
    }
    
    const parkingCost = Math.min(hours * CONFIG.HOURLY_RATE, CONFIG.DAILY_MAX);
    const total = parkingCost + CONFIG.RESERVATION_FEE;
    
    // Convert to paise (Razorpay uses smallest currency unit)
    const amountInPaise = total * 100;
    
    // Razorpay options
    const options = {
        key: CONFIG.RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Smart Parking',
        description: `Parking Spot #${spot.number}`,
        image: '/icons/icon-192.png',
        handler: function(response) {
            // Payment successful
            handlePaymentSuccess(response, spot, hours);
        },
        prefill: {
            name: APP_STATE.user ? APP_STATE.user.name : 'Guest User',
            email: APP_STATE.user ? APP_STATE.user.email : 'guest@parking.com',
            contact: APP_STATE.user ? APP_STATE.user.phone : ''
        },
        notes: {
            spot_id: spot.id,
            spot_number: spot.number,
            hours: hours
        },
        theme: {
            color: '#3B82F6'
        },
        modal: {
            ondismiss: function() {
                showToast('Payment cancelled', 'warning');
            }
        }
    };
    
    const razorpay = new Razorpay(options);
    razorpay.open();
}

function handlePaymentSuccess(paymentResponse, spot, hours) {
    console.log('Payment successful:', paymentResponse);
    
    // Create booking
    const booking = {
        id: 'bk_' + Date.now(),
        spotId: spot.id,
        spotNumber: spot.number,
        level: spot.level,
        startTime: new Date(),
        endTime: new Date(Date.now() + hours * 60 * 60 * 1000),
        hours: hours,
        amount: Math.min(hours * CONFIG.HOURLY_RATE, CONFIG.DAILY_MAX) + CONFIG.RESERVATION_FEE,
        paymentId: paymentResponse.razorpay_payment_id,
        status: 'confirmed',
        qrCode: generateQRCode()
    };
    
    // Update spot status
    spot.status = 'reserved';
    
    // Save to state
    APP_STATE.activeBooking = booking;
    
    // Close modal and show confirmation
    closeAllModals();
    showBookingConfirmation(booking);
    
    showToast('Booking confirmed!', 'success');
}

function generateQRCode() {
    // Generate simple QR code data
    return 'QR_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function showBookingConfirmation(booking) {
    const modalBody = document.getElementById('booking-modal-body');
    
    modalBody.innerHTML = `
        <div class="booking-confirmation">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Booking Confirmed!</h2>
            
            <div class="booking-id">
                Booking ID: #${booking.id}
            </div>
            
            <div class="qr-code-display">
                <div class="qr-placeholder">
                    <i class="fas fa-qrcode"></i>
                    <p>QR Entry Pass</p>
                    <code>${booking.qrCode}</code>
                </div>
            </div>
            
            <div class="booking-details">
                <div class="detail-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Spot #${booking.spotNumber} - Level ${booking.level}</span>
                </div>
                <div class="detail-row">
                    <i class="fas fa-clock"></i>
                    <span>${formatDateTime(booking.startTime)} - ${formatTime(booking.endTime)}</span>
                </div>
                <div class="detail-row">
                    <i class="fas fa-rupee-sign"></i>
                    <span>₹${booking.amount}</span>
                </div>
            </div>
            
            <div class="action-buttons" style="margin-top: 24px;">
                <button class="btn btn-primary" onclick="navigateToSpot('${booking.spotId}')">
                    <i class="fas fa-directions"></i> Navigate to Spot
                </button>
                <button class="btn btn-outline" onclick="downloadTicket()">
                    <i class="fas fa-download"></i> Download Ticket
                </button>
                <button class="btn btn-outline" onclick="addToCalendar()">
                    <i class="fas fa-calendar-plus"></i> Add to Calendar
                </button>
            </div>
            
            <div class="next-steps">
                <h4>Next Steps:</h4>
                <ol>
                    <li>Scan this QR code at the entrance gate</li>
                    <li>Park in spot #${booking.spotNumber}</li>
                    <li>Scan QR code again when exiting</li>
                </ol>
            </div>
        </div>
    `;
    
    DOM.bookingModal.classList.add('active');
}

// ===== QR CODE SCANNER =====
function openQRScanner() {
    DOM.qrScannerModal.classList.add('active');
    
    const html5QrCode = new Html5Qrcode("qr-reader");
    
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        (decodedText, decodedResult) => {
            console.log(`QR Code detected: ${decodedText}`);
            handleQRCode(decodedText);
            html5QrCode.stop();
            closeAllModals();
        },
        (errorMessage) => {
            // Ignore scan errors
        }
    ).catch(err => {
        console.error('QR Scanner error:', err);
        showToast('Camera access denied', 'error');
    });
}

function handleQRCode(qrData) {
    try {
        const data = JSON.parse(qrData);
        
        switch(data.type) {
            case 'entrance':
                // Handle entrance QR
                showToast(`Welcome to ${data.facilityName}`, 'success');
                navigateToPage('map');
                break;
                
            case 'event':
                // Handle event QR
                showToast(`Event parking for ${data.eventName}`, 'info');
                break;
                
            case 'booking_pass':
                // Handle booking pass
                showToast('Booking verified', 'success');
                break;
                
            default:
                showToast('Unknown QR code', 'warning');
        }
    } catch (e) {
        showToast('Invalid QR code format', 'error');
    }
}

function simulateQRScan() {
    // Simulate scanning entrance QR code for demo
    const qrData = {
        type: 'entrance',
        facilityId: CONFIG.FACILITY_ID,
        facilityName: CONFIG.FACILITY_NAME,
        gateId: 'gate_a1',
        level: 1,
        location: 'Entrance A',
        timestamp: Date.now()
    };
    
    console.log('Simulated QR scan:', qrData);
}

// ===== BOOKINGS =====
function loadBookings() {
    // Sample bookings data
    const activeBookings = APP_STATE.activeBooking ? [APP_STATE.activeBooking] : [];
    
    const upcomingBookings = [
        {
            id: 'bk_future1',
            spotNumber: '15',
            level: 1,
            startTime: new Date(Date.now() + 86400000), // Tomorrow
            endTime: new Date(Date.now() + 86400000 + 8 * 3600000),
            hours: 8,
            amount: 300,
            status: 'upcoming'
        }
    ];
    
    const historyBookings = [
        {
            id: 'bk_past1',
            spotNumber: '42',
            level: 2,
            startTime: new Date(Date.now() - 86400000), // Yesterday
            endTime: new Date(Date.now() - 86400000 + 4 * 3600000),
            hours: 4,
            amount: 220,
            status: 'completed'
        }
    ];
    
    // Render bookings
    renderBookingsList('active-bookings', activeBookings, 'active');
    renderBookingsList('upcoming-bookings', upcomingBookings, 'upcoming');
    renderBookingsList('history-bookings', historyBookings, 'completed');
}

function renderBookingsList(containerId, bookings, type) {
    const container = document.getElementById(containerId);
    
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-ticket-alt"></i>
                <p>No ${type} bookings</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-header">
                <h3>Spot #${booking.spotNumber} - Level ${booking.level}</h3>
                <span class="booking-status ${booking.status}">${capitalizeFirst(booking.status)}</span>
            </div>
            <div class="booking-info">
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <span>${formatDateTime(booking.startTime)}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-hourglass-half"></i>
                    <span>${booking.hours} hours</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-rupee-sign"></i>
                    <span>₹${booking.amount}</span>
                </div>
            </div>
            ${type === 'active' ? `
                <div class="booking-actions">
                    <button class="btn btn-outline btn-sm" onclick="extendBooking('${booking.id}')">
                        <i class="fas fa-plus"></i> Extend
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="navigateToSpot('${booking.spotId}')">
                        <i class="fas fa-directions"></i> Navigate
                    </button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// ===== VEHICLES =====
function loadVehicles() {
    const vehicles = [
        {
            id: 'veh_1',
            make: 'Toyota',
            model: 'Camry',
            color: 'Silver',
            year: 2020,
            licensePlate: 'MH-01-AB-1234',
            isEV: false,
            isDefault: true
        }
    ];
    
    const container = document.getElementById('vehicles-list');
    
    container.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-card">
            <div class="vehicle-icon">
                <i class="fas fa-car"></i>
            </div>
            <div class="vehicle-info">
                <h3>${vehicle.make} ${vehicle.model}</h3>
                <p>${vehicle.color} • ${vehicle.year}</p>
                <p>${vehicle.licensePlate}</p>
                ${vehicle.isDefault ? '<span class="vehicle-badge default">Default</span>' : ''}
                ${vehicle.isEV ? '<span class="vehicle-badge ev">EV</span>' : ''}
            </div>
            <div class="vehicle-actions">
                <button class="btn btn-sm btn-outline">Edit</button>
            </div>
        </div>
    `).join('');
}

// ===== HELPER FUNCTIONS =====
function continueAsGuest() {
    APP_STATE.isAuthenticated = false;
    navigateToPage('map');
    showToast('Continuing as guest', 'info');
}

function showSignIn() {
    showToast('Sign in feature coming soon', 'info');
}

function checkAuthentication() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('parkingUser');
    if (savedUser) {
        APP_STATE.user = JSON.parse(savedUser);
        APP_STATE.isAuthenticated = true;
        updateUserInfo();
    }
}

function updateUserInfo() {
    if (APP_STATE.user) {
        document.getElementById('user-name').textContent = APP_STATE.user.name;
        document.getElementById('user-email').textContent = APP_STATE.user.email;
    }
}

function addToFavorites(spotId) {
    showToast('Added to favorites', 'success');
}

function navigateToSpot(spotId) {
    const spot = APP_STATE.parkingSpots.find(s => s.id === spotId);
    if (!spot) return;
    
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.location.lat},${spot.location.lng}`;
    window.open(url, '_blank');
    
    showToast('Opening navigation...', 'info');
}

function notifyWhenAvailable(spotId) {
    showToast('You will be notified when this spot becomes available', 'success');
}

function extendBooking(bookingId) {
    showToast('Extend booking feature coming soon', 'info');
}

function downloadTicket() {
    showToast('Downloading ticket...', 'success');
}

function addToCalendar() {
    showToast('Adding to calendar...', 'success');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

function formatTime(date) {
    return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

// ===== PWA INSTALL =====
let deferredPrompt;

function setupPWAInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        DOM.installPWABtn.style.display = 'block';
    });
    
    DOM.installPWABtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            showToast('App installed successfully!', 'success');
        }
        
        deferredPrompt = null;
        DOM.installPWABtn.style.display = 'none';
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    showToast('An error occurred. Please try again.', 'error');
});

// ===== EXPORT FOR GLOBAL ACCESS =====
window.APP_STATE = APP_STATE;
window.bookSpot = bookSpot;
window.showSpotDetails = showSpotDetails;
window.proceedToPayment = proceedToPayment;
window.navigateToSpot = navigateToSpot;
window.addToFavorites = addToFavorites;
window.notifyWhenAvailable = notifyWhenAvailable;
window.extendBooking = extendBooking;
window.downloadTicket = downloadTicket;
window.addToCalendar = addToCalendar;

console.log("✅ App ready!");
