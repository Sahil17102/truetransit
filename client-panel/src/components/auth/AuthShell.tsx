import { Box, Grid, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import BrandLogo from '../brand/BrandLogo'
import { brand, brandIdentity } from '../../theme/brand'

interface AuthShellProps {
  eyebrow: string
  title: string
  subtitle: string
  helperTitle: string
  helperText: string
  variant?: 'default' | 'compact'
  showChrome?: boolean
  showNavbar?: boolean
  showFooter?: boolean
  visual?: React.ReactNode
  children: React.ReactNode
}

const authPalette = {
  navy: brand.ink,
  orange: brand.accent,
  text: brand.ink,
  muted: brand.inkSoft,
  blob: '#EAF4F2',
  blobEdge: brand.sky,
}

const deliveryArtwork = '/images/client-auth-delivery-van-theme.png'
const authDisplayFont = '"Plus Jakarta Sans", "Poppins", ui-sans-serif, system-ui, sans-serif'

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  helperTitle,
  helperText,
  variant = 'default',
  visual,
  children,
}: AuthShellProps) {
  const isCompact = variant === 'compact'
  const titleLines = title.split('\n').filter(Boolean)

  return (
    <Box
      aria-label={eyebrow}
      sx={{
        position: 'relative',
        height: '100dvh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
        width: '100%',
        boxSizing: 'border-box',
        bgcolor: brand.page,
        backgroundImage: `
          linear-gradient(rgba(20, 43, 79, 0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 43, 79, 0.045) 1px, transparent 1px),
          linear-gradient(180deg, #FFFFFF 0%, #F7F8F5 54%, #EAF4F2 100%)
        `,
        backgroundSize: '40px 40px, 40px 40px, auto',
        color: authPalette.text,
        fontFamily: authDisplayFont,
        display: 'flex',
        alignItems: { xs: 'flex-start', lg: 'center' },
        justifyContent: { xs: 'flex-start', lg: 'center' },
        overflowX: 'hidden',
        overflowY: { xs: 'auto', lg: 'hidden' },
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'auto',
        scrollbarGutter: 'stable',
        p: { xs: 0.9, sm: 1.1, md: 1.25, lg: 0.7 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', lg: isCompact ? 'min(790px, calc(100vw - 36px))' : 'min(1480px, calc(100vw - 40px))' },
          maxWidth: '100%',
          height: 'auto',
          minHeight: { xs: 'auto', lg: 'min(640px, calc(100dvh - 18px))' },
          maxHeight: 'none',
          borderRadius: 0,
          border: 'none',
          overflow: 'visible',
          bgcolor: 'transparent',
          boxShadow: 'none',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            zIndex: 0,
            inset: { xs: '18px -44% 18px -30%', lg: '44px 5% 44px 5%' },
            bgcolor: authPalette.blob,
            background: `linear-gradient(145deg, ${authPalette.blob} 0%, #F8FBFF 48%, ${authPalette.blobEdge} 100%)`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.76), 0 36px 90px ${alpha(authPalette.navy, 0.08)}`,
            borderRadius: {
              xs: '42% 58% 48% 52% / 12% 16% 84% 88%',
              lg: '8px',
            },
            transform: { xs: 'rotate(-1.5deg)', md: 'none' },
          }}
        />

        <Grid
          container
          sx={{
            position: 'relative',
            zIndex: 1,
            minHeight: 'inherit',
            minWidth: 0,
            width: '100%',
            height: 'auto',
            boxSizing: 'border-box',
            alignItems: { xs: 'flex-start', lg: 'center' },
            alignContent: { xs: 'flex-start', lg: 'center' },
            px: { xs: 1.4, sm: 2, md: 2.6, lg: 2.8 },
            py: { xs: 2.1, sm: 2.4, md: 2.8, lg: 1.4 },
          }}
        >
          {!isCompact && (
            <Grid
              size={{ xs: 12, lg: 6.5 }}
              sx={{
                display: 'flex',
                alignItems: { xs: 'center', lg: 'center' },
                height: { xs: 'auto', lg: '100%' },
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <Stack
                sx={{
                  width: '100%',
                  minHeight: { lg: 560 },
                  justifyContent: 'center',
                  alignItems: { xs: 'center', lg: 'flex-start' },
                  textAlign: { xs: 'center', lg: 'left' },
                  pt: { xs: 0.4, lg: 0 },
                  pb: { xs: 1.2, lg: 0 },
                  gap: { xs: 1.5, lg: 1.45 },
                }}
              >
                <Stack
                  spacing={{ xs: 0.9, md: 1 }}
                  sx={{ width: '100%', maxWidth: 590, minWidth: 0 }}
                >
                  <Box
                    component="span"
                    sx={{
                      alignSelf: { xs: 'center', lg: 'flex-start' },
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.8,
                      width: 'fit-content',
                      px: { xs: 1, sm: 1.18 },
                      py: 0.55,
                      borderRadius: 999,
                      border: 'none',
                      bgcolor: alpha('#FFFFFF', 0.84),
                      color: authPalette.navy,
                      fontSize: { xs: '0.66rem', sm: '0.72rem' },
                      fontWeight: 800,
                      lineHeight: 1,
                      textTransform: 'uppercase',
                      letterSpacing: 0,
                      boxShadow: 'none',
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        bgcolor: authPalette.orange,
                        boxShadow: `0 0 0 4px ${alpha(authPalette.orange, 0.12)}`,
                      }}
                    />
                    TrueTransit Login
                  </Box>

                  <Typography
                    component="h1"
                    sx={{
                      color: authPalette.navy,
                      fontFamily: authDisplayFont,
                      fontSize: { xs: '1.64rem', sm: '2.18rem', md: '2.48rem', lg: '2.54rem' },
                      lineHeight: { xs: 1.08, md: 1.02 },
                      fontWeight: 800,
                      letterSpacing: 0,
                      overflowWrap: 'break-word',
                    }}
                  >
                    {titleLines.map((line, index) => (
                      <Box
                        component="span"
                        key={line}
                        sx={{
                          display: 'block',
                          color: index === titleLines.length - 1 ? 'transparent' : authPalette.navy,
                          background:
                            index === titleLines.length - 1
                              ? `linear-gradient(90deg, ${brand.warning} 0%, ${authPalette.navy} 56%, ${authPalette.orange} 100%)`
                              : 'none',
                          WebkitBackgroundClip: index === titleLines.length - 1 ? 'text' : 'border-box',
                          backgroundClip: index === titleLines.length - 1 ? 'text' : 'border-box',
                        }}
                      >
                        {line}
                      </Box>
                    ))}
                  </Typography>
                  <Typography
                    sx={{
                      color: authPalette.muted,
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.04rem' },
                      fontWeight: 600,
                      lineHeight: 1.52,
                      maxWidth: { xs: 300, sm: 520 },
                      overflowWrap: 'break-word',
                    }}
                  >
                    {subtitle}
                  </Typography>
                  <Stack
                    spacing={0.35}
                    sx={{
                      color: authPalette.navy,
                      fontSize: { xs: '0.74rem', sm: '0.78rem' },
                      fontWeight: 800,
                      lineHeight: 1.35,
                      maxWidth: { xs: 310, sm: 520 },
                      p: { xs: 1.05, sm: 1.15 },
                      borderRadius: '8px',
                      bgcolor: alpha('#FFFFFF', 0.58),
                      border: `1px solid ${alpha(authPalette.navy, 0.08)}`,
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) minmax(0, 1fr)' },
                      columnGap: 1.4,
                      rowGap: 0.35,
                      '& > span': {
                        minWidth: 0,
                        overflowWrap: 'break-word',
                      },
                    }}
                  >
                    <Box component="span">{brandIdentity.supportEmail}</Box>
                    <Box component="span">{brandIdentity.supportPhone}</Box>
                  </Stack>
                </Stack>

                {visual ?? (
                  <Box
                    component="img"
                    src={deliveryArtwork}
                    alt="Delivery van with courier team"
                    sx={{
                      width: { xs: '66%', sm: '58%', lg: '68%' },
                      maxWidth: { xs: 220, sm: 330, lg: 380 },
                      mt: { xs: 0.8, lg: 0.6 },
                      ml: { lg: 2.4 },
                      alignSelf: { xs: 'center', lg: 'flex-start' },
                      objectFit: 'contain',
                      mixBlendMode: 'multiply',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </Stack>
            </Grid>
          )}

          <Grid
            size={{ xs: 12, lg: isCompact ? 12 : 5.5 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', lg: 'center' },
              height: { xs: 'auto', lg: '100%' },
              minHeight: 0,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: 'calc(100vw - 36px)', sm: isCompact ? 430 : 430, md: isCompact ? 440 : 460 },
                mx: { xs: 'auto', lg: 0 },
                p: { xs: 1.15, sm: 2.15, md: 2.35 },
                pt: { xs: 1.15, lg: isCompact ? 2.35 : 2.2 },
                pb: { xs: 1.15, lg: 2.35 },
                borderRadius: '8px',
                border: `1px solid ${alpha(authPalette.navy, 0.08)}`,
                bgcolor: alpha('#FFFFFF', 0.78),
                boxShadow: `0 28px 64px ${alpha(authPalette.navy, 0.12)}`,
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
            >
              <Stack spacing={{ xs: 0.9, md: 1 }} alignItems="center" sx={{ mb: { xs: 1.05, md: 1.25 } }}>
                <BrandLogo
                  sx={{
                    width: { xs: 150, sm: 176, md: 190 },
                    filter: 'drop-shadow(0 10px 18px rgba(13, 27, 77, 0.10))',
                  }}
                />
                <Stack spacing={0.8} alignItems="center" textAlign="center">
                  <Typography
                    component="h2"
                    sx={{
                      fontFamily: authDisplayFont,
                      color: authPalette.navy,
                      fontSize: { xs: '1.18rem', sm: '1.44rem', md: '1.58rem' },
                      lineHeight: 1.1,
                      fontWeight: 800,
                      letterSpacing: 0,
                      maxWidth: '100%',
                      overflowWrap: 'break-word',
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        background: `linear-gradient(90deg, ${authPalette.navy} 0%, ${authPalette.orange} 100%)`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {helperTitle}
                    </Box>
                  </Typography>
                  <Typography
                    sx={{
                      color: authPalette.muted,
                      fontSize: { xs: '0.82rem', sm: '0.9rem', md: '0.94rem' },
                      fontWeight: 600,
                      lineHeight: 1.38,
                      maxWidth: 310,
                    }}
                  >
                    {helperText}
                  </Typography>
                </Stack>
              </Stack>

              <Box
                sx={{
                  p: { xs: 0, sm: 0.2 },
                  borderRadius: '8px',
                  bgcolor: 'transparent',
                }}
              >
                {children}
              </Box>

              <Box
                component="span"
                sx={{
                  display: { xs: 'block', lg: 'none' },
                  mt: 2.5,
                  mx: 'auto',
                  width: 92,
                  height: 4,
                  borderRadius: 999,
                  bgcolor: alpha(brand.ink, 0.12),
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
