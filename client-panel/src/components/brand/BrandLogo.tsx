import { Box, type BoxProps } from '@mui/material'
import { brandIdentity } from '../../theme/brand'

interface BrandLogoProps extends Omit<BoxProps, 'component'> {
  compact?: boolean
}

export default function BrandLogo({ compact = false, sx, ...rest }: BrandLogoProps) {
  return (
    <Box
      component="img"
      src={compact ? brandIdentity.markSrc : brandIdentity.logoSrc}
      alt={brandIdentity.name}
      sx={{
        width: compact ? { xs: 176, sm: 204 } : { xs: 176, sm: 216 },
        height: compact ? { xs: 51, sm: 59 } : 'auto',
        flexShrink: 0,
        display: 'block',
        objectFit: 'contain',
        objectPosition: 'center',
        ...sx,
      }}
      {...rest}
    />
  )
}
