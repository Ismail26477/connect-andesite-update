# ⚡ Quick Command Reference

## Before Starting
Make sure you have Node.js installed: https://nodejs.org/

## First Time Setup
```bash
# 1. Open your project in VS Code
# 2. Open terminal (Ctrl + `)
# 3. Install dependencies
npm install
```

---

## Running Your App Locally

### Start Development Server
```bash
npm run dev
```
- Opens on: `http://localhost:5173/`
- Auto-reloads when you make changes
- Press `Ctrl + C` to stop

### Stop the Server
```bash
Ctrl + C
```

---

## Other Useful Commands

### Production Build
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Type Check (Find TypeScript errors)
```bash
npm run typecheck
```

### Run Linter
```bash
npm run lint
```

### Reseed Demo Data to MongoDB
```bash
node scripts/seed-mongodb.mjs
```

---

## VS Code Terminal Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Terminal | `Ctrl + Backtick` (`` ` ``) |
| New Terminal | `Ctrl + Shift + Backtick` |
| Clear Terminal | `Ctrl + L` or type `clear` |
| Split Terminal | `Ctrl + Shift + 5` |
| Close Terminal | `Ctrl + Shift + J` |
| Copy | `Ctrl + C` |
| Paste | `Ctrl + V` |

---

## File Structure Quick Reference

```
src/
├── routes/
│   ├── __root.tsx              ← App layout & theme
│   ├── index.tsx               ← Members list page
│   ├── members.$id.index.tsx   ← Member profile page
│   └── members.$id.edit.tsx    ← Edit member page
├── lib/
│   ├── mongodb.ts              ← MongoDB connection (don't edit)
│   ├── members.ts              ← Member types & helpers
│   └── api/
│       └── members.server.ts   ← Server functions
└── styles.css                  ← Global styling
```

---

## How to Make Changes

### Edit a Page
1. Open the file in `src/routes/`
2. Make your changes
3. Save (Ctrl + S)
4. Browser auto-refreshes

### Add a New Field to Members
1. Edit `src/lib/members.ts` - Update `Member` type
2. Edit `src/routes/members.$id.edit.tsx` - Add form input
3. Save - Done!

### Style Changes
1. Edit `src/styles.css` or add Tailwind classes in JSX
2. Save - Instantly updates in browser

---

## Useful Browser Links

| What | URL |
|------|-----|
| Your App | http://localhost:5173/ |
| Members List | http://localhost:5173/ |
| Create Member | http://localhost:5173/members/new |
| Browser DevTools | Press `F12` |
| MongoDB Atlas | https://cloud.mongodb.com/ |

---

## Troubleshooting Quick Fixes

### App won't load?
```bash
# Stop (Ctrl+C), then:
npm run dev
```

### Port already in use?
```bash
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Dependencies broken?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### MongoDB not connecting?
- Check internet connection
- Verify MongoDB Atlas IP whitelist: https://cloud.mongodb.com/
- Check MongoDB credentials in code

---

## Daily Workflow

```bash
# Every time you start working:
npm run dev

# Make your changes and save (Ctrl+S)

# Check errors in terminal or browser console (F12)

# When done:
Ctrl + C  (to stop server)

# To push to GitHub:
git add .
git commit -m "Your message here"
git push
```

---

## Browser DevTools Shortcuts

| Action | Shortcut |
|--------|----------|
| Open DevTools | `F12` |
| Console Tab | `F12` then click "Console" |
| Elements Tab | `F12` then click "Elements" |
| Network Tab | `F12` then click "Network" |
| Refresh Page | `F5` or `Ctrl + R` |
| Hard Refresh | `Ctrl + Shift + R` |

---

## MongoDB Commands (in Node.js REPL)

If you want to query MongoDB from terminal:

```bash
# Start Node REPL
node

# Then paste code:
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net');
await client.connect();
const db = client.db('bni');
const members = await db.collection('members').find({}).toArray();
console.log(members);
await client.close();
```

---

## Getting Help

| Issue | Solution |
|-------|----------|
| Command not found | Make sure Node.js is installed: `node --version` |
| Port error | Kill process on port 5173 |
| Module error | Run `npm install` again |
| TypeScript error | Press `Ctrl + S` to save, errors should resolve |
| MongoDB error | Check internet & MongoDB Atlas whitelist |

---

**Happy coding! 🚀**
