import React, { useEffect, useState, useRef } from 'react'
import type { MemberData } from '../utils/sheets'

interface TribeCardProps {
  name: string;
  points: number;
  maxPoints: number;
  rank: number;
  isEqual?: boolean;
  members?: MemberData[];
}

// Hook personalizado para animar números de forma suave
const useAnimatedCounter = (targetValue: number, duration: number = 1000) => {
  const [count, setCount] = useState(0)
  const previousValueRef = useRef(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const startValue = previousValueRef.current
    const diff = targetValue - startValue

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentValue = Math.floor(startValue + progress * diff)
      setCount(currentValue)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(targetValue)
        previousValueRef.current = targetValue
      }
    }

    window.requestAnimationFrame(step)
  }, [targetValue, duration])

  return count
}

export const TribeCard: React.FC<TribeCardProps> = ({ name, points, maxPoints, rank, isEqual = false, members = [] }) => {
  const animatedPoints = useAnimatedCounter(points)

  // Calcula a porcentagem para a barra de progresso.
  // Evita divisão por zero. Se maxPoints for 0, coloca 0.
  const progressPercentage = maxPoints > 0 ? (points / maxPoints) * 100 : 0

  // Configurações visuais específicas de cada tribo
  const getTribeConfigs = (tribeName: string) => {
    switch (tribeName.toLowerCase()) {
      case 'judarion':
        return {
          primaryColor: 'var(--color-judarion)',
          glowColor: 'var(--color-judarion-glow)',
          bgStyle: {
            background: 'linear-gradient(135deg, rgba(20, 10, 10, 0.9) 0%, rgba(45, 12, 12, 0.95) 100%)',
            borderColor: 'var(--color-judarion-border)',
          },
          badgeColor: '#ff2a2a',
          logoPath: '/judarion.png', // Leão
          fallbackIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="tribe-svg">
              {/* Ícone de Leão minimalista */}
              <circle cx="12" cy="11" r="5" stroke="currentColor" />
              <path d="M12 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" />
              <path d="M7 11c0-4 3-7 5-7s5 3 5 7" />
              <path d="M12 16v4m-3 0h6" strokeLinecap="round" />
            </svg>
          )
        }
      case 'danvar':
        return {
          primaryColor: 'var(--color-danvar)',
          glowColor: 'var(--color-danvar-glow)',
          bgStyle: {
            background: 'linear-gradient(135deg, #0d0d0d 0%, #1c1915 100%)',
            borderColor: 'var(--color-danvar-border)',
          },
          badgeColor: '#d4af37',
          logoPath: '/danvar.png', // Águia
          fallbackIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="tribe-svg">
              {/* Ícone de Águia / Asas */}
              <path d="M12 4L4 9l8 3 8-3-8-5z" />
              <path d="M4 9v4c0 3 4 5 8 5s8-2 8-5V9" />
              <path d="M12 12v6" />
            </svg>
          )
        }
      case 'benjarion':
        return {
          primaryColor: 'var(--color-benjarion)',
          glowColor: 'var(--color-benjarion-glow)',
          bgStyle: {
            background: 'linear-gradient(135deg, #18191f 0%, #251618 100%)',
            borderColor: 'var(--color-benjarion-border)',
          },
          badgeColor: '#359bd6ff',
          logoPath: '/benjarion.png',
          fallbackIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="tribe-svg">
              <path d="M12 3l3 4 5 1-4 4 1 5-5-3-5 3 1-5-4-4 5-1 3-4z" />
            </svg>
          )
        }
      case 'levior':
        return {
          primaryColor: 'var(--color-levior)',
          glowColor: 'var(--color-levior-glow)',
          bgStyle: {
            background: 'linear-gradient(135deg, rgba(12, 10, 20, 0.9) 0%, rgba(26, 12, 45, 0.95) 100%)',
            borderColor: 'var(--color-levior-border)',
          },
          badgeColor: '#9d4edd',
          logoPath: '/levior.png',
          fallbackIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="tribe-svg">
              {/* Ícone de Fogo/Altar */}
              <path d="M12 2c0 0-4 4.5-4 8a4 4 0 0 0 8 0c0-3.5-4-8-4-8z" />
              <path d="M12 6c0 0-2 2-2 4a2 2 0 0 0 4 0c0-2-2-4-2-4z" />
              <path d="M6 20h12M8 17h8" strokeLinecap="round" />
            </svg>
          )
        }
      default:
        return {
          primaryColor: '#ffffff',
          glowColor: 'rgba(255,255,255,0.2)',
          bgStyle: {
            background: 'rgba(15,15,15,0.9)',
            borderColor: 'rgba(255,255,255,0.1)',
          },
          badgeColor: '#fff',
          logoPath: '',
          fallbackIcon: null
        }
    }
  }

  const config = getTribeConfigs(name)

  // Determina a medalha/badge do ranking
  const getRankBadge = (rankNum: number) => {
    switch (rankNum) {
      case 1:
        return <span style={{ ...rankBadgeStyle, background: 'linear-gradient(45deg, #ffe066, #f5b041)' }}>1º Lugar</span>
      case 2:
        return <span style={{ ...rankBadgeStyle, background: 'linear-gradient(45deg, #e2e2e2, #9a9a9a)' }}>2º Lugar</span>
      case 3:
        return <span style={{ ...rankBadgeStyle, background: 'linear-gradient(45deg, #e59866, #ba4a00)' }}>3º Lugar</span>
      default:
        return <span style={{ ...rankBadgeStyle, background: 'linear-gradient(45deg, #566573, #2c3e50)' }}>{rankNum}º Lugar</span>
    }
  }
  // Estado para fallback de imagem
  const [imageError, setImageError] = useState(false)

  // Separa líderes dos membros comuns
  const leaders = members.filter((m) => m.isLeader)
  const regularMembers = members.filter((m) => !m.isLeader)

  return (
    <div
      className="glass pulse-glow"
      style={{
        ...cardStyle,
        ...config.bgStyle,
        '--glow-color': config.glowColor,
      } as any}
    >
      <div style={topRowStyle}>
        {!isEqual && getRankBadge(rank)}
        <span style={{ ...pointsLabelStyle, ...(isEqual ? { width: '100%', textAlign: 'center' } : {}) }}>{animatedPoints.toLocaleString('pt-BR')} PTS</span>
      </div>

      <div style={{
        ...logoContainerStyle,
        width: isEqual ? '180px' : '140px',
        height: isEqual ? '180px' : '140px',
        marginBottom: isEqual ? '28px' : '20px',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {!imageError && config.logoPath ? (
          <div style={logoWrapperStyle}>
            <img
              src={config.logoPath}
              alt={`Brasão ${name}`}
              onError={() => setImageError(true)}
              style={logoImgStyle}
            />
          </div>
        ) : (
          <div style={fallbackIconWrapperStyle(config.primaryColor)}>
            {config.fallbackIcon}
          </div>
        )}
      </div>

      <div style={infoContainerStyle}>
        <h2 style={{ ...tribeNameStyle, color: config.primaryColor }}>{name}</h2>
        {leaders.length > 0 && (
          <div style={leadersWrapperStyle}>
            {leaders.map((l, i) => (
              <span key={i} style={leaderBadgeStyle(config.primaryColor)}>
                👑 {l.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={progressContainerStyle}>
        <div style={progressBarBgStyle}>
          <div
            style={{
              ...progressBarFillStyle,
              width: `${Math.max(progressPercentage, 3)}%`, // Mínimo de 3% para visualização
              background: `linear-gradient(90deg, ${config.primaryColor} 0%, #ffffff 100%)`,
              boxShadow: `0 0 10px ${config.primaryColor}`,
            }}
          ></div>
        </div>
        <div style={progressTextStyle}>
          {/*   <span>Progresso</span> */}
          {/* <span>{Math.round(progressPercentage)}%</span> */}
        </div>
      </div>

      {regularMembers.length > 0 && (
        <div style={membersSectionStyle}>
          <div style={membersDividerStyle(config.primaryColor)} />
          <p style={membersTitleStyle}>Membros</p>
          <ul style={membersListStyle}>
            {regularMembers.map((m, i) => (
              <li key={i} style={memberItemStyle}>
                <span style={memberDotStyle(config.primaryColor)} />
                {m.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Estilos inline de alta qualidade
const cardStyle: React.CSSProperties = {
  flex: '1 1 280px',
  maxWidth: '360px',
  minWidth: '280px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
  overflow: 'hidden',
  cursor: 'pointer',
}

const topRowStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  zIndex: 2,
}

const rankBadgeStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.8rem',
  fontWeight: 800,
  padding: '6px 12px',
  borderRadius: '20px',
  color: '#000',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}

const pointsLabelStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#ffffff',
  textShadow: '0 0 10px rgba(255,255,255,0.2)',
}

const logoContainerStyle: React.CSSProperties = {
  height: '140px',
  width: '140px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  position: 'relative',
  zIndex: 2,
}

const logoWrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  background: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
}

const logoImgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  transform: 'scale(1.65)',
  mixBlendMode: 'multiply',
  transition: 'transform 0.5s ease',
}

const fallbackIconWrapperStyle = (color: string): React.CSSProperties => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.02)',
  border: `1.5px dashed ${color}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color,
  padding: '25px',
})

const infoContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '25px',
  zIndex: 2,
}

const tribeNameStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 800,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
}

// --- Estilos dos líderes ---

const leadersWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '6px',
  marginTop: '8px',
}

const leaderBadgeStyle = (color: string): React.CSSProperties => ({
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.72rem',
  fontWeight: 600,
  color: color,
  background: `${color}1a`,
  border: `1px solid ${color}55`,
  borderRadius: '20px',
  padding: '3px 10px',
  letterSpacing: '0.3px',
  textTransform: 'none',
})

const progressContainerStyle: React.CSSProperties = {
  width: '100%',
  marginTop: 'auto',
  zIndex: 2,
}

const progressBarBgStyle: React.CSSProperties = {
  width: '100%',
  height: '8px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '4px',
  overflow: 'hidden',
  marginBottom: '8px',
  border: '1px solid rgba(255, 255, 255, 0.02)',
}

const progressBarFillStyle: React.CSSProperties = {
  height: '100%',
  borderRadius: '4px',
  transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
}

const progressTextStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.8rem',
  color: '#8d99ae',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}

// --- Estilos da seção de membros ---

const membersSectionStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '20px',
  zIndex: 2,
}

const membersDividerStyle = (color: string): React.CSSProperties => ({
  height: '1px',
  background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
  marginBottom: '14px',
})

const membersTitleStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  color: 'rgba(255,255,255,0.3)',
  marginBottom: '10px',
}

const membersListStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  maxHeight: '180px',
  overflowY: 'auto',
  paddingRight: '4px',
}

const memberItemStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.82rem',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.65)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  lineHeight: 1.3,
}

const memberDotStyle = (color: string): React.CSSProperties => ({
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  background: color,
  flexShrink: 0,
  opacity: 0.7,
})
