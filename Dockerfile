FROM node:16-alpine
# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json .
# Install dependencies using Yarn
RUN yarn install
# Copy the rest of the project files to the working directory
COPY . .

# Build the React project

# Expose the desired port (e.g., 3000) for the application
EXPOSE 5173

# Set the command to run the application
CMD ["npm", "run", "dev"]
