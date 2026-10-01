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
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: brandGradients.button,
                color: brand.ink,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(130,194,255,0.24)',
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
