# Step 1: Use a Node.js image for building the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Install only production dependencies
RUN npm ci --production

# Step 2: Use a lightweight Node.js image for running the application
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy only the built application and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
