const express = require('express');
const Eureka = require('eureka-js-client').Eureka;

const app = express();
const PORT = 3000;

// Log environment variables for debugging
console.log('EUREKA_URL:', process.env.EUREKA_URL);

// Eureka client configuration
const eurekaUrl = process.env.EUREKA_URL || 'http://eureka:8761/eureka/';
console.log('Using Eureka URL:', eurekaUrl);

const client = new Eureka({
  instance: {
    app: 'node-app',
    hostName: 'node-service',
    ipAddr: 'node-service', // Matches container_name
    port: {
      '$': PORT,
      '@enabled': true,
    },
    vipAddress: 'node-app',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true,
  },
  eureka: {
    serviceUrls: {
      default: [eurekaUrl],
    },
    maxRetries: 10,
    requestRetryDelay: 2000,
  },
});

// Start Eureka client
client.start((error) => {
  console.log(error || 'Eureka client started');
});

// Simple endpoint to test
app.get('/', (req, res) => {
  res.send('hello docker');
});

app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});