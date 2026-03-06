export type UserRole = "superadmin" | "admin" | "member";
export type PlanType = "free" | "pro" | "enterprise";
export type SubscriptionStatus = "active" | "trialing" | "cancelled" | "past_due";
export type NotificationType = "info" | "success" | "warning" | "error";
export type InvitationStatus = "pending" | "accepted" | "expired";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    avatar: string;
    plan: PlanType;
    organizationId: string;
    lastLogin: Date;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrganization {
    _id: string;
    name: string;
    slug: string;
    logo: string;
    plan: PlanType;
    ownerId: string;
    members: { userId: string; role: string }[];
    billingEmail: string;
    subscriptionStatus: SubscriptionStatus;
    subscriptionEndsAt: Date;
    monthlyRevenue: number;
    usageStats: {
        apiCalls: number;
        storageUsed: number;
        activeUsers: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface IActivityLog {
    _id: string;
    userId: string;
    organizationId: string;
    action: string;
    metadata: Record<string, unknown>;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
}

export interface INotification {
    _id: string;
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    link: string;
    createdAt: Date;
}

export interface IInvitation {
    _id: string;
    organizationId: string;
    invitedEmail: string;
    invitedBy: string;
    role: string;
    token: string;
    status: InvitationStatus;
    expiresAt: Date;
    createdAt: Date;
}

export interface ISiteSettings {
    _id: string;
    siteName: string;
    logoUrl: string;
    primaryColor: string;
    contactEmail: string;
    phone: string;
    footerText: string;
    updatedAt: Date;
}

export interface SessionUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    plan: PlanType;
    organizationId: string;
    avatar: string;
}
