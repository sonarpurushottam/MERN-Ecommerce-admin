// utils/logout.js
export const logout = (navigate) => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Redirect to login page
    navigate('/login');
  };
  