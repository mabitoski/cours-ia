import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Zap, Globe, Award } from 'lucide-react'

const features = [
  {
    icon: <Globe size={24} color="#d4a017" />,
    title: 'Destinations Exclusives',
    desc: 'Accédez à des moments uniques de l\'Histoire, soigneusement sélectionnés pour leur richesse culturelle et leur sécurité.',
  },
  {
    icon: <Shield size={24} color="#d4a017" />,
    title: 'Voyages 100% Sécurisés',
    desc: 'Technologie de retour automatique, équipes d\'escorte temporelle et assurance complète incluse dans chaque forfait.',
  },
  {
    icon: <Zap size={24} color="#d4a017" />,
    title: 'Technologie de Pointe',
    desc: 'Nos chronoporteurs de dernière génération garantissent un atterrissage précis à la seconde près, n\'importe où dans l\'Histoire.',
  },
  {
    icon: <Award size={24} color="#d4a017" />,
    title: 'Expérience Premium',
    desc: 'Hébergements d\'époque reconstitués, guides historiques experts et gastronomie authentique à chaque destination.',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass-card"
      style={{ padding: '32px', borderRadius: '12px', flex: '1', minWidth: '220px' }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '12px',
        background: 'rgba(212,160,23,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px',
      }}>
        {feature.icon}
      </div>
      <h3 className="font-cinzel" style={{ fontSize: '16px', color: '#e8e0d0', marginBottom: '12px', fontWeight: 600 }}>
        {feature.title}
      </h3>
      <p style={{ fontSize: '14px', color: '#7a7060', lineHeight: 1.7 }}>{feature.desc}</p>
    </motion.div>
  )
}

export default function About() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="about" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '16px' }}>
          Qui sommes-nous
        </p>
        <h2 className="font-cinzel" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#e8e0d0', fontWeight: 700, marginBottom: '24px' }}>
          L'Agence qui réinvente
          <br />
          <span className="text-gold-gradient">le voyage</span>
        </h2>
        <p style={{ fontSize: '17px', color: '#7a7060', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
          Fondée par des passionnés d'Histoire et d'ingénierie temporelle, TimeTravel Agency
          offre des expériences de voyage uniques à travers les époques les plus fascinantes de l'humanité.
        </p>
      </motion.div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}
