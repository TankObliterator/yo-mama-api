# Use Node.js Alpine for a smaller footprint
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package configurations and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all application files
COPY . .

# Set default environment variables
ENV PORT=3000
ENV FETCH_UPDATES=false
ENV GITHUB_REPO_RAW_URL=""

# Expose the API port
EXPOSE 3000

# Start API
CMD [ "npm", "start" ]
