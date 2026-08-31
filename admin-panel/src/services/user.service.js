import api from './axios'
import {
  isDemoAdminSession,
  readDemoSellers,
  updateDemoSeller,
} from '../utils/demoAdminAuth'

const matchesSearch = (user, search = '') => {
  const query = search.trim().toLowerCase()
  if (!query) return true

  return [
    user.name,
    user.email,
    user.contactPerson,
    user.contactNumber,
    user.companyInfo?.businessName,
    user.companyInfo?.brandName,
    user.companyInfo?.contactPerson,
    user.companyInfo?.contactEmail,
  ]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(query))
}

const getDemoUsersWithRoleUser = ({
  page = 1,
  perPage = 10,
  search = '',
  onboardingComplete,
  approved,
  kycStatus,
  plan,
}) => {
  let data = readDemoSellers()

  data = data.filter((user) => matchesSearch(user, search))

  if (typeof approved === 'boolean') {
    data = data.filter((user) => (user.approved !== false) === approved)
  }

  if (typeof onboardingComplete === 'boolean') {
    data = data.filter(
      (user) => Boolean(user.onboardingComplete || user.onboarding_complete) === onboardingComplete,
    )
  }

  if (kycStatus) {
    data = data.filter((user) => {
      const status = user.kycStatus || user.domesticKyc?.status || 'pending'
      return status === kycStatus
    })
  }

  if (plan) {
    data = data.filter((user) => (user.plan?.name || user.planName || 'Basic') === plan)
  }

  const totalCount = data.length
  const offset = Math.max(0, (Number(page) - 1) * Number(perPage))
  return {
    data: data.slice(offset, offset + Number(perPage)),
    totalCount,
  }
}

// --- User Management ---
export async function fetchUsersWithRoleUser({
  page = 1,
  perPage = 10,
  search = '',
  businessTypes = [],
  onboardingComplete,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  approved,
  kycStatus,
  plan,
}) {
  if (isDemoAdminSession()) {
    return getDemoUsersWithRoleUser({
      page,
      perPage,
      search,
      onboardingComplete,
      approved,
      kycStatus,
      plan,
    })
  }

  const response = await api.get('/admin/users/users-management', {
    params: {
      page,
      perPage,
      search,
      businessTypes: businessTypes.length ? businessTypes : undefined,
      onboardingComplete:
        typeof onboardingComplete === 'boolean'
          ? onboardingComplete
          : typeof onboardingComplete === 'string'
          ? onboardingComplete === 'true'
          : undefined,
      approved:
        typeof approved === 'boolean'
          ? approved
          : typeof approved === 'string' && approved !== ''
          ? approved === 'true'
          : undefined,
      kycStatus: kycStatus || undefined,
      plan: plan || undefined,
      sortBy,
      sortOrder,
    },
  })
  return {
    data: response.data.data || [],
    totalCount: response.data.totalCount || 0,
  }
}

export async function deleteUser(userId) {
  const response = await api.delete(`/admin/users/${userId}`)
  return response.data
}

export const getUserInfo = async (id) => {
  if (isDemoAdminSession()) {
    const user = readDemoSellers().find((seller) => seller.id === id || seller.userId === id)
    if (user) return { data: user }
  }

  const { data } = await api.get(`/user/user-info/${id}`)
  return data
}

export const approveUser = async (userId) => {
  const response = await api.patch(`/admin/users/${userId}/approve`)
  return response.data
}

export const updateUserApproval = async (userId, approved) => {
  if (isDemoAdminSession()) {
    return updateDemoSeller(userId, () => ({
      approved,
      isActive: approved,
    }))
  }

  const response = await api.patch(`/admin/users/${userId}/approve`, { approved })
  return response.data
}

export const completeMerchantReadiness = async (userId, payload = {}) => {
  if (isDemoAdminSession()) {
    return updateDemoSeller(userId, (seller) => ({
      approved: true,
      isActive: true,
      onboardingComplete: true,
      onboarding_complete: true,
      profileComplete: true,
      kycVerified: true,
      kyc_verified: true,
      kycStatus: 'verified',
      domesticKyc: {
        ...(seller.domesticKyc || {}),
        status: 'verified',
        updatedAt: new Date().toISOString(),
      },
      companyInfo: {
        ...(seller.companyInfo || {}),
        ...(payload?.companyAddress
          ? { companyAddress: payload.companyAddress }
          : {}),
      },
    }))
  }

  const response = await api.post(`/admin/users/${userId}/complete-readiness`, payload)
  return response.data
}

export const getSellerSummary = async (userId) => {
  if (isDemoAdminSession()) {
    const user = readDemoSellers().find((seller) => seller.id === userId || seller.userId === userId)
    if (user) {
      return {
        financial: {
          walletBalance: user.walletBalance || 0,
          totalRevenue: 0,
          totalFreightCharges: 0,
          codAmount: 0,
          codRemittanceCredited: 0,
          codRemittanceDue: 0,
        },
        operational: {
          totalOrders: user.monthlyOrderCount || 0,
          deliveredOrders: 0,
          ndrCount: 0,
          rtoCount: 0,
          deliverySuccessRate: 0,
        },
        metrics: {
          totalPrepaidOrders: 0,
          totalCodOrders: 0,
          avgOrderValue: 0,
        },
        actions: {
          openTickets: 0,
        },
        charts: {
          ordersByStatus: [],
        },
        couriers: {
          performance: {},
        },
      }
    }
  }

  const { data } = await api.get(`/admin/users/${userId}/summary`)
  return data.data
}

export const getSellerPickupAddresses = async (userId) => {
  if (isDemoAdminSession()) {
    const user = readDemoSellers().find((seller) => seller.id === userId || seller.userId === userId)
    return {
      data: user?.companyInfo?.companyAddress
        ? [
            {
              id: `${userId}-pickup`,
              addressNickname: 'Default Warehouse',
              addressLine1: user.companyInfo.companyAddress,
              city: user.companyInfo.city,
              state: user.companyInfo.state,
              pincode: user.companyInfo.pincode,
              isPrimary: true,
              isPickupEnabled: true,
            },
          ]
        : [],
      totalCount: user?.companyInfo?.companyAddress ? 1 : 0,
    }
  }

  const { data } = await api.get(`/admin/users/${userId}/pickup-addresses`, {
    params: { page: 1, limit: 100 },
  })
  return data
}

export const resetUserPassword = async (userId) => {
  const response = await api.post(`/admin/users/${userId}/reset-password`)
  return response.data.tempPassword
}

export async function fetchUserBankAccounts(userId) {
  if (isDemoAdminSession()) return []

  const response = await api.get(`/admin/users/${userId}/bank-accounts`)
  return response.data.data
}

export async function updateBankAccountStatus(userId, accountId, payload) {
  const response = await api.patch(
    `/admin/users/${userId}/bank-accounts/${accountId}/status`,
    payload,
  )
  return response.data
}

// --- KYC APIs ---
export const getKyc = async (userId) => {
  if (isDemoAdminSession()) {
    const user = readDemoSellers().find((seller) => seller.id === userId || seller.userId === userId)
    return {
      status: user?.kycStatus || user?.domesticKyc?.status || 'pending',
      data: {
        status: user?.kycStatus || user?.domesticKyc?.status || 'pending',
      },
    }
  }

  const { data } = await api.get(`/admin/users/${userId}/kyc`)
  return data
}

export const approveKyc = async (userId) => {
  const { data } = await api.post(`/admin/users/kyc/approve/${userId}`)
  return data
}

export const rejectKyc = async (userId, reason) => {
  const { data } = await api.post(`/admin/users/kyc/reject/${userId}`, { reason })
  return data
}

export const revokeKyc = async (userId, reason) => {
  const { data } = await api.post(`/admin/users/kyc/revoke/${userId}`, { reason })
  return data
}

export const approveDocument = async (userId, key) => {
  const { data } = await api.post(`/admin/users/kyc/document/approve/${userId}/${key}`)
  return data
}

export const rejectDocument = async (userId, key, reason) => {
  const { data } = await api.post(`/admin/users/kyc/document/reject/${userId}/${key}`, { reason })
  return data
}

export const getTicketsByUserId = async (userId, page = 1, perPage = 10) => {
  if (isDemoAdminSession()) return { tickets: [], totalCount: 0 }

  const { data } = await api.get(`/admin/support-tickets/user/${userId}`, {
    params: { page, perPage },
  })
  return data // expected { tickets: [], totalCount: number }
}

// Search sellers for autocomplete
export const searchSellers = async (query, limit = 20) => {
  if (!query || query.trim().length < 2) {
    return { success: true, data: [] }
  }
  if (isDemoAdminSession()) {
    const data = readDemoSellers()
      .filter((seller) => matchesSearch(seller, query))
      .slice(0, limit)
    return { success: true, data }
  }

  const { data } = await api.get('/admin/users/search-sellers', {
    params: { q: query.trim(), limit },
  })
  return data
}

const sanitizeParams = (params = {}) => {
  if (!params || typeof params !== 'object') return {}
  const sanitized = { ...params }
  Object.keys(sanitized).forEach((key) => {
    const value = sanitized[key]
    if (value === '' || value === undefined || value === null) {
      delete sanitized[key]
    }
  })
  return sanitized
}

export async function fetchUserTeamMembers(userId, page = 1, limit = 10, filters = {}) {
  const params = sanitizeParams({ page, limit, ...filters })
  const response = await api.get(`/admin/users/${userId}/team-members`, {
    params,
  })
  return response.data
}

export async function createUserTeamMember(userId, payload) {
  const response = await api.post(`/admin/users/${userId}/team-members`, payload)
  return response.data
}

export async function toggleUserTeamMemberStatus(userId, memberId, isActive) {
  const response = await api.patch(`/admin/users/${userId}/team-members/${memberId}/status`, {
    isActive,
  })
  return response.data
}

export async function deleteUserTeamMember(userId, memberId) {
  const response = await api.delete(`/admin/users/${userId}/team-members/${memberId}`)
  return response.data
}
