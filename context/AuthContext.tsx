import React from 'react';
import fetch from '../utils/fetch';

const AuthContext = React.createContext(null);

const AuthProvider:React.FunctionComponent = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function ping() {
      const result = await fetch('/api/trakt/ping');
      setIsLogged(result.ok);
    }
    ping();
  }, []);

  async function login() {
    try {
      window.location.assign('/api/trakt/auth');
    } catch (error) {
      console.log('Error during login');
    }
  }

  async function logout() {
    try {
      await fetch('/api/trakt/logout');
      setIsLogged(false);
    } catch (error) {
      console.log('Error during logout');
    }
  }

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }

