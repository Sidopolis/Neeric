#!/bin/bash

# Neeric Deployment Script
# Usage: ./deploy.sh [dev|prod|docker]

set -e

ENVIRONMENT=${1:-dev}
VERSION=$(node -p "require('./package.json').version")

echo "🚀 Deploying Neeric v$VERSION to $ENVIRONMENT environment"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    # Check Docker (for docker deployment)
    if [ "$ENVIRONMENT" = "docker" ] && ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    npm ci
    log_success "Dependencies installed"
}

# Build application
build_app() {
    log_info "Building application..."
    npm run build
    log_success "Application built successfully"
}

# Setup AWS credentials
setup_aws() {
    if [ ! -f ~/.aws/credentials ] && [ ! -f ~/.aws/config ]; then
        log_warning "AWS credentials not found"
        echo -e "${YELLOW}Please configure AWS credentials:${NC}"
        echo "1. Run: aws configure"
        echo "2. Or set environment variables:"
        echo "   export AWS_ACCESS_KEY_ID=your_key"
        echo "   export AWS_SECRET_ACCESS_KEY=your_secret"
        echo "   export AWS_DEFAULT_REGION=us-east-1"
        
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        log_success "AWS credentials found"
    fi
}

# Development deployment
deploy_dev() {
    log_info "Starting development server..."
    setup_aws
    install_dependencies
    
    log_info "Starting Neeric dashboard on http://localhost:5174"
    log_info "Press Ctrl+C to stop"
    npm run dev
}

# Production deployment
deploy_prod() {
    log_info "Deploying to production..."
    setup_aws
    install_dependencies
    build_app
    
    # Install serve globally if not installed
    if ! command -v serve &> /dev/null; then
        log_info "Installing serve globally..."
        npm install -g serve
    fi
    
    log_info "Starting production server on http://localhost:3000"
    serve -s dist -l 3000
}

# Docker deployment
deploy_docker() {
    log_info "Deploying with Docker..."
    
    # Build Docker image
    log_info "Building Docker image..."
    docker build -t neeric:$VERSION .
    docker tag neeric:$VERSION neeric:latest
    
    # Stop existing container if running
    if [ "$(docker ps -q -f name=neeric)" ]; then
        log_info "Stopping existing container..."
        docker stop neeric
        docker rm neeric
    fi
    
    # Run new container
    log_info "Starting new container..."
    docker run -d \
        --name neeric \
        -p 3000:3000 \
        -v ~/.aws:/home/neeric/.aws:ro \
        -e AWS_REGION=${AWS_REGION:-us-east-1} \
        neeric:latest
    
    log_success "Neeric is running at http://localhost:3000"
    log_info "Container logs: docker logs neeric"
    log_info "Stop container: docker stop neeric"
}

# Main deployment logic
main() {
    echo "=================================================="
    echo "           Neeric AWS Cleaner Deployment"
    echo "=================================================="
    
    check_prerequisites
    
    case $ENVIRONMENT in
        dev)
            deploy_dev
            ;;
        prod)
            deploy_prod
            ;;
        docker)
            deploy_docker
            ;;
        *)
            log_error "Invalid environment: $ENVIRONMENT"
            echo "Usage: $0 [dev|prod|docker]"
            echo ""
            echo "Environments:"
            echo "  dev    - Development server with hot reload"
            echo "  prod   - Production build with serve"
            echo "  docker - Docker container deployment"
            exit 1
            ;;
    esac
}

# Cleanup function
cleanup() {
    echo ""
    log_info "Deployment interrupted. Cleaning up..."
    # Kill background processes
    jobs -p | xargs -r kill
    exit 1
}

# Set trap for cleanup
trap cleanup SIGINT SIGTERM

# Run main function
main "$@" 