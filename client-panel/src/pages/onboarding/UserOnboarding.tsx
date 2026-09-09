import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FiShield } from 'react-icons/fi'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import StepOneForm from '../../components/onboarding/StepOneForm'
import StepThree from '../../components/onboarding/StepThree'
import StepTwoForm from '../../components/onboarding/StepTwoForm'
import SwitchAccountButton from '../../components/onboarding/SwitchAccountButton'
import CustomIconLoadingButton from '../../components/UI/button/CustomLoadingButton'
import FullScreenLoader from '../../components/UI/loader/FullScreenLoader'
import { useAuth } from '../../context/auth/AuthContext'
import { useCompleteUserOnboarding } from '../../hooks/useCompleteUserOnboarding'
import { clearOnboardingPrefill, getOnboardingPrefill } from '../../utils/onboardingPrefill'
import type { UserInfoData } from '../../types/user.types'
import { emptyErrors, hasValidationErrors, validateOnboardingFields } from '../../utils/functions'
import { brand, brandGradients } from '../../theme/brand'
import { initialFormData } from '../../utils/utility'
import { isOnboardingComplete } from '../../utils/authRedirect'
import { toast } from '../../components/UI/Toast'

const DE_BLUE = brand.ink
const DE_AMBER = brand.accent
const BACKEND_ONBOARDING_STEPS = [1, 2, 3] as const
const UI_STEPS = [
  { key: 1, label: 'Account' },
  { key: 2, label: 'Shipping' },
] as const
type BackendOnboardingStep = (typeof BACKEND_ONBOARDING_STEPS)[number]
type UiOnboardingStep = (typeof UI_STEPS)[number]['key']

export type FormErrors = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof UserInfoData]: any
}

type UserContactFallback = {
  phone?: string
}

const findFirstError = (errors: FormErrors): { field: string; message: string } | null => {
  for (const sectionValue of Object.values(errors)) {
    if (typeof sectionValue === 'string' && sectionValue) {
      return { field: '', message: sectionValue }
    }

    if (sectionValue && typeof sectionValue === 'object') {
      for (const [field, message] of Object.entries(sectionValue as Record<string, unknown>)) {
        if (typeof message === 'string' && message.trim()) {
          return { field, message }
        }
      }
    }
  }

  return null
}

export default function UserOnboarding() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { user: userData, loading: fetchingUserData } = useAuth()
  const { mutateAsync: completeOnboarding, isPending } = useCompleteUserOnboarding()

  const [formData, setFormData] = useState<UserInfoData>({ ...initialFormData })
  const [formErrors, setFormErrors] = useState<FormErrors>(
    JSON.parse(JSON.stringify(emptyErrors)) as FormErrors,
  )
  const [activeStep, setActiveStep] = useState<UiOnboardingStep>(1)

  useEffect(() => {
    if (!userData) return

    if (isOnboardingComplete(userData)) {
      navigate('/dashboard')
    }
  }, [userData, navigate])

  useEffect(() => {
    if (!userData || !Object.keys(userData).length) return

    const prefill = getOnboardingPrefill()

    setFormData({
      basicInfo: {
        firstName:
          userData?.companyInfo?.contactPerson?.split(' ')?.[0] ||
          prefill?.firstName ||
          '',
        lastName:
          userData?.companyInfo?.contactPerson?.split(' ')?.slice(1).join(' ') ||
          prefill?.lastName ||
          '',
        email: userData?.companyInfo?.contactEmail || userData?.email || prefill?.email || '',
        phone:
          userData?.companyInfo?.contactNumber ||
          (userData as typeof userData & UserContactFallback)?.phone ||
          prefill?.phone ||
          '',
        companyName: userData?.companyInfo?.businessName ?? '',
        pincode: userData?.companyInfo?.pincode ?? '',
        state: userData?.companyInfo?.state ?? '',
        city: userData?.companyInfo?.city ?? '',
        companyAddress: userData?.companyInfo?.companyAddress ?? '',
        personalWebsite: userData?.companyInfo?.website ?? '',
      },
      businessLegal: {
        brandName: userData?.companyInfo?.brandName ?? '',
        businessCategory: userData?.businessType ?? [],
        monthlyShipments: userData?.monthlyOrderCount ?? '0-100',
      },
      platformIntegration: { ...(userData?.salesChannels ?? {}) },
    })
    clearOnboardingPrefill()
  }, [userData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    subKey?: keyof UserInfoData,
  ) => {
    const { name, value } = e.target

    const updatedForm = subKey
      ? {
          ...formData,
          [subKey]: {
            ...formData[subKey],
            [name]: value,
          },
        }
      : {
          ...formData,
          [name]: value,
        }

    setFormData(updatedForm)

    const validationStep =
      subKey === 'businessLegal' ? 2 : subKey === 'platformIntegration' ? 3 : 1
    const newErrors = validateOnboardingFields(updatedForm, validationStep)
    setFormErrors((prev) => {
      if (subKey) {
        return {
          ...prev,
          [subKey]: {
            ...prev[subKey],
            [name]: newErrors[subKey]?.[name] || '',
          },
        }
      }
      return {
        ...prev,
        [name]: newErrors[name] || '',
      }
    })
  }

  const getCombinedErrors = (steps: readonly BackendOnboardingStep[] = BACKEND_ONBOARDING_STEPS) => {
    const combinedErrors = steps.reduce((acc, currentStep) => {
      const stepErrors = validateOnboardingFields(formData, currentStep)

      return {
        ...acc,
        basicInfo: {
          ...acc.basicInfo,
          ...stepErrors.basicInfo,
        },
        businessLegal: {
          ...acc.businessLegal,
          ...stepErrors.businessLegal,
        },
        platformIntegration: {
          ...acc.platformIntegration,
          ...stepErrors.platformIntegration,
        },
      }
    }, JSON.parse(JSON.stringify(emptyErrors)) as FormErrors)

    return combinedErrors
  }

  const focusFirstError = (errors: FormErrors) => {
    const firstError = findFirstError(errors)
    toast.open({
      message: firstError?.message || 'Please complete the highlighted fields before continuing.',
      severity: 'error',
      position: { vertical: 'top', horizontal: 'center' },
    })

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        const target = firstError?.field
          ? document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
              `[name="${firstError.field}"]`,
            )
          : document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
              '[aria-invalid="true"]',
            )

        target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        target?.focus({ preventScroll: true })
      })
    }, 80)
  }

  const handleContinue = () => {
    const errors = getCombinedErrors([1])
    setFormErrors(errors)

    if (hasValidationErrors(errors)) {
      focusFirstError(errors)
      return
    }

    setActiveStep(2)
    window.requestAnimationFrame(() => {
      document.getElementById('onboarding-panel')?.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const handleCompleteSetup = async () => {
    const errors = getCombinedErrors()
    setFormErrors(errors)

    if (hasValidationErrors(errors)) {
      const basicInfoHasErrors = Object.values(errors.basicInfo || {}).some(Boolean)
      if (basicInfoHasErrors) setActiveStep(1)
      focusFirstError(errors)
      return
    }

    for (const currentStep of BACKEND_ONBOARDING_STEPS) {
      await completeOnboarding({ step: currentStep, data: formData })
    }

    toast.open({
      message: 'Business details saved. Opening your dashboard.',
      severity: 'success',
      position: { vertical: 'top', horizontal: 'center' },
    })
    queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    navigate('/dashboard')
  }

  if (fetchingUserData) return <FullScreenLoader />

  return (
    <Box
      sx={{
        height: '100dvh',
        background: brandGradients.page,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        p: { xs: 1.25, md: 2 },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%', maxWidth: 1020, mb: { xs: 1.25, md: 1.5 } }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: DE_BLUE, fontSize: { xs: '1rem', md: '1.25rem' } }}
        >
          TrueTransit Seller Panel
        </Typography>
        <SwitchAccountButton />
      </Stack>

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 1100,
          maxHeight: { xs: 'calc(100dvh - 78px)', md: 'calc(100dvh - 82px)' },
          borderRadius: { xs: '22px', md: '26px' },
          border: `1px solid ${alpha('#FFFFFF', 0.72)}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 54px rgba(15, 44, 67, 0.1)',
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, md: 2.25 },
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(248,251,255,0.98) 100%)',
            display: 'flex',
            minHeight: 0,
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Box sx={{ mb: { xs: 1.4, md: 1.7 }, flexShrink: 0 }}>
            <Chip
              icon={<FiShield size={15} />}
              label="Secure merchant setup"
              size="small"
              sx={{
                mb: 0.8,
                bgcolor: alpha(DE_AMBER, 0.14),
                color: DE_BLUE,
                fontWeight: 800,
                border: `1px solid ${alpha(DE_AMBER, 0.24)}`,
              }}
            />
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: alpha(DE_BLUE, 0.6),
                mb: 0.45,
              }}
            >
              TrueTransit onboarding
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.3rem', md: '1.75rem' },
                fontWeight: 900,
                color: DE_BLUE,
              }}
            >
              Fill your business details
            </Typography>
            <Typography
              sx={{ mt: 0.45, color: alpha(DE_BLUE, 0.72), fontSize: '0.9rem', lineHeight: 1.45 }}
            >
              Add your business profile once. Existing completed accounts go straight to the dashboard.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mb: { xs: 1.25, md: 1.5 }, flexShrink: 0 }}>
            {UI_STEPS.map((step) => {
              const isActive = activeStep === step.key
              const isDone = activeStep > step.key

              return (
                <Box
                  key={step.key}
                  sx={{
                    flex: 1,
                    borderRadius: 999,
                    px: 1.4,
                    py: 0.75,
                    border: `1px solid ${alpha(DE_BLUE, isActive || isDone ? 0.28 : 0.1)}`,
                    bgcolor: isActive ? alpha(DE_AMBER, 0.12) : alpha(DE_BLUE, 0.035),
                    color: isActive || isDone ? DE_BLUE : alpha(DE_BLUE, 0.6),
                    fontSize: '0.82rem',
                    fontWeight: 900,
                    textAlign: 'center',
                  }}
                >
                  {step.key}. {step.label}
                </Box>
              )
            })}
          </Stack>

          <Box
            id="onboarding-panel"
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              pr: { md: 0.5 },
              scrollbarWidth: 'thin',
            }}
          >
            {activeStep === 1 ? (
              <StepOneForm
                formData={formData}
                errors={formErrors}
                onChange={handleChange}
                setFormData={setFormData}
                setErrors={setFormErrors}
                onNext={() => undefined}
                compact
              />
            ) : (
              <Stack spacing={{ xs: 1.5, md: 1.75 }}>
                <StepTwoForm formData={formData} errors={formErrors} onChange={handleChange} compact />
                <StepThree
                  formData={formData}
                  errors={formErrors}
                  onChange={handleChange}
                  setErrors={setFormErrors}
                  compact
                />
              </Stack>
            )}
          </Box>

          <Stack
            direction="row"
            spacing={1.25}
            alignItems="stretch"
            sx={{ mt: 1.6, pt: 1.5, borderTop: `1px solid ${alpha(DE_BLUE, 0.06)}`, flexShrink: 0 }}
          >
            {activeStep === 2 && (
              <Button
                variant="outlined"
                startIcon={<MdArrowBack />}
                onClick={() => setActiveStep(1)}
                disabled={isPending}
                sx={{
                  minWidth: { xs: 96, md: 132 },
                  borderRadius: 999,
                  borderColor: alpha(DE_BLUE, 0.2),
                  color: DE_BLUE,
                  fontWeight: 800,
                  textTransform: 'none',
                }}
              >
                Back
              </Button>
            )}
            <CustomIconLoadingButton
              variant="solid"
              fullWidth
              loading={isPending}
              onClick={activeStep === 1 ? handleContinue : handleCompleteSetup}
              endIconNode={<MdArrowForward />}
              text={activeStep === 1 ? 'Continue' : 'Save & Open Dashboard'}
              styles={{
                flex: 1,
                background: brandGradients.button,
                color: brand.ink,
                borderRadius: 999,
                fontWeight: 800,
                fontSize: '0.96rem',
                py: 1,
                boxShadow: '0 16px 32px rgba(130,194,255,0.24)',
              }}
            />
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}
