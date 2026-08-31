import { alpha, type PaletteMode, type SxProps, type Theme } from '@mui/material/styles'
import { brand, brandFonts } from '../../theme/brand'

export const dashboardPalette = {
  page: 'var(--dashboard-page)',
  surface: 'var(--dashboard-surface)',
  tile: 'var(--dashboard-tile)',
  ink: 'var(--dashboard-ink)',
  muted: 'var(--dashboard-muted)',
  line: 'var(--dashboard-line)',
  orange: brand.warning,
  orangeDark: '#B85B2E',
  orangeSoft: '#2a1c16',
  blue: brand.navy,
  blueDark: '#0F3A4F',
  green: brand.accent,
  amber: brand.warning,
  red: brand.danger,
  track: 'var(--dashboard-track)',
}

export const getDashboardCssVars = (mode: PaletteMode) => {
  const isDark = mode === 'dark'

  return {
    '--dashboard-page': isDark ? '#0f141b' : '#f7f8f5',
    '--dashboard-surface': isDark ? '#151b23' : '#ffffff',
    '--dashboard-tile': isDark ? '#0f141b' : '#fbfcf8',
    '--dashboard-ink': isDark ? '#f8fafc' : '#142b4f',
    '--dashboard-muted': isDark ? '#9badc3' : '#617287',
    '--dashboard-line': isDark ? '#2a313a' : 'rgba(20, 43, 79, 0.14)',
    '--dashboard-track': isDark ? '#2a313a' : '#dfe8f5',
  } satisfies SxProps<Theme>
}

export const dashboardCardSx = {
  height: '100%',
  minHeight: 0,
  borderRadius: '8px',
  position: 'relative',
  border: `1px solid ${dashboardPalette.line}`,
  background: dashboardPalette.surface,
  boxShadow: '0 14px 34px rgba(20, 43, 79, 0.055)',
  overflow: 'hidden',
  transition: 'border-color 160ms ease, box-shadow 160ms ease',
  '&:hover': {
    borderColor: alpha(dashboardPalette.blue, 0.2),
    boxShadow: '0 16px 38px rgba(20, 43, 79, 0.08)',
  },
} satisfies SxProps<Theme>

export const dashboardTileSx = (color = dashboardPalette.orange) => ({
  borderRadius: '12px',
  border: `1px solid ${alpha(color, 0.16)}`,
  backgroundColor: alpha(color, 0.075),
}) satisfies SxProps<Theme>

export const dashboardIconSx = (color = dashboardPalette.orange) => ({
  width: 30,
  height: 30,
  borderRadius: '6px',
  display: 'grid',
  placeItems: 'center',
  color,
  background: alpha(color, 0.055),
  border: `1px solid ${alpha(color, 0.14)}`,
  boxShadow: 'none',
  flex: '0 0 auto',
  '& svg': {
    width: 17,
    height: 17,
    strokeWidth: 2,
  },
}) satisfies SxProps<Theme>

export const dashboardCardContentSx = {
  height: '100%',
  p: { xs: 2, sm: 2.35, md: 2.5 },
  display: 'flex',
  flexDirection: 'column',
} satisfies SxProps<Theme>

export const dashboardChartShellSx = {
  flex: 1,
  minHeight: { xs: 260, md: 300 },
  mt: 1.5,
  mx: { xs: -0.75, sm: -0.25 },
  display: 'grid',
  alignItems: 'center',
  '& .apexcharts-canvas': {
    mx: 'auto',
  },
  '& .apexcharts-legend': {
    gap: '6px',
    justifyContent: 'center',
  },
  '& .apexcharts-tooltip': {
    borderRadius: '10px',
    boxShadow: '0 14px 34px rgba(15, 23, 42, 0.14)',
  },
} satisfies SxProps<Theme>

export const dashboardButtonSx = {
  borderRadius: '10px',
  minHeight: 38,
  px: 1.8,
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    boxShadow: `0 12px 26px ${alpha(dashboardPalette.orange, 0.16)}`,
  },
} satisfies SxProps<Theme>

export const dashboardChartBase = {
  fontFamily: brandFonts.body,
  toolbar: { show: false },
  animations: { enabled: false },
}

export const dashboardText = {
  title: dashboardPalette.ink,
  muted: dashboardPalette.muted,
}
