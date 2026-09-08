import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spinner,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  IconCircleCheck,
  IconInfoCircle,
  IconKey,
  IconLink,
  IconPlus,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import {
  AdminCard,
  AdminStack,
  DataTable,
  PageIntro,
  SoftBadge,
  adminUi,
} from "components/AdminUI/AdminPage";
import {
  useCourierCredentials,
  useServiceProviders,
  useUpdateServiceProviderStatus,
} from "hooks/useCouriers";
import { API_BASE_URL } from "services/axios";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";

const providerLabels = {
  delhivery: "Delhivery",
  deliveryone: "Delhivery",
  bigship: "Bigship",
  shipmozo: "Shipmozo",
  shipway: "Shipway",
};

const fallbackProviders = [
  {
    serviceProvider: "delhivery",
    name: "Delhivery",
    totalCouriers: 0,
    enabledCouriers: 0,
    isEnabled: false,
  },
  {
    serviceProvider: "bigship",
    name: "Bigship",
    totalCouriers: 0,
    enabledCouriers: 0,
    isEnabled: false,
  },
  {
    serviceProvider: "shipmozo",
    name: "Shipmozo",
    totalCouriers: 0,
    enabledCouriers: 0,
    isEnabled: false,
  },
  {
    serviceProvider: "shipway",
    name: "Shipway",
    totalCouriers: 0,
    enabledCouriers: 0,
    isEnabled: false,
  },
];

const providerKeys = ["delhivery", "bigship", "shipmozo", "shipway"];

const normalizeProviderKey = (value) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  if (normalized.includes("shipway")) return "shipway";
  if (normalized.includes("shipmozo")) return "shipmozo";
  if (normalized.includes("bigship")) return "bigship";
  if (normalized.includes("delhivery") || normalized.includes("deliveryone")) {
    return "delhivery";
  }

  return normalized;
};

const readBoolean = (source, keys) => {
  for (const key of keys) {
    const value = source?.[key];
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase();
      if (["true", "active", "enabled", "configured", "yes", "1"].includes(normalized)) {
        return true;
      }
      if (["false", "inactive", "disabled", "not_configured", "no", "0"].includes(normalized)) {
        return false;
      }
    }
    if (typeof value === "number") return value > 0;
  }

  return undefined;
};

const hasAnySecret = (credentials, keys) =>
  keys.some((key) => credentials?.[key] === true || Boolean(credentials?.[key]));

const getCredentialStatus = (credentials = {}) => {
  const delhiveryB2C = credentials.delhivery || {};
  const delhiveryB2B = credentials.delhiveryB2B || credentials.delhivery_b2b || {};
  const bigship = credentials.bigship || {};
  const shipmozo = credentials.shipmozo || {};
  const shipway = credentials.shipway || {};

  return {
    delhivery: {
      b2c: hasAnySecret(delhiveryB2C, ["hasApiKey", "has_api_key", "apiKeyMasked"]),
      b2b: hasAnySecret(delhiveryB2B, ["hasPassword", "has_password", "passwordMasked"]),
    },
    bigship: {
      b2c:
        hasAnySecret(bigship, ["hasPassword", "has_password", "passwordMasked"]) &&
        hasAnySecret(bigship, ["hasAccessKey", "has_access_key", "accessKeyMasked"]),
      b2b:
        hasAnySecret(bigship, ["hasPassword", "has_password", "passwordMasked"]) &&
        hasAnySecret(bigship, ["hasAccessKey", "has_access_key", "accessKeyMasked"]),
    },
    shipmozo: {
      b2c:
        hasAnySecret(shipmozo, ["hasPublicKey", "has_public_key", "publicKeyMasked"]) &&
        (hasAnySecret(shipmozo, ["hasPrivateKey", "has_private_key", "privateKeyMasked"]) ||
          hasAnySecret(shipmozo, ["hasPassword", "has_password", "passwordMasked"])),
      b2b:
        hasAnySecret(shipmozo, ["hasPublicKey", "has_public_key", "publicKeyMasked"]) &&
        (hasAnySecret(shipmozo, ["hasPrivateKey", "has_private_key", "privateKeyMasked"]) ||
          hasAnySecret(shipmozo, ["hasPassword", "has_password", "passwordMasked"])),
    },
    shipway: {
      b2c: hasAnySecret(shipway, [
        "hasLicenseKey",
        "has_license_key",
        "hasPassword",
        "has_password",
        "hasApiKey",
        "has_api_key",
        "hasApiToken",
        "has_api_token",
        "hasToken",
        "has_token",
        "licenseKeyMasked",
        "apiKeyMasked",
        "tokenMasked",
      ]),
      b2b: hasAnySecret(shipway, [
        "hasLicenseKey",
        "has_license_key",
        "hasPassword",
        "has_password",
        "hasApiKey",
        "has_api_key",
        "hasApiToken",
        "has_api_token",
        "hasToken",
        "has_token",
        "licenseKeyMasked",
        "apiKeyMasked",
        "tokenMasked",
      ]),
    },
  };
};

const readCredentialFlag = (provider, keys, fallback) => {
  const explicit = readBoolean(provider, keys);
  return explicit === undefined ? fallback : explicit;
};

const toProviderRow = (provider, credentialStatus) => {
  const providerKey = normalizeProviderKey(provider.serviceProvider || provider.provider || provider.name);
  const credentials = credentialStatus[providerKey] || {};
  const totalCouriers = Number(
    provider.totalCouriers ??
      provider.total_couriers ??
      provider.courierCount ??
      provider.courier_count ??
      0
  );
  const enabledCouriers = Number(
    provider.enabledCouriers ??
      provider.enabled_couriers ??
      provider.activeCouriers ??
      provider.active_couriers ??
      0
  );
  const explicitEnabled = readBoolean(provider, [
    "isEnabled",
    "is_enabled",
    "enabled",
    "isActive",
    "is_active",
    "active",
    "status",
  ]);
  const b2cConfigured = readCredentialFlag(
    provider,
    ["b2cConfigured", "b2c_configured", "hasB2CCredentials", "has_b2c_credentials"],
    credentials.b2c === true
  );
  const b2bConfigured = readCredentialFlag(
    provider,
    ["b2bConfigured", "b2b_configured", "hasB2BCredentials", "has_b2b_credentials"],
    credentials.b2b === true
  );
  const inferredEnabled = enabledCouriers > 0 || b2cConfigured || b2bConfigured;

  return {
    ...provider,
    serviceProvider: providerKey,
    name: providerLabels[providerKey] || provider.name || provider.serviceProvider,
    totalCouriers,
    enabledCouriers,
    b2cConfigured,
    b2bConfigured,
    isEnabled: explicitEnabled ?? inferredEnabled,
  };
};

const brandStyles = {
  Delhivery: ["#FFFFFF", "#111111"],
  "DP World": ["linear-gradient(135deg, #5025B9 0%, #00C7B2 100%)", "#FFFFFF"],
  Ekart: ["#0B65BB", "#FFD438"],
  "Shipex India": ["#10B981", "#FFFFFF"],
  Xpressbees: ["#111111", "#FFB020"],
  Bigship: ["#0B66D8", "#FFFFFF"],
  Shipmozo: ["#14213D", "#FFFFFF"],
  Shipway: ["#0E7C86", "#FFFFFF"],
};

function ProviderMark({ name }) {
  const [bg, color] = brandStyles[name] || ["#EEF2F7", adminUi.muted];
  return (
    <Flex
      w="44px"
      h="44px"
      borderRadius="full"
      align="center"
      justify="center"
      bg={bg}
      color={color}
      border="1px solid"
      borderColor={adminUi.border}
      fontSize="10px"
      fontWeight="900"
      flexShrink={0}
    >
      {name === "Delhivery" ? "DELHIVERY" : name.slice(0, 2)}
    </Flex>
  );
}

function ConfigBadge({ configured = false }) {
  return configured ? (
    <SoftBadge
      colorScheme="green"
      bg="#DDFBEC"
      color="#00A36C"
      border="1px solid #A8E8C9"
    >
      <HStack spacing="6px">
        <Icon as={IconShieldCheck} boxSize="16px" />
        <Text>Configured</Text>
      </HStack>
    </SoftBadge>
  ) : (
    <SoftBadge colorScheme="gray" bg="#F7F9FC" color={adminUi.muted}>
      Setup required
    </SoftBadge>
  );
}

const ServiceProviders = () => {
  const { data: providers = [], isLoading, error } = useServiceProviders();
  const { data: credentials, isLoading: credentialsLoading } = useCourierCredentials();
  const updateStatus = useUpdateServiceProviderStatus();
  const history = useHistory();
  const toast = useToast();
  const providerErrorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Unknown API error";

  const rows = useMemo(() => {
    const credentialStatus = getCredentialStatus(credentials);
    const liveProviders = providers.filter((provider) =>
      providerKeys.includes(
        normalizeProviderKey(provider.serviceProvider || provider.provider || provider.name)
      )
    );
    const providerByKey = new Map(
      liveProviders.map((provider) => [
        normalizeProviderKey(provider.serviceProvider || provider.provider || provider.name),
        provider,
      ])
    );

    return fallbackProviders.map((fallbackProvider) =>
      toProviderRow(providerByKey.get(fallbackProvider.serviceProvider) || fallbackProvider, credentialStatus)
    );
  }, [providers, credentials]);

  const handleToggle = (provider) => {
    updateStatus.mutate(
      {
        serviceProvider: provider.serviceProvider,
        isEnabled: !provider.isEnabled,
      },
      {
        onSuccess: () => {
          toast({
            title: `Provider ${
              provider.isEnabled ? "disabled" : "enabled"
            } successfully`,
            status: "success",
          });
        },
        onError: (toggleError) => {
          toast({
            title: "Failed to update provider status",
            description:
              toggleError?.response?.data?.message || toggleError?.message,
            status: "error",
          });
        },
      }
    );
  };

  if ((isLoading || credentialsLoading) && !providers.length && !credentials) {
    return (
      <AdminStack>
        <Spinner size="md" />
      </AdminStack>
    );
  }

  const columns = [
    {
      key: "name",
      label: "Provider",
      render: (value) => (
        <HStack spacing="14px">
          <Icon as={IconPlus} boxSize="16px" color="#9CB0C9" />
          <ProviderMark name={value} />
          <Box>
            <Text fontSize="18px" fontWeight="800" color={adminUi.text}>
              {value}
            </Text>
            <SoftBadge bg="#EEFCE9" color="#28A600">
              {value}
            </SoftBadge>
          </Box>
        </HStack>
      ),
    },
    {
      key: "totalCouriers",
      label: "Couriers",
      render: (value, row) => (
        <Text fontSize="18px" fontWeight="800">
          {row.enabledCouriers || 0}{" "}
          <Text as="span" color={adminUi.muted} fontWeight="500">
            / {value || 0}
          </Text>
        </Text>
      ),
    },
    {
      key: "b2c",
      label: "B2C Credentials",
      render: (value, row) => <ConfigBadge configured={row.b2cConfigured} />,
    },
    {
      key: "b2b",
      label: "B2B Credentials",
      render: (value, row) => (
        <HStack spacing="10px">
          <ConfigBadge configured={row.b2bConfigured} />
          {row.b2bConfigured ? (
            <SoftBadge
              bg="#F4F1FF"
              color={adminUi.purple}
              border="1px solid #D9D2FF"
            >
              <HStack spacing="6px">
                <Icon as={IconLink} boxSize="15px" />
                <Text>Shared credentials</Text>
              </HStack>
            </SoftBadge>
          ) : null}
        </HStack>
      ),
    },
    {
      key: "isEnabled",
      label: "Status",
      render: (value) => (
        <SoftBadge
          colorScheme="green"
          bg="#DDFBEC"
          color="#00A36C"
          border="1px solid #A8E8C9"
        >
          <HStack spacing="6px">
            <Icon as={IconCircleCheck} boxSize="15px" />
            <Text>{value === false ? "Inactive" : "Active"}</Text>
          </HStack>
        </SoftBadge>
      ),
    },
  ];

  return (
    <AdminStack spacing="30px">
      <PageIntro
        icon={IconTruckDelivery}
        title="Service Providers"
        subtitle="Manage courier integrations and API credentials"
        bg="transparent"
        border="0"
        px="0"
      />

      <Flex
        align="center"
        gap="10px"
        px="18px"
        py="13px"
        border="1px solid"
        borderColor="#D9D4F8"
        borderRadius="14px"
        bg="#F0EEFF"
        color="#607397"
      >
        <Icon as={IconInfoCircle} boxSize="20px" color={adminUi.purple} />
        <Text fontSize="18px">
          Configure and test provider credentials from Courier Credentials, then enable the provider and its couriers here.
        </Text>
      </Flex>

      {error ? (
        <Flex
          align="center"
          gap="10px"
          px="18px"
          py="13px"
          border="1px solid"
          borderColor="#FED7AA"
          borderRadius="14px"
          bg="#FFF7ED"
          color="#9A3412"
        >
          <Icon as={IconInfoCircle} boxSize="20px" color="#EA580C" />
          <Text fontSize="16px">
            Cannot reach the courier API at {API_BASE_URL}. Shipway credentials and provider status
            cannot be verified ({providerErrorMessage}).
          </Text>
        </Flex>
      ) : null}

      <DataTable
        columns={columns}
        rows={rows}
        rowKey="serviceProvider"
        minW="1180px"
        actions={(row) => (
          <HStack spacing="12px" justify="flex-end">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Icon as={IconKey} boxSize="15px" />}
              onClick={() => history.push("/admin/courier-credentials")}
            >
              Credentials
            </Button>
            <Switch
              colorScheme="purple"
              isChecked={row.isEnabled !== false}
              isDisabled={updateStatus.isPending}
              onChange={() => handleToggle(row)}
            />
          </HStack>
        )}
      />
    </AdminStack>
  );
};

export default ServiceProviders;
