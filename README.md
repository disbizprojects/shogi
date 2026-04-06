# SHOGI Systems - Preview Sites

Simple hosting for SHOGI Enterprise Dashboard and Policy Configuration preview sites.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
npm start
```

### 3. Visit Sites
```
http://localhost:3000/enterprise-dashboard-preview
http://localhost:3000/policy-configuration-preview
```

---

## Project Structure

```
shogi/
├── server.js                         # Express server
├── package.json                      # Dependencies
├── public/
│   ├── enterprise-dashboard.html    # Dashboard preview
│   └── policy-configuration.html    # Configuration preview
├── vercel.json                       # Vercel deployment config
└── README.md                         # This file
```

---

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your sites are live

3. **Access Your Sites**
   ```
   https://your-project.vercel.app/enterprise-dashboard-preview
   https://your-project.vercel.app/policy-configuration-preview
   ```

---

## Files

- **server.js** - Express server that serves the HTML files
- **public/** - Static HTML files (served as-is)
- **package.json** - Node.js dependencies
- **vercel.json** - Vercel deployment configuration

---

## Features

✅ Two preview sites  
✅ Simple Express server  
✅ Ready for Vercel deployment  
✅ No modifications to HTML files  

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | Change in server.js or use different port |
| Module not found | Run `npm install` |
| Sites not loading | Check server is running: `npm start` |

---

## License

MIT

