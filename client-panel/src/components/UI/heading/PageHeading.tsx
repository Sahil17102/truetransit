import { alpha, Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import React from 'react'
import {
  TbAlertTriangle,
  TbApps,
  TbArrowBackUp,
  TbBook2,
  TbBuilding,
  TbCalculator,
  TbChartBar,
  TbChecklist,
  TbCircleKey,
  TbCoinRupee,
  TbFileAnalytics,
  TbFileInvoice,
  TbFileText,
  TbHeadset,
  TbKeyboard,
  TbListDetails,
  TbPackageExport,
  TbPlugConnected,
  TbReceipt,
  TbRoute,
  TbScale,
  TbSettings,
  TbShieldCheck,
  TbTag,
  TbTruckDelivery,
  TbUser,
  TbUsers,
  TbWallet,
} from 'react-icons/tb'
import { brand, brandGradients } from '../../../theme/brand'

interface PageHeadingProps {
  title: string | React.ReactNode
  subtitle?: string
  center?: boolean
  fontSize?: string | number
  icon?: React.ReactNode
  eyebrow?: string
}

const normalizeHeadingText = (value: string) =>
  value
    .replace(/â€“|â€”/g, '-')
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€�/g, '"')
    .replace(/â€¢/g, '•')
    .replace(/â€¦/g, '...')
    .replace(/Â©/g, '©')
    .replace(/Â®/g, '®')

const getHeadingIcon = (title: string) => {
  const normalizedTitle = title.toLowerCase()

  if (normalizedTitle.includes('create') && normalizedTitle.includes('order')) return TbPackageExport
  if (normalizedTitle.includes('tracking')) return TbRoute
  if (normalizedTitle.includes('ndr') || normalizedTitle.includes('pending action')) return TbAlertTriangle
  if (normalizedTitle.includes('rto')) return TbArrowBackUp
  if (normalizedTitle.includes('courier')) return TbTruckDelivery
  if (normalizedTitle.includes('channel')) return TbApps
  if (normalizedTitle.includes('integration') || normalizedTitle.includes('api')) return TbPlugConnected
  if (normalizedTitle.includes('report')) return TbFileAnalytics
  if (normalizedTitle.includes('invoice')) return TbFileInvoice
  if (normalizedTitle.includes('cod') || normalizedTitle.includes('remittance')) return TbCoinRupee
  if (normalizedTitle.includes('wallet') || normalizedTitle.includes('passbook') || normalizedTitle.includes('recharge')) return TbWallet
  if (normalizedTitle.includes('shipping charge')) return TbTruckDelivery
  if (normalizedTitle.includes('credit note')) return TbCoinRupee
  if (normalizedTitle.includes('debit note') || normalizedTitle.includes('billing')) return TbReceipt
  if (normalizedTitle.includes('ledger')) return TbListDetails
  if (normalizedTitle.includes('rate')) return TbCalculator
  if (normalizedTitle.includes('weight') || normalizedTitle.includes('discrepancy')) return TbScale
  if (normalizedTitle.includes('support') || normalizedTitle.includes('contact')) return TbHeadset
  if (normalizedTitle.includes('keyboard')) return TbKeyboard
  if (normalizedTitle.includes('permission') || normalizedTitle.includes('privacy')) return TbShieldCheck
  if (normalizedTitle.includes('user')) return TbUsers
  if (normalizedTitle.includes('account') || normalizedTitle.includes('profile')) return TbUser
  if (normalizedTitle.includes('company')) return TbBuilding
  if (normalizedTitle.includes('label')) return TbTag
  if (normalizedTitle.includes('setting') || normalizedTitle.includes('preference')) return TbSettings
  if (normalizedTitle.includes('terms') || normalizedTitle.includes('policy') || normalizedTitle.includes('legal')) return TbFileText
  if (normalizedTitle.includes('resource') || normalizedTitle.includes('about')) return TbBook2
  if (normalizedTitle.includes('status')) return TbChecklist
  if (normalizedTitle.includes('key')) return TbCircleKey
  if (normalizedTitle.includes('analytics')) return TbChartBar

  return TbChecklist
}

interface HeadingWidgetTone {
  background: string
  color: string
  border: string
  shadow: string
}

const getHeadingWidgetTone = (title: string): HeadingWidgetTone => {
  const normalizedTitle = title.toLowerCase()

  if (normalizedTitle.includes('create') && normalizedTitle.includes('order')) {
    return {
      background: 'linear-gradient(145deg, #E6F8F1 0%, #CDEFE3 100%)',
      color: '#087A57',
      border: 'rgba(20, 155, 109, 0.24)',
      shadow: '0 10px 22px rgba(20, 155, 109, 0.18)',
    }
  }
  if (normalizedTitle.includes('ndr') || normalizedTitle.includes('pending action')) {
    return {
      background: 'linear-gradient(145deg, #FFF4E5 0%, #FFE2BC 100%)',
      color: '#B45309',
      border: 'rgba(217, 120, 66, 0.25)',
      shadow: '0 10px 22px rgba(217, 120, 66, 0.17)',
    }
  }
  if (normalizedTitle.includes('rto')) {
    return {
      background: 'linear-gradient(145deg, #FFF0F1 0%, #FAD7DA 100%)',
      color: '#B83D49',
      border: 'rgba(201, 74, 84, 0.24)',
      shadow: '0 10px 22px rgba(201, 74, 84, 0.16)',
    }
  }
  if (normalizedTitle.includes('tracking') || normalizedTitle.includes('courier') || normalizedTitle.includes('shipping charge')) {
    return {
      background: 'linear-gradient(145deg, #EAF4FF 0%, #D5E8FB 100%)',
      color: '#2563A6',
      border: 'rgba(37, 99, 166, 0.22)',
      shadow: '0 10px 22px rgba(37, 99, 166, 0.16)',
    }
  }
  if (normalizedTitle.includes('channel') || normalizedTitle.includes('integration') || normalizedTitle.includes('api')) {
    return {
      background: 'linear-gradient(145deg, #F1EDFF 0%, #E2D9FF 100%)',
      color: '#6750B8',
      border: 'rgba(103, 80, 184, 0.22)',
      shadow: '0 10px 22px rgba(103, 80, 184, 0.16)',
    }
  }
  if (normalizedTitle.includes('report') || normalizedTitle.includes('analytics')) {
    return {
      background: 'linear-gradient(145deg, #E9F0FF 0%, #D9E3FF 100%)',
      color: '#4059AD',
      border: 'rgba(64, 89, 173, 0.22)',
      shadow: '0 10px 22px rgba(64, 89, 173, 0.16)',
    }
  }
  if (normalizedTitle.includes('wallet') || normalizedTitle.includes('passbook') || normalizedTitle.includes('recharge') || normalizedTitle.includes('cod') || normalizedTitle.includes('remittance')) {
    return {
      background: 'linear-gradient(145deg, #EAF8EE 0%, #D4EFDC 100%)',
      color: '#23834F',
      border: 'rgba(35, 131, 79, 0.22)',
      shadow: '0 10px 22px rgba(35, 131, 79, 0.16)',
    }
  }
  if (normalizedTitle.includes('invoice') || normalizedTitle.includes('billing') || normalizedTitle.includes('debit note') || normalizedTitle.includes('credit note') || normalizedTitle.includes('ledger')) {
    return {
      background: 'linear-gradient(145deg, #FFF3EA 0%, #FBE1D2 100%)',
      color: '#B65F32',
      border: 'rgba(182, 95, 50, 0.22)',
      shadow: '0 10px 22px rgba(182, 95, 50, 0.16)',
    }
  }
  if (normalizedTitle.includes('rate') || normalizedTitle.includes('weight') || normalizedTitle.includes('discrepancy')) {
    return {
      background: 'linear-gradient(145deg, #FFF9DF 0%, #F4E9B8 100%)',
      color: '#8A6A09',
      border: 'rgba(138, 106, 9, 0.22)',
      shadow: '0 10px 22px rgba(138, 106, 9, 0.15)',
    }
  }
  if (normalizedTitle.includes('support') || normalizedTitle.includes('contact')) {
    return {
      background: 'linear-gradient(145deg, #FFF0F6 0%, #F8D8E7 100%)',
      color: '#A83E70',
      border: 'rgba(168, 62, 112, 0.22)',
      shadow: '0 10px 22px rgba(168, 62, 112, 0.15)',
    }
  }
  if (normalizedTitle.includes('user') || normalizedTitle.includes('account') || normalizedTitle.includes('profile') || normalizedTitle.includes('permission')) {
    return {
      background: 'linear-gradient(145deg, #F0EEFF 0%, #DDD9F8 100%)',
      color: '#5F52A8',
      border: 'rgba(95, 82, 168, 0.22)',
      shadow: '0 10px 22px rgba(95, 82, 168, 0.15)',
    }
  }
  if (normalizedTitle.includes('setting') || normalizedTitle.includes('preference') || normalizedTitle.includes('keyboard')) {
    return {
      background: 'linear-gradient(145deg, #EDF3F8 0%, #DCE7F0 100%)',
      color: '#425D78',
      border: 'rgba(66, 93, 120, 0.20)',
      shadow: '0 10px 22px rgba(66, 93, 120, 0.14)',
    }
  }
  if (normalizedTitle.includes('policy') || normalizedTitle.includes('privacy') || normalizedTitle.includes('terms') || normalizedTitle.includes('legal')) {
    return {
      background: 'linear-gradient(145deg, #EAF7F8 0%, #D4ECEE 100%)',
      color: '#25747A',
      border: 'rgba(37, 116, 122, 0.22)',
      shadow: '0 10px 22px rgba(37, 116, 122, 0.15)',
    }
  }

  return {
    background: 'linear-gradient(145deg, #EEF3F8 0%, #DCE7F1 100%)',
    color: brand.navy,
    border: 'rgba(20, 43, 79, 0.18)',
    shadow: '0 10px 22px rgba(20, 43, 79, 0.14)',
  }
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle,
  center = false,
  fontSize,
  icon,
  eyebrow = 'Panel',
}) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const normalizedTitle = typeof title === 'string' ? normalizeHeadingText(title) : title
  const normalizedSubtitle =
    typeof subtitle === 'string' ? normalizeHeadingText(subtitle) : subtitle
  const normalizedEyebrow = typeof eyebrow === 'string' ? normalizeHeadingText(eyebrow) : eyebrow
  const HeadingIcon = getHeadingIcon(typeof normalizedTitle === 'string' ? normalizedTitle : '')
  const resolvedIcon = icon ?? <HeadingIcon size={20} strokeWidth={1.8} />
  const widgetTone = getHeadingWidgetTone(typeof normalizedTitle === 'string' ? normalizedTitle : '')

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '14px',
        border: `1px solid ${isDark ? alpha('#f8fafc', 0.1) : alpha('#FFFFFF', 0.7)}`,
        background: isDark ? '#151b23' : brandGradients.surface,
        px: { xs: 1.8, sm: 2.4 },
        py: { xs: 1.8, sm: 2.1 },
        boxShadow: isDark ? '0 14px 34px rgba(0,0,0,0.18)' : '0 20px 42px rgba(15,44,67,0.08)',
      }}
    >
      <Stack spacing={1} textAlign={center ? 'center' : 'left'} position="relative" zIndex={1}>
        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
          sx={{
            justifyContent: center ? 'center' : 'flex-start',
          }}
        >
          <motion.div
            initial={{ rotate: -18, scale: 0.82, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            whileHover={{ rotate: 12, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: widgetTone.background,
                color: widgetTone.color,
                border: `1px solid ${widgetTone.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: widgetTone.shadow,
              }}
            >
              {resolvedIcon}
            </Box>
          </motion.div>
          <Stack spacing={0.4}>
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: theme.palette.text.secondary,
                textTransform: 'uppercase',
                letterSpacing: 0,
              }}
            >
              {normalizedEyebrow}
            </Typography>
            <Typography
              fontSize={fontSize ?? { xs: '1.45rem', md: '1.95rem' }}
              fontWeight={700}
              lineHeight={1.08}
              sx={{
                color: theme.palette.text.primary,
                letterSpacing: 0,
              }}
            >
              {normalizedTitle}
            </Typography>
          </Stack>
        </Stack>

        {normalizedSubtitle && (
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.9rem', md: '0.96rem' },
              maxWidth: center ? 820 : 760,
              mx: center ? 'auto' : 0,
              lineHeight: 1.75,
              pl: center ? 0 : { xs: 0, sm: 6 },
            }}
          >
            {normalizedSubtitle}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}

export default PageHeading
