export const getStoredUser = () => {
  const raw = sessionStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getRole = () => getStoredUser()?.role || null;

export const isAuthed = () => {
  const token = sessionStorage.getItem('token');
  const user = getStoredUser();
  return !!token && !!user;
};

export const clearAuth = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
