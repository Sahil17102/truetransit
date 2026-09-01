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
        width: compact ? { xs: 126, sm: 144 } : { xs: 160, sm: 188 },
        height: compact ? { xs: 100, sm: 114 } : 'auto',
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
