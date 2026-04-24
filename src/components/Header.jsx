import { useState, useEffect } from 'react'
import { Clock, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#about', label: 'Agence' },
  { href: '#quiz', label: 'Quiz' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(8,12,20,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,160,23,0.15)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #b8860b, #d4a017)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Clock size={20} color="#080c14" />
            </div>
            <span className="font-cinzel text-gold-gradient" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '2px' }}>
              TIMETRAVEL
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: '#c8b87a',
                  textDecoration: 'none',
                  fontSize: '14px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#f5d060')}
                onMouseLeave={(e) => (e.target.style.color = '#c8b87a')}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#destinations"
              className="btn-gold"
              style={{ padding: '10px 22px', borderRadius: '4px', fontSize: '13px', letterSpacing: '1px', textDecoration: 'none' }}
            >
              Réserver
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#d4a017', cursor: 'pointer' }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}
