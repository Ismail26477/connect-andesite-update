# 💻 Terminal Commands - Exact Copy & Paste Guide

Follow this guide to run everything. Copy the exact commands and paste them into your terminal.

---

## Step 1: Open VS Code Terminal

**What to do:**
1. Open VS Code
2. Press: `` Ctrl + ` `` (that's Control + Backtick)

A terminal window will appear at the bottom showing something like:
```
PS C:\path\to\project> 
```
or
```
user@computer project %
```

---

## Step 2: Navigate to Your Project (If Needed)

**If you're already in the project folder:** Skip this step

**If you need to navigate there:**

### Windows Users
```bash
cd C:\path\to\your\project
```
Example:
```bash
cd C:\Users\YourName\Documents\connect-andesite-update
```

### Mac/Linux Users
```bash
cd /path/to/your/project
```
Example:
```bash
cd ~/Documents/connect-andesite-update
```

---

## Step 3: Install Dependencies (First Time Only)

**Copy and paste this command:**

```bash
npm install
```

**What happens:**
- Terminal shows downloading packages
- Wait until you see `added XXX packages in XXs`
- This takes 2-5 minutes

**You'll see something like:**
```
npm WARN deprecated ...
added 247 packages in 45s
```

---

## Step 4: Start the Development Server

**Copy and paste this command:**

```bash
npm run dev
```

**What you should see:**
```
  VITE v5.0.0  ready in 345 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Step 5: Open in Browser

**Copy this URL and paste in your browser:**

```
http://localhost:5173/
```

Or click the link in the terminal (Ctrl+Click on Mac)

---

## ✅ You're Done!

Your app is now running with MongoDB connected!

---

## Other Useful Commands

### Stop the Dev Server

**Press these keys:**
```
Ctrl + C
```

You'll see:
```
^C
npm notice
npm notice to see npm docs, find help, visit https://docs.npmjs.com/
user@computer project %
```

---

### Restart the Dev Server (if something breaks)

After stopping with `Ctrl + C`, run again:

```bash
npm run dev
```

---

### Reseed Demo Data (if you deleted all members)

```bash
node scripts/seed-mongodb.mjs
```

---

### Build for Production

```bash
npm run build
```

Output will be in `dist/` folder

---

### Preview Production Build

```bash
npm run preview
```

---

### Check for TypeScript Errors

```bash
npm run typecheck
```

---

### Clean Up (if things are broken)

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Troubleshooting Commands

### Port Already in Use?

**Windows:**
```bash
netstat -ano | findstr :5173
```

Copy the PID number you see, then:
```bash
taskkill /PID 12345 /F
```
Replace `12345` with the actual number

**Mac/Linux:**
```bash
lsof -ti:5173 | xargs kill -9
```

Then restart:
```bash
npm run dev
```

---

### Check Node Version

```bash
node --version
```

Should show `v18.0.0` or higher

---

### Check npm Version

```bash
npm --version
```

Should show `9.0.0` or higher

---

### Check If MongoDB Can Connect

```bash
node -e "const {MongoClient} = require('mongodb'); const c = new MongoClient('mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net'); c.connect().then(() => {console.log('✓ Connected to MongoDB'); c.close();}).catch(e => console.error('✗ Error:', e.message));"
```

---

## Daily Workflow

### Every time you start coding:

```bash
# 1. Make sure you're in the project folder
cd /path/to/your/project

# 2. Start the dev server
npm run dev

# 3. Open browser
# Go to: http://localhost:5173/
```

### When you're done:

```bash
# Press Ctrl + C to stop the server
Ctrl + C
```

### If something goes wrong:

```bash
# Stop server
Ctrl + C

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Terminal Navigation Basics

### List Files in Current Folder

**Windows:**
```bash
dir
```

**Mac/Linux:**
```bash
ls
```

### Show Current Folder Path

**All Systems:**
```bash
pwd
```

### Create New Folder

**All Systems:**
```bash
mkdir folder-name
```

### Delete Folder (careful!)

**Windows:**
```bash
rmdir folder-name
```

**Mac/Linux:**
```bash
rm -rf folder-name
```

---

## Keyboard Shortcuts in Terminal

| Action | Keys |
|--------|------|
| Clear screen | `Ctrl + L` or type `clear` |
| Stop current command | `Ctrl + C` |
| Copy | `Ctrl + C` (after selecting) |
| Paste | `Ctrl + V` or `Cmd + V` (Mac) |
| Move to start of line | `Home` or `Ctrl + A` |
| Move to end of line | `End` or `Ctrl + E` |
| Previous command | ↑ Arrow key |
| Next command | ↓ Arrow key |

---

## If Terminal Commands Aren't Working

### Make sure Node.js is installed:

```bash
node --version
```

If you get "command not found", install Node.js:
- Download: https://nodejs.org/
- Install it
- Restart VS Code
- Try again

### Make sure you're in the right folder:

```bash
pwd
```

Should show your project path like:
```
/Users/name/Documents/my-project
```

---

## Copy-Paste Cheat Sheet

**Save this section for quick reference!**

```bash
# First time setup
npm install

# Start dev server
npm run dev

# Stop dev server
Ctrl + C

# Restart everything
Ctrl + C
npm run dev

# If broken
rm -rf node_modules package-lock.json
npm install
npm run dev

# Check node
node --version

# Reseed data
node scripts/seed-mongodb.mjs
```

---

## Browser URLs

**Main app:** http://localhost:5173/  
**Member list:** http://localhost:5173/  
**Browser DevTools:** Press `F12`  
**Clear cache:** `Ctrl + Shift + Delete`  

---

## Git Commands (Optional)

If you're using Git:

### Check status
```bash
git status
```

### Commit changes
```bash
git add .
git commit -m "Your message here"
```

### Push to GitHub
```bash
git push
```

### Pull latest changes
```bash
git pull
```

---

## That's It! 🎉

You now know all the commands you need. The most important ones are:

```bash
npm install      # One time
npm run dev      # Every time you start
Ctrl + C         # To stop
```

Happy coding! 🚀
