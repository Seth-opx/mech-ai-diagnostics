import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Salut, décris-moi ton problème auto.' }
  ])
  const [input, setInput] = useState('')

  function send() {
    const text = input.trim()
    if (!text) return

    setMessages(prev => [
      ...prev,
      { role: 'user', text },
      {
        role: 'assistant',
        text: "Merci. Pour un vrai diagnostic, lance l'analyse depuis l'accueil. Ici, je te conseille de préciser le voyant, le bruit, la vitesse, et depuis quand le problème existe."
      }
    ])
    setInput('')
  }

  return (
    <main className="screen">
      <h2>Chat Méco-IA</h2>
      <div className="card">
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: 10,
            padding: 12,
            borderRadius: 12,
            background: m.role === 'user' ? 'var(--accent)' : 'var(--secondary)'
          }}>
            {m.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Écris ton message..." />
      <button className="btn-primary" onClick={send}>Envoyer</button>
    </main>
  )
}
