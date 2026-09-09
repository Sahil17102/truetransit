import { Box, Grid, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { FiLink } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { MdCheckCircle } from 'react-icons/md'
import type { FormErrors } from '../../pages/onboarding/UserOnboarding'
import type { UserInfoData } from '../../types/user.types'
import { createSyntheticEvent } from '../../utils/functions'

interface IStepThree {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    subKey?: keyof UserInfoData,
  ) => void
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
  compact?: boolean
}

const DE_BLUE = '#071D49'
const BRAND_PURPLE = '#7357FF'

type ChannelOption = {
  key: string
  label: string
  subtitle: string
  logoBg: string
  logo?: string
  fallback?: string
  icon?: IconType
}

const CHANNEL_OPTIONS: ChannelOption[] = [
  {
    key: 'shopify',
    label: 'Shopify',
    subtitle: 'E-commerce platform',
    logo: '/logo/integrations/shopify.webp',
    logoBg: '#F3FAED',
  },
  {
    key: 'woocommerce',
    label: 'WooCommerce',
    subtitle: 'WordPress plugin',
    logo: '/logo/integrations/woocommerce.webp',
    logoBg: '#F4EEFF',
  },
  {
    key: 'amazon',
    label: 'Amazon Seller',
    subtitle: 'Marketplace seller',
    logo: '/logo/integrations/amazon.png',
    logoBg: '#FFF4E8',
  },
  {
    key: 'flipkart',
    label: 'Flipkart Seller',
    subtitle: 'Marketplace seller',
    fallback: 'f',
    logoBg: '#FFE500',
  },
  {
    key: 'magento',
    label: 'Magento',
    subtitle: 'E-commerce platform',
    logo: '/logo/integrations/magento.png',
    logoBg: '#FFF5F0',
  },
  {
    key: 'customApi',
    label: 'Custom API',
    subtitle: 'Direct integration',
    icon: FiLink,
    logoBg: '#F6F8FC',
  },
]

export default function StepThree({ formData, onChange, compact = false }: IStepThree) {
  const selectedChannels = formData?.platformIntegration || {}

  const toggleChannel = (key: string) => {
    onChange(
      createSyntheticEvent(key, !selectedChannels?.[key]),
      'platformIntegration',
    )
  }

  return (
    <Stack spacing={compact ? { xs: 1.1, md: 1.25 } : { xs: 2.4, md: 3 }}>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            color: DE_BLUE,
            mb: compact ? 0.25 : 0.8,
            fontSize: compact
              ? { xs: '1.05rem', sm: '1.14rem', md: '1.22rem' }
              : { xs: '1.45rem', sm: '1.7rem', md: '2rem' },
            letterSpacing: 0,
          }}
        >
          Connect your store
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#5A6C8C',
            fontSize: compact ? '0.82rem' : { xs: '0.9rem', sm: '1rem' },
            lineHeight: compact ? 1.35 : 1.55,
          }}
        >
          Select platforms you'd like to integrate. You can always do this later.
        </Typography>
      </Box>

      <Grid container spacing={compact ? { xs: 0.9, md: 1 } : { xs: 1.4, md: 1.8 }}>
        {CHANNEL_OPTIONS.map((option) => {
          const active = Boolean(selectedChannels?.[option.key])
          const Icon = option.icon

          return (
            <Grid key={option.key} size={compact ? { xs: 12, sm: 6, md: 4 } : { xs: 12, sm: 6 }}>
              <Box
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() => toggleChannel(option.key)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    toggleChannel(option.key)
                  }
                }}
                sx={{
                  minHeight: compact ? 70 : 92,
                  height: '100%',
                  p: compact ? { xs: 1, md: 1.1 } : { xs: 1.7, md: 2 },
                  borderRadius: compact ? 1.2 : 2.4,
                  border: `2px solid ${active ? BRAND_PURPLE : '#E7ECF4'}`,
                  backgroundColor: active ? alpha(BRAND_PURPLE, 0.035) : '#FAFBFD',
                  boxShadow: active ? `0 18px 34px ${alpha(BRAND_PURPLE, 0.14)}` : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: compact ? 1 : 1.6,
                  position: 'relative',
                  transition: 'border-color .2s ease, box-shadow .2s ease, transform .2s ease',
                  '&:hover': {
                    borderColor: active ? BRAND_PURPLE : alpha(BRAND_PURPLE, 0.45),
                    transform: 'translateY(-1px)',
                  },
                  '&:focus-visible': {
                    outline: `3px solid ${alpha(BRAND_PURPLE, 0.28)}`,
                    outlineOffset: 3,
                  },
                }}
              >
                <Box
                  sx={{
                    width: compact ? 34 : 42,
                    height: compact ? 34 : 42,
                    borderRadius: compact ? 1.2 : 2,
                    bgcolor: option.logoBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: '#2874F0',
                    textTransform: 'uppercase',
                  }}
                >
                  {option.logo ? (
                    <Box
                      component="img"
                      src={option.logo}
                      alt=""
                      sx={{ width: compact ? 24 : 30, height: compact ? 24 : 30, objectFit: 'contain' }}
                    />
                  ) : Icon ? (
                    <Icon size={compact ? 18 : 22} color="#617089" />
                  ) : (
                    option.fallback
                  )}
                </Box>

                <Box sx={{ minWidth: 0, pr: active ? 3.3 : 0 }}>
                  <Typography
                    sx={{
                      fontSize: compact ? '0.86rem' : { xs: '0.98rem', md: '1.05rem' },
                      lineHeight: 1.2,
                      fontWeight: 900,
                      color: DE_BLUE,
                    }}
                  >
                    {option.label}
                  </Typography>
                  <Typography
                    sx={{
                      mt: compact ? 0.15 : 0.3,
                      fontSize: compact ? '0.72rem' : { xs: '0.82rem', md: '0.9rem' },
                      color: '#5B6F91',
                      lineHeight: 1.25,
                    }}
                  >
                    {option.subtitle}
                  </Typography>
                </Box>

                {active && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: compact ? 10 : 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: BRAND_PURPLE,
                      display: 'flex',
                    }}
                  >
                    <MdCheckCircle size={compact ? 21 : 26} />
                  </Box>
                )}
              </Box>
            </Grid>
          )
        })}
      </Grid>

    </Stack>
  )
}
