# Required Remainder Frontend

An Angular application that provides a user interface for solving the "Required Remainder" algorithmic problem. The frontend allows users to input test cases and view results from the backend API.


## 🏗️ Architecture

### Frontend (Angular)
- **Framework**: Angular 18.1.4
- **Language**: TypeScript
- **Build Tool**: Angular CLI
- **Deployment**: AWS S3 + CloudFront

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

3. **Build for production**
   ```bash
   ng build
   ```

   The build artifacts will be stored in the `dist/` directory.

### AWS Deployment

The frontend is automatically deployed via GitHub Actions when you push to the main branch. The workflow will:

1. Install dependencies
2. Build the application
3. Deploy to S3
4. Invalidate CloudFront cache




## 🚀 Deployment

### GitHub Actions Workflow

The frontend uses GitHub Actions for CI/CD. The workflow (`/.github/workflows/aws.yml`) will:

1. **Setup**: Install Node.js and dependencies
2. **Build**: Create production build
3. **Deploy**: Upload to S3 and invalidate CloudFront

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

| Secret | Description | Required |
|--------|-------------|----------|
| `AWS_ACCESS_KEY_ID` | AWS access key | ✅ |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | ✅ |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID | ✅ |
