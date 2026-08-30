export const DEMO_ADMIN_EMAIL = "admin@truetransitmobility.com";
export const DEMO_ADMIN_PASSWORD = "TrueTransit@123";
export const DEMO_ADMIN_USER_ID = "truetransit-demo-admin";

const DEMO_ADMIN_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "truetransitadmin.onrender.com",
]);

const encodeBase64Url = (value) =>
  window
    .btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

export const isDemoAdminEnabled = () =>
  process.env.NODE_ENV === "development" ||
  (typeof window !== "undefined" &&
    DEMO_ADMIN_HOSTS.has(window.location.hostname.toLowerCase()) &&
    String(process.env.REACT_APP_DEMO_ADMIN_ENABLED || "true").toLowerCase() !== "false");

export const isDemoAdminCredential = (email, password) =>
  isDemoAdminEnabled() &&
  email.trim().toLowerCase() === DEMO_ADMIN_EMAIL &&
  password === DEMO_ADMIN_PASSWORD;

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
