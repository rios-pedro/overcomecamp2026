import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { TribeCard } from './components/TribeCard'
import { fetchTribeScores, fetchTribeMembers, mockTribeScores, type TribeData, type MemberData } from './utils/sheets'

function App() {
  const [scores, setScores] = useState<TribeData[]>([])
  const [members, setMembers] = useState<Record<string, MemberData[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)


  // Função principal para carregar dados
  const loadData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true)
    setError(null)
    try {
      const freshScores = await fetchTribeScores()
      
      // Validação básica para garantir que vieram dados
      if (freshScores && freshScores.length > 0) {
        setScores(freshScores)
        setLastUpdated(new Date())
        // Salva localmente para persistência offline
        localStorage.setItem('overcome_scores', JSON.stringify(freshScores))
        localStorage.setItem('overcome_last_updated', new Date().toISOString())
      } else {
        throw new Error('Nenhum dado retornado do servidor.')
      }
    } catch (err: any) {
      console.warn('Erro ao atualizar dados, tentando carregar cache local...', err)
      setError('Modo Offline: Não foi possível conectar com a planilha. Exibindo dados locais.')
      
      // Tenta recuperar do localStorage
      const cached = localStorage.getItem('overcome_scores')
      const cachedTime = localStorage.getItem('overcome_last_updated')
      
      if (cached) {
        setScores(JSON.parse(cached))
        if (cachedTime) setLastUpdated(new Date(cachedTime))
      } else {
        // Se não houver nada no cache, usa o mock padrão
        setScores(mockTribeScores)
        setLastUpdated(new Date())
      }
    } finally {
      if (showLoading) setIsLoading(false)
    }
  }

  // Efeito para carregar dados no mount inicial
  useEffect(() => {
    loadData(true)
    // Carrega membros uma vez (dados estáticos, não precisam de auto-sync frequente)
    fetchTribeMembers().then(setMembers).catch(console.error)

    // Configura o Auto-Sync de 60 segundos (60000ms)
    const interval = setInterval(() => {
      loadData(false) // Sincroniza em background sem spinner obstrutivo
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Encontra a maior pontuação para definir o limite proporcional das barras
  const maxPoints = Math.max(...scores.map((s) => s.points), 1)

  // Detecta se todos os pontos são iguais (sem dados distintos para ranquear)
  const allPointsEqual = scores.length > 0 && scores.every((s) => s.points === scores[0].points)

  // Ordena sempre por ranking (maior pontuação primeiro)
  const displayedTribes = [...scores]
    .sort((a, b) => b.points - a.points)
    .map((tribe, index) => ({
      ...tribe,
      rank: index + 1
    }))

  return (
    <div style={containerStyle}>
      <Header
        onRefresh={() => loadData(true)}
        isLoading={isLoading}
        lastUpdated={lastUpdated}
      />

      {error && (
        <div style={errorContainerStyle}>
          <svg style={warningIconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}


      {/* Placar de Cards */}
      <main style={gridStyle}>
        {displayedTribes.map((tribe) => (
          <TribeCard
            key={tribe.name}
            name={tribe.name}
            points={tribe.points}
            maxPoints={maxPoints}
            rank={tribe.rank}
            isEqual={allPointsEqual}
            members={members[tribe.name.toLowerCase()] ?? []}
          />
        ))}
      </main>

      <footer style={footerStyle}>
        <p>© {new Date().getFullYear()} Overcome Camp - Jovens ICIR. Todos os direitos reservados.</p>
        <p style={{ marginTop: '5px', fontSize: '0.75rem', opacity: 0.5 }}>"Separados para o Fogo"</p>
      </footer>
    </div>
  )
}

// Estilos em JavaScript de Alta Qualidade
const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px 60px 20px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}

const errorContainerStyle: React.CSSProperties = {
  background: 'rgba(230, 57, 70, 0.1)',
  border: '1px solid rgba(230, 57, 70, 0.25)',
  borderRadius: '8px',
  padding: '12px 20px',
  color: '#e63946',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  maxWidth: '600px',
  margin: '10px auto 20px auto',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.9rem',
}

const warningIconStyle: React.CSSProperties = {
  width: '18px',
  height: '18px',
  flexShrink: 0,
}


const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '30px',
  justifyContent: 'center',
  alignItems: 'stretch',
  width: '100%',
  perspective: '1000px',
}

const footerStyle: React.CSSProperties = {
  marginTop: 'auto',
  paddingTop: '60px',
  textAlign: 'center',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.85rem',
  color: '#8d99ae',
}

export default App
