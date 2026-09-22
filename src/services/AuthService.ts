import type { User } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const AUTH_KEY = 'learning_platform_user';

export const AuthService = {
  async login(email: string, _password?: string): Promise<User> {
    await delay(600);
    const user: User = {
      id: 'usr-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role: 'student',
      avatarUrl: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  async register(name: string, email: string, _password?: string): Promise<User> {
    await delay(600);
    const user: User = {
      id: 'usr-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'student',
      avatarUrl: `https://ui-avatars.com/api/?name=${name}&background=random`
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem(AUTH_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(200);
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  }
};
