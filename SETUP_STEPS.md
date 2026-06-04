# 📋 Step-by-Step Setup Guide

## Complete Setup in 10 Minutes

---

## Step 1: Check Prerequisites ✅

### Do you have these installed?

**Option A: Check in VS Code Terminal**

Open VS Code terminal (`` Ctrl + ` ``) and run:

```bash
node --version
npm --version
```

You should see version numbers like `v18.0.0` and `9.0.0`

**Option B: Download if Needed**

If you get "command not found", download Node.js:
- Go to: https://nodejs.org/
- Click the LTS (Long Term Support) button
- Install it
- Restart VS Code

---

## Step 2: Prepare Your Project 📂

### Option A: You Have the Repository
```bash
# Open terminal in your project folder
cd /path/to/your/project

# Make sure you're on the right branch
git checkout connect-website-to-mongodb

# Verify files exist
ls -la src/lib/mongodb.ts
```

### Option B: Just Start Fresh
Simply open your project folder in VS Code

---

## Step 3: Install Dependencies 📦

In VS Code terminal:

```bash
npm install
```

Wait for it to complete... (Look for "added XXX packages")

---

## Step 4: Start the Dev Server 🚀

In the same terminal:

```bash
npm run dev
```

You should see:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Step 5: Open in Browser 🌐

Click or copy-paste this URL into your browser:

```
http://localhost:5173/
```

**You should see your Member Directory app with demo data!**

---

## Step 6: Stop When Done 🛑

To stop the development server:

Press `Ctrl + C` in the terminal

---

## Visual Flow Diagram

```
┌─────────────────────────────────────┐
│   Your Computer (VS Code)           │
└─────────────────────────────────────┘
                  ↓
    ┌─────────────────────────┐
    │  npm install            │ ← Step 3
    │  (Downloads packages)   │
    └─────────────────────────┘
                  ↓
    ┌─────────────────────────┐
    │  npm run dev            │ ← Step 4
    │  (Starts dev server)    │
    └─────────────────────────┘
                  ↓
    ┌─────────────────────────┐
    │  http://localhost:5173/ │ ← Step 5
    │  (Open in browser)      │
    └─────────────────────────┘
                  ↓
    ┌─────────────────────────┐
    │   MongoDB Database      │
    │   (bni collection)      │ ← Connected!
    │   with demo members     │
    └─────────────────────────┘
```

---

## How Everything Connects

```
Browser                VS Code Dev Server       MongoDB Atlas
(Frontend)            (Backend/API)             (Database)
   │                         │                       │
   ├─ User clicks button ─→  │                       │
   │                         ├─ fetch members data ──→
   │                         │                       │
   │  ← displays members ─── ← returns JSON array ───┤
   │                         │                       │
   ├─ User creates member ──→ │                       │
   │                         ├─ save to database ────→
   │                         │                       │
   │  ← confirmation msg ─── ← success response ─────┤
```

---

## Common Mistakes to Avoid ❌

| Mistake | Fix |
|---------|-----|
| Running `npm run dev` before `npm install` | Always run `npm install` first |
| Opening wrong URL | Use `http://localhost:5173/` (not 3000 or 8080) |
| Port already in use | Stop other servers or use `taskkill /PID` |
| No internet connection | MongoDB needs internet to connect |
| Editing MongoDB URI | Don't change MongoDB credentials in code |

---

## What Each Command Does

```bash
npm install
  │
  └─→ Reads package.json
      └─→ Downloads all required packages to node_modules/
          └─→ Creates package-lock.json (lock file)

npm run dev
  │
  └─→ Reads package.json (scripts section)
      └─→ Starts Vite dev server
          └─→ Listens on port 5173
              └─→ Hot reloads on file changes
                  └─→ Connects to MongoDB Atlas

http://localhost:5173/
  │
  └─→ Browser sends request to local dev server
      └─→ Dev server serves your React app
          └─→ App connects to MongoDB
              └─→ Shows member data
```

---

## Folder Navigation in Terminal

### Move to Your Project
```bash
cd path/to/your/project
cd ~/Documents/my-app
cd /home/user/projects/connect-andesite
```

### List Files
```bash
ls              # List files (Mac/Linux)
dir             # List files (Windows)
ls -la          # Show all files including hidden
```

### Check Where You Are
```bash
pwd             # Shows current folder path
```

---

## npm Commands Explained

| Command | What It Does |
|---------|-------------|
| `npm install` | Downloads all packages needed |
| `npm run dev` | Starts development server |
| `npm run build` | Creates production build |
| `npm run preview` | Shows production build locally |
| `npm run typecheck` | Checks for TypeScript errors |
| `npm run lint` | Checks code quality |

---

## After It's Running

### Make Changes
1. Edit any file in `src/`
2. Save with `Ctrl + S`
3. Browser auto-refreshes! 🎉

### View Your Data
- Open browser DevTools: `F12`
- Go to Network tab
- See API calls and responses

### Check for Errors
- Look at VS Code terminal
- Or press `F12` → Console in browser

---

## You're All Set! 🎉

Your app is running and connected to MongoDB. Now you can:

✅ View all members  
✅ Create new members  
✅ Edit member details  
✅ See changes reflected in MongoDB  

---

## Need Help?

### Terminal Won't Start Server?
```bash
# Kill all running servers
lsof -ti:5173 | xargs kill -9   # Mac/Linux
netstat -ano | findstr :5173    # Windows

# Try again
npm run dev
```

### Still Stuck?
1. Check `LOCAL_DEVELOPMENT.md` for troubleshooting
2. Check the `COMMANDS.md` for quick reference
3. Check MongoDB Atlas is running: https://cloud.mongodb.com/

---

**You're ready to code! Start with `npm run dev` 🚀**
