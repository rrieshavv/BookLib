
export const saveAuthData = (token, username, role) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('role', role);
  };
  
  export const getAuthData = () => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    return { token, username, role };
  };
  
  export const clearAuthData = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
  };
  