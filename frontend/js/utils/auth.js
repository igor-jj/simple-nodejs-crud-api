const TOKEN_KEY = "token";

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "../pages/login.html";
}

export function requireAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = "../pages/login.html";
  }
}

export function handleAuthError(res) {
  if (res.status === 401) {
    logout();
  }
}