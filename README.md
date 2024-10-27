# TypeScript Express API Boilerplate

A modern, production-ready boilerplate for building RESTful APIs using TypeScript, Express, and Node.js. Features include comprehensive testing setup, logging, security middleware, and development tools.

## 🚀 Features

- **TypeScript** - Write better, more secure code with static typing
- **Express.js** - Fast, unopinionated web framework
- **Security Features** - CORS, Helmet, Rate limiting
- **Testing** - Jest & Supertest setup with watch mode
- **Logging** - Winston for structured logging
- **Development Tools** - Hot reloading, linting, and formatting
- **Git Hooks** - Automated linting on commit

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## 🚦 Development

```bash
# Start development server with hot-reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test-watch

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### TypeScript Configuration

The project uses a modern TypeScript configuration targeting Node.js 20:

```json
{
  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",
    "strict": true,
    ...
  }
}
```

### Testing

Jest is configured for TypeScript with ESM support:

- Tests should be placed in `src/` directory with `.test.ts` extension
- Use `npm run test-watch` for development
- Includes supertest for API testing

### Linting and Formatting

- ESLint with TypeScript support
- Prettier for code formatting
- Pre-commit hooks with husky and lint-staged

## 🔒 Security Features

- **Helmet** - Secure HTTP headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Basic brute-force protection
- **HTTP Context** - Request context isolation

## 📝 Logging

Winston is configured for structured logging with:

- Console transport for development
- Configurable log levels
- Request logging with Morgan

## 🚢 Production Deployment

```bash
# Build the project
npm run build

# Start production server
NODE_ENV=production npm start
```

## 📚 Dependencies

### Core

- `express` - Web framework
- `cors` - CORS middleware
- `helmet` - Security headers
- `winston` - Logging
- `dotenv` - Environment variables

### Development

- `typescript` - Static typing
- `ts-node-dev` - Development server
- `jest` & `ts-jest` - Testing
- `eslint` & `prettier` - Code quality
- `husky` & `lint-staged` - Git hooks
