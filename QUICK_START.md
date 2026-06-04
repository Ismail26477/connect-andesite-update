# Quick Start Guide - BNI Andesite MongoDB Integration

## ✅ What's Done

Your website is now fully connected to MongoDB with:
- ✅ MongoDB connection configured
- ✅ Database `bni` created with `members` collection
- ✅ 10 demo members seeded into the database
- ✅ All CRUD operations working (Create, Read, Update, Delete)
- ✅ Server functions properly secured
- ✅ Image storage as base64 data URLs

## 🚀 Quick Start

### 1. Start the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:8080`

### 2. Test the App
- Open http://localhost:8080 in your browser
- You should see a list of 10 BNI members
- Try creating a new member: Click "Add Member" button
- View member profiles by clicking on them
- Edit member information

### 3. Verify Database (Optional)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login with your MongoDB account
3. Go to Collections → bni → members
4. You should see 10+ documents

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/lib/mongodb.ts` | MongoDB connection setup |
| `src/lib/members.ts` | Member data operations |
| `src/lib/api/members.server.ts` | Server functions for API |
| `scripts/seed-mongodb.mjs` | Database seeding script |
| `MONGODB_SETUP.md` | Detailed setup documentation |
| `MONGODB_IMPLEMENTATION.md` | What was changed & how it works |

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Reset database with demo data
node scripts/seed-mongodb.mjs

# Format code
npm run format

# Lint code
npm run lint
```

## 📊 Database Schema

The `members` collection contains documents with this structure:

```javascript
{
  name: "Ahmad Hidayat",
  category: "Financial Services",
  business_name: "Hidayat Investment Group",
  office_location: "Jakarta, Indonesia",
  date_of_birth: "1985-03-15",
  phone: "+62-21-555-0101",
  email: "ahmad@hidayat.co.id",
  website: "https://hidayat.co.id",
  instagram: "@ahmadh_invest",
  facebook: "Ahmad Hidayat Investment",
  linkedin: "ahmad-hidayat-12345",
  business_description: "We provide investment advisory...",
  additional_notes: "Specializes in real estate...",
  photo_url: "data:image/jpeg;base64,..." (or null),
  logo_url: "data:image/png;base64,..." (or null),
  created_at: "2026-06-05T19:30:00.000Z",
  updated_at: "2026-06-05T19:30:00.000Z"
}
```

## 🔐 Security Checklist

### For Development ✅
- MongoDB credentials in `src/lib/mongodb.ts`
- Server functions protect credentials from browser
- Works immediately without additional setup

### For Production (TODO)
- [ ] Move credentials to environment variables
- [ ] Set `MONGODB_URI` in deployment platform
- [ ] Whitelist server IP in MongoDB Atlas
- [ ] Use dedicated database user (not admin)
- [ ] Enable monitoring and alerts
- [ ] Set up automated backups

## 📝 API Reference

### Fetch All Members
```typescript
const members = await fetchMembersAPI();
// Returns: Member[]
```

### Fetch Single Member
```typescript
const member = await fetchMemberAPI({ id: "..." });
// Returns: Member | null
```

### Create Member
```typescript
const newMember = await createMemberAPI({
  name: "John Doe",
  category: "Technology",
  business_name: "Tech Solutions"
});
// Returns: Member with generated id
```

### Update Member
```typescript
const updated = await updateMemberAPI({
  id: "...",
  name: "Jane Doe",
  email: "jane@example.com"
});
// Returns: Updated Member
```

### Delete Member
```typescript
await deleteMemberAPI({ id: "..." });
// Returns: { success: true }
```

## 🎯 Demo Members Included

1. **Ahmad Hidayat** - Financial Services / Investment
2. **Siti Nurhaliza** - Technology / Digital Solutions
3. **Budi Santoso** - Manufacturing / Automotive
4. **Rini Wijaya** - Consulting / Business
5. **Dedi Kurniawan** - Real Estate / Property
6. **Eka Wardani** - Healthcare / Medical
7. **Muhammad Rizki** - Food & Beverage / Snacks
8. **Tina Suhendra** - Education / Training Institute
9. **Hendra Wijayanto** - Automotive / Sales & Service
10. **Lina Mustika** - Retail / Fashion Boutique

## 🛠️ Troubleshooting

### "Cannot fetch members"
1. Check MongoDB Atlas is running
2. Verify your IP is whitelisted
3. Check browser console for errors
4. Reseed: `node scripts/seed-mongodb.mjs`

### "Image upload not working"
- Images are stored as base64 in database
- Works but increases database size
- For production, use external storage

### "Changes not appearing"
- Check MongoDB Atlas dashboard
- Verify correct database/collection
- Refresh the page
- Check browser DevTools console

### "Slow page loads"
- Check MongoDB Atlas performance tab
- Verify indexes exist (name, category, created_at)
- Monitor network tab in DevTools

## 📚 Documentation

- **Full Setup Guide**: See `MONGODB_SETUP.md`
- **Implementation Details**: See `MONGODB_IMPLEMENTATION.md`
- **MongoDB Official Docs**: https://docs.mongodb.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

## ✨ Features Ready to Use

✅ View all members with search & filter
✅ Create new members
✅ View member profiles
✅ Edit member information
✅ Upload profile photos & logos
✅ Manage social media links
✅ Sort by business category
✅ Delete members
✅ Responsive mobile design

## 🎉 You're All Set!

Your MongoDB integration is complete and ready to use. Start the dev server and begin exploring!

```bash
npm run dev
```

Then open: **http://localhost:8080**

---

**Questions?** Check the detailed documentation files:
- For setup details → Read `MONGODB_SETUP.md`
- For what changed → Read `MONGODB_IMPLEMENTATION.md`
- For API examples → See this file

Happy coding! 🚀
