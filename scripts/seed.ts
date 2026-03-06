// Seed script for demo data
// Run: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed.ts
// Or: npx tsx scripts/seed.ts

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/saas-dashboard";

// Inline schemas for the seed script (avoids import issues)
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    role: { type: String, enum: ["superadmin", "admin", "member"], default: "member" },
    avatar: { type: String, default: "" },
    plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    lastLogin: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
}, { timestamps: true });

const OrganizationSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, unique: true },
    logo: { type: String, default: "" },
    plan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, role: String }],
    billingEmail: String,
    subscriptionStatus: { type: String, default: "active" },
    subscriptionEndsAt: Date,
    monthlyRevenue: { type: Number, default: 0 },
    usageStats: {
        apiCalls: { type: Number, default: 0 },
        storageUsed: { type: Number, default: 0 },
        activeUsers: { type: Number, default: 0 },
    },
}, { timestamps: true });

const SiteSettingsSchema = new mongoose.Schema({
    siteName: { type: String, default: "مشروعي" },
    logoUrl: { type: String, default: "/logo.png" },
    primaryColor: { type: String, default: "#6366F1" },
    contactEmail: { type: String, default: "hello@example.com" },
    phone: { type: String, default: "" },
    footerText: { type: String, default: "© 2025 مشروعي" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Organization = mongoose.models.Organization || mongoose.model("Organization", OrganizationSchema);
const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);

async function seed() {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!");

    // Clear existing data
    await User.deleteMany({});
    await Organization.deleteMany({});
    await SiteSettings.deleteMany({});
    console.log("🗑️ Cleared existing data");

    const passwordHash = await bcrypt.hash("password123", 12);

    // Create organizations
    const orgs = await Organization.insertMany([
        {
            name: "شركة التقنية المتقدمة",
            slug: "advanced-tech",
            plan: "enterprise",
            billingEmail: "billing@advancedtech.com",
            subscriptionStatus: "active",
            monthlyRevenue: 2400,
            usageStats: { apiCalls: 45000, storageUsed: 8500, activeUsers: 45 },
        },
        {
            name: "مؤسسة الابتكار الرقمي",
            slug: "digital-innovation",
            plan: "pro",
            billingEmail: "billing@diginnovation.com",
            subscriptionStatus: "active",
            monthlyRevenue: 900,
            usageStats: { apiCalls: 22000, storageUsed: 3200, activeUsers: 18 },
        },
        {
            name: "مجموعة النجاح",
            slug: "success-group",
            plan: "pro",
            billingEmail: "billing@successgroup.com",
            subscriptionStatus: "trialing",
            monthlyRevenue: 600,
            usageStats: { apiCalls: 15000, storageUsed: 2100, activeUsers: 12 },
        },
        {
            name: "شركة الرؤية",
            slug: "vision-company",
            plan: "free",
            billingEmail: "billing@vision.com",
            subscriptionStatus: "active",
            monthlyRevenue: 0,
            usageStats: { apiCalls: 800, storageUsed: 500, activeUsers: 5 },
        },
    ]);

    console.log(`✅ Created ${orgs.length} organizations`);

    // Create users
    const superAdmin = await User.create({
        name: "أحمد المدير",
        email: "admin@demo.com",
        passwordHash,
        role: "superadmin",
        plan: "enterprise",
        organizationId: orgs[0]._id,
        isActive: true,
        emailVerified: true,
    });

    const users = await User.insertMany([
        { name: "سارة أحمد", email: "sara@demo.com", passwordHash, role: "admin", plan: "pro", organizationId: orgs[1]._id, isActive: true, emailVerified: true },
        { name: "محمد علي", email: "mohamed@demo.com", passwordHash, role: "member", plan: "pro", organizationId: orgs[1]._id, isActive: true, emailVerified: true },
        { name: "فاطمة حسن", email: "fatima@demo.com", passwordHash, role: "admin", plan: "enterprise", organizationId: orgs[0]._id, isActive: true, emailVerified: true },
        { name: "خالد عمر", email: "khaled@demo.com", passwordHash, role: "member", plan: "free", organizationId: orgs[3]._id, isActive: true, emailVerified: false },
        { name: "نور الدين", email: "nour@demo.com", passwordHash, role: "member", plan: "pro", organizationId: orgs[2]._id, isActive: false, emailVerified: true },
        { name: "ليلى يوسف", email: "layla@demo.com", passwordHash, role: "member", plan: "enterprise", organizationId: orgs[0]._id, isActive: true, emailVerified: true },
    ]);

    console.log(`✅ Created ${users.length + 1} users (including super admin)`);

    // Update org owners and members
    await Organization.findByIdAndUpdate(orgs[0]._id, {
        ownerId: superAdmin._id,
        members: [
            { userId: superAdmin._id, role: "superadmin" },
            { userId: users[2]._id, role: "admin" },
            { userId: users[5]._id, role: "member" },
        ],
    });

    await Organization.findByIdAndUpdate(orgs[1]._id, {
        ownerId: users[0]._id,
        members: [
            { userId: users[0]._id, role: "admin" },
            { userId: users[1]._id, role: "member" },
        ],
    });

    // Create default site settings
    await SiteSettings.create({
        siteName: "مشروعي",
        logoUrl: "/logo.png",
        primaryColor: "#6366F1",
        contactEmail: "hello@example.com",
        phone: "+966 50 000 0000",
        footerText: "© 2025 مشروعي - جميع الحقوق محفوظة",
    });

    console.log("✅ Created site settings");
    console.log("\n🎉 Seed completed!");
    console.log("📧 Super Admin: admin@demo.com / password123");
    console.log("📧 Regular User: sara@demo.com / password123");

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
