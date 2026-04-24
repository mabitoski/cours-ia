import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader } from 'lucide-react'

const SYSTEM_PROMPT = `Tu es ChronoBot, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton : professionnel mais chaleureux, passionné d'histoire, toujours enthousiaste sans être trop familier.

Tu connais parfaitement ces 3 destinations :
- **Paris 1889** (Belle Époque) : Exposition Universelle, inauguration de la Tour Eiffel, cafés de Montmartre, impressionnisme. Prix : à partir de 12 500€. Durée : 7 jours.
- **Crétacé -65 000 000 ans** : dinosaures (T-Rex, Brachiosaure, Ptérosaures), forêts préhistoriques, nature sauvage. Prix : à partir de 18 900€. Durée : 5 jours.
- **Florence 1504** (Haute Renaissance) : Michel-Ange, Léonard de Vinci, famille Médicis, naissance du David, ateliers d'artistes. Prix : à partir de 14 200€. Durée : 8 jours.

Tu réponds en français. Tu es bref et précis (max 3 phrases). Tu proposes toujours de l'aide supplémentaire.`

const QUICK_REPLIES = [
  'Parle-moi de Paris 1889',
  'Le Crétacé, c\'est dangereux ?',
  'Quel est le prix des voyages ?',
  'Comment choisir ma destination ?',
]

// Fallback responses when no API key
const FALLBACK_RESPONSES = {
  default: [
    "Bonjour ! Je suis ChronoBot, votre guide temporel chez TimeTravel Agency. Nous proposons 3 destinations exceptionnelles : Paris 1889, le Crétacé -65M et Florence 1504. Laquelle vous attire ?",
    "Excellente question ! Nos voyages temporels sont entièrement sécurisés avec retour automatique garanti. Souhaitez-vous des détails sur une destination en particulier ?",
    "Je comprends votre enthousiasme ! Chaque voyage est une aventure unique. Puis-je vous recommander une destination selon vos centres d'intérêt ?",
  ],
  paris: "Paris 1889, c'est la magie de la Belle Époque ! L'Exposition Universelle bat son plein, la Tour Eiffel vient d'être inaugurée et les Impressionnistes révolutionnent l'art. Un voyage incontournable à 12 500€ pour 7 jours. Vous souhaitez réserver ?",
  cretace: "Le Crétacé est notre destination la plus aventureuse ! Vous observerez des T-Rex, Brachiosaures et Ptérosaures depuis nos véhicules blindés de dernière génération. 100% sécurisé, 100% inoubliable. À partir de 18 900€ pour 5 jours.",
  florence: "Florence 1504, c'est le sommet de la Renaissance ! Michel-Ange peaufine son David, Léonard de Vinci expérimente ses inventions et les Médicis règnent sur les arts. 8 jours d'immersion culturelle à 14 200€. Votre âme d'artiste sera comblée !",
  prix: "Nos tarifs varient selon la destination : Paris 1889 à partir de 12 500€, Florence 1504 à partir de 14 200€, et le Crétacé à partir de 18 900€ par personne. Tous nos voyages incluent l'hébergement d'époque, le guide expert et l'assurance temporelle.",
  danger: "La sécurité est notre priorité absolue ! Nos chronoporteurs incluent un système de retour automatique, une armure temporelle invisible et une équipe d'escorte dédiée. Aucun incident en 1 200 voyages effectués. Vous pouvez voyager l'esprit tranquille !",
}

function getLocalResponse(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('paris') || lower.includes('belle époque') || lower.includes('eiffel')) return FALLBACK_RESPONSES.paris
  if (lower.includes('crétacé') || lower.includes('dinosaure') || lower.includes('cretace')) return FALLBACK_RESPONSES.cretace
  if (lower.includes('florence') || lower.includes('renaissance') || lower.includes('michel-ange') || lower.includes('michel ange')) return FALLBACK_RESPONSES.florence
  if (lower.includes('prix') || lower.includes('coût') || lower.includes('tarif') || lower.includes('combien')) return FALLBACK_RESPONSES.prix
  if (lower.includes('danger') || lower.includes('sécur') || lower.includes('risque') || lower.includes('sûr')) return FALLBACK_RESPONSES.danger
  const arr = FALLBACK_RESPONSES.default
  return arr[Math.floor(Math.random() * arr.length)]
}

async function callMistral(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!res.ok) return null
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? null
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bienvenue chez TimeTravel Agency ! Je suis ChronoBot, votre conseiller temporel. Quelle époque vous fait rêver : Paris 1889, le Crétacé ou Florence 1504 ?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const apiMessages = newMessages.map((m) => ({ role: m.role, content: m.content }))
      const reply = await callMistral(apiMessages) ?? getLocalResponse(userMsg)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: getLocalResponse(userMsg) }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="glow-pulse"
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 300,
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #b8860b, #d4a017)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={24} color="#080c14" /></motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={24} color="#080c14" /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', bottom: '100px', right: '28px', zIndex: 300,
              width: '360px', maxWidth: 'calc(100vw - 40px)',
              borderRadius: '20px', overflow: 'hidden',
              background: 'rgba(10,15,25,0.97)',
              border: '1px solid rgba(212,160,23,0.25)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              display: 'flex', flexDirection: 'column',
              height: '520px',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px', borderBottom: '1px solid rgba(212,160,23,0.12)',
              background: 'rgba(212,160,23,0.05)',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #b8860b, #d4a017)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Bot size={20} color="#080c14" />
              </div>
              <div>
                <p className="font-cinzel" style={{ fontSize: '14px', fontWeight: 700, color: '#e8e0d0' }}>ChronoBot</p>
                <p style={{ fontSize: '11px', color: '#d4a017', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Conseiller temporel · En ligne
                </p>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="chat-bubble"
                  style={{
                    display: 'flex', gap: '8px',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: msg.role === 'user' ? 'rgba(212,160,23,0.2)' : 'linear-gradient(135deg, #b8860b, #d4a017)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {msg.role === 'user'
                      ? <User size={14} color="#d4a017" />
                      : <Bot size={14} color="#080c14" />
                    }
                  </div>

                  {/* Bubble */}
                  <div style={{
                    maxWidth: '76%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    background: msg.role === 'user' ? 'rgba(212,160,23,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    fontSize: '13px', lineHeight: 1.6, color: '#d8cfc0',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #b8860b, #d4a017)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Bot size={14} color="#080c14" />
                  </div>
                  <div style={{
                    padding: '12px 16px', borderRadius: '4px 16px 16px 16px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', gap: '4px', alignItems: 'center',
                  }}>
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                        style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4a017' }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    style={{
                      background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)',
                      borderRadius: '100px', padding: '5px 12px', fontSize: '11px', color: '#c8b87a',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,160,23,0.18)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(212,160,23,0.08)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: '14px 16px', borderTop: '1px solid rgba(212,160,23,0.1)',
              display: 'flex', gap: '8px',
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Posez votre question..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,160,23,0.2)',
                  borderRadius: '10px', padding: '10px 14px', color: '#e8e0d0', fontSize: '13px',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="btn-gold"
                style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: loading || !input.trim() ? 0.5 : 1,
                  flexShrink: 0,
                }}
              >
                {loading ? <Loader size={16} color="#080c14" style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} color="#080c14" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
