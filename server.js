const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const https = require('https');

const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Proxy endpoint to bypass ad blockers - fetches Vercel insights script from unrecognizable URL
app.get('/lib/telemetry.js', (req, res) => {
  const options = {
    hostname: 'vercel.com',
    port: 443,
    path: '/_vercel/insights/script.js',
    method: 'GET',
    headers: { 'User-Agent': 'Node.js' }
  };

  https.get(options, (proxyRes) => {
    res.type('application/javascript');
    proxyRes.pipe(res);
  }).on('error', (error) => {
    console.error('Failed to fetch insights script:', error);
    res.status(500).send('');
  });
});

// Primary routes for the two preview sites
const INSIGHTS_SCRIPT_TAG = '<script defer src="/lib/telemetry.js"></script>';

async function sendHtmlWithInsights(res, filePath) {
  try {
    const html = await fs.readFile(filePath, 'utf8');
    const withInsights = html.includes('/_vercel/insights/script.js')
      ? html
      : html.replace('</head>', `  ${INSIGHTS_SCRIPT_TAG}\n</head>`);

    res.type('html').send(withInsights);
  } catch (error) {
    console.error(`Failed to serve ${filePath}:`, error);
    res.status(500).send('Internal Server Error');
  }
}

app.get('/enterprise-dashboard', async (req, res) => {
  await sendHtmlWithInsights(res, path.join(__dirname, 'public', 'enterprise-dashboard.html'));
});

app.get('/policy-configuration-decision-trace', async (req, res) => {
  await sendHtmlWithInsights(res, path.join(__dirname, 'public', 'policy-configuration.html'));
});

// Backward-compatible redirects from legacy preview routes
app.get('/enterprise-dashboard-preview', (req, res) => {
  res.redirect(301, '/enterprise-dashboard');
});

app.get('/policy-configuration-preview', (req, res) => {
  res.redirect(301, '/policy-configuration-decision-trace');
});

// Root redirect
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SHOGI Systems - Preview Sites</title>
      <script>
        window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
      </script>
      <script defer src="/_vercel/insights/script.js"></script>
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
          <a href="/enterprise-dashboard">Enterprise Dashboard</a>
          <a href="/policy-configuration-decision-trace">Policy Configuration Decision Trace</a>
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
  console.log(`📍 Enterprise Dashboard: http://localhost:${PORT}/enterprise-dashboard`);
  console.log(`📍 Policy Configuration Decision Trace: http://localhost:${PORT}/policy-configuration-decision-trace`);
});
