# 🎯 BNI Andesite Member Directory - MongoDB Integration

Your website is now fully connected to MongoDB! This guide will help you run everything locally.

---

## 📚 Documentation Files

Start with **one** of these based on your need:

### 🚀 **NEW? Start Here!**
- **`SETUP_STEPS.md`** - Simple 10-minute setup guide (visual, step-by-step)
- **`COMMANDS.md`** - Quick command reference card

### 📖 Detailed Guides
- **`LOCAL_DEVELOPMENT.md`** - Complete local development guide with troubleshooting
- **`MONGODB_SETUP.md`** - Technical MongoDB setup & operations
- **`MONGODB_IMPLEMENTATION.md`** - How the integration works (for developers)

---

## ⚡ Quick Start (30 seconds)

1. **Open VS Code Terminal**: `` Ctrl + ` ``
2. **Install dependencies**: `npm install`
3. **Start dev server**: `npm run dev`
4. **Open browser**: http://localhost:5173/

Done! Your app is running with MongoDB connected.

---

## 🗂️ Project Structure

```
your-project/
├── src/
│   ├── routes/
│   │   ├── __root.tsx                    ← App layout
│   │   ├── index.tsx                     ← Members list
│   │   ├── members.$id.index.tsx         ← Member profile
│   │   └── members.$id.edit.tsx          ← Edit member
│   ├── lib/
│   │   ├── mongodb.ts                    ← MongoDB connection (server-side)
│   │   ├── members.ts                    ← Member data types
│   │   └── api/
│   │       └── members.server.ts         ← Server functions
│   └── styles.css                        ← Styles
├── scripts/
│   └── seed-mongodb.mjs                  ← Reseed demo data
└── package.json                          ← Dependencies & commands
```

---

## 💾 MongoDB Details

**Connection Status**: ✅ Connected  
**Database**: `bni`  
**Collection**: `members`  
**Demo Members**: 10 sample members seeded  
**Atlas Link**: https://cloud.mongodb.com/

### Database Credentials
```
User: ismail
Password: ismail123
Cluster: Cluster0.fjw1q9u.mongodb.net
Database: bni
```

---

## 🔧 Common Tasks

### Run Dev Server
```bash
npm run dev
```
Starts on: http://localhost:5173/

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Reseed Demo Data
```bash
node scripts/seed-mongodb.mjs
```

### Check for Errors
```bash
npm run typecheck
```

---

## 📋 What's Included

✅ MongoDB Atlas connection  
✅ 10 demo BNI members in database  
✅ Create, read, update, delete members  
✅ Server-side MongoDB operations (secure)  
✅ TanStack React Start + React Router  
✅ TypeScript support  
✅ Tailwind CSS styling  

---

## 🎯 File Guide

| File | What to Edit | Purpose |
|------|-------------|---------|
| `src/routes/index.tsx` | Member list page | Change how members are displayed |
| `src/routes/members.$id.edit.tsx` | Member edit form | Add/remove fields |
| `src/lib/members.ts` | Member type & helpers | Change member structure |
| `src/lib/mongodb.ts` | ❌ Don't edit | MongoDB connection (internal) |
| `src/styles.css` | Styling | Global CSS & Tailwind |

---

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
# Kill the process
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Module not found error?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### MongoDB won't connect?
- Check internet connection
- Verify credentials in code
- Check MongoDB Atlas whitelist: https://cloud.mongodb.com/

See `LOCAL_DEVELOPMENT.md` for more troubleshooting.

---

## 📝 Making Changes

### Add a New Field to Members
1. Edit `src/lib/members.ts` - Add to `Member` type
2. Edit `src/routes/members.$id.edit.tsx` - Add form input
3. Save and test!

### Change Member List Display
1. Edit `src/routes/index.tsx`
2. Modify the JSX in the `MemberCard` component
3. Changes appear instantly

### Add New Page
1. Create `src/routes/your-page.tsx`
2. Use TanStack Router pattern
3. Access via http://localhost:5173/your-page

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Set Environment Variables
Add to Vercel project settings:
```
MONGODB_URI=mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=bni
```

---

## 📚 Learning Resources

- **React**: https://react.dev/
- **TanStack Router**: https://tanstack.com/router/latest
- **MongoDB**: https://docs.mongodb.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **TypeScript**: https://www.typescriptlang.org/

---

## 📧 Database Overview

### Members Collection Structure
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  business_name: String,
  office_location: String,
  date_of_birth: String,
  phone: String,
  email: String,
  website: String,
  instagram: String,
  facebook: String,
  linkedin: String,
  business_description: String,
  additional_notes: String,
  photo_url: String (base64 data URL),
  logo_url: String (base64 data URL),
  created_at: ISO String,
  updated_at: ISO String
}
```

---

## ✅ Checklist

- [ ] Node.js installed (`node --version`)
- [ ] Project opened in VS Code
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser open at `http://localhost:5173/`
- [ ] Seeing 10 demo members loaded
- [ ] Can create/edit/delete members
- [ ] Changes appear in MongoDB

---

## 🎉 You're Ready!

Everything is set up and ready to go. Here's what to do next:

1. **If you're new**: Read `SETUP_STEPS.md`
2. **If you want quick reference**: See `COMMANDS.md`
3. **If you need help**: Check `LOCAL_DEVELOPMENT.md`
4. **If you're a developer**: Read `MONGODB_IMPLEMENTATION.md`

Start with:
```bash
npm run dev
```

Then open: http://localhost:5173/

Happy coding! 🚀

---

## 📞 Need Help?

| Issue | Check |
|-------|-------|
| Can't start dev server | `COMMANDS.md` → Troubleshooting |
| MongoDB won't connect | `LOCAL_DEVELOPMENT.md` → MongoDB section |
| Want to add features | `MONGODB_IMPLEMENTATION.md` → Dev patterns |
| Lost at setup | `SETUP_STEPS.md` → Step-by-step |

Good luck! 💪
