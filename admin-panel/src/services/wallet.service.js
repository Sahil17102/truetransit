import apiClient from './axios'
import {
  adjustDemoWallet,
  isDemoAdminSession,
  readDemoSellers,
  readDemoWalletTransactions,
} from '../utils/demoAdminAuth'

const demoWalletForSeller = (seller) => ({
  id: `${seller.id}-wallet`,
  userId: seller.id,
  balance: Number(seller.walletBalance || 0),
  currency: 'INR',
  userEmail: seller.email,
  userPhone: seller.contactNumber,
  companyInfo: seller.companyInfo || {},
  planName: seller.planName || seller.plan?.name || 'Basic',
  createdAt: seller.createdAt,
  updatedAt: seller.updatedAt,
})

export const listAdminWallets = async ({ page = 1, limit = 20, search = '', sortBy = 'updatedAt', sortOrder = 'desc' } = {}) => {
  if (isDemoAdminSession()) {
    const query = search.trim().toLowerCase()
    const wallets = readDemoSellers()
      .filter((seller) =>
        !query || [seller.email, seller.name, seller.companyInfo?.businessName]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      )
      .map(demoWalletForSeller)
    const start = Math.max(0, (Number(page) - 1) * Number(limit))
    return { success: true, data: wallets.slice(start, start + Number(limit)), totalCount: wallets.length }
  }

  const params = { page, limit, search, sortBy, sortOrder }
  const { data } = await apiClient.get('/admin/wallets', { params })
  return data
}

export const getAdminWallet = async (userId) => {
  if (isDemoAdminSession()) {
    const seller = readDemoSellers().find(
      (candidate) => candidate.id === userId || candidate.userId === userId,
    )
    if (!seller) throw new Error('Seller wallet not found')
    return { success: true, data: demoWalletForSeller(seller) }
  }

  const { data } = await apiClient.get(`/admin/wallets/${userId}`)
  return data
}

export const getAdminWalletTransactions = async (userId, { page = 1, limit = 50, type, dateFrom, dateTo } = {}) => {
  if (isDemoAdminSession()) {
    let transactions = readDemoWalletTransactions(userId)
    if (type) transactions = transactions.filter((transaction) => transaction.type === type)
    if (dateFrom) transactions = transactions.filter((transaction) => new Date(transaction.created_at) >= new Date(dateFrom))
    if (dateTo) transactions = transactions.filter((transaction) => new Date(transaction.created_at) <= new Date(dateTo))
    const start = Math.max(0, (Number(page) - 1) * Number(limit))
    return {
      success: true,
      transactions: transactions.slice(start, start + Number(limit)),
      totalCount: transactions.length,
    }
  }

  const params = { page, limit, type, dateFrom, dateTo }
  const { data } = await apiClient.get(`/admin/wallets/${userId}/transactions`, { params })
  return data
}

export const listAdminWalletMisReport = async ({
  page = 1,
  limit = 20,
  search = '',
  type,
  transactionAgainst,
  dateFrom,
  dateTo,
  awb,
  courier,
  shipmentOnly,
} = {}) => {
  const params = {
    page,
    limit,
    search,
    type,
    transactionAgainst,
    dateFrom,
    dateTo,
    awb,
    courier,
    shipmentOnly,
  }
  const { data } = await apiClient.get('/admin/wallets/mis-report', { params })
  return data
}

export const exportAdminWalletMisReport = async (params = {}) => {
  const { data } = await apiClient.get('/admin/wallets/mis-report/export', {
    params,
    responseType: 'blob',
  })
  return data
}

export const adjustAdminWalletBalance = async (userId, { type, amount, reason, notes }) => {
  if (isDemoAdminSession()) {
    const { seller, transaction } = adjustDemoWallet({ userId, type, amount, reason, notes })
    return {
      success: true,
      message: `Wallet ${type === 'credit' ? 'credited' : 'debited'} successfully`,
      data: demoWalletForSeller(seller),
      transaction,
    }
  }

  const { data } = await apiClient.post(`/admin/wallets/${userId}/adjust`, {
    type,
    amount,
    reason,
    notes,
  })
  return data
}

