# 🐛 Debug Guide: Finding Localhost URLs

## When you drop a video and see a localhost error:

### 1. Check Browser Console
Open browser dev tools (F12) and look for:
- Network tab: Check for any failed requests to localhost
- Console tab: Look for specific error messages

### 2. Common Places Localhost Might Appear:

#### In the upload process:
- `useMediaBin.ts` line 90: `fetch(buildApiUrl('upload'))`
- Should resolve to `/api/upload`, not localhost

#### In video preview:
- `VideoPlayer.tsx` lines 46, 55: Image/Video src attributes
- Check what URL is being passed to `<Img>` and `<Video>` components

#### In media file URLs:
- Backend upload response in `videorender.ts`
- Check what `uploadResult.fullUrl` contains

### 3. Debug Steps:

#### Step 1: Check API Configuration
```bash
# In browser console on your site:
console.log(window.location.origin); // Should be your domain, not localhost
```

#### Step 2: Check Upload Response
```bash
# Open Network tab, drop a video, check the /api/upload response:
# Should return URLs like "/api/media/filename", not "http://localhost:8000/media/filename"
```

#### Step 3: Check Environment Variables
```bash
# In your VPS, check the frontend container:
docker exec videoeditor-frontend env | grep VITE_API_URL
# Should show: VITE_API_URL=/api
```

### 4. Quick Fix Test:
If you still see localhost errors, try this temporary fix:

1. Stop containers: `docker-compose down`
2. Clean everything: `docker system prune -f`
3. Rebuild: `docker-compose up --build`
4. Access ONLY through: `http://your-vps-ip/` (no port number)

### 5. Tell me exactly:
- What error message you see
- Which browser tab shows the error (Console/Network)
- What you were doing when it happened (uploading? previewing? rendering?)

This will help me pinpoint the exact issue! 