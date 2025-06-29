# frontend_ui/Dockerfile

# --- Stage 1: Build the React application ---
    FROM node:18-alpine as build

    WORKDIR /app
    
    # Copy package.json and install dependencies first (leverages Docker cache)
    COPY package*.json ./
    RUN npm install
    
    # Copy the rest of the source code
    COPY . .
    
    # Build the app for production, setting the backend URL via build arg
    # Use ARG to accept a build argument for the backend URL
    ARG VITE_BACKEND_API_URL
    ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
    
    # Set environment variable needed by Vite for build
    # Important: Need to set VITE_ environment variables as regular ENV vars before build
    # Vite docs: https://vitejs.dev/guide/env-and-mode.html#env-files
    # When building with ARG/ENV in Dockerfile, ensure Vite picks it up correctly.
    # Often, defining it directly in the command works best.
    # Let's ensure the environment variable is available during the build command
    RUN echo "VITE_BACKEND_API_URL=${VITE_BACKEND_API_URL}" > .env.production
    
    # Perform the build
    RUN npm run build
    
    
    # --- Stage 2: Serve the built application using Nginx ---
    FROM nginx:stable-alpine as production
    
    # Copy the built static files from the build stage
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Copy custom nginx configuration (Optional, but good for SPAs)
    # If you have a custom nginx.conf, place it in frontend_ui/nginx/
    # COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port 80
    EXPOSE 80
    
    # Command to start Nginx
    CMD ["nginx", "-g", "daemon off;"]