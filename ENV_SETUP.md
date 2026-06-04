# 🔐 Environment Variables Setup Guide

## Current Status

### ✅ Your Current Supabase Setup (in `.env`):
```bash
SUPABASE_PUBLISHABLE_KEY="sb_publishable_ooqn7-bIP8VrYZfNKjVN3g_SWV1B0ev"
SUPABASE_URL="https://sqzomideqooybwehzcyk.supabase.co"
VITE_SUPABASE_PROJECT_ID="sqzomideqooybwehzcyk"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_ooqn7-bIP8VrYZfNKjVN3g_SWV1B0ev"
VITE_SUPABASE_URL="https://sqzomideqooybwehzcyk.supabase.co"
```

---

## ✅ ADD MongoDB Credentials (New)

### Option 1: Update Your `.env` File (Recommended)

1. Open `.env` in VS Code
2. Keep your Supabase keys (don't remove them)
3. Add MongoDB credentials at the end:

```bash
# ============ MONGODB CONFIGURATION ============

# MongoDB Connection String
MONGODB_URI="mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0"

# MongoDB Database Name
MONGODB_DB_NAME="bni"

# MongoDB Collection Names
MONGODB_COLLECTION_MEMBERS="members"
```

### Complete `.env` File Example:

```bash
# ============ SUPABASE (KEEP EXISTING) ============
SUPABASE_PUBLISHABLE_KEY="sb_publishable_ooqn7-bIP8VrYZfNKjVN3g_SWV1B0ev"
SUPABASE_URL="https://sqzomideqooybwehzcyk.supabase.co"
VITE_SUPABASE_PROJECT_ID="sqzomideqooybwehzcyk"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_ooqn7-bIP8VrYZfNKjVN3g_SWV1B0ev"
VITE_SUPABASE_URL="https://sqzomideqooybwehzcyk.supabase.co"

# ============ MONGODB (NEW) ============
MONGODB_URI="mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0"
MONGODB_DB_NAME="bni"
MONGODB_COLLECTION_MEMBERS="members"
```

---

## How to Edit `.env` File in VS Code

### Step 1: Open the File
```
File → Open File → .env
Or press: Ctrl + P, type ".env", press Enter
```

### Step 2: Add MongoDB Lines
Place cursor at the end of the file and add:

```bash
# ============ MONGODB CONFIGURATION ============
MONGODB_URI="mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0"
MONGODB_DB_NAME="bni"
MONGODB_COLLECTION_MEMBERS="members"
```

### Step 3: Save
```
Ctrl + S (Windows/Linux)
Cmd + S (Mac)
```

---

## What Each Variable Does

| Variable | Purpose | Value |
|----------|---------|-------|
| `MONGODB_URI` | Full MongoDB connection string | `mongodb+srv://...` |
| `MONGODB_DB_NAME` | Database name | `bni` |
| `MONGODB_COLLECTION_MEMBERS` | Collection name | `members` |

---

## How Your App Uses These Variables

### In `src/lib/mongodb.ts`:

```typescript
const mongodbUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "bni";

// Used when connecting to MongoDB
const client = new MongoClient(mongodbUri);
const db = client.db(dbName);
```

---

## Comparison: Supabase vs MongoDB

### Supabase Environment Variables:
```bash
SUPABASE_URL           # Cloud URL
SUPABASE_PUBLISHABLE_KEY  # Public key for browser
VITE_SUPABASE_URL      # Exposed to browser (VITE_ prefix)
```

### MongoDB Environment Variables:
```bash
MONGODB_URI            # Connection string (server-side only)
MONGODB_DB_NAME        # Database name
MONGODB_COLLECTION_MEMBERS  # Collection name
```

**Key Difference:** MongoDB variables do NOT have `VITE_` prefix because they should NOT be exposed to the browser (they contain credentials).

---

## Step-by-Step: Complete Setup

### 1. Open VS Code
```
Open your project folder in VS Code
```

### 2. Open `.env` File
```
Ctrl + P
Type: .env
Press: Enter
```

### 3. Go to End of File
```
Press: Ctrl + End
```

### 4. Add MongoDB Configuration
```bash

# ============ MONGODB CONFIGURATION ============
MONGODB_URI="mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0"
MONGODB_DB_NAME="bni"
MONGODB_COLLECTION_MEMBERS="members"
```

### 5. Save File
```
Ctrl + S
```

### 6. Restart Dev Server
```
Stop: Ctrl + C
Start: npm run dev
```

Done! ✅

---

## Verify It's Working

### In Your Browser:
1. Go to `http://localhost:5173/`
2. You should see 10 demo members loaded from MongoDB
3. Open browser DevTools: F12
4. Check Console (no red errors)

### In VS Code Terminal:
When you start the app, you'll see:
```
✓ Compiled successfully
➜ Local: http://localhost:5173/
```

No MongoDB errors = Everything working!

---

## Safety: Protecting Your Credentials

### ✅ DO:
- Add `.env` to `.gitignore` (already done)
- Never share your `.env` file
- Never commit `.env` to GitHub
- Use `MONGODB_URI` on server-side only (no VITE_ prefix)

### ❌ DON'T:
- Put `MONGODB_URI` in client-side code
- Share MongoDB credentials in chat
- Commit `.env` to version control
- Use credentials in frontend components

---

## Accessing Variables in Code

### Server-Side (Server Functions):
```typescript
// src/lib/api/members.server.ts
const mongodbUri = process.env.MONGODB_URI;  // ✅ Works
```

### Client-Side (React Components):
```typescript
// src/routes/index.tsx
const mongodbUri = process.env.MONGODB_URI;  // ❌ undefined
const publicKey = process.env.VITE_PUBLIC_KEY;  // ✅ Works (if needed)
```

---

## Environment Variable Precedence

When you run `npm run dev`:

1. **Loads `.env`** ← Your local file (MongoDB credentials here)
2. **Loads `.env.local`** ← Ignored by git (use for overrides)
3. **System environment variables** ← From OS

Your `.env` variables are available in:
- ✅ Server-side code (Node.js)
- ✅ Build process
- ❌ Browser/Client code (unless prefixed with `VITE_`)

---

## Complete MongoDB Credentials Reference

### Your MongoDB Atlas Connection:
```
Cluster: Cluster0
Database: bni
Collection: members
Username: ismail
Password: ismail123

Full URI:
mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0
```

### How to Access on MongoDB Atlas:
1. Go to: https://cloud.mongodb.com
2. Login with your MongoDB account
3. Select Cluster0
4. Browse collections
5. See "bni" database with "members" collection

---

## Troubleshooting

### Problem: `MONGODB_URI is undefined`
**Solution:** 
- Check `.env` file is in project root
- Verify no typos in variable name
- Restart `npm run dev`

### Problem: `Cannot connect to MongoDB`
**Solution:**
- Check MongoDB credentials are correct
- Check your internet connection
- Verify cluster is active on MongoDB Atlas
- Check MongoDB whitelist includes your IP

### Problem: `Members not loading`
**Solution:**
- Check `.env` file is saved
- Check `MONGODB_DB_NAME` is "bni"
- Check `MONGODB_COLLECTION_MEMBERS` is "members"
- Restart dev server

---

## Next Steps

1. ✅ Update `.env` with MongoDB variables
2. ✅ Save the file
3. ✅ Restart `npm run dev`
4. ✅ Open `http://localhost:5173/`
5. ✅ Verify 10 members are loaded

That's it! Your app is now configured to use MongoDB! 🎉
