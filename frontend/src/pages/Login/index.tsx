import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const success = await auth.login(username, password)
    if (success) {
      navigate('/')
    } else {
      setError('Usuário ou senha inválidos')
    }
  }

  return (
    <div className="login-container">
    <h1>Login</h1>
    <form className="form-cadastro" onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Entrar</button>
      {error && <div>{error}</div>}
    </form>
  </div>  
  )
}