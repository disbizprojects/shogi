const express = require('express');
const path = require('path');

const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Routes for the two preview sites
app.get('/enterprise-dashboard-preview', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'enterprise-dashboard.html'));
});

app.get('/policy-configuration-preview', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'policy-configuration.html'));
});

// Root redirect
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SHOGI Systems - Preview Sites</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        h1 {
          color: #333;
          margin-bottom: 30px;
        }
        .links {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        a {
          display: inline-block;
          padding: 12px 24px;
          margin: 10px;
          font-size: 16px;
          text-decoration: none;
          background: #667eea;
          color: white;
          border-radius: 5px;
          transition: background 0.3s;
        }
        a:hover {
          background: #764ba2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>SHOGI Systems - Preview Sites</h1>
        <div class="links">
          <a href="/enterprise-dashboard-preview">Enterprise Dashboard Preview</a>
          <a href="/policy-configuration-preview">Policy Configuration Preview</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Enterprise Dashboard: http://localhost:${PORT}/enterprise-dashboard-preview`);
  console.log(`📍 Policy Configuration: http://localhost:${PORT}/policy-configuration-preview`);
});
