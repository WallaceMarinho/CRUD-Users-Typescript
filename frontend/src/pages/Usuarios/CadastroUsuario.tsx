import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CadastroUsuario() {
  const { token, user } = useAuth()
  const [username, setUsername] = useState('')
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('U')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // Novo estado
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (user?.tipo !== 'A') {
    return <div>Acesso negado. Apenas administradores podem cadastrar usuários.</div>
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, nome, tipo, password }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Erro ao cadastrar usuário')
      }
      window.alert('Usuário cadastrado com sucesso!')
      setUsername('')
      setNome('')
      setTipo('U')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Cadastrar Novo Usuário</h1>
      <form className="form-cadastro" onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input value={username} onChange={e => setUsername(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Nome:
            <input value={nome} onChange={e => setNome(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Tipo:
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="U">Usuário</option>
              <option value="A">Administrador</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Senha:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Confirmar Senha:
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
        <button type="button" onClick={() => navigate('/usuarios')} disabled={loading}>
          Cancelar
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}