# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if exists)
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose port 5173 (default Vite port)
EXPOSE 5173

# Start the development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]