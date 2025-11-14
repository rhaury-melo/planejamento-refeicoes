// Sistema de autenticação e controle de acesso

import { User, Subscription } from './types';

const STORAGE_KEYS = {
  USER: 'menufacil-user',
  SUBSCRIPTION: 'menufacil-subscription',
};

// Simula banco de dados de usuários
const USERS_DB_KEY = 'menufacil-users-db';

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  return stored ? JSON.parse(stored) : null;
}

export function setStoredUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export function getStoredSubscription(): Subscription | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION);
  return stored ? JSON.parse(stored) : null;
}

export function setStoredSubscription(subscription: Subscription | null) {
  if (typeof window === 'undefined') return;
  if (subscription) {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
  } else {
    localStorage.removeItem(STORAGE_KEYS.SUBSCRIPTION);
  }
}

export function hasActiveSubscription(): boolean {
  const subscription = getStoredSubscription();
  if (!subscription) return false;
  
  // Plano free sempre ativo
  if (subscription.planId === 'free') return true;
  
  // Verifica se assinatura está ativa e não expirou
  if (subscription.status !== 'active') return false;
  
  if (subscription.endDate) {
    const endDate = new Date(subscription.endDate);
    const now = new Date();
    return endDate > now;
  }
  
  return true;
}

export function register(email: string, password: string, name: string): User | null {
  if (typeof window === 'undefined') return null;
  
  // Busca banco de usuários
  const usersDB = localStorage.getItem(USERS_DB_KEY);
  const users: { [email: string]: { password: string; user: User } } = usersDB ? JSON.parse(usersDB) : {};
  
  // Verifica se email já existe
  if (users[email]) {
    return null;
  }
  
  // Cria novo usuário
  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    createdAt: new Date().toISOString(),
  };
  
  // Salva no banco
  users[email] = { password, user: newUser };
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  
  // Cria assinatura free por padrão
  const freeSubscription: Subscription = {
    id: `sub-${Date.now()}`,
    userId: newUser.id,
    planId: 'free',
    status: 'active',
    startDate: new Date().toISOString(),
  };
  
  setStoredUser(newUser);
  setStoredSubscription(freeSubscription);
  
  return newUser;
}

export function login(email: string, password: string): User | null {
  if (typeof window === 'undefined') return null;
  
  // Busca banco de usuários
  const usersDB = localStorage.getItem(USERS_DB_KEY);
  const users: { [email: string]: { password: string; user: User } } = usersDB ? JSON.parse(usersDB) : {};
  
  // Verifica credenciais
  const userRecord = users[email];
  if (!userRecord || userRecord.password !== password) {
    return null;
  }
  
  setStoredUser(userRecord.user);
  
  // Busca ou cria assinatura
  let subscription = getStoredSubscription();
  if (!subscription || subscription.userId !== userRecord.user.id) {
    subscription = {
      id: `sub-${Date.now()}`,
      userId: userRecord.user.id,
      planId: 'free',
      status: 'active',
      startDate: new Date().toISOString(),
    };
    setStoredSubscription(subscription);
  }
  
  return userRecord.user;
}

export function logout() {
  setStoredUser(null);
  // Mantém a assinatura para não perder dados
}

export function upgradePlan(planId: 'pro' | 'premium') {
  const user = getStoredUser();
  if (!user) return false;
  
  const subscription: Subscription = {
    id: `sub-${Date.now()}`,
    userId: user.id,
    planId,
    status: 'active',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
  };
  
  setStoredSubscription(subscription);
  return true;
}
