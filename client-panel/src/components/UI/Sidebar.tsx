import {
  alpha,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
  TbAlertTriangle,
  TbApps,
  TbArrowBackUp,
  TbBuildingWarehouse,
  TbCalculator,
  TbChevronDown,
  TbCurrencyRupee,
  TbFileAnalytics,
  TbHeadset,
  TbHome,
  TbLayoutDashboard,
  TbListDetails,
  TbPackage,
  TbPackageExport,
  TbPlugConnected,
  TbReceipt,
  TbRoute,
  TbScale,
  TbSettings,
  TbShoppingCart,
  TbTool,
  TbTruckDelivery,
  TbWallet,
} from 'react-icons/tb'
import { NavLink, useLocation } from 'react-router-dom'

import type { JSX } from '@emotion/react/jsx-runtime'
import BrandLogo from '../brand/BrandLogo'
import { brand } from '../../theme/brand'
import { isActive } from '../../utils/functions'
import { useAuth } from '../../context/auth/AuthContext'

export type Role = 'customer' | 'admin'

export interface SubItem {
  text: string
  path: string
  icon?: JSX.Element
}

export interface NavItem {
  text: string
  icon: JSX.Element
  path: string
  roles: Role[]
  children?: SubItem[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface SidebarProps {
  role?: Role
  pinned: boolean
  handleDrawerToggle: () => void
  temporary?: boolean
  onNavigate?: () => void
}

export const COLLAPSED_WIDTH = 88
export const DESKTOP_SIDEBAR_WIDTH = 284

const STANDARD_ICON_SIZE = 21
const ACTIVE = brand.navy
const ACCENT = brand.accent

const navSections: NavSection[] = [
  {
    title: 'Main',
    items: [
      {
        text: 'Home',
        icon: <TbHome size={STANDARD_ICON_SIZE} />,
        path: '/home',
        roles: ['customer', 'admin'],
      },
      {
        text: 'Dashboard',
        icon: <TbLayoutDashboard size={STANDARD_ICON_SIZE} />,
        path: '/dashboard',
        roles: ['customer', 'admin'],
      },
      {
        text: 'Orders',
        icon: <TbShoppingCart size={STANDARD_ICON_SIZE} />,
        path: '/orders',
        roles: ['customer', 'admin'],
        children: [
          { text: 'All Orders', path: '/orders/list', icon: <TbListDetails size={STANDARD_ICON_SIZE} /> },
          { text: 'Create Order', path: '/orders/create', icon: <TbPackageExport size={STANDARD_ICON_SIZE} /> },
          { text: 'B2C Orders', path: '/orders/b2c/list', icon: <TbPackage size={STANDARD_ICON_SIZE} /> },
          { text: 'B2B Orders', path: '/orders/b2b/list', icon: <TbBuildingWarehouse size={STANDARD_ICON_SIZE} /> },
        ],
      },
    ],
  },
  {
    title: 'Analytics',
    items: [
      {
        text: 'Reports',
        icon: <TbFileAnalytics size={STANDARD_ICON_SIZE} />,
        path: '/reports',
        roles: ['customer', 'admin'],
      },
    ],
  },
  {
    title: 'Finance',
    items: [
      {
        text: 'Billing',
        icon: <TbReceipt size={STANDARD_ICON_SIZE} />,
        path: '/billing',
        roles: ['customer', 'admin'],
        children: [
          { text: 'Passbook', path: '/billing/passbook', icon: <TbWallet size={STANDARD_ICON_SIZE} /> },
          { text: 'COD Remittance', path: '/billing/cod-remittance', icon: <TbCurrencyRupee size={STANDARD_ICON_SIZE} /> },
          { text: 'Shipping Charges', path: '/billing/shipping-charges', icon: <TbTruckDelivery size={STANDARD_ICON_SIZE} /> },
          { text: 'All Recharges', path: '/billing/all-recharges', icon: <TbWallet size={STANDARD_ICON_SIZE} /> },
          { text: 'Invoices', path: '/billing/invoices', icon: <TbReceipt size={STANDARD_ICON_SIZE} /> },
          { text: 'Credit Notes', path: '/billing/credit-notes', icon: <TbCurrencyRupee size={STANDARD_ICON_SIZE} /> },
          { text: 'Debit Notes', path: '/billing/debit-notes', icon: <TbReceipt size={STANDARD_ICON_SIZE} /> },
          { text: 'Ledgers', path: '/billing/ledgers', icon: <TbListDetails size={STANDARD_ICON_SIZE} /> },
        ],
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        text: 'Operations',
        icon: <TbAlertTriangle size={STANDARD_ICON_SIZE} />,
        path: '/ops',
        roles: ['customer', 'admin'],
        children: [
          { text: 'NDR', path: '/ops/ndr', icon: <TbAlertTriangle size={STANDARD_ICON_SIZE} /> },
          { text: 'RTO', path: '/ops/rto', icon: <TbArrowBackUp size={STANDARD_ICON_SIZE} /> },
        ],
      },
      {
        text: 'Warehouse',
        icon: <TbBuildingWarehouse size={STANDARD_ICON_SIZE} />,
        path: '/settings/manage_pickups',
        roles: ['customer', 'admin'],
      },
      {
        text: 'Reconciliation',
        icon: <TbScale size={STANDARD_ICON_SIZE} />,
        path: '/reconciliation/weight',
        roles: ['customer', 'admin'],
      },
    ],
  },
  {
    title: 'Integrations',
    items: [
      {
        text: 'Integrations',
        icon: <TbPlugConnected size={STANDARD_ICON_SIZE} />,
        path: '/channels',
        roles: ['customer', 'admin'],
        children: [
          { text: 'Couriers', path: '/couriers/partners', icon: <TbTruckDelivery size={STANDARD_ICON_SIZE} /> },
          { text: 'Channels', path: '/channels/connected', icon: <TbApps size={STANDARD_ICON_SIZE} /> },
        ],
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        text: 'Tools',
        icon: <TbTool size={STANDARD_ICON_SIZE} />,
        path: '/tools',
        roles: ['customer', 'admin'],
        children: [
          { text: 'Rate Calculator', path: '/tools/rate_calculator', icon: <TbCalculator size={STANDARD_ICON_SIZE} /> },
          { text: 'Order Tracking', path: '/tools/order_tracking', icon: <TbRoute size={STANDARD_ICON_SIZE} /> },
        ],
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        text: 'Support',
        icon: <TbHeadset size={STANDARD_ICON_SIZE} />,
        path: '/support/tickets',
        roles: ['customer', 'admin'],
      },
    ],
  },
]

const settingsItem: NavItem = {
  text: 'Settings',
  icon: <TbSettings size={STANDARD_ICON_SIZE} />,
  path: '/settings',
  roles: ['customer', 'admin'],
}

const getNavigationMatchPath = (path: string) => path.split(/[?#]/)[0] || path

const itemHasActiveChild = (pathname: string, item: NavItem) =>
  Boolean(item.children?.some((sub) => isActive(pathname, getNavigationMatchPath(sub.path))))

export default function Sidebar({
  role = 'customer',
  pinned,
  temporary = false,
  onNavigate,
}: SidebarProps) {
  const location = useLocation()
  const theme = useTheme()
  const { user } = useAuth()
  const isSidebarExpanded = temporary || pinned
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const isDark = theme.palette.mode === 'dark'
  const SIDEBAR_BG = isDark
    ? 'linear-gradient(180deg, #111827 0%, #151b23 48%, #101722 100%)'
    : 'linear-gradient(180deg, #f8fbff 0%, #ffffff 44%, #f4f8fb 100%)'
  const SURFACE = isDark ? alpha('#ffffff', 0.035) : '#ffffff'
  const BORDER = isDark ? alpha('#ffffff', 0.1) : alpha(brand.ink, 0.1)
  const SOFT_BORDER = isDark ? alpha('#ffffff', 0.08) : alpha(brand.ink, 0.075)
  const TEXT = isDark ? '#b6c3d6' : '#4f6381'
  const MUTED = isDark ? '#7f8fa5' : '#7b8ba5'
  const WHITE = isDark ? '#f8fafc' : '#11182d'
  const itemHoverBg = isDark ? alpha('#ffffff', 0.065) : alpha(brand.aqua, 0.42)
  const childHoverBg = isDark ? alpha('#ffffff', 0.055) : alpha(ACTIVE, 0.06)
  const activeBg = isDark
    ? `linear-gradient(135deg, ${alpha(ACCENT, 0.24)} 0%, ${alpha(ACTIVE, 0.28)} 100%)`
    : `linear-gradient(135deg, ${alpha(ACCENT, 0.17)} 0%, ${alpha('#ffffff', 0.95)} 100%)`
  const childActiveBg = isDark ? alpha(ACCENT, 0.18) : alpha(ACCENT, 0.11)
  const iconMuted = isDark ? '#91a7c3' : alpha(ACTIVE, 0.58)
  const activeText = isDark ? '#d9e7fa' : ACTIVE
  const initialsBg = isDark ? alpha(ACTIVE, 0.34) : alpha(ACTIVE, 0.09)
  const initialsBorder = isDark ? alpha('#ffffff', 0.1) : alpha(ACCENT, 0.34)
  const initialsColor = isDark ? '#f8fafc' : ACTIVE

  useEffect(() => {
    if (!isSidebarExpanded) setExpandedItems({})
  }, [isSidebarExpanded])

  useEffect(() => {
    const activeParent = [...navSections.flatMap((section) => section.items), settingsItem].find((item) =>
      item.children?.some((sub) => isActive(location.pathname, getNavigationMatchPath(sub.path))),
    )
    setExpandedItems(activeParent ? { [activeParent.text]: true } : {})
  }, [location.pathname])

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => (prev[key] ? {} : { [key]: true }))
  }

  const handleRouteNavigate = () => {
    onNavigate?.()
  }

  const navItemSx = {
    minHeight: isSidebarExpanded
      ? temporary
        ? 'clamp(42px, 5.5vh, 48px)'
        : 'clamp(38px, 4.8vh, 44px)'
      : 46,
    borderRadius: 2,
    px: isSidebarExpanded ? (temporary ? 2.4 : 1.7) : 0,
    py: 0,
    mx: isSidebarExpanded ? 1.35 : 1.15,
    my: 0.25,
    color: TEXT,
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid transparent`,
    transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
    '&:hover': {
      bgcolor: itemHoverBg,
      borderColor: SOFT_BORDER,
      color: WHITE,
      boxShadow: isDark ? 'none' : `0 10px 24px ${alpha(brand.ink, 0.06)}`,
      '& .MuiListItemIcon-root': {
        color: ACTIVE,
        bgcolor: isDark ? alpha(ACCENT, 0.14) : alpha(ACCENT, 0.12),
      },
    },
    '@media (max-height: 760px)': {
      '& .MuiListItemIcon-root svg': { width: 19, height: 19 },
    },
  }

  const activeItemSx = {
    background: activeBg,
    color: activeText,
    borderColor: isDark ? alpha(ACCENT, 0.22) : alpha(ACCENT, 0.3),
    boxShadow: isDark ? 'none' : `0 12px 28px ${alpha(brand.ink, 0.075)}`,
    '& .MuiListItemIcon-root': {
      color: ACCENT,
      bgcolor: isDark ? alpha(ACCENT, 0.18) : alpha('#ffffff', 0.92),
      boxShadow: isDark ? 'none' : `inset 0 0 0 1px ${alpha(ACCENT, 0.18)}`,
    },
    '& .MuiListItemText-primary': { fontWeight: 600 },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 7,
      top: 10,
      bottom: 10,
      width: 4,
      borderRadius: 999,
      bgcolor: ACCENT,
      '@media (max-height: 760px)': {
        top: 7,
        bottom: 7,
      },
    },
  }

  const renderItem = (item: NavItem) => {
    const itemMatchPath = getNavigationMatchPath(item.path)
    const isSettingsRoot = item.text === settingsItem.text
    const isSelected = isSettingsRoot ? location.pathname === itemMatchPath : isActive(location.pathname, itemMatchPath)
    const hasChildren = Boolean(item.children?.length)
    const childSelected = itemHasActiveChild(location.pathname, item)
    const isExpanded = expandedItems[item.text]
    const showExpanded = isSidebarExpanded && isExpanded
    const active = (isSelected && !hasChildren) || childSelected

    const listItem = (
      <ListItemButton
        component={hasChildren ? 'div' : NavLink}
        to={hasChildren ? undefined : item.path}
        onClick={hasChildren ? () => toggleExpand(item.text) : handleRouteNavigate}
        sx={{
          ...navItemSx,
          justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
          ...(active ? activeItemSx : {}),
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: isSidebarExpanded ? 42 : 40,
            width: isSidebarExpanded ? 34 : 40,
            height: isSidebarExpanded ? 34 : 40,
            flexShrink: 0,
            borderRadius: 1.6,
            bgcolor: isDark ? alpha('#ffffff', 0.04) : alpha(ACTIVE, 0.055),
            alignItems: 'center',
            justifyContent: 'center',
            color: active ? ACCENT : iconMuted,
            transition: 'background-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
            '& svg': {
              strokeWidth: 2.4,
            },
          }}
        >
          {item.icon}
        </ListItemIcon>
        {isSidebarExpanded ? (
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontSize: temporary
                ? 'clamp(0.86rem, 2vh, 1rem)'
                : 'clamp(0.82rem, 1.9vh, 0.93rem)',
              fontWeight: active ? 650 : 500,
              letterSpacing: '-0.01em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          />
        ) : null}
        {hasChildren && isSidebarExpanded ? (
          <TbChevronDown
            size={20}
            style={{
              transform: showExpanded ? 'rotate(180deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s',
              color: active ? activeText : iconMuted,
              strokeWidth: 2.4,
            }}
          />
        ) : null}
      </ListItemButton>
    )

    return (
      <Box key={item.text}>
        {isSidebarExpanded ? (
          listItem
        ) : (
          <Tooltip title={item.text} placement="right">
            <Box>{listItem}</Box>
          </Tooltip>
        )}

        {hasChildren && isSidebarExpanded && (
          <Collapse in={showExpanded} timeout="auto" unmountOnExit>
            <List
              disablePadding
              sx={{
                ml: temporary ? 4.8 : 4.3,
                mr: 1.4,
                pl: 1.2,
                py: 0.45,
                borderLeft: `1px solid ${SOFT_BORDER}`,
              }}
            >
              {item.children?.map((sub) => {
                const subActive = isActive(location.pathname, sub.path)
                return (
                  <ListItemButton
                    key={sub.text}
                    component={NavLink}
                    to={sub.path}
                    onClick={handleRouteNavigate}
                    sx={{
                      minHeight: 'clamp(31px, 3.9vh, 36px)',
                      px: 1.15,
                      py: 0.45,
                      borderRadius: 1.5,
                      color: subActive ? activeText : TEXT,
                      bgcolor: subActive ? childActiveBg : 'transparent',
                      border: `1px solid ${subActive ? alpha(ACCENT, 0.2) : 'transparent'}`,
                      '&:hover': {
                        bgcolor: childHoverBg,
                        color: WHITE,
                        '& .MuiListItemIcon-root': { color: ACCENT },
                      },
                      mb: 0.25,
                    }}
                  >
                    {sub.icon ? (
                      <ListItemIcon
                        sx={{
                          minWidth: 28,
                          color: subActive ? ACCENT : iconMuted,
                          '& svg': { width: 17, height: 17, strokeWidth: 2.35 },
                        }}
                      >
                        {sub.icon}
                      </ListItemIcon>
                    ) : null}
                    <ListItemText
                      primary={sub.text}
                      primaryTypographyProps={{
                        fontSize: 'clamp(0.76rem, 1.8vh, 0.86rem)',
                        fontWeight: subActive ? 650 : 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          </Collapse>
        )}
      </Box>
    )
  }

  const visibleSections = navSections.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(role || 'customer')),
  }))

  const displayName = user?.companyInfo?.contactPerson || user?.name || 'Sahil Mittal'
  const displayEmail = user?.companyInfo?.contactEmail || user?.email || 'sahilmittal1920@gmail...'
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Box
      sx={{
        width: temporary ? '100%' : isSidebarExpanded ? DESKTOP_SIDEBAR_WIDTH : COLLAPSED_WIDTH,
        height: temporary ? '100%' : '100dvh',
        maxHeight: temporary ? '100%' : '100dvh',
        background: SIDEBAR_BG,
        borderRight: `1px solid ${BORDER}`,
        transition: 'width 220ms ease',
        display: 'flex',
        flexDirection: 'column',
        zIndex: theme.zIndex.drawer,
        position: temporary ? 'relative' : 'fixed',
        left: temporary ? 'auto' : 0,
        top: temporary ? 'auto' : 0,
        overflow: 'hidden',
        boxShadow: isDark ? 'none' : `18px 0 38px ${alpha(brand.ink, 0.045)}`,
        contain: 'layout paint style',
        willChange: temporary ? 'auto' : 'width',
      }}
    >
      <Box
        sx={{
          height: temporary ? 'clamp(68px, 8.4vh, 82px)' : 'clamp(66px, 7.6vh, 76px)',
          px: isSidebarExpanded ? (temporary ? 2.4 : 2.1) : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
          flexShrink: 0,
          borderBottom: `1px solid ${BORDER}`,
          background: isDark ? alpha('#ffffff', 0.018) : alpha('#ffffff', 0.6),
        }}
      >
        <BrandLogo
          compact={!isSidebarExpanded}
          sx={{
            width: isSidebarExpanded
              ? temporary
                ? 'clamp(174px, 22vh, 198px)'
                : 'clamp(166px, 20vh, 188px)'
              : 56,
            height: isSidebarExpanded
              ? temporary
                ? 'clamp(46px, 6.2vh, 54px)'
                : 'clamp(44px, 5.9vh, 52px)'
              : 32,
            flexShrink: 0,
          }}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          scrollbarGutter: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(ACTIVE, isDark ? 0.55 : 0.35)} transparent`,
          msOverflowStyle: 'auto',
          WebkitOverflowScrolling: 'touch',
          py: temporary ? 'clamp(6px, 1.4vh, 12px)' : 'clamp(4px, 1vh, 8px)',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 999,
            backgroundColor: alpha(ACTIVE, isDark ? 0.48 : 0.26),
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: alpha(ACTIVE, isDark ? 0.62 : 0.38),
          },
        }}
      >
        {visibleSections.map((section) =>
          section.items.length ? (
            <Box
              key={section.title}
              sx={{
                mb: temporary
                  ? 'clamp(6px, 1.8vh, 18px)'
                  : isSidebarExpanded
                    ? 'clamp(3px, 1.1vh, 12px)'
                    : 0.5,
              }}
            >
              {isSidebarExpanded ? (
                <Typography
                  sx={{
                    px: temporary ? 3.6 : 2.75,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: temporary
                      ? 'clamp(2px, 0.7vh, 6px)'
                      : 'clamp(1px, 0.45vh, 4px)',
                    color: MUTED,
                    fontSize: temporary
                      ? 'clamp(0.7rem, 1.7vh, 0.82rem)'
                      : 'clamp(0.6rem, 1.5vh, 0.72rem)',
                    lineHeight: 1.15,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0,
                    '&::after': {
                      content: '""',
                      height: 1,
                      flex: 1,
                      bgcolor: SOFT_BORDER,
                    },
                  }}
                >
                  {section.title}
                </Typography>
              ) : null}
              <List
                disablePadding
                sx={isSidebarExpanded ? undefined : { display: 'grid', gap: 0.5 }}
              >
                {section.items.map(renderItem)}
              </List>
            </Box>
          ) : null,
        )}
      </Box>

      <Box sx={{ flexShrink: 0, borderTop: `1px solid ${BORDER}`, background: isDark ? alpha('#ffffff', 0.018) : alpha('#ffffff', 0.72) }}>
        {renderItem(settingsItem)}
        {isSidebarExpanded ? (
          <Box
            sx={{
              mx: 1.35,
              mb: 1.35,
              px: temporary ? 2.2 : 1.6,
              py: temporary
                ? 'clamp(8px, 1.8vh, 15px)'
                : 'clamp(8px, 1.35vh, 12px)',
              border: `1px solid ${SOFT_BORDER}`,
              borderRadius: 2,
              background: SURFACE,
              display: 'flex',
              alignItems: 'center',
              gap: 1.35,
              boxShadow: isDark ? 'none' : `0 10px 26px ${alpha(brand.ink, 0.045)}`,
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: initialsColor,
                bgcolor: initialsBg,
                border: `1px solid ${initialsBorder}`,
                fontSize: '0.9rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials}
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{ color: WHITE, fontWeight: 600, fontSize: temporary ? '0.98rem' : '0.88rem' }}
                noWrap
              >
                {displayName}
              </Typography>
              <Typography
                sx={{ color: TEXT, fontWeight: 600, fontSize: temporary ? '0.85rem' : '0.76rem' }}
                noWrap
              >
                {displayEmail}
              </Typography>
            </Box>
            <TbChevronDown size={19} color={TEXT} />
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}
