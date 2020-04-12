import { useAuth } from "../../context/AuthContext";

const LogButton = () => {
  const { isLogged, login, logout } = useAuth();
  return <button onClick={isLogged ? logout : login}>{isLogged ? 'Logout' : 'Login'}</button>
}

export default LogButton;