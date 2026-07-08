import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import type { MemberData } from '../utils/sheets'

interface DadosPageProps {
  members: Record<string, MemberData[]>
}

// Configuração visual de cada tribo (espelhando TribeCard)
const tribeConfigs: Record<string, {
  label: string
  primaryColor: string
  glowColor: string
  bgGradient: string
  borderColor: string
  logoPath: string
  headerBg: string
}> = {
  judarion: {
    label: 'Judarion',
    primaryColor: '#ff2a2a',
    glowColor: 'rgba(255, 42, 42, 0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(20,10,10,0.88) 0%, rgba(45,12,12,0.93) 100%)',
    borderColor: 'rgba(255, 42, 42, 0.25)',
    logoPath: '/judarion.png',
    headerBg: 'rgba(255, 42, 42, 0.08)',
  },
  levior: {
    label: 'Levior',
    primaryColor: '#9d4edd',
    glowColor: 'rgba(157, 78, 221, 0.4)',
    bgGradient: 'linear-gradient(135deg, rgba(12,10,20,0.88) 0%, rgba(26,12,45,0.93) 100%)',
    borderColor: 'rgba(157, 78, 221, 0.25)',
    logoPath: '/levior.png',
    headerBg: 'rgba(157, 78, 221, 0.08)',
  },
  benjarion: {
    label: 'Benjarion',
    primaryColor: '#e63946',
    glowColor: 'rgba(230, 57, 70, 0.4)',
    bgGradient: 'linear-gradient(135deg, #18191f 0%, #251618 100%)',
    borderColor: 'rgba(230, 57, 70, 0.3)',
    logoPath: '/benjarion.png',
    headerBg: 'rgba(230, 57, 70, 0.08)',
  },
  danvar: {
    label: 'Danvar',
    primaryColor: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    bgGradient: 'linear-gradient(135deg, #0d0d0d 0%, #1c1915 100%)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
    logoPath: '/danvar.png',
    headerBg: 'rgba(212, 175, 55, 0.08)',
  },
}

const TRIBE_ORDER = ['judarion', 'levior', 'benjarion', 'danvar']

const TribeSection: React.FC<{ tribeKey: string; members: MemberData[] }> = ({ tribeKey, members }) => {
  const config = tribeConfigs[tribeKey]
  const [imgError, setImgError] = useState(false)

  if (!config) return null

  return (
    <section
      className="glass"
      style={{
        background: config.bgGradient,
        border: `1px solid ${config.borderColor}`,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${config.borderColor}`,
        animation: 'fadeInUp 0.7s ease-out forwards',
      }}
    >
      {/* Cabeçalho da Seção */}
      <div
        style={{
          background: config.headerBg,
          borderBottom: `1px solid ${config.borderColor}`,
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Logo da Tribo */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: `0 0 20px ${config.glowColor}`,
          }}
        >
          {!imgError ? (
            <img
              src={config.logoPath}
              alt={`Brasão ${config.label}`}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: 'scale(1.65)',
                mixBlendMode: 'multiply',
              }}
            />
          ) : (
            <span style={{ fontSize: '1.8rem' }}>⚔️</span>
          )}
        </div>

        {/* Nome da Tribo + contador */}
        <div>
          <h2
            style={{
              fontFamily: "'GC Grind', sans-serif",
              fontSize: '2rem',
              fontWeight: 'normal',
              color: config.primaryColor,
              letterSpacing: '2px',
              textShadow: `0 0 20px ${config.glowColor}`,
              margin: 0,
            }}
          >
            {config.label.toUpperCase()}
          </h2>
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}
          >
            {members.length} participante{members.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Linha decorativa */}
        <div
          style={{
            flex: 1,
            height: '1px',
            background: `linear-gradient(90deg, ${config.primaryColor}44, transparent)`,
            marginLeft: '8px',
          }}
        />
      </div>

      {/* Tabela de participantes */}
      <div style={{ overflowX: 'auto' }}>
        {members.length === 0 ? (
          <p
            style={{
              padding: '40px',
              textAlign: 'center',
              fontFamily: 'Outfit, sans-serif',
              color: 'rgba(255,255,255,0.25)',
              fontSize: '0.9rem',
            }}
          >
            Nenhum participante carregado.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.25)' }}>
                <th style={theadCellStyle}>#</th>
                <th style={{ ...theadCellStyle, textAlign: 'left', paddingLeft: '20px' }}>Nome</th>
                <th style={theadCellStyle}>Idade</th>
                <th style={theadCellStyle}>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <MemberRow key={i} member={m} index={i} config={config} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

// Separado para poder usar hooks de hover com estado
const MemberRow: React.FC<{
  member: MemberData
  index: number
  config: typeof tribeConfigs[string]
}> = ({ member, index, config }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <tr
      style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: hovered
          ? `${config.primaryColor}11`
          : index % 2 === 0
          ? 'transparent'
          : 'rgba(255,255,255,0.02)',
        transition: 'background 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Número da linha */}
      <td style={{ ...tdStyle, color: config.primaryColor, opacity: 0.6, fontWeight: 800, width: '60px' }}>
        {String(index + 1).padStart(2, '0')}
      </td>
      {/* Nome */}
      <td style={{ ...tdStyle, textAlign: 'left', paddingLeft: '20px', fontWeight: 500, color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: config.primaryColor,
              flexShrink: 0,
              opacity: 0.8,
              boxShadow: `0 0 6px ${config.glowColor}`,
            }}
          />
          {member.name}
        </div>
      </td>
      {/* Idade */}
      <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.55)' }}>
        {member.age !== undefined ? `${member.age} anos` : '—'}
      </td>
      {/* Telefone */}
      <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
        {member.phone ?? '—'}
      </td>
    </tr>
  )
}

export const DadosPage: React.FC<DadosPageProps> = ({ members }) => {
  return (
    <div style={pageContainerStyle}>
      {/* ===== HEADER ===== */}
      <header className="animate-fade-in" style={headerStyle}>
        <Link to="/" style={{ textDecoration: 'none', position: 'relative', display: 'inline-block' }}>
          <div style={logoWrapperStyle}>
            <img
              src="/overcome camp alfa.png"
              alt="Overcome Camp"
              style={{
                ...logoStyle,
                transition: 'transform 0.3s ease, filter 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.07)'
                ;(e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 4px 25px rgba(212,175,55,0.6))'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'
                ;(e.currentTarget as HTMLImageElement).style.filter = 'drop-shadow(0 4px 15px rgba(0,0,0,0.6))'
              }}
            />
            <div style={logoGlowStyle} />
          </div>
        </Link>

        <div style={titleContainerStyle}>
          <h1 style={titleStyle}>OVERCOME CAMP</h1>
          <p style={subtitleStyle}>PARTICIPANTES</p>
          <p style={subSubtitleStyle}>INFORMAÇÕES</p>
        </div>
      </header>

      {/* ===== SEÇÕES DAS TRIBOS ===== */}
      <main style={mainStyle}>
        {TRIBE_ORDER.map((key) => (
          <TribeSection
            key={key}
            tribeKey={key}
            members={members[key] ?? []}
          />
        ))}
      </main>

      {/* ===== FOOTER ===== */}
      <footer style={footerStyle}>
        <p>© {new Date().getFullYear()} Overcome Camp - ICIR. Todos os direitos reservados.</p>
        <p style={{ marginTop: '5px', fontSize: '0.75rem', opacity: 0.5 }}>"Porque Cristo venceu o mundo e nós vencemos n'Ele."</p>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ─── Estilos ───────────────────────────────────────────────────────────────────

const pageContainerStyle: React.CSSProperties = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 20px 60px 20px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px 30px 20px',
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
  background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0) 70%)',
  zIndex: 1,
  filter: 'blur(10px)',
}

const titleContainerStyle: React.CSSProperties = {
  marginBottom: '20px',
}

const titleStyle: React.CSSProperties = {
  fontFamily: "'GC Grind', sans-serif",
  fontSize: '3rem',
  fontWeight: 'normal',
  color: '#ffffff',
  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
  margin: 0,
  letterSpacing: '2px',
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '1rem',
  fontWeight: 800,
  color: '#c5a880',
  letterSpacing: '6px',
  textTransform: 'uppercase',
  marginTop: '8px',
}

const subSubtitleStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '5px',
  textTransform: 'uppercase',
  marginTop: '4px',
}

const mainStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  flex: 1,
}

const theadCellStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '2px',
  color: 'rgba(255,255,255,0.35)',
  padding: '14px 20px',
  textAlign: 'center',
}

const tdStyle: React.CSSProperties = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 400,
  color: 'rgba(255,255,255,0.7)',
  padding: '14px 20px',
  textAlign: 'center',
}

const footerStyle: React.CSSProperties = {
  marginTop: 'auto',
  paddingTop: '60px',
  textAlign: 'center',
  fontFamily: 'Outfit, sans-serif',
  fontSize: '0.85rem',
  color: '#8d99ae',
}
