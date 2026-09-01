import { alpha } from '@mui/material/styles'

export const brand = {
  navy: '#142B4F',
  red: '#C94A54',
  ink: '#142B4F',
  inkSoft: '#617287',
  page: '#F7F8F5',
  cream: '#FBFCF8',
  sky: '#DFE8F5',
  aqua: '#D8ECEE',
  accent: '#149B6D',
  gold: '#DCE8C7',
  line: 'rgba(20, 43, 79, 0.16)',
  surface: '#FFFFFF',
  surfaceGlass: 'rgba(255,255,255,0.88)',
  success: '#149B6D',
  warning: '#D97842',
  danger: '#C94A54',
  shadow: '0 28px 60px rgba(20, 43, 79, 0.12)',
}

export const brandFonts = {
  body: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  display: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
}

export const brandIdentity = {
  name: 'TrueTransit',
  shortName: 'TrueTransit',
  tagline: 'Transit You Can Trust.',
  supportEmail: 'Hello@truetransitmobility.com',
  supportPhone: '+91 7416582587',
  supportAddress: '6th floor, The District, Financial District, Hyderabad, Nanakramguda, Telangana 500032',
  logoSrc: '/truetransit-logo.svg',
  markSrc: '/truetransit-logo.svg',
}

export const brandGradients = {
  page: `
    radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.96), transparent 30%),
    radial-gradient(circle at 100% 0%, rgba(216, 236, 238, 0.78), transparent 32%),
    linear-gradient(180deg, #EDF3F8 0%, #F7F8F5 52%, #EAF4F2 100%)
  `,
  button: 'linear-gradient(135deg, #142B4F 0%, #10475E 100%)',
  hero: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(237,243,248,0.95) 58%, rgba(216,236,238,0.9) 100%)',
  surface: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,254,0.98) 100%)',
  softSurface: 'linear-gradient(180deg, rgba(251,252,248,0.98) 0%, rgba(237,243,248,0.98) 100%)',
  analytics: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(234,244,242,0.95) 56%, rgba(207,228,210,0.36) 100%)',
}

export const brandEffects = {
  ring: `0 0 0 4px ${alpha(brand.accent, 0.2)}`,
  border: `1px solid ${alpha(brand.line, 0.92)}`,
  focusBorder: `1px solid ${alpha(brand.ink, 0.34)}`,
  mutedBorder: `1px solid ${alpha(brand.ink, 0.08)}`,
}


