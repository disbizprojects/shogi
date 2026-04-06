# SHOGI Systems Preview - Project Instructions

This project hosts two HTML preview sites for SHOGI Systems on a custom domain with HTTPS support.

## Project Goals

- Host Enterprise Dashboard at `https://shogisystems.com/enterprise-dashboard-preview`
- Host Policy Configuration at `https://shogisystems.com/policy-configuration-preview`
- No modifications to HTML files
- Support multiple deployment options (direct, Docker, reverse proxy)
- Production-ready configuration

## Project Status

- ✅ Server setup (Express.js)
- ✅ Routes configured
- ✅ HTML files in place
- ✅ SSL/TLS support
- ✅ Docker configuration
- ✅ Production deployment guides
- ✅ Process management (PM2)
- ✅ Reverse proxy setup (Nginx)
- ✅ Documentation complete

## Quick Commands

```bash
# Development
npm install
./generate-certs.sh  # Unix
npm start

# Production (with PM2)
pm2 start ecosystem.config.js --env production

# Docker
docker-compose up -d

# Test
./test.sh  # Unix
test.bat   # Windows
```

## Key Files

- `server.js` - Main application server
- `package.json` - Dependencies
- `QUICKSTART.md` - Get started in 5 minutes
- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Production deployment guide

## Important Notes

1. **HTML files**: Located in `public/` - serve as-is, no modifications
2. **Certificates**: Place SSL certificates in `certs/` directory
3. **Port 443**: Requires admin/root privileges (use reverse proxy or port 3000)
4. **Domain**: Configure DNS to point to server IP

## Deployment Checklist

- [ ] Verify domain DNS points to server
- [ ] Obtain SSL certificate from Let's Encrypt
- [ ] Copy certificates to `./certs/` directory
- [ ] Install Node.js on server
- [ ] Clone/upload project files
- [ ] Run `npm install`
- [ ] Configure firewall (allow 80, 443)
- [ ] Start with PM2 or Docker
- [ ] Test both routes
- [ ] Set up certificate auto-renewal

## Support Files

- `Dockerfile` - Docker image configuration
- `docker-compose.yml` - Docker Compose orchestration
- `ecosystem.config.js` - PM2 process management
- `nginx.conf.example` - Nginx reverse proxy config
- `generate-certs.sh/.bat` - Certificate generation
- `test.sh/.bat` - Verification tests

## Next Steps

1. Read `QUICKSTART.md` for immediate setup
2. Follow `DEPLOYMENT.md` for production
3. Refer to `README.md` for detailed documentation
