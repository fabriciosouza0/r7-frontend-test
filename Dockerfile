# Use a base Node.js image
FROM node:20.14.0

# Define workdir inside the container
WORKDIR /usr/src/public

# Copy all files to the container
COPY . .

# Install dependency's
RUN npm install

# Expose application port
EXPOSE 7007

# Command to run application
CMD ["node", "app.js"]