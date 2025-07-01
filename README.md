# Required Remainder Frontend

An Angular application that provides a user interface for solving the "Required Remainder" algorithmic problem. The frontend allows users to input test cases and view results from the backend API.

## 🏗️ Architecture

### Frontend (Angular)
- **Framework**: Angular 18.1.4
- **Language**: TypeScript
- **Build Tool**: Angular CLI
- **Architecture**: Feature-based modular structure
- **State Management**: Reactive Forms
- **UI Framework**: Angular Material
- **Deployment**: AWS S3 + CloudFront

### Project Structure
```
src/app/
├── core/                    # Shared services and utilities
│   ├── services/           # Core services (API calls)
│   └── models/             # Shared interfaces and types
├── features/               # Feature modules
│   └── required-remainder/ # Main feature
│       └── components/     # Feature components
│           ├── test-cases/ # Test cases form component
│           └── test-case-card/ # Individual test case card
└── environments/           # Environment configurations
    ├── environment.ts      # Development environment
    └── environment.prod.ts # Production environment
```

### Infrastructure (AWS)
- **Storage**: S3 Bucket for static files
- **CDN**: CloudFront for global distribution
- **Infrastructure as Code**: CloudFormation templates

## 📋 Prerequisites

### Local Development
- Node.js 18+ 
- npm or yarn
- Angular CLI: `npm install -g @angular/cli`

### AWS Deployment
- AWS CLI configured
- AWS credentials with appropriate permissions
- GitHub Actions secrets configured

## 🛠️ Setup Instructions

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   ng serve
   ```

   Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

3. **Run tests**
   ```bash
   ng test
   ```

4. **Run linting**
   ```bash
   npm run lint
   ```

5. **Build for production**
   ```bash
   ng build
   ```

   The build artifacts will be stored in the `dist/` directory.

### Environment Configuration

The application uses environment-specific configuration files:

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

Key configuration:
```typescript
export const environment = {
  production: false, // or true for prod
  apiUrl: 'http://localhost:8080/api/required-remainder' // Backend API URL
};
```

## 🧪 Testing

### Run Tests
```bash
# Run tests in watch mode
ng test

# Run tests once
ng test --watch=false --browsers=ChromeHeadless

# Run tests with coverage
ng test --code-coverage
```

### Test Structure
- **Unit Tests**: Component logic, services, and utilities
- **Integration Tests**: Form validation and API integration
- **Coverage**: Aim for >80% code coverage

## 🚀 Deployment

### GitHub Actions Workflow

The frontend uses GitHub Actions for CI/CD. The workflow (`/.github/workflows/aws.yml`) includes:

1. **Setup**: Install Node.js and dependencies
2. **Lint**: Run ESLint to check code quality
3. **Test**: Run unit tests with coverage
4. **Build**: Create production build
5. **Deploy**: Upload to S3 and invalidate CloudFront

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

| Secret | Description | Required |
|--------|-------------|----------|
| `AWS_ACCESS_KEY_ID` | AWS access key | ✅ |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | ✅ |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | ✅ |

## 📚 API Integration

### Backend Communication
The frontend communicates with the backend through the `RequiredRemainderService`:

```typescript
// POST /api/required-remainder/solve
sendTestCases(testCases: TestCase[]): Observable<number[]>
```

### Request Format
```typescript
interface TestCase {
  x: number; // divisor (2 ≤ x ≤ 10^9)
  y: number; // remainder (0 ≤ y < x)
  n: number; // upper bound (y ≤ n ≤ 10^9)
}
```

### Response Format
```typescript
number[] // Array of maximum k values for each test case
```

## 🔧 Development Guidelines

### Code Style
- Use Angular Material components for consistent UI
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling

### Component Structure
- Use standalone components
- Implement reactive forms for data input
- Use proper input validation
- Follow single responsibility principle

### Service Layer
- Centralize API calls in services
- Use environment variables for configuration
- Implement proper error handling
- Use RxJS observables for async operations

## 🐛 Troubleshooting

### Common Issues

1. **Environment Configuration**
   - Ensure environment files are properly configured
   - Check API URLs in environment files

2. **Build Issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Angular cache: `ng cache clean`

3. **Test Failures**
   - Ensure BrowserAnimationsModule is imported in test files
   - Check for proper mocking of services

## 📄 License

This project is part of the Required Remainder application suite.
