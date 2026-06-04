import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://ismail:ismail123@cluster0.fjw1q9u.mongodb.net/?appName=Cluster0';
const DATABASE_NAME = 'bni';

const demoMembers = [
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
    business_description: "We provide comprehensive investment advisory services and wealth management solutions for corporate and individual clients.",
    additional_notes: "Specializes in real estate and infrastructure investments",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Siti Nurhaliza",
    category: "Technology",
    business_name: "Digital Solutions PT",
    office_location: "Bandung, Indonesia",
    date_of_birth: "1990-07-22",
    phone: "+62-22-555-0202",
    email: "siti@digitalsolutions.id",
    website: "https://digitalsolutions.id",
    instagram: "@digitalsolutionspk",
    facebook: "Digital Solutions",
    linkedin: "siti-nurhaliza-tech",
    business_description: "Leading provider of IT consulting, software development, and digital transformation services.",
    additional_notes: "Expert in cloud migration and AI solutions",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Budi Santoso",
    category: "Manufacturing",
    business_name: "Santoso Manufacturing Inc",
    office_location: "Surabaya, Indonesia",
    date_of_birth: "1978-11-08",
    phone: "+62-31-555-0303",
    email: "budi@santosomfg.com",
    website: "https://santosomfg.com",
    instagram: "@santosomfg",
    facebook: "Santoso Manufacturing",
    linkedin: "budi-santoso-mfg",
    business_description: "Industrial manufacturing company specializing in automotive components and machinery.",
    additional_notes: "ISO certified facility with 15 years of experience",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Rini Wijaya",
    category: "Consulting",
    business_name: "Wijaya Business Consulting",
    office_location: "Medan, Indonesia",
    date_of_birth: "1988-05-12",
    phone: "+62-61-555-0404",
    email: "rini@wijayconsult.co.id",
    website: "https://wijayconsult.co.id",
    instagram: "@wijayconsulting",
    facebook: "Wijaya Consulting",
    linkedin: "rini-wijaya-consultant",
    business_description: "Strategic business consulting firm focusing on organizational development and operational efficiency.",
    additional_notes: "Over 20 years of consulting experience across various industries",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Dedi Kurniawan",
    category: "Real Estate",
    business_name: "Kurniawan Properties",
    office_location: "Yogyakarta, Indonesia",
    date_of_birth: "1982-09-25",
    phone: "+62-274-555-0505",
    email: "dedi@kurniawanproperties.com",
    website: "https://kurniawanproperties.com",
    instagram: "@kurniawaproperties",
    facebook: "Kurniawan Properties",
    linkedin: "dedi-kurniawan-real-estate",
    business_description: "Premium property developer specializing in residential and commercial real estate projects.",
    additional_notes: "Completed 50+ successful projects across Java",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Eka Wardani",
    category: "Healthcare",
    business_name: "Wardani Medical Services",
    office_location: "Jakarta, Indonesia",
    date_of_birth: "1987-02-14",
    phone: "+62-21-555-0606",
    email: "eka@wardanimedical.co.id",
    website: "https://wardanimedical.co.id",
    instagram: "@wardanihealth",
    facebook: "Wardani Medical Services",
    linkedin: "eka-wardani-healthcare",
    business_description: "Comprehensive healthcare provider offering medical consultation, diagnostics, and treatment services.",
    additional_notes: "JCI accredited medical facility with latest equipment",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Muhammad Rizki",
    category: "Food & Beverage",
    business_name: "Rizki Food Enterprises",
    office_location: "Tangerang, Indonesia",
    date_of_birth: "1986-06-18",
    phone: "+62-21-555-0707",
    email: "rizki@rizkifood.com",
    website: "https://rizkifood.com",
    instagram: "@rizki_food_enterprises",
    facebook: "Rizki Food Enterprises",
    linkedin: "muhammad-rizki-fbe",
    business_description: "Food and beverage company producing premium quality snacks and processed foods for domestic and export markets.",
    additional_notes: "HACCP certified production facility with halal certification",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Tina Suhendra",
    category: "Education",
    business_name: "Suhendra Institute of Learning",
    office_location: "Medan, Indonesia",
    date_of_birth: "1984-10-30",
    phone: "+62-61-555-0808",
    email: "tina@suhendrainstitute.edu.id",
    website: "https://suhendrainstitute.edu.id",
    instagram: "@suhendrainstitute",
    facebook: "Suhendra Institute",
    linkedin: "tina-suhendra-education",
    business_description: "Educational institution providing quality primary, secondary, and vocational training programs.",
    additional_notes: "International curriculum with experienced faculty members",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Hendra Wijayanto",
    category: "Automotive",
    business_name: "Wijayanto Auto Group",
    office_location: "Bandung, Indonesia",
    date_of_birth: "1981-12-05",
    phone: "+62-22-555-0909",
    email: "hendra@wijayantocars.com",
    website: "https://wijayantocars.com",
    instagram: "@wijayantocars",
    facebook: "Wijayanto Auto Group",
    linkedin: "hendra-wijayanto-automotive",
    business_description: "Automotive dealer and service center offering new vehicles, spare parts, and maintenance services.",
    additional_notes: "Official dealer for multiple premium brands with trained technicians",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    name: "Lina Mustika",
    category: "Retail",
    business_name: "Mustika Fashion Boutique",
    office_location: "Yogyakarta, Indonesia",
    date_of_birth: "1989-04-11",
    phone: "+62-274-555-1010",
    email: "lina@mustikafashion.com",
    website: "https://mustikafashion.com",
    instagram: "@mustikafashion_official",
    facebook: "Mustika Fashion Boutique",
    linkedin: "lina-mustika-fashion",
    business_description: "Upscale fashion boutique specializing in designer clothing, accessories, and custom tailoring services.",
    additional_notes: "Curated collections from international and local designers",
    photo_url: null,
    logo_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function seedDatabase() {
  let client;
  try {
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db(DATABASE_NAME);

    // Drop existing members collection if it exists
    try {
      await db.collection('members').drop();
      console.log('✓ Dropped existing members collection');
    } catch (err) {
      console.log('✓ No existing collection to drop');
    }

    // Create members collection
    await db.createCollection('members');
    console.log('✓ Created members collection');

    // Insert demo data
    const result = await db.collection('members').insertMany(demoMembers);
    console.log(`✓ Inserted ${result.insertedIds.length} demo members`);

    // Create indexes
    await db.collection('members').createIndex({ name: 1 });
    await db.collection('members').createIndex({ category: 1 });
    await db.collection('members').createIndex({ created_at: -1 });
    console.log('✓ Created indexes on members collection');

    console.log('\n✓ Database seeding completed successfully!');
    console.log(`Database: ${DATABASE_NAME}`);
    console.log(`Total members: ${demoMembers.length}`);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('✓ Connection closed');
    }
  }
}

seedDatabase();
