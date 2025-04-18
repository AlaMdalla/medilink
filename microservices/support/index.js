const http = require('http');
const mysql = require('mysql2/promise');
const Eureka = require('eureka-js-client').Eureka;

// MySQL configuration (from application.properties equivalent)
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ala',
  database: 'E-sbitar',
  connectionLimit: 10,
};

// Create MySQL connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  queueLimit: 0,
});

// Initialize database and table
async function initializeDatabase() {
  const connection = await pool.getConnection();
  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS E_sbitar`);
    await connection.query(`USE E_sbitar`);

    // Create Subs table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Subs (
        subid INT AUTO_INCREMENT PRIMARY KEY,
        typesub VARCHAR(255),
        subsDescription TEXT,
        subsDiscountedPrice DOUBLE,
        subsActualPrice DOUBLE,
        status VARCHAR(50),
        endDate DATETIME
      )
    `);
    console.log('Database and Subs table initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    connection.release();
  }
}

// Helper function to parse JSON request body
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', error => reject(error));
  });
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // CORS headers (optional, for testing with tools like Postman)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Support endpoint (original)
  if (url === '/support/hello' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello from the support service!' }));
    return;
  }

  // CRUD Endpoints for Subs

  // POST: Create a new subscription
  if (url === '/api/subscriptions' && method === 'POST') {
    try {
      const body = await parseBody(req);
      const { typesub, subsDescription, subsDiscountedPrice, subsActualPrice, status, endDate } = body;
      const [result] = await pool.query(
        `INSERT INTO Subs (typesub, subsDescription, subsDiscountedPrice, subsActualPrice, status, endDate)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [typesub, subsDescription, subsDiscountedPrice, subsActualPrice, status, endDate]
      );
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ subid: result.insertId, ...body }));
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to create subscription' }));
    }
    return;
  }

  // GET: Retrieve a subscription by ID
  if (url.match(/^\/api\/subscriptions\/\d+$/) && method === 'GET') {
    try {
      const id = url.split('/')[3];
      const [rows] = await pool.query('SELECT * FROM Subs WHERE subid = ?', [id]);
      if (rows.length === 0) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Subscription not found' }));
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(rows[0]));
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to retrieve subscription' }));
    }
    return;
  }

  // PUT: Update a subscription by ID
  if (url.match(/^\/api\/subscriptions\/\d+$/) && method === 'PUT') {
    try {
      const id = url.split('/')[3];
      const body = await parseBody(req);
      const { typesub, subsDescription, subsDiscountedPrice, subsActualPrice, status, endDate } = body;
      const [result] = await pool.query(
        `UPDATE Subs
         SET typesub = ?, subsDescription = ?, subsDiscountedPrice = ?, subsActualPrice = ?, status = ?, endDate = ?
         WHERE subid = ?`,
        [typesub, subsDescription, subsDiscountedPrice, subsActualPrice, status, endDate, id]
      );
      if (result.affectedRows === 0) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Subscription not found' }));
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ subid: parseInt(id), ...body }));
    } catch (error) {
      console.error('Error updating subscription:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to update subscription' }));
    }
    return;
  }

  // DELETE: Delete a subscription by ID
  if (url.match(/^\/api\/subscriptions\/\d+$/) && method === 'DELETE') {
    try {
      const id = url.split('/')[3];
      const [result] = await pool.query('DELETE FROM Subs WHERE subid = ?', [id]);
      if (result.affectedRows === 0) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Subscription not found' }));
        return;
      }
      res.statusCode = 204;
      res.end();
    } catch (error) {
      console.error('Error deleting subscription:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to delete subscription' }));
    }
    return;
  }

  // Default route
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

const PORT = 3000;

// Configure Eureka client
const client = new Eureka({
  instance: {
    app: 'node-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      $: PORT,
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
server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}/`);

  // Initialize database
  await initializeDatabase();

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
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  client.stop();
  await pool.end();
  server.close(() => {
    console.log('Server, MySQL pool, and Eureka client stopped');
    process.exit();
  });
});