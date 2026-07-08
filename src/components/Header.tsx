import React from 'react'

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated: Date | null;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading, lastUpdated }) => {
  const formatTime = (date: Date | null) => {
    if (!date) return 'Nunca'
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <header className="animate-fade-in" style={headerStyle}>
      <div style={logoWrapperStyle}>
        <img
          src="/overcome camp alfa.png"
          alt="Overcome Camp"
          style={logoStyle}
        />
        <div style={logoGlowStyle}></div>
      </div>

      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>OVERCOME CAMP</h1>
        <p style={subtitleStyle}>PLACAR DAS TRIBOS</p>
      </div>

      <div style={syncContainerStyle}>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          style={{
            ...buttonStyle,
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          <svg
            style={{
              ...spinnerStyle,
              animation: isLoading ? 'spin 1s linear infinite' : 'none',
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          {isLoading ? 'Sincronizando...' : 'Atualizar Placar'}
        </button>

        <span style={timeStyle}>
          Última atualização: <strong style={{ color: '#ffb703' }}>{formatTime(lastUpdated)}</strong>
        </span>
      </div>

      {/* Inserindo animação do spinner diretamente */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  )
}

// Estilos em JavaScript (Vanilla CSS inline para controle preciso e performance)
const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px 20px 20px',
  textAlign: 'center',
  position: 'relative',
  zIndex: 10,
}

const logoWrapperStyle: React.CSSProperties = {
  position: 'relative',
  marginBottom: '20px',
}

const logoStyle: React.CSSProperties = {
  height: '160px',
  width: 'auto',
  objectFit: 'contain',
  position: 'relative',
  zIndex: 2,
  filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.6))',
}

const logoGlowStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0) 70%)',
  zIndex: 1,
  filter: 'blur(10px)',
}

const titleContainerStyle: React.CSSProperties = {
  marginBottom: '25px',
}

const titleStyle: React.CSSProperties = {
  fontFamily: "'GC Grind', sans-serif",
  fontSize: '3rem',
  fontWeight: 'normal',
  color: '#ffffff',
  WebkitTextFillColor: '#ffffff',
  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
  margin: 0,
  letterSpacing: '2px',
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#c5a880',
  letterSpacing: '5px',
  textTransform: 'uppercase',
  marginTop: '5px',
}

const syncContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
}

const buttonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '30px',
  color: '#fff',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.95rem',
  fontWeight: 600,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(5px)',
}

const spinnerStyle: React.CSSProperties = {
  width: '16px',
  height: '16px',
}

const timeStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.85rem',
  color: '#8d99ae',
}
