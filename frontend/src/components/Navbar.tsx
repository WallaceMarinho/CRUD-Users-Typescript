import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <span className="logo">XPTO Smartphones</span>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        {user?.tipo === 'A' && (
          <>
            <Link to="/usuarios">Usuários</Link>
            <Link to="/usuarios/cadastro">Cadastrar Usuário</Link>
          </>
        )}
        {user && (
          <button onClick={handleLogout}>Sair</button>
        )}
      </nav>
    </header>
  )
}