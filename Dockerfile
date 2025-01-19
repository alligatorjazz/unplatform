# TODO: setup volumes
# Use the official Node.js 20 image as the base image
FROM node:20
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package.json ./

# Install project dependencies
RUN npm i

# Copy the rest of the application code
COPY .env.production ./.env
COPY . .

# Build the project
RUN npm run build

# Expose the desired port (if needed, e.g., 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
