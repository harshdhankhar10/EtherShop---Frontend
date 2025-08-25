# EtherShop - Frontend

A modern, feature-rich e-commerce frontend application built with React and Vite. EtherShop provides a comprehensive online shopping experience with advanced user and admin dashboards, AI-powered customer support, and seamless payment integration.

## 🚀 Features

### 🛍️ E-commerce Core
- **Product Management**: Browse products by categories, detailed product views, search functionality
- **Shopping Cart**: Add/remove items, quantity management, persistent cart
- **Wishlist**: Save favorite products for later
- **Checkout**: Secure checkout process with multiple payment options
- **Order Tracking**: Real-time order status updates and tracking

### 👤 User Dashboard
- **Account Management**: Profile settings, order history, download management
- **AI Chatbot**: Intelligent customer support powered by Google Generative AI
- **Support System**: Create and manage support tickets
- **Order Management**: View order details, track packages, request returns

### 🔧 Admin Dashboard
- **Order Management**: Process orders, update status, view order details
- **Support Tickets**: Manage customer support requests and responses
- **User Management**: Oversee user accounts and permissions
- **Analytics**: Order tracking and business insights

### 🎨 User Experience
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Mode**: Theme switching capability
- **Animations**: Smooth transitions with Framer Motion
- **Offline Support**: Graceful offline experience
- **Maintenance Mode**: Admin-controlled maintenance with user notifications

### 🔐 Authentication & Security
- **Multiple Auth Methods**: Email/password, OTP-based login
- **Password Recovery**: Secure password reset functionality
- **Role-based Access**: User and admin role management
- **Protected Routes**: Secure access to dashboard areas

### 💳 Payment Integration
- **Razorpay**: Indian payment gateway integration
- **Braintree**: International payment processing
- **Secure Transactions**: PCI-compliant payment handling

### 📱 Additional Features
- **Blog System**: Content management and blog posts
- **QR Code Generation**: For orders and products
- **PDF Generation**: Invoices and reports
- **Rich Text Editor**: Content creation with TinyMCE/Quill
- **Charts & Analytics**: Data visualization with Chart.js
- **Social Sharing**: Share products and content

## 🛠️ Technology Stack

### Frontend Core
- **React** (17/18) - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - React component library
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Lucide React** - Additional icons

### Forms & Input
- **React Hook Form** - Form handling
- **React Date Range** - Date picker
- **React Country Region Selector** - Location selection
- **React Speech Recognition** - Voice input

### Data & API
- **Axios** - HTTP client
- **React Query** - Data fetching (if used)
- **Date-fns** - Date utilities
- **Lodash** - Utility functions

### Rich Media
- **React Slick** - Carousel/slider
- **QRCode.react** - QR code generation
- **jsPDF** - PDF generation
- **React Helmet** - Document head management

### AI & Advanced Features
- **Google Generative AI** - Chatbot functionality
- **Chart.js** - Data visualization
- **React Chartjs-2** - Chart.js wrapper
- **Typewriter Effect** - Text animations

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshdhankhar10/EtherShop---Frontend.git
   cd EtherShop---Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   cp .env.example .env
   ```
   
   Add the following environment variables:
   ```env
   VITE_REACT_APP_API=your_backend_api_url
   VITE_REACT_APP_GEMINI_API=your_google_gemini_api_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_key
   VITE_BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run serve` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cart.jsx        # Shopping cart component
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── Products/       # Product-related components
│   └── ...
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Dashboards/     # User and admin dashboards
│   │   ├── User/       # User dashboard pages
│   │   └── Admin/      # Admin dashboard pages
│   ├── Orders/         # Order-related pages
│   └── ...
├── context/            # React context providers
├── redux/              # Redux store and slices
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🌐 Environment Configuration

Create a `.env` file in the root directory with the following variables:

### Required Variables
```env
# Backend API
VITE_REACT_APP_API=http://localhost:8000

# Google Gemini AI (for chatbot)
VITE_REACT_APP_GEMINI_API=your_gemini_api_key

# Payment Gateways
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
```

### Optional Variables
```env
# Analytics
VITE_GOOGLE_ANALYTICS_ID=your_ga_id

# Social Login (if implemented)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on each push to main branch

### Manual Build
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

## 🎯 Key Features Guide

### User Authentication
- Register with email verification
- Login with email/password or OTP
- Password recovery with email reset
- Role-based access control

### Shopping Experience
- Browse products by categories
- Advanced search and filtering
- Add products to cart and wishlist
- Secure checkout with multiple payment options
- Order tracking and history

### Dashboard Features
- **User Dashboard**: Profile management, order history, AI support
- **Admin Dashboard**: Order management, user oversight, analytics
- **Support System**: Ticket creation, response management

### AI Chatbot
- Powered by Google Generative AI
- Context-aware responses
- File and image upload support
- Conversation history

## 🔒 Security Features

- Environment variable protection
- Role-based route protection
- Secure payment processing
- Input validation and sanitization
- CORS configuration
- JWT token management

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Write descriptive commit messages

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with missing dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Environment variables not loading**
   - Ensure `.env` file is in root directory
   - Check variable names start with `VITE_`
   - Restart development server after changes

3. **Payment integration issues**
   - Verify API keys are correct
   - Check sandbox/production mode settings
   - Ensure CORS is configured on backend

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility framework
- All open source contributors

---

**Made with ❤️ by the EtherShop Team**
