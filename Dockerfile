# Multi-stage build for Neeric AWS Cleaner

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM node:18-alpine AS runtime

# Install global dependencies for CLI
RUN npm install -g serve

# Create app directory
WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/cli.js ./

# Install only production dependencies
RUN npm ci --only=production

# Create non-root user
RUN addgroup -g 1001 -S neeric && \
    adduser -S neeric -u 1001

# Set ownership
RUN chown -R neeric:neeric /app
USER neeric

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Expose ports
EXPOSE 3000

# Default command
CMD ["serve", "-s", "dist", "-l", "3000"] 