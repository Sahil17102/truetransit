export const DEMO_OTP = '246810'
export const DEMO_SESSION_EMAIL_KEY = 'truetransit-demo-email'

export const isDemoLoginEnabled = () =>
  import.meta.env.DEV ||
  String(import.meta.env.VITE_DEMO_OTP_ENABLED || 'false').toLowerCase() === 'true'

export const isDemoSessionActive = () =>
  typeof window !== 'undefined' &&
  isDemoLoginEnabled() &&
  Boolean(sessionStorage.getItem(DEMO_SESSION_EMAIL_KEY))
