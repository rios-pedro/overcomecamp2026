import React from 'react'
import { Link } from 'react-router-dom'

type ItemEntry = {
  name: string
  points: number
  description?: string
}

const items: ItemEntry[] = [
  { name: 'Arroz 2kg', points: 40 },
  { name: 'Arroz 5kg', points: 90 },
  { name: 'Açúcar 2kg', points: 30 },
  { name: 'Açúcar 5kg', points: 60 },
  { name: 'Feijão', points: 30 },
  { name: 'Café', points: 40 },
  { name: 'Farinha de trigo', points: 15 },
  { name: 'Macarrão', points: 15 },
  { name: 'Maizena', points: 15 },
  { name: 'Extrato de tomate pequeno', points: 10 },
  { name: 'Extrato de tomate grande', points: 15 },
  { name: 'Fermento pequeno', points: 4 },
  { name: 'Fermento grande', points: 8 },
  { name: 'Molho pequeno', points: 10 },
  { name: 'Molho grande', points: 20 },
  { name: 'Sal', points: 5 },
  { name: 'Toddy', points: 10 },
  { name: 'Neston', points: 10 },
  { name: 'Leite Condensado', points: 5 },
  { name: 'Creme de Leite', points: 3 },
  { name: 'Pipoca', points: 5 },
  { name: 'Maionese', points: 10 },
  { name: 'Ketchup', points: 10 },
  { name: 'Margarina 500g', points: 5 },
  { name: 'Margarina 1kg', points: 10 },
  { name: 'Manteiga de sal', points: 15 },
  { name: 'Milho lata pequena', points: 5 },
  { name: 'Milho lata grande', points: 10 },
  { name: 'Azeitona pequena', points: 5 },
  { name: 'Azeitona grande', points: 10 },
  { name: 'Palmito', points: 20 },
  { name: 'Óleo', points: 10 },
  { name: 'Papel Toalha duplo', points: 10 },
  { name: 'Guardanapos', points: 5 },
  { name: 'Papel de higiênico pct 4', points: 10 },
  { name: 'Papel de higiênico pct 8', points: 15 },
  { name: 'Papel de higiênico pct 12', points: 20 },
  { name: 'Papel de higiênico pct 18', points: 25 },
  { name: 'Papel de higiênico pct 24', points: 30 },
  { name: 'Sabão de pedra barra', points: 10 },
  { name: 'Bucha', points: 5 },
  { name: 'Detergente', points: 10 },
  { name: 'Bombril', points: 5 },
  { name: 'Desinfetante 1 litro', points: 10 },
  { name: 'Saco de lixo pequeno', points: 12 },
  { name: 'Saco de lixo grande', points: 25 },
  { name: 'Álcool', points: 10 },
  { name: 'Rodo', points: 10 },
  { name: 'Vassoura', points: 10 },
]

const triboCriteria: ItemEntry[] = [
  { name: 'Unidade das Tribos', description: 'Todas as tribos trabalhando juntas', points: 100 },
  { name: 'Culto Overcome', description: 'Líderes e liderados da tribo devem estar todos 20 minutos antes', points: 100 },
  { name: 'Decoração do Culto Overcome', description: 'Líderes juntos na decoração', points: 100 },
  { name: 'Cada visitante', description: 'Visitantes no Culto Overcome ou P.G', points: 30 },
  { name: 'Cantina', description: 'Líderes ajudando — 100 pontos; se for só um líder, 50 pontos', points: 100 },
  { name: 'Evento da Igreja', description: 'Líderes participando, por exemplo vigília', points: 100 },
  { name: 'Tribos em peso', description: 'Todos que fazem parte da tribo nos cultos, P.G ou outro evento do Overcome', points: 100 },
]

export const ItemsPage: React.FC = () => {
  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <Link to="/" style={backLinkStyle}>
          ← Voltar ao placar
        </Link>

        <div style={titleBlockStyle}>
          <p style={eyebrowStyle}>Itens que dão pontos</p>
          <h1 style={titleStyle}>Lista de compras</h1>
          <p style={subtitleStyle}>Cada item vale uma quantidade específica de pontos para a equipe.</p>
        </div>
      </header>

      <main>
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Itens de compra</h2>
          <div style={gridStyle}>
            {items.map((item) => (
              <article key={item.name} style={cardStyle}>
                <div style={pointsStyle}>{item.points}</div>
                <div style={contentStyle}>
                  <h2 style={itemNameStyle}>{item.name}</h2>
                  <p style={detailStyle}>Vale {item.points} ponto{item.points === 1 ? '' : 's'}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Critérios de pontuação das tribos</h2>
          <div style={gridStyle}>
            {triboCriteria.map((item) => (
              <article key={item.name} style={cardStyle}>
                <div style={pointsStyle}>{item.points}</div>
                <div style={contentStyle}>
                  <h2 style={itemNameStyle}>{item.name}</h2>
                  {item.description && <p style={detailStyle}>{item.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

const pageStyle: React.CSSProperties = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '32px 20px 80px',
  minHeight: '100vh',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '24px',
}

const backLinkStyle: React.CSSProperties = {
  alignSelf: 'flex-start',
  color: '#c5a880',
  textDecoration: 'none',
  fontFamily: 'Outfit, sans-serif',
  fontWeight: 600,
  letterSpacing: '0.04em',
  fontSize: '0.95rem',
}

const titleBlockStyle: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.04)',
  borderRadius: '20px',
  padding: '24px 28px',
  boxShadow: '0 10px 35px rgba(0,0,0,0.2)',
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: '#c5a880',
  marginBottom: '8px',
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'Cinzel, serif',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '6px',
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  color: '#8d99ae',
  fontSize: '0.98rem',
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '28px',
}

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: 'Cinzel, serif',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '14px',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '16px',
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
  boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
}

const pointsStyle: React.CSSProperties = {
  minWidth: '54px',
  height: '54px',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #c5a880, #ffb703)',
  color: '#0b0c10',
  fontFamily: 'Cinzel, serif',
  fontSize: '1.15rem',
  fontWeight: 800,
}

const contentStyle: React.CSSProperties = {
  minWidth: 0,
}

const itemNameStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.98rem',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '4px',
}

const detailStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.85rem',
  color: '#8d99ae',
}
