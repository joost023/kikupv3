import bcrypt from 'bcryptjs';

interface User {
  username: string;
  password: string;
  createdAt: string;
}

const USERS_KEY = 'kikup_users';

// Initialize admin user if not exists
function initAdminUser() {
  const users = getUsers();
  if (!users.some(user => user.username === 'admin')) {
    const adminPassword = 'UHpT88MCbDy5KP8s8uK';
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    
    const adminUser: User = {
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    saveUser(adminUser);
  }
}

function getUsers(): User[] {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

function saveUser(user: User) {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.username === user.username);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function verifyPassword(username: string, password: string): boolean {
  const users = getUsers();
  const user = users.find(u => u.username === username);
  
  if (!user) return false;
  
  return bcrypt.compareSync(password, user.password);
}

export function changePassword(username: string, newPassword: string): boolean {
  try {
    const users = getUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) return false;

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    
    saveUser(user);
    return true;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
}

// Initialize admin user
initAdminUser();