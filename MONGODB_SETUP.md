# MongoDB Setup Guide for BNI Andesite Member Directory

## Overview

This project has been configured to use MongoDB as the database backend. The application connects to your MongoDB Atlas cluster and manages a collection of BNI Andesite members with their business information, contact details, and social media profiles.

## Database Configuration

### Connection Details
- **MongoDB URI**: `mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0`
- **Database Name**: `bni`
- **Collection Name**: `members`

These credentials are currently hardcoded in:
- `src/lib/mongodb.ts` - MongoDB connection utility

## Database Collections

### Members Collection

The `members` collection stores complete information about BNI Andesite members. Each document has the following structure:

```javascript
{
  _id: ObjectId,
  name: String,                          // Member's full name
  category: String,                      // Business category (e.g., "Technology", "Finance")
  business_name: String,                 // Name of the business
  office_location: String | null,        // Office address
  date_of_birth: String | null,          // ISO format date
  phone: String | null,                  // Phone number
  email: String | null,                  // Email address
  website: String | null,                // Website URL
  instagram: String | null,              // Instagram handle
  facebook: String | null,               // Facebook profile
  linkedin: String | null,               // LinkedIn profile
  business_description: String | null,   // Description of the business
  additional_notes: String | null,       // Extra notes
  photo_url: String | null,              // Profile photo (base64 data URL)
  logo_url: String | null,               // Business logo (base64 data URL)
  created_at: ISODate,                   // Creation timestamp
  updated_at: ISODate                    // Last update timestamp
}
```

### Indexes

The following indexes have been created for better performance:
- `name` - For name-based searches
- `category` - For filtering by business category
- `created_at` - For sorting members by creation date

## Seeded Demo Data

The database comes pre-populated with 10 demo members representing different business categories:

1. **Ahmad Hidayat** - Financial Services / Investment Group
2. **Siti Nurhaliza** - Technology / Digital Solutions
3. **Budi Santoso** - Manufacturing / Automotive Components
4. **Rini Wijaya** - Consulting / Business Development
5. **Dedi Kurniawan** - Real Estate / Property Development
6. **Eka Wardani** - Healthcare / Medical Services
7. **Muhammad Rizki** - Food & Beverage / Snack Production
8. **Tina Suhendra** - Education / Learning Institute
9. **Hendra Wijayanto** - Automotive / Auto Sales & Service
10. **Lina Mustika** - Retail / Fashion Boutique

## Architecture

### File Structure

```
src/
├── lib/
│   ├── mongodb.ts                 # MongoDB connection and utilities
│   ├── members.ts                 # Member data operations (client-safe)
│   └── api/
│       └── members.server.ts      # Server functions for member operations
├── routes/
│   ├── index.tsx                  # Member list page
│   ├── members.$id.index.tsx      # Member profile view
│   ├── members.$id.edit.tsx       # Member edit page
│   └── __root.tsx                 # Root layout
└── scripts/
    └── seed-mongodb.mjs           # Database seeding script
```

### How Data Flows

1. **Client Components** (in routes) call server functions from `members.server.ts`
2. **Server Functions** (using TanStack React Start's `createServerFn`) execute on the server
3. **Server Functions** call MongoDB operations from `lib/members.ts`
4. **MongoDB Driver** connects to your Atlas cluster and executes queries
5. **Data** is returned back through the chain to the client

This architecture ensures:
- MongoDB credentials are never exposed to the client
- All database operations remain server-side only
- The MongoDB driver is tree-shaken from the client bundle

## Key Operations

### Fetch All Members
```typescript
fetchMembersAPI() // Server function
// Returns: Member[]
```

### Fetch Single Member
```typescript
fetchMemberAPI({ id: "..." }) // Server function
// Returns: Member | null
```

### Create Member
```typescript
createMemberAPI({ name, category, business_name })
// Returns: Member with generated ID
```

### Update Member
```typescript
updateMemberAPI({ id: "...", ...fields })
// Returns: Updated Member
```

### Delete Member
```typescript
deleteMemberAPI({ id: "..." })
// Returns: { success: true }
```

## Managing Images

Currently, images (profile photos and logos) are stored as **base64 data URLs** in the MongoDB database. This approach:
- ✅ Works immediately without external storage setup
- ✅ Keeps everything in one database
- ✅ Simple to implement and backup
- ❌ Can increase database size with large files
- ❌ Not ideal for production with many large images

### For Production Use

Consider migrating to a dedicated storage solution:
1. **Vercel Blob** - `npm install @vercel/blob`
2. **AWS S3** - `npm install aws-sdk`
3. **Cloudinary** - `npm install cloudinary`

Update `handleUpload` in `src/routes/members.$id.edit.tsx` to use your chosen service.

## Resetting the Database

To clear all data and reseed the database with demo data:

```bash
node scripts/seed-mongodb.mjs
```

This script will:
1. Drop the existing `members` collection
2. Create a new `members` collection
3. Insert all 10 demo members
4. Create indexes for optimal performance

## Security Considerations

### Current Setup (Development)

The MongoDB credentials are currently hardcoded in the source. This is fine for development but **NOT suitable for production**.

### For Production

1. **Move credentials to environment variables**:
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
   DATABASE_NAME=bni
   ```

2. **Update `src/lib/mongodb.ts`**:
   ```typescript
   const MONGODB_URI = process.env.MONGODB_URI || '...';
   const DATABASE_NAME = process.env.DATABASE_NAME || 'bni';
   ```

3. **Set environment variables** in your deployment platform (Vercel, etc.)

4. **Use MongoDB Atlas security features**:
   - IP whitelist
   - Dedicated user with limited permissions
   - VPC peering if available

5. **Monitor access** using MongoDB Atlas activity logs

## Troubleshooting

### Connection Issues
- Verify IP whitelist in MongoDB Atlas allows your server
- Check credentials are correct
- Ensure database/collection exist

### Slow Queries
- Check indexes are created (see Indexes section above)
- Use MongoDB Atlas Performance Advisor
- Monitor with `db.members.find().explain("executionStats")`

### Missing Data
- Reseed with: `node scripts/seed-mongodb.mjs`
- Check MongoDB Atlas dashboard for data in `bni.members` collection

## Next Steps

1. **Update credentials** for production (see Security section)
2. **Set up backup strategy** using MongoDB Atlas automated backups
3. **Configure monitoring** and alerts
4. **Consider caching** for frequently accessed data using Redis
5. **Migrate images** to dedicated storage if needed

## Support

For MongoDB-specific issues:
- [MongoDB Documentation](https://docs.mongodb.com)
- [MongoDB Atlas Support](https://support.mongodb.com)

For TanStack React Start documentation:
- [TanStack React Start](https://tanstack.com/react-start)
- [Server Functions Guide](https://tanstack.com/react-start/latest/docs/server-functions)
