import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import Navbar from './components/Navbar'

function App() {
  const { user, logout } = useAuth();
  const navigator = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login'

  function handleLogOut() {
    logout();
    navigator('/'); 
  }

  return (
    <>
      {!isLoginPage && <Navbar />}
      <div className="main-content">
        <Outlet />
      </div>
    </>
  )
}

export default App