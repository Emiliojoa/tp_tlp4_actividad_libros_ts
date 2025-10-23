FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Use npm install because package-lock.json may not exist; we need devDeps for the Vite build
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
# Create a directory for the built static files
RUN mkdir -p /app/build
COPY --from=builder /app/dist ./build
CMD ["/bin/sh", "-c", "echo Build complete; sleep 1"]