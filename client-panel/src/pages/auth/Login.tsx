import { Box, Button, Stack } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthShell from '../../components/auth/AuthShell'
import CredentialAuthForm from '../../components/auth/CredentialAuthForm'
import LoginLogisticsScene from '../../components/auth/LoginLogisticsScene'
import OtpLoginPanel from '../../components/auth/OtpLoginPanel'
import FullScreenLoader from '../../components/UI/loader/FullScreenLoader'
import { useAuth } from '../../context/auth/AuthContext'
import { getPostAuthRedirect } from '../../utils/authRedirect'

const AUTH_NAVY = '#0D1B4D'
const AUTH_ORANGE = '#E31B23'

export default function Login() {
  const { loading, isAuthenticated, user } = useAuth()
  const location = useLocation()
  const [mode, setMode] = useState<'otp' | 'password'>('otp')
  const isExplicitLoginEntry = Boolean(
    (location.state as { explicitLoginEntry?: boolean } | null)?.explicitLoginEntry,
  )

  if (loading && !isExplicitLoginEntry) return <FullScreenLoader />
  if (isAuthenticated && !isExplicitLoginEntry) {
    return <Navigate to={getPostAuthRedirect(user)} replace />
  }

  return (
    <AuthShell
      eyebrow="Client Auth"
      title={'Move Every Shipment.\nWith Confidence.'}
      subtitle="Manage pickups, rates, tracking, and delivery exceptions from one focused TrueTransit command center."
      helperTitle="Welcome Back to TrueTransit"
      helperText="Sign in to open your courier command center."
      showChrome
      showNavbar={false}
      visual={<LoginLogisticsScene />}
    >
      <Stack spacing={{ xs: 1.25, md: 1.35 }}>
        <Box
          sx={{
            borderRadius: '7px',
            backgroundColor: alpha('#0D1B4D', 0.045),
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            border: `1px solid ${alpha(AUTH_NAVY, 0.08)}`,
            boxShadow: `inset 0 1px 0 ${alpha('#FFFFFF', 0.72)}`,
          }}
        >
          {[
            { value: 'otp', label: 'Email OTP' },
            { value: 'password', label: 'Email + Password', mobileLabel: 'Password' },
          ].map((item) => (
            <Button
              key={item.value}
              type="button"
              onClick={() => setMode(item.value as 'otp' | 'password')}
              sx={{
                borderRadius: 0,
                py: { xs: 0.75, sm: 0.82 },
                px: { xs: 0.5, sm: 1 },
                minHeight: 40,
                background: mode === item.value ? '#FFFFFF' : 'transparent',
                color: mode === item.value ? AUTH_ORANGE : alpha(AUTH_NAVY, 0.72),
                fontWeight: 800,
                fontSize: { xs: '0.68rem', sm: '0.86rem' },
                textTransform: 'none',
                whiteSpace: 'nowrap',
                borderBottom: `3px solid ${mode === item.value ? AUTH_ORANGE : 'transparent'}`,
                borderRight: 'none',
                '&:hover': {
                  background: '#FFFFFF',
                  color: mode === item.value ? AUTH_ORANGE : AUTH_NAVY,
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {item.label}
              </Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                {item.mobileLabel ?? item.label}
              </Box>
            </Button>
          ))}
        </Box>

        {mode === 'otp' ? (
          <OtpLoginPanel showIntro={false} compactLogin />
        ) : (
          <CredentialAuthForm mode="login" showIntro={false} compactLogin />
        )}

      </Stack>
    </AuthShell>
  )
}


