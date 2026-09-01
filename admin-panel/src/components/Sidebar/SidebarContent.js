import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IconArrowBackUp,
  IconBook,
  IconCalculator,
  IconChartBar,
  IconClipboardList,
  IconCoinRupee,
  IconDashboard,
  IconDatabase,
  IconFileInvoice,
  IconHelpCircle,
  IconHistory,
  IconKey,
  IconPackage,
  IconPackageExport,
  IconReceipt,
  IconReportAnalytics,
  IconScale,
  IconSettings,
  IconSpeakerphone,
  IconStar,
  IconTruck,
  IconUserCircle,
  IconUserCog,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { brand, brandIdentity } from "theme/brand";

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: IconDashboard,
  },
  {
    label: "Order Management",
    icon: IconPackageExport,
    children: [
      { label: "Orders", path: "/admin/orders", icon: IconPackage },
      {
        label: "Failed Deliveries (NDR)",
        path: "/admin/ops/ndr",
        icon: IconHelpCircle,
      },
      { label: "Returns (RTO)", path: "/admin/ops/rto", icon: IconArrowBackUp },
      {
        label: "Order Tracking",
        path: "/admin/order-tracking",
        icon: IconTruck,
      },
    ],
  },
  {
    label: "Sellers",
    icon: IconUsers,
    children: [
      { label: "Sellers", path: "/admin/users-management", icon: IconUsers },
      { label: "Plans", path: "/admin/plans", icon: IconStar },
      { label: "Team Members", path: "/admin/team-members", icon: IconUserCog },
    ],
  },
  {
    label: "Support",
    icon: IconHelpCircle,
    path: "/admin/support",
  },
  {
    label: "Billing",
    icon: IconWallet,
    children: [
      {
        label: "Passbook",
        path: "/admin/passbook",
        icon: IconBook,
      },
      {
        label: "COD Remittance",
        path: "/admin/cod-remittance",
        icon: IconWallet,
      },
      {
        label: "Shipping Charges",
        path: "/admin/shipping-charges",
        icon: IconTruck,
      },
      {
        label: "All Recharges",
        path: "/admin/all-recharges",
        icon: IconCoinRupee,
      },
      {
        label: "Invoices",
        path: "/admin/billing-invoices",
        icon: IconFileInvoice,
      },
      {
        label: "Credit Notes",
        path: "/admin/credit-notes",
        icon: IconReceipt,
      },
      {
        label: "Debit Notes",
        path: "/admin/debit-notes",
        icon: IconClipboardList,
      },
      {
        label: "Ledgers",
        path: "/admin/ledgers",
        icon: IconDatabase,
      },
      {
        label: "Billing Preferences",
        path: "/admin/billing-preferences",
        icon: IconSettings,
      },
      { label: "Wallet Management", path: "/admin/wallet", icon: IconReceipt },
    ],
  },
  {
    label: "Insights",
    icon: IconChartBar,
    children: [
      { label: "Reports", path: "/admin/reports", icon: IconReportAnalytics },
      { label: "Activity Log", path: "/admin/activity-log", icon: IconHistory },
    ],
  },
  {
    label: "Reconciliation",
    icon: IconScale,
    children: [
      {
        label: "Weight Discrepancies",
        path: "/admin/weight-reconciliation",
        icon: IconScale,
      },
      {
        label: "Dispute Management",
        path: "/admin/dispute-management",
        icon: IconClipboardList,
      },
    ],
  },
  {
    label: "Tools",
    icon: IconCalculator,
    children: [
      {
        label: "Rate Calculator",
        path: "/admin/rate-calculator",
        icon: IconCalculator,
      },
      {
        label: "Order Tracking",
        path: "/admin/order-tracking",
        icon: IconTruck,
      },
      {
        label: "API Integration",
        path: "/admin/api-integration",
        icon: IconKey,
      },
    ],
  },
  {
    label: "Configuration",
    icon: IconSettings,
    children: [
      { label: "Couriers", path: "/admin/couriers" },
      {
        label: "Courier Credentials",
        path: "/admin/courier-credentials",
        icon: IconKey,
      },
      { label: "Service Providers", path: "/admin/service-providers" },
      { label: "Serviceability", path: "/admin/serviceability" },
      { label: "B2C Pricing", path: "/admin/pricing/b2c" },
      { label: "B2B Pricing", path: "/admin/pricing/b2b" },
    ],
  },
  {
    label: "Marketing",
    icon: IconSpeakerphone,
    children: [
      { label: "All Blogs", path: "/admin/blogs" },
      { label: "Create Blog", path: "/admin/create-blog" },
    ],
  },
  {
    label: "Settings",
    icon: IconUserCircle,
    children: [
      { label: "My Account", path: "/admin/account" },
      { label: "Payment Options", path: "/admin/settings/payment-options" },
      { label: "Change Password", path: "/admin/settings/change-password" },
      { label: "Notifications", path: "/admin/notifications" },
      { label: "Notification Settings", path: "/admin/notifications/settings" },
      { label: "Developer", path: "/admin/developer", icon: IconDatabase },
    ],
  },
];

const pathMatches = (pathname, targetPath) => {
  if (!targetPath) return false;
  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
};

const isItemActive = (pathname, item) => {
  if (item.path) return pathMatches(pathname, item.path);
  return item.children?.some((child) => pathMatches(pathname, child.path));
};

const SidebarContent = ({
  sidebarWidth,
  position = "fixed",
  onNavigate,
  isCollapsed = false,
  onCollapsedGroupClick,
}) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = React.useState({});
  const sidebarBg = useColorModeValue(
    "linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 46%, #F4F8FB 100%)",
    "linear-gradient(180deg, #111827 0%, #161B22 52%, #101722 100%)"
  );
  const sidebarSurface = useColorModeValue(
    "rgba(255,255,255,0.76)",
    "rgba(255,255,255,0.025)"
  );
  const borderColor = useColorModeValue("rgba(20,43,79,0.10)", "rgba(255,255,255,0.10)");
  const softBorderColor = useColorModeValue("rgba(20,43,79,0.075)", "rgba(255,255,255,0.08)");
  const itemColor = useColorModeValue("#506481", "#B6C3D6");
  const itemHoverBg = useColorModeValue("rgba(216,236,238,0.42)", "rgba(255,255,255,0.065)");
  const itemHoverColor = useColorModeValue(brand.ink, "#E6EDF3");
  const itemActiveBg = useColorModeValue(
    "linear-gradient(135deg, rgba(20,155,109,0.16) 0%, rgba(255,255,255,0.95) 100%)",
    "linear-gradient(135deg, rgba(20,155,109,0.24) 0%, rgba(20,43,79,0.28) 100%)"
  );
  const itemActiveColor = useColorModeValue(brand.accent, "#BFE8D7");
  const iconColor = useColorModeValue("rgba(20,43,79,0.58)", "#91A7C3");
  const iconTileBg = useColorModeValue("rgba(20,43,79,0.055)", "rgba(255,255,255,0.04)");
  const iconTileActiveBg = useColorModeValue("rgba(255,255,255,0.92)", "rgba(20,155,109,0.18)");
  const childColor = useColorModeValue("#506481", "#B6C3D6");
  const childActiveBg = useColorModeValue("rgba(20,155,109,0.11)", "rgba(20,155,109,0.18)");
  const childActiveColor = useColorModeValue(brand.accent, "#BFE8D7");
  const scrollbarThumb = useColorModeValue("rgba(20,43,79,0.24)", "rgba(145,167,195,0.42)");
  const activeShadow = useColorModeValue(
    "0 12px 28px rgba(20,43,79,0.075)",
    "none"
  );
  const hoverShadow = useColorModeValue(
    "0 10px 24px rgba(20,43,79,0.06)",
    "none"
  );
  const sidebarShadow = useColorModeValue("18px 0 38px rgba(20,43,79,0.045)", "none");

  React.useEffect(() => {
    const nextOpen = {};
    sidebarItems.forEach((item) => {
      if (item.children && isItemActive(location.pathname, item)) {
        nextOpen[item.label] = true;
      }
    });
    setOpenGroups(nextOpen);
  }, [location.pathname]);

  const toggleGroup = (label) => {
    setOpenGroups((prev) => (prev[label] ? {} : { [label]: true }));
  };

  const renderIcon = (Icon, active) => (
    <Box
      color={active ? itemActiveColor : iconColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      w={isCollapsed ? "40px" : "34px"}
      h={isCollapsed ? "40px" : "34px"}
      borderRadius="12px"
      bg={active ? iconTileActiveBg : iconTileBg}
      boxShadow={
        active
          ? "inset 0 0 0 1px rgba(20,155,109,0.18)"
          : "none"
      }
      transition="background-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease"
    >
      <Icon size={19} strokeWidth={2.1} />
    </Box>
  );

  return (
    <Box
      h="100vh"
      w={`${sidebarWidth}px`}
      bg={sidebarBg}
      borderRight="1px solid"
      borderColor={borderColor}
      position={position}
      left={position === "fixed" ? "0" : undefined}
      top={position === "fixed" ? "0" : undefined}
      boxShadow={sidebarShadow}
      overflowY="auto"
      overflowX="hidden"
      css={{
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          background: scrollbarThumb,
          borderRadius: "999px",
          border: "2px solid transparent",
          backgroundClip: "padding-box",
        },
      }}
    >
      <Flex
        h="104px"
        px={isCollapsed ? "10px" : "18px"}
        align="center"
        justify="center"
        bg={sidebarSurface}
      >
        <Box
          as="img"
          src={brandIdentity.logoPath}
          alt={brandIdentity.name}
          w={isCollapsed ? "60px" : "132px"}
          h={isCollapsed ? "48px" : "96px"}
          objectFit="contain"
          flexShrink="0"
        />
      </Flex>

      <Stack spacing="6px" px={isCollapsed ? "10px" : "12px"} py="14px">
        {sidebarItems.map((item) => {
          const active = isItemActive(location.pathname, item);
          const Icon = item.icon || IconTruck;

          if (!item.children) {
            return (
              <Tooltip
                key={item.label}
                label={item.label}
                placement="right"
                isDisabled={!isCollapsed}
                hasArrow
              >
                <NavLink to={item.path} onClick={onNavigate}>
                  <Flex
                    minH="44px"
                    px={isCollapsed ? "0" : "12px"}
                    align="center"
                    justify={isCollapsed ? "center" : "flex-start"}
                    gap="10px"
                    borderRadius="14px"
                    border="1px solid"
                    borderColor={active ? "rgba(20,155,109,0.30)" : "transparent"}
                    bg={active ? itemActiveBg : "transparent"}
                    boxShadow={active ? activeShadow : "none"}
                    color={active ? itemActiveColor : itemColor}
                    position="relative"
                    overflow="hidden"
                    _before={
                      active
                        ? {
                            content: '""',
                            position: "absolute",
                            left: "7px",
                            top: "10px",
                            bottom: "10px",
                            w: "4px",
                            borderRadius: "999px",
                            bg: itemActiveColor,
                          }
                        : undefined
                    }
                    _hover={{
                      bg: active ? itemActiveBg : itemHoverBg,
                      borderColor: active ? "rgba(20,155,109,0.30)" : softBorderColor,
                      color: itemHoverColor,
                      boxShadow: active ? activeShadow : hoverShadow,
                    }}
                    _focus={{ boxShadow: active ? activeShadow : "none" }}
                    transition="all 0.16s ease"
                  >
                    {renderIcon(Icon, active)}
                    {!isCollapsed ? (
                      <Text
                        fontSize="15px"
                        fontWeight={active ? "700" : "500"}
                        lineHeight="1.15"
                        noOfLines={1}
                      >
                        {item.label}
                      </Text>
                    ) : null}
                  </Flex>
                </NavLink>
              </Tooltip>
            );
          }

          const open = Boolean(openGroups[item.label]);

          return (
            <Box key={item.label}>
              <Tooltip
                label={item.label}
                placement="right"
                isDisabled={!isCollapsed}
                hasArrow
              >
                <Button
                  type="button"
                  onClick={() =>
                    isCollapsed
                      ? onCollapsedGroupClick?.()
                      : toggleGroup(item.label)
                  }
                  minH="44px"
                  w="100%"
                  px={isCollapsed ? "0" : "12px"}
                  py="0"
                  justifyContent={isCollapsed ? "center" : "space-between"}
                  borderRadius="14px"
                  border="1px solid"
                  borderColor={active ? "rgba(20,155,109,0.30)" : "transparent"}
                  bg={active ? itemActiveBg : "transparent"}
                  boxShadow={active ? activeShadow : "none"}
                  color={active ? itemActiveColor : itemColor}
                  fontWeight="500"
                  position="relative"
                  overflow="hidden"
                  _before={
                    active
                      ? {
                          content: '""',
                          position: "absolute",
                          left: "7px",
                          top: "10px",
                          bottom: "10px",
                          w: "4px",
                          borderRadius: "999px",
                          bg: itemActiveColor,
                        }
                      : undefined
                  }
                  _hover={{
                    bg: active ? itemActiveBg : itemHoverBg,
                    borderColor: active ? "rgba(20,155,109,0.30)" : softBorderColor,
                    color: itemHoverColor,
                    boxShadow: active ? activeShadow : hoverShadow,
                  }}
                  _active={{ bg: itemActiveBg }}
                  _focus={{ boxShadow: active ? activeShadow : "none" }}
                >
                  <Flex align="center" gap="10px" minW={0}>
                    {renderIcon(Icon, active)}
                    {!isCollapsed ? (
                      <Text
                        fontSize="15px"
                        noOfLines={1}
                        textAlign="left"
                        lineHeight="1.25"
                        fontWeight={active ? "700" : "500"}
                      >
                        {item.label}
                      </Text>
                    ) : null}
                  </Flex>
                  {!isCollapsed ? (
                    <Box
                      transition="transform 0.16s ease"
                      transform={open ? "rotate(90deg)" : "rotate(0deg)"}
                    >
                      <ChevronRightIcon boxSize="15px" />
                    </Box>
                  ) : null}
                </Button>
              </Tooltip>
              <Collapse in={!isCollapsed && open} animateOpacity>
                <Stack
                  spacing="4px"
                  mt="7px"
                  mb="8px"
                  ml="29px"
                  mr="4px"
                  pl="12px"
                  borderLeft="1px solid"
                  borderColor={softBorderColor}
                >
                  {item.children.map((child) => {
                    const childActive = location.pathname.startsWith(
                      child.path
                    );
                    const ChildIcon = child.icon || IconClipboardList;
                    return (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={onNavigate}
                      >
                        <Flex
                          align="center"
                          gap="9px"
                          minH="36px"
                          px="11px"
                          py="5px"
                          borderRadius="11px"
                          border="1px solid"
                          borderColor={
                            childActive ? "rgba(20,155,109,0.22)" : "transparent"
                          }
                          color={childActive ? childActiveColor : childColor}
                          bg={childActive ? childActiveBg : "transparent"}
                          _hover={{
                            bg: childActive ? childActiveBg : itemHoverBg,
                            color: childActiveColor,
                            borderColor: softBorderColor,
                          }}
                          transition="all 0.16s ease"
                        >
                          <Box
                            flexShrink={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="24px"
                            h="24px"
                            borderRadius="8px"
                            bg={childActive ? iconTileActiveBg : iconTileBg}
                            color={childActive ? childActiveColor : iconColor}
                          >
                            <ChildIcon size={15} strokeWidth={2} />
                          </Box>
                          <Text
                            fontSize="13px"
                            fontWeight={childActive ? "700" : "500"}
                            lineHeight="1.22"
                            noOfLines={1}
                          >
                            {child.label}
                          </Text>
                        </Flex>
                      </NavLink>
                    );
                  })}
                </Stack>
              </Collapse>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SidebarContent;
