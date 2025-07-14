# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN pnpm run build

# Expose port 3000 (default NestJS port)
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=${NODE_ENV:-development}

# Use a startup script to handle different environments
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then pnpm run start:prod; else pnpm run start:dev; fi"]