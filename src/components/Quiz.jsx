import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react'

const questions = [
  {
    id: 1,
    text: 'Quel type d\'expérience recherchez-vous ?',
    options: [
      { label: 'Culturelle et artistique', value: 'culture' },
      { label: 'Aventure et nature', value: 'adventure' },
      { label: 'Élégance et raffinement', value: 'elegance' },
    ],
  },
  {
    id: 2,
    text: 'Votre période préférée ?',
    options: [
      { label: 'Histoire moderne (XIXe-XXe siècle)', value: 'modern' },
      { label: 'Temps anciens et origines', value: 'ancient' },
      { label: 'Renaissance et classicisme', value: 'renaissance' },
    ],
  },
  {
    id: 3,
    text: 'Vous préférez :',
    options: [
      { label: 'L\'effervescence urbaine', value: 'urban' },
      { label: 'La nature sauvage', value: 'wild' },
      { label: 'L\'art et l\'architecture', value: 'art' },
    ],
  },
  {
    id: 4,
    text: 'Votre activité idéale :',
    options: [
      { label: 'Visiter des monuments emblématiques', value: 'monuments' },
      { label: 'Observer la faune préhistorique', value: 'fauna' },
      { label: 'Explorer des ateliers d\'artistes', value: 'artists' },
    ],
  },
]

const results = {
  paris: {
    name: 'Paris 1889',
    emoji: '🗼',
    color: '#c9a227',
    desc: 'Vous êtes fait pour la Belle Époque ! L\'effervescence de Paris, l\'Exposition Universelle et la Tour Eiffel toute neuve vous attendent. Un voyage entre élégance, culture et modernité naissante.',
    price: '12 500 €',
  },
  cretace: {
    name: 'Crétacé -65M',
    emoji: '🦕',
    color: '#2a8a4a',
    desc: 'L\'aventurier en vous aspire aux grands espaces ! Le Crétacé vous réserve des rencontres avec des créatures dont vous n\'avez jamais rêvé — dans un environnement sauvage et préservé.',
    price: '18 900 €',
  },
  florence: {
    name: 'Florence 1504',
    emoji: '🎨',
    color: '#8a4a2a',
    desc: 'Votre âme est celle d\'un humaniste de la Renaissance ! Florence 1504, avec Michel-Ange, Léonard de Vinci et la famille Médicis, est votre destination idéale pour l\'art et la beauté.',
    price: '14 200 €',
  },
}

function getResult(answers) {
  const scores = { paris: 0, cretace: 0, florence: 0 }
  const map = {
    culture: 'florence', adventure: 'cretace', elegance: 'paris',
    modern: 'paris', ancient: 'cretace', renaissance: 'florence',
    urban: 'paris', wild: 'cretace', art: 'florence',
    monuments: 'paris', fauna: 'cretace', artists: 'florence',
  }
  answers.forEach((a) => { if (map[a]) scores[map[a]]++ })
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
}

export default function Quiz() {
  const [step, setStep] = useState(0) // 0 = intro
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-60px' })

  const handleAnswer = (value) => {
    const next = [...answers, value]
    if (step < questions.length) {
      setAnswers(next)
      if (step === questions.length) {
        setResult(getResult(next))
      } else {
        setStep(step + 1)
        if (step + 1 > questions.length) {
          setResult(getResult(next))
        }
      }
    }
  }

  const currentQ = questions[step - 1]
  const res = result ? results[result] : null

  return (
    <section id="quiz" style={{ padding: '120px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '16px' }}>
          Personnalisation
        </p>
        <h2 className="font-cinzel" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8e0d0', fontWeight: 700, marginBottom: '16px' }}>
          Quelle époque
          <br />
          <span className="text-gold-gradient">vous correspond ?</span>
        </h2>
        <p style={{ fontSize: '15px', color: '#7a7060' }}>4 questions pour trouver votre destination idéale</p>
      </motion.div>

      <div className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">

          {/* Intro */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ padding: '56px', textAlign: 'center' }}
            >
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>⏳</div>
              <h3 className="font-cinzel" style={{ fontSize: '22px', color: '#e8e0d0', marginBottom: '16px' }}>
                Découvrez votre destination temporelle
              </h3>
              <p style={{ color: '#7a7060', marginBottom: '40px', lineHeight: 1.7 }}>
                Répondez à 4 questions rapides et notre algorithme vous révèlera<br />
                l'époque qui correspond le mieux à votre personnalité.
              </p>
              <button
                className="btn-gold"
                style={{ padding: '16px 36px', borderRadius: '8px', fontSize: '14px', letterSpacing: '1px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                onClick={() => setStep(1)}
              >
                <Sparkles size={16} /> Commencer le quiz
              </button>
            </motion.div>
          )}

          {/* Question */}
          {step >= 1 && step <= questions.length && !result && (
            <motion.div
              key={`q${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              style={{ padding: '48px' }}
            >
              {/* Progress */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '36px' }}>
                {questions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1, height: '3px', borderRadius: '2px',
                      background: i < step ? '#d4a017' : 'rgba(212,160,23,0.2)',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>

              <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#6b6050', textTransform: 'uppercase', marginBottom: '12px' }}>
                Question {step} / {questions.length}
              </p>
              <h3 className="font-cinzel" style={{ fontSize: '22px', color: '#e8e0d0', marginBottom: '32px', fontWeight: 600 }}>
                {currentQ.text}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQ.options.map((opt) => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const next = [...answers, opt.value]
                      setAnswers(next)
                      if (step >= questions.length) {
                        setResult(getResult(next))
                      } else {
                        setStep(step + 1)
                      }
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,160,23,0.2)',
                      borderRadius: '10px', padding: '18px 24px', textAlign: 'left', cursor: 'pointer',
                      color: '#c8b87a', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(212,160,23,0.5)'; e.currentTarget.style.background = 'rgba(212,160,23,0.07)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(212,160,23,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  >
                    {opt.label}
                    <ChevronRight size={16} color="#d4a017" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {result && res && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '56px', textAlign: 'center' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                style={{ fontSize: '80px', marginBottom: '16px' }}
              >
                {res.emoji}
              </motion.div>
              <p style={{ fontSize: '12px', letterSpacing: '3px', color: '#d4a017', textTransform: 'uppercase', marginBottom: '12px' }}>
                Votre destination idéale
              </p>
              <h3 className="font-cinzel" style={{ fontSize: '32px', color: '#e8e0d0', fontWeight: 700, marginBottom: '20px' }}>
                {res.name}
              </h3>
              <p style={{ color: '#9a8f7a', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 32px' }}>
                {res.desc}
              </p>
              <div style={{ marginBottom: '32px' }}>
                <span style={{ fontSize: '12px', color: '#6b6050' }}>À partir de </span>
                <span className="font-cinzel text-gold-gradient" style={{ fontSize: '26px', fontWeight: 700 }}>{res.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  className="btn-gold"
                  style={{ padding: '14px 28px', borderRadius: '6px', fontSize: '13px', letterSpacing: '1px' }}
                  onClick={() => document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' })}
                >
                  Voir la destination
                </button>
                <button
                  onClick={() => { setStep(0); setAnswers([]); setResult(null) }}
                  style={{
                    padding: '14px 24px', borderRadius: '6px', fontSize: '13px',
                    background: 'none', border: '1px solid rgba(212,160,23,0.3)', color: '#d4a017', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  <RotateCcw size={14} /> Recommencer
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
