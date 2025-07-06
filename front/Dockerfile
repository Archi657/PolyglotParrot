# 1. Use an official Node.js runtime as the base image for building the app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# 2. Use serve image to serve static files
FROM node:18-alpine

# Install the 'serve' package globally
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/build /app/build

# Expose port 3000 (default for serve)
EXPOSE 3000

# Start 'serve' to serve the build directory
CMD ["serve", "-s", "build", "-l", "3000"]
