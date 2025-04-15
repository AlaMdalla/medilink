const http = require('http');
const Eureka = require('eureka-js-client').Eureka;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Handle different routes
  if (req.url === '/support/hello') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello from the support service!' }));
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  }
});

const PORT = 3000;

// Configure Eureka client
const client = new Eureka({
  instance: {
    app: 'node-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': PORT,
      '@enabled': true,
    },
    vipAddress: 'node-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

// Start the server and register with Eureka
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);

  // Start Eureka client
  client.start(error => {
    if (error) {
      console.log('Error registering with Eureka:', error);
      return;
    }
    console.log('Registered with Eureka server at http://localhost:8761');
  });
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  client.stop();
  server.close(() => {
    console.log('Server and Eureka client stopped');
    process.exit();
  });
});
