import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Calendar, Star, ChevronRight, X } from 'lucide-react'

const destinations = [
  {
    id: 'paris',
    era: '1889',
    name: 'Paris',
    subtitle: 'Belle Époque',
    emoji: '🗼',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    price: '12 500 €',
    duration: '7 jours',
    rating: 4.9,
    reviews: 312,
    color: '#c9a227',
    highlights: ['Tour Eiffel en construction', 'Exposition Universelle', 'Cafés de Montmartre', 'Impressionnisme naissant'],
    description: 'Plongez dans la splendeur de la Belle Époque. Paris 1889 vibre au rythme de l\'Exposition Universelle. Assistez à l\'inauguration de la Tour Eiffel, flânez dans les grands boulevards illuminés au gaz et rencontrez Monet, Toulouse-Lautrec et les grands esprits de l\'époque.',
    badge: 'Populaire',
  },
  {
    id: 'cretace',
    era: '-65 000 000',
    name: 'Crétacé',
    subtitle: 'Ère Mésozoïque',
    emoji: '🦕',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80',
    price: '18 900 €',
    duration: '5 jours',
    rating: 4.7,
    reviews: 148,
    color: '#2a8a4a',
    highlights: ['Tyrannosaures Rex', 'Forêts préhistoriques', 'Ptérosaures en vol', 'Paysages d\'avant l\'Homme'],
    description: 'Revenez 65 millions d\'années en arrière et vivez une expérience comme aucune autre. Observez des dinosaures en liberté depuis nos véhicules blindés, survolez des forêts ancestrales en dirigeable sécurisé et respirez un air encore pur de toute pollution.',
    badge: 'Aventure',
  },
  {
    id: 'florence',
    era: '1504',
    name: 'Florence',
    subtitle: 'Haute Renaissance',
    emoji: '🎨',
    image: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=80',
    price: '14 200 €',
    duration: '8 jours',
    rating: 4.8,
    reviews: 224,
    color: '#8a4a2a',
    highlights: ['Atelier de Michel-Ange', 'Léonard de Vinci', 'Palais Médicis', 'Naissance du David'],
    description: 'Florence 1504 : Michel-Ange vient d\'achever son David, Léonard de Vinci expérimente ses inventions et la famille Médicis règne sur les arts. Visitez les ateliers des plus grands maîtres, assistez à des banquets de la Renaissance et contemplez des chefs-d\'œuvre encore frais de peinture.',
    badge: 'Culture',
  },
]

function DestinationModal({ dest, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card"
        style={{
          borderRadius: '16px', maxWidth: '680px', width: '100%',
          overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
          <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,20,0.9) 0%, transparent 60%)' }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
            }}
          >
            <X size={18} />
          </button>
          <div style={{ position: 'absolute', bottom: '20px', left: '24px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#d4a017', textTransform: 'uppercase' }}>{dest.subtitle}</p>
            <h2 className="font-cinzel" style={{ fontSize: '32px', color: 'white', fontWeight: 700 }}>{dest.name} <span style={{ color: '#d4a017' }}>{dest.era}</span></h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          <p style={{ color: '#9a8f7a', lineHeight: 1.8, marginBottom: '28px' }}>{dest.description}</p>

          <h4 className="font-cinzel" style={{ fontSize: '13px', letterSpacing: '2px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '16px' }}>
            Expériences incluses
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
            {dest.highlights.map((h) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ChevronRight size={14} color="#d4a017" />
                <span style={{ fontSize: '14px', color: '#c8b87a' }}>{h}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#6b6050', marginBottom: '4px' }}>À partir de</p>
              <p className="font-cinzel text-gold-gradient" style={{ fontSize: '28px', fontWeight: 700 }}>{dest.price}</p>
              <p style={{ fontSize: '12px', color: '#6b6050' }}>par personne · {dest.duration}</p>
            </div>
            <button
              className="btn-gold"
              style={{ padding: '14px 28px', borderRadius: '6px', fontSize: '14px', letterSpacing: '1px' }}
            >
              Réserver ce voyage
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DestCard({ dest, index }) {
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setSelected(true)}
        style={{
          flex: '1', minWidth: '280px', maxWidth: '380px',
          borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
          border: `1px solid ${hovered ? dest.color + '60' : 'rgba(212,160,23,0.15)'}`,
          transition: 'all 0.4s ease',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hovered ? `0 20px 40px ${dest.color}22` : 'none',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        {/* Image */}
        <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
          <motion.img
            src={dest.image}
            alt={dest.name}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,20,0.85) 0%, transparent 55%)' }} />

          {/* Badge */}
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            background: dest.color, borderRadius: '4px', padding: '4px 10px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#080c14', letterSpacing: '1px' }}>{dest.badge}</span>
          </div>

          {/* Emoji era */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
            <span style={{ fontSize: '28px' }}>{dest.emoji}</span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '2px', color: dest.color, textTransform: 'uppercase', marginBottom: '4px' }}>
                {dest.subtitle}
              </p>
              <h3 className="font-cinzel" style={{ fontSize: '22px', color: '#e8e0d0', fontWeight: 700 }}>
                {dest.name} <span style={{ color: dest.color }}>{dest.era}</span>
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <Star size={13} fill="#d4a017" color="#d4a017" />
                <span style={{ fontSize: '13px', color: '#c8b87a', fontWeight: 600 }}>{dest.rating}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#5a5040' }}>({dest.reviews} avis)</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={12} color="#6b6050" />
              <span style={{ fontSize: '12px', color: '#6b6050' }}>{dest.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={12} color="#6b6050" />
              <span style={{ fontSize: '12px', color: '#6b6050' }}>{dest.era.startsWith('-') ? 'Mésozoïque' : 'Europe'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#5a5040' }}>À partir de </span>
              <span className="font-cinzel" style={{ fontSize: '18px', color: dest.color, fontWeight: 700 }}>{dest.price}</span>
            </div>
            <motion.div
              animate={{ x: hovered ? 4 : 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d4a017', fontSize: '13px' }}
            >
              Découvrir <ChevronRight size={14} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {selected && <DestinationModal dest={dest} onClose={() => setSelected(false)} />}
    </>
  )
}

export default function Destinations() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="destinations" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: '72px' }}
      >
        <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '16px' }}>
          Nos destinations
        </p>
        <h2 className="font-cinzel" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#e8e0d0', fontWeight: 700, marginBottom: '20px' }}>
          Choisissez votre
          <br />
          <span className="text-gold-gradient">époque</span>
        </h2>
        <p style={{ fontSize: '16px', color: '#7a7060', maxWidth: '500px', margin: '0 auto' }}>
          Trois destinations, trois aventures uniques. Cliquez sur une carte pour découvrir les détails.
        </p>
      </motion.div>

      <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {destinations.map((d, i) => (
          <DestCard key={d.id} dest={d} index={i} />
        ))}
      </div>
    </section>
  )
}
