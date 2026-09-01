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
        width: compact ? { xs: 102, sm: 118 } : { xs: 142, sm: 168 },
        height: compact ? { xs: 54, sm: 62 } : 'auto',
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
