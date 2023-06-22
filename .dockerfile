# Use the official Node.js base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the React project code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose the necessary port (e.g., 3000 for React)
EXPOSE 3000

# Define the command to start the React development server
CMD ["npm", "start"]
