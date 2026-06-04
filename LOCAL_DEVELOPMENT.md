# 🚀 Running Your Project Locally in VS Code

## Prerequisites

Before you start, make sure you have installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

4. **VS Code** (Code Editor)
   - Download from: https://code.visualstudio.com/

---

## Step 1: Clone or Open Project in VS Code

### Option A: If you have a Git repository
```bash
git clone https://github.com/Ismail26477/connect-andesite-update.git
cd connect-andesite-update
git checkout connect-website-to-mongodb
```

### Option B: If you already have the project folder
1. Open VS Code
2. Click `File` → `Open Folder`
3. Navigate to your project folder and click `Select Folder`

---

## Step 2: Open Terminal in VS Code

1. Press `Ctrl + Backtick` (`` ` ``) on your keyboard
   - Or go to `Terminal` → `New Terminal` in the menu

A terminal should appear at the bottom of your VS Code window.

---

## Step 3: Install Dependencies

In the VS Code terminal, run:

```bash
npm install
```

This will download and install all required packages from `package.json`. This may take 2-5 minutes depending on your internet speed.

**What you should see:**
```
added XXX packages in XXs
```

---

## Step 4: Set Environment Variables

The MongoDB credentials are already configured in the code. However, you need to create an `.env.local` file for any local overrides if needed.

1. In the project root, create a new file called `.env.local`
2. Add this content:

```env
MONGODB_URI=mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=bni
```

3. Save the file

---

## Step 5: Run the Development Server

In the VS Code terminal, run:

```bash
npm run dev
```

You should see output like:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

The development server is now running!

---

## Step 6: Open in Browser

1. Click on the link `http://localhost:5173/` in the terminal (Ctrl+Click on Mac)
2. Or manually open your browser and go to: `http://localhost:5173/`

You should see your BNI Member Directory app with 10 demo members loaded from MongoDB!

---

## Available Commands

### Development
```bash
npm run dev
```
- Starts the development server with hot reload
- Any file changes will automatically refresh the browser
- Press `Ctrl + C` to stop

### Build
```bash
npm run build
```
- Creates an optimized production build
- Output goes to the `dist/` folder

### Preview Production Build
```bash
npm run preview
```
- Starts a local server to preview the production build
- Useful to test before deploying

### Type Check
```bash
npm run typecheck
```
- Checks for TypeScript errors without building
- Fast way to catch type issues

### Lint
```bash
npm run lint
```
- Checks code style and quality
- Automatically fixes some issues with `npm run lint -- --fix`

---

## Project Structure

```
your-project/
├── src/
│   ├── routes/              # Page components
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Members list page
│   │   ├── members.$id.index.tsx    # Member profile
│   │   └── members.$id.edit.tsx     # Edit member
│   ├── lib/
│   │   ├── mongodb.ts       # MongoDB connection
│   │   ├── members.ts       # Member data types
│   │   └── api/
│   │       └── members.server.ts    # Server functions
│   ├── styles.css           # Global styles
│   └── router.tsx           # Route configuration
├── public/                  # Static files
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript config
```

---

## Working with MongoDB

### View Data in MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Log in with your MongoDB account
3. Click your cluster `Cluster0`
4. Click `Collections` tab
5. Select database `bni`
6. View the `members` collection

### Add Demo Data Again

If you accidentally delete all data, reseed with:

```bash
node scripts/seed-mongodb.mjs
```

This will add 10 demo members back to your database.

---

## Common Issues & Solutions

### Issue: "Port 5173 is already in use"
**Solution:**
```bash
# Kill the process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

Then run `npm run dev` again.

### Issue: "Module not found" or "Cannot find package"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: MongoDB connection error
**Solution:**
1. Check your internet connection
2. Verify MongoDB credentials in code:
   - User: `ismail`
   - Password: `ismail123`
   - Cluster: `Cluster0`
3. Make sure your IP is whitelisted in MongoDB Atlas (should be 0.0.0.0/0 for development)

### Issue: Changes not reflecting in browser
**Solution:**
1. Make sure dev server is running (`npm run dev`)
2. Check VS Code terminal for error messages (red text)
3. Try refreshing the browser: `F5` or `Ctrl + R`
4. Clear browser cache: `Ctrl + Shift + Delete`

### Issue: "Cannot find MongoDB"
**Solution:**
```bash
# Reinstall MongoDB driver
npm install mongodb
npm run dev
```

---

## Debugging Tips

### View Console Logs
1. Open browser DevTools: `F12`
2. Go to `Console` tab
3. You'll see any errors and logs from the app

### Inspect Network Requests
1. Open DevTools: `F12`
2. Go to `Network` tab
3. Perform an action in the app
4. See all API calls made

### Check Server Errors
Look in your VS Code terminal where you ran `npm run dev`. Any backend errors will show there.

---

## Making Changes

### Adding a New Member Field
1. Edit `src/lib/members.ts` - Add to the `Member` type
2. Edit `src/routes/members.$id.edit.tsx` - Add form field
3. The MongoDB collection will auto-update with the new field when you save

### Creating a New Page
1. Create file: `src/routes/your-page.tsx`
2. Use the TanStack Router pattern:
```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/your-page')({
  component: YourPageComponent,
});

function YourPageComponent() {
  return <div>Your page content</div>;
}
```
3. Navigate to: `http://localhost:5173/your-page`

---

## Next Steps

1. ✅ Start the dev server: `npm run dev`
2. ✅ Open app: `http://localhost:5173/`
3. ✅ Try creating a new member
4. ✅ Check MongoDB Atlas to see the data saved
5. ✅ Make changes and see hot reload in action

---

## Need Help?

- **VS Code Issues:** Check the Official VS Code Docs: https://code.visualstudio.com/docs
- **Node.js Issues:** Check Node.js Docs: https://nodejs.org/docs/
- **MongoDB Issues:** Check MongoDB Docs: https://docs.mongodb.com/
- **React Issues:** Check React Docs: https://react.dev/

---

## Deployment

When ready to deploy:

1. Build: `npm run build`
2. Deploy to Vercel, Netlify, or your hosting platform
3. Set environment variables on your hosting platform with MongoDB URI

Good luck! 🎉
