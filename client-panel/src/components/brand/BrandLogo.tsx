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
        width: compact ? 42 : { xs: 142, sm: 168 },
        height: compact ? 42 : 'auto',
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
