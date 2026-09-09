import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import React, { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { FiUser } from 'react-icons/fi'
import { MdBusiness, MdEmail, MdLocationPin, MdPhone } from 'react-icons/md'
import { useAuth } from '../../context/auth/AuthContext'
import type { FormErrors } from '../../pages/onboarding/UserOnboarding'
import type { UserInfoData } from '../../types/user.types'
import { createSyntheticEvent } from '../../utils/functions'
import CustomInput from '../UI/inputs/CustomInput'

interface StepOneProps {
  formData: UserInfoData
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    subKey?: keyof UserInfoData,
  ) => void
  setFormData: Dispatch<SetStateAction<UserInfoData>>
  onNext: () => void
  errors: FormErrors
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
  compact?: boolean
}

const DE_BLUE = '#8A1F43'
const BRAND_ORANGE = '#56C0A5'

type UserVerificationState = {
  emailVerified?: boolean
  phoneVerified?: boolean
}

export default function StepOneForm({
  formData,
  onChange,
  errors,
  setFormData,
  setErrors,
  compact = false,
}: StepOneProps) {
  const { user: userData } = useAuth()
  const [loadingPincode, setLoadingPincode] = useState(false)
  const [location, setLocation] = useState<{ city: string; state: string }>({ city: '', state: '' })
  const verificationState = userData as typeof userData & UserVerificationState
  const emailVerified = Boolean(
    userData?.companyInfo?.POCEmailVerified || verificationState.emailVerified,
  )
  const phoneVerified = Boolean(
    userData?.companyInfo?.POCPhoneVerified || verificationState.phoneVerified,
  )

  useEffect(() => {
    async function fetchLocation() {
      const pincode = formData?.basicInfo?.pincode?.trim()

      if (!pincode || pincode.length !== 6) {
        setErrors((prev) => ({
          ...prev,
          basicInfo: { ...prev.basicInfo, pincode: '' },
        }))
        setLocation({ city: '', state: '' })
        return
      }

      setLoadingPincode(true)
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        const data = await res.json()
        const loc = data?.[0]?.PostOffice?.[0]
        const status = data?.[0]?.Status

        if (status !== 'Success' || !loc) {
          setErrors((prev) => ({
            ...prev,
            basicInfo: { ...prev.basicInfo, pincode: '' },
          }))
          setLocation({ city: '', state: '' })
        } else {
          setErrors((prev) => ({
            ...prev,
            basicInfo: { ...prev.basicInfo, pincode: '' },
          }))
          setLocation({ city: loc?.District, state: loc?.State })
        }
      } catch {
        setErrors((prev) => ({
          ...prev,
          basicInfo: {
            ...prev.basicInfo,
            pincode: '',
          },
        }))
        setLocation({ city: '', state: '' })
      } finally {
        setLoadingPincode(false)
      }
    }

    fetchLocation()
  }, [formData?.basicInfo?.pincode, setErrors])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        ...(location?.state && { state: location.state }),
        ...(location?.city && { city: location.city }),
      },
    }))
  }, [location?.state, location?.city, setFormData])

  const fieldCardSx = {
    p: compact ? { xs: 1, md: 1.15 } : { xs: 1.6, md: 2 },
    borderRadius: 1,
    border: `1px solid ${alpha(DE_BLUE, 0.12)}`,
    backgroundColor: '#fff',
  }

  return (
    <Stack spacing={compact ? { xs: 1.1, md: 1.25 } : { xs: 2, md: 2.6 }}>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: DE_BLUE,
            mb: compact ? 0.25 : 0.7,
            fontSize: compact ? { xs: '1.05rem', md: '1.22rem' } : { xs: '1.22rem', md: '1.5rem' },
          }}
        >
          Account Details
        </Typography>
        <Typography variant="body2" sx={{ color: '#6A616A', lineHeight: 1.4, fontSize: compact ? '0.82rem' : undefined }}>
          Add primary contact information and your business address so your seller panel is ready to use.
        </Typography>
      </Box>

      <Grid container spacing={compact ? { xs: 1, md: 1.2 } : { xs: 1.5, md: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={fieldCardSx}>
            <CustomInput
              label="First Name"
              name="firstName"
              value={formData?.basicInfo?.firstName}
              onChange={(e) => onChange(e, 'basicInfo')}
              required
              error={!!errors.basicInfo.firstName}
              helperText={errors.basicInfo.firstName}
              prefix={<FiUser color={DE_BLUE} />}
              topMargin={!compact}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={fieldCardSx}>
            <CustomInput
              label="Last Name"
              name="lastName"
              value={formData?.basicInfo.lastName}
              onChange={(e) => onChange(e, 'basicInfo')}
              required
              error={!!errors.basicInfo.lastName}
              helperText={errors.basicInfo.lastName}
              prefix={<FiUser color={DE_BLUE} />}
              topMargin={!compact}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={fieldCardSx}>
            <CustomInput
              label="Business Name"
              name="companyName"
              value={formData?.basicInfo.companyName}
              onChange={(e) => onChange(e, 'basicInfo')}
              required
              error={!!errors.basicInfo.companyName}
              helperText={errors.basicInfo.companyName}
              prefix={<MdBusiness color={DE_BLUE} />}
              topMargin={!compact}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={fieldCardSx}>
            <CustomInput
              label="Email"
              name="email"
              type="email"
              value={formData?.basicInfo.email}
              onChange={(e) => onChange(e, 'basicInfo')}
              disabled={emailVerified}
              required
              error={!!errors.basicInfo.email}
              helperText={errors.basicInfo.email}
              prefix={<MdEmail color={DE_BLUE} />}
              topMargin={!compact}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={fieldCardSx}>
            <CustomInput
              label="Phone"
              name="phone"
              type="tel"
              value={formData?.basicInfo?.phone}
              onChange={(e) => onChange(createSyntheticEvent('phone', e.target.value), 'basicInfo')}
              disabled={phoneVerified}
              required
              error={!!errors.basicInfo.phone}
              helperText={errors.basicInfo.phone}
              prefix={<MdPhone color={DE_BLUE} />}
              topMargin={!compact}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={fieldCardSx}>
            <CustomInput
              label="Pincode"
              name="pincode"
              value={formData?.basicInfo?.pincode}
              onChange={(e) => onChange(e, 'basicInfo')}
              error={!!errors.basicInfo.pincode}
              helperText={errors.basicInfo.pincode}
              prefix={<MdLocationPin color={DE_BLUE} />}
              topMargin={!compact}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={fieldCardSx}>
            <CustomInput
              label="Business Address"
              name="companyAddress"
              value={formData?.basicInfo?.companyAddress}
              onChange={(e) => onChange(e, 'basicInfo')}
              required
              multiline
              minRows={compact ? 1 : 2}
              error={!!errors.basicInfo.companyAddress}
              helperText={errors.basicInfo.companyAddress}
              prefix={<MdLocationPin color={DE_BLUE} />}
              topMargin={!compact}
            />
          </Box>
        </Grid>
      </Grid>

      {loadingPincode && (
        <Chip
          label="Validating pincode..."
          sx={{
            width: 'fit-content',
            backgroundColor: alpha(DE_BLUE, 0.08),
            color: DE_BLUE,
            fontWeight: 700,
          }}
        />
      )}

      {location?.city && (
        <Box
          sx={{
            p: compact ? 1 : 1.5,
            borderRadius: 2,
            backgroundColor: alpha(BRAND_ORANGE, 0.12),
            border: `1px solid ${alpha(BRAND_ORANGE, 0.24)}`,
          }}
        >
          <Typography variant="body2" sx={{ color: '#2F8E77', fontWeight: 700 }}>
            Detected location: {location.city}, {location.state}
          </Typography>
        </Box>
      )}
    </Stack>
  )
}
