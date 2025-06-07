# 🚀 Deployment Verification Guide

## 📋 Pre-Deployment Checklist

1. **Stop existing containers:**
   ```bash
   docker-compose down
   docker system prune -f
   ```

2. **Build and start with nginx:**
   ```bash
   docker-compose up --build
   ```

3. **Verify all containers are running:**
   ```bash
   docker-compose ps
   ```
   You should see:
   - `videoeditor-nginx` (port 80)
   - `videoeditor-frontend` (internal only)
   - `videoeditor-backend` (internal only)

## 🔍 Access Points

### ✅ Correct URLs (through nginx):
- **Frontend:** `http://your-vps-ip/`
- **API Health:** `http://your-vps-ip/api/health`
- **Nginx Health:** `http://your-vps-ip/nginx-health`

### ❌ Don't use these anymore:
- ~~`http://your-vps-ip:3000`~~ (frontend direct access)
- ~~`http://your-vps-ip:8000`~~ (backend direct access)

## 🔧 Troubleshooting

### If you can't access the frontend on port 80:

1. **Check nginx container:**
   ```bash
   docker logs videoeditor-nginx
   ```

2. **Check if port 80 is available:**
   ```bash
   sudo netstat -tlnp | grep :80
   ```

3. **Verify nginx configuration:**
   ```bash
   docker exec videoeditor-nginx nginx -t
   ```

### If API calls are failing:

1. **Test API directly:**
   ```bash
   curl http://your-vps-ip/api/health
   ```

2. **Check backend logs:**
   ```bash
   docker logs videoeditor-backend
   ```

### If you still see port 3000:

This means you're either:
- Using an old docker-compose version
- Have cached containers running
- Not accessing through nginx

**Solution:**
```bash
docker-compose down --volumes --remove-orphans
docker system prune -a -f
docker-compose up --build
```

## 🎯 Expected Behavior

- ✅ Main app loads at `http://your-vps-ip/`
- ✅ File uploads work through the interface
- ✅ Video rendering works
- ✅ All media served correctly
- ✅ No port numbers needed in URLs 