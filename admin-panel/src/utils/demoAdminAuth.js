export const DEMO_ADMIN_EMAIL = "admin@truetransitmobility.com";
export const DEMO_ADMIN_PASSWORD = "TrueTransit@123";
export const DEMO_ADMIN_USER_ID = "truetransit-demo-admin";
export const DEMO_SELLERS_KEY = "truetransit-admin-demo-sellers:v1";
export const DEMO_SELLER_ID = "truetransit-demo-user";
export const DEMO_SELLER_EMAIL = "sahilmittal1920@gmail.com";

const encodeBase64Url = (value) =>
  window
    .btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

export const isDemoAdminEnabled = () =>
  typeof window !== "undefined" &&
  String(process.env.REACT_APP_DEMO_ADMIN_ENABLED || "true").toLowerCase() !== "false";

export const isDemoAdminCredential = (email, password) =>
  isDemoAdminEnabled() &&
  email.trim().toLowerCase() === DEMO_ADMIN_EMAIL &&
  password.trim() === DEMO_ADMIN_PASSWORD;

export const createDemoAdminToken = (type = "access") => {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (type === "refresh" ? 60 * 60 * 24 * 30 : 60 * 60 * 24);
  const header = encodeBase64Url(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = encodeBase64Url(
    JSON.stringify({
      id: DEMO_ADMIN_USER_ID,
      userId: DEMO_ADMIN_USER_ID,
      sub: DEMO_ADMIN_USER_ID,
      name: "TrueTransit Admin",
      email: DEMO_ADMIN_EMAIL,
      role: "SUPERADMIN",
      type: "SUPERADMIN",
      demo: true,
      iat: now,
      exp,
    }),
  );

  return `${header}.${payload}.demo`;
};

export const getDemoAdminUser = () => ({
  id: DEMO_ADMIN_USER_ID,
  name: "TrueTransit Admin",
  email: DEMO_ADMIN_EMAIL,
  role: "SUPERADMIN",
  demo: true,
});

export const isDemoAdminSession = () => {
  try {
    const user = JSON.parse(localStorage.getItem("adminUser") || "null");
    return Boolean(user?.demo);
  } catch {
    return false;
  }
};

const nowIso = () => new Date().toISOString();

const getDefaultDemoSeller = () => ({
  id: DEMO_SELLER_ID,
  userId: DEMO_SELLER_ID,
  name: "Sahil Mittal",
  email: DEMO_SELLER_EMAIL,
  contactPerson: "Sahil Mittal",
  contactNumber: "+91 7416582587",
  approved: true,
  isActive: true,
  onboardingComplete: true,
  onboarding_complete: true,
  profileComplete: true,
  kycVerified: true,
  kyc_verified: true,
  kycStatus: "verified",
  domesticKyc: { status: "verified", updatedAt: nowIso() },
  planName: "Basic",
  plan: { id: "basic", name: "Basic" },
  walletBalance: 0,
  monthlyOrderCount: 0,
  lastLogin: nowIso(),
  last_login_at: nowIso(),
  createdAt: "2026-08-31T02:00:00.000Z",
  updatedAt: nowIso(),
  companyInfo: {
    businessName: "TrueTransit Demo",
    brandName: "TrueTransit",
    contactPerson: "Sahil Mittal",
    contactEmail: DEMO_SELLER_EMAIL,
    companyEmail: DEMO_SELLER_EMAIL,
    contactNumber: "+91 7416582587",
    companyContactNumber: "+91 7416582587",
    companyAddress: "Hyderabad, Telangana 500032",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500032",
  },
  bankDetails: {
    count: 1,
    primaryAccount: null,
  },
});

export const readDemoSellers = () => {
  if (typeof window === "undefined") return [getDefaultDemoSeller()];

  try {
    const saved = JSON.parse(localStorage.getItem(DEMO_SELLERS_KEY) || "null");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {
    // Fall through and seed the demo seller.
  }

  const seeded = [getDefaultDemoSeller()];
  localStorage.setItem(DEMO_SELLERS_KEY, JSON.stringify(seeded));
  return seeded;
};

export const writeDemoSellers = (sellers) => {
  if (typeof window === "undefined") return sellers;
  localStorage.setItem(DEMO_SELLERS_KEY, JSON.stringify(sellers));
  return sellers;
};

export const updateDemoSeller = (userId, updater) => {
  const sellers = readDemoSellers();
  const updated = sellers.map((seller) =>
    seller.id === userId || seller.userId === userId
      ? { ...seller, ...updater(seller), updatedAt: nowIso() }
      : seller,
  );
  writeDemoSellers(updated);
  return updated.find((seller) => seller.id === userId || seller.userId === userId);
};
