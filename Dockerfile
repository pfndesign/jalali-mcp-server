# Use official Node.js LTS alpine image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Copy only package files first for caching layer
COPY package.json package-lock.json ./

# Install production dependencies
RUN --mount=type=cache,target=/root/.npm npm ci --ignore-scripts --omit=dev

# Copy app source code
COPY helper.js holidays.js index.js specialEvents.js ./

# Set environment
ENV NODE_ENV=production

# Default command
CMD ["node", "index.js"]