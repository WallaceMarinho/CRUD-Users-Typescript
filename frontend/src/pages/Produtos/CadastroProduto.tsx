import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function NovoProduto() {
  const { token } = useAuth()
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          preco: parseFloat(preco),
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Erro ao cadastrar produto')
      }
      window.alert('Produto cadastrado com sucesso!')
      setNome('')         
      setPreco('')  
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Cadastrar Novo Produto</h1>
      <form className="form-cadastro" onSubmit={handleSubmit}>
        <div>
          <label>
            Nome:
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Preço:
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={e => setPreco(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
        <button type="button" onClick={() => navigate('/produtos')} disabled={loading}>
          Cancelar
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}