import { motion } from 'framer-motion'
import { ArrowDown, Compass } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180,120,10,0.12) 0%, transparent 70%)',
      }} />

      {/* Decorative rings */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        borderRadius: '50%', border: '1px solid rgba(212,160,23,0.08)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '900px', height: '900px',
        borderRadius: '50%', border: '1px solid rgba(212,160,23,0.05)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '32px',
          }}
        >
          <Compass size={14} color="#d4a017" />
          <span style={{ fontSize: '12px', letterSpacing: '2px', color: '#d4a017', textTransform: 'uppercase' }}>
            Agence de Voyage Temporel · Depuis 2024
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-cinzel text-gold-gradient"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px' }}
        >
          VOYAGEZ
          <br />
          <span style={{ color: '#e8e0d0', WebkitTextFillColor: '#e8e0d0' }}>À TRAVERS</span>
          <br />
          LE TEMPS
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontSize: '18px', color: '#9a8f7a', maxWidth: '520px',
            margin: '0 auto 48px', lineHeight: 1.7,
          }}
        >
          Vivez l'Histoire de l'intérieur. Paris 1889, la Florence de la Renaissance,
          ou le Crétacé sauvage — chaque voyage est unique.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#destinations"
            className="btn-gold"
            style={{ padding: '16px 36px', borderRadius: '4px', fontSize: '14px', letterSpacing: '1.5px', textDecoration: 'none', display: 'inline-block' }}
          >
            EXPLORER LES DESTINATIONS
          </a>
          <a
            href="#about"
            style={{
              padding: '16px 36px', borderRadius: '4px', fontSize: '14px', letterSpacing: '1.5px',
              textDecoration: 'none', display: 'inline-block',
              border: '1px solid rgba(212,160,23,0.4)', color: '#d4a017',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,160,23,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            NOTRE AGENCE
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            display: 'flex', gap: '48px', justifyContent: 'center',
            marginTop: '80px', flexWrap: 'wrap',
          }}
        >
          {[
            { value: '3', label: 'Destinations' },
            { value: '1 200+', label: 'Voyageurs' },
            { value: '100%', label: 'Sécurisé' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div className="font-cinzel text-gold-gradient" style={{ fontSize: '32px', fontWeight: 700 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#6b6050', textTransform: 'uppercase', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#5a5040', textTransform: 'uppercase' }}>Découvrir</span>
        <ArrowDown size={16} color="#d4a017" />
      </motion.div>
    </section>
  )
}
