// Import required modules
const http = require('http');

// Define request handler function
const requestHandler = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello, World!\n');
};

// Create server
const server = http.createServer(requestHandler);

// Define port number
const port = 3000;

// Start server
server.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong:', err);
  }

  console.log(`Server is listening on port ${port}`);
});
