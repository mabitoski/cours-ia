import { Clock, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(212,160,23,0.1)',
      padding: '80px 24px 40px',
      background: 'rgba(0,0,0,0.3)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', marginBottom: '60px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #b8860b, #d4a017)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Clock size={18} color="#080c14" />
              </div>
              <span className="font-cinzel text-gold-gradient" style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '2px' }}>
                TIMETRAVEL
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#6b6050', lineHeight: 1.7, maxWidth: '240px' }}>
              L'agence de voyage temporel de luxe. Vivez l'Histoire, ne lisez plus l'Histoire.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: '13px', letterSpacing: '2px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '20px' }}>
              Destinations
            </h4>
            {['Paris 1889', 'Crétacé -65M', 'Florence 1504'].map((d) => (
              <a
                key={d}
                href="#destinations"
                style={{ display: 'block', color: '#6b6050', fontSize: '14px', marginBottom: '10px', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.target.style.color = '#c8b87a')}
                onMouseLeave={(e) => (e.target.style.color = '#6b6050')}
              >
                {d}
              </a>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: '13px', letterSpacing: '2px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '20px' }}>
              Services
            </h4>
            {['Voyages individuels', 'Groupes & entreprises', 'Honeymoon temporel', 'Assurance voyage', 'Guide expert inclus'].map((s) => (
              <p key={s} style={{ color: '#6b6050', fontSize: '14px', marginBottom: '10px' }}>{s}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: '13px', letterSpacing: '2px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '20px' }}>
              Contact
            </h4>
            {[
              { icon: <Mail size={14} />, text: 'contact@timetravel.agency' },
              { icon: <Phone size={14} />, text: '+33 1 89 XX XX XX' },
              { icon: <MapPin size={14} />, text: '12 Rue du Chrono, Paris' },
            ].map((c) => (
              <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6b6050', fontSize: '14px', marginBottom: '12px' }}>
                <span style={{ color: '#d4a017' }}>{c.icon}</span>
                {c.text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(212,160,23,0.08)', paddingTop: '32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ fontSize: '13px', color: '#3a3020' }}>
            © 2024 TimeTravel Agency · Projet pédagogique M1/M2 Digital & IA
          </p>
          <p style={{ fontSize: '12px', color: '#3a3020' }}>
            Voyages fictifs · Aucun paradoxe temporel garanti
          </p>
        </div>
      </div>
    </footer>
  )
}
