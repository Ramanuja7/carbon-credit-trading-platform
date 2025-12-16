import { projectId, publicAnonKey } from './supabase/info';
import { User, PortfolioItem, Transaction, SellOrder } from '../App';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-1a42b77c`;

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Auth API
export async function signUp(email: string, password: string, name: string, userType: 'individual' | 'organization') {
  return apiCall('/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, userType }),
  });
}

export async function signIn(email: string) {
  return apiCall('/signin', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// User Data API
export async function getUserData(email: string): Promise<{
  portfolio: PortfolioItem[];
  transactions: Transaction[];
  sellOrders: SellOrder[];
}> {
  return apiCall(`/user-data/${encodeURIComponent(email)}`);
}

// Portfolio API
export async function updatePortfolio(email: string, portfolio: PortfolioItem[]) {
  return apiCall(`/portfolio/${encodeURIComponent(email)}`, {
    method: 'POST',
    body: JSON.stringify(portfolio),
  });
}

// Transaction API
export async function addTransaction(email: string, transaction: Transaction) {
  return apiCall(`/transactions/${encodeURIComponent(email)}`, {
    method: 'POST',
    body: JSON.stringify(transaction),
  });
}

// Sell Orders API
export async function getSellOrders(): Promise<{ sellOrders: SellOrder[] }> {
  return apiCall('/sell-orders');
}

export async function createSellOrder(order: SellOrder) {
  return apiCall('/sell-orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
}

export async function updateSellOrders(orders: SellOrder[]) {
  return apiCall('/sell-orders', {
    method: 'PUT',
    body: JSON.stringify(orders),
  });
}
