# CSE441 E-Commerce Application

A modern React Native e-commerce application built with Expo, Tamagui, and robust state management.

## Features

- User authentication (login, registration, password recovery)
- Product browsing and categorization
- Shopping cart management
- Order processing and tracking
- User profile and address management
- Admin dashboard (coming soon)

## Getting Started

### Prerequisites

- Node.js (version 16+)
- pnpm package manager
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm expo start
```

4. For web development:
```bash
pnpm expo start --web
```

## Environment Configuration

The application uses environment configuration located at `src/config/env.ts`. 

- **Development**: API endpoint - `http://localhost:8080/api`
- **Production**: API endpoint - `https://cse441.com/api`

By default, the application runs in development mode.

## Project Structure

```
ecommerce/
├── assets/                # Static assets (images, icons)
├── src/
│   ├── config/            # Configuration files
│   ├── navigation/        # Navigation setup
│   ├── screens/           # Application screens
│   │   ├── Admin/         # Admin management screens
│   │   ├── Auth/          # Authentication screens
│   │   ├── cart/          # Cart and checkout screens
│   │   ├── home/          # Home screens
│   │   ├── orders/        # Order tracking screens
│   │   ├── products/      # Product listings and details
│   │   └── profile/       # User profile management
│   ├── services/          # API services
│   │   ├── auth-service/  # Authentication handling
│   │   ├── cart-service/  # Cart operations
│   │   ├── order-service/ # Order processing
│   │   └── product-service/ # Product data handling
│   ├── store/             # State management
│   └── utils/             # Utility functions
├── App.tsx                # Application entry point
└── tamagui.config.ts      # Tamagui UI configuration
```

## Technology Stack

- **React Native**: Mobile app development framework
- **Expo**: Development platform for React Native
- **Tamagui**: UI component library for React Native
- **React Navigation**: Navigation library
- **Zustand**: State management

## Troubleshooting

### Common Issues

1. **API Connection Issues**: Make sure the backend server is running at the configured URL in `src/config/env.ts`

2. **UI Component Issues**: If you encounter issues with Tamagui components, ensure all required packages are installed:
   ```bash
   pnpm add @tamagui/core @tamagui/components
   ```

3. **Metro Bundler Issues**: Clear the cache and restart:
   ```bash
   pnpm exec expo start --clear
   ```

4. **Node Modules Issues**: Remove node_modules and reinstall:
   ```bash
   Remove-Item -Path "node_modules" -Recurse -Force
   pnpm install
   ```

## Contributing

Please follow the established file structure and naming conventions when contributing to this project.

## License

[Add your license information here]

## Contact

[Add your contact information here]