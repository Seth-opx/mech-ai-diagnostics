import React, { useState, useMemo } from 'react'
import {
  Cpu, Zap, Gauge, Shield, Battery, Camera, Mic, Video,
  History, MapPin, User, FileText, ChevronRight, X,
  Activity, Settings, AlertTriangle, CheckCircle, Wrench,
  Save, Share2, Download, Car, RefreshCw, WrenchIcon,
  MapPinned, MessageSquare, Star, Crown, Radio, Volume2
} from 'lucide-react'

const INITIAL_FORM = {
  brand: '', model: '', year: '', mileage: '', engine: '',
  fuel: '', transmission: '', issueType: 'Voyant moteur',
  warningLight: 'Non', noise: 'Non', smell: 'Non', smoke: 'Non',
  powerLoss: 'Non', hardStart: 'Non', braking: 'Non', steering: 'Non',
  temp: 'Normal', battery: 'OK', since: '', severity: 'Moyenne', description: ''
}

function buildMockDiag(f) {
  const crit = f.severity === 'Critique' || f.powerLoss === 'Oui' || f.braking === 'Oui'
  const engine = f.issueType?.toLowerCase().includes('moteur') || f.warningLight === 'Clignotant'
  const urg = crit ? 'Élevée' : engine ? 'Modérée' : 'Faible'
  const score = crit ? 38 : engine ? 67 : 82
  return {
    id: Date.now(), vehicle: `${f.brand || 'Véhicule'} ${f.model || ''}`.trim() || 'Véhicule inconnu',
    title: crit ? 'Anomalie critique détectée' : engine ? 'Anomalie moteur probable' : 'Contrôle recommandé',
    urgency: urg, score, canDrive: crit ? 'Non recommandé' : engine ? 'Trajet court uniquement' : 'Oui, prudence',
    cost: crit ? '180–850 €' : engine ? '80–320 €' : '40–160 €', time: crit ? '2–5 jours' : engine ? '1–3 jours' : '几个小时',
    causes: engine ? [
      { label: 'Capteur oxygène / débitmètre', pct: 36 },
      { label: 'Bougies, bobines ou injection', pct: 29 },
      { label: 'Prise d\'air / faisceau électrique', pct: 18 },
    ] : [
      { label: 'Entretien en retard', pct: 34 },
      { label: 'Capteur secondaire', pct: 25 },
      { label: 'Usure pièce périphérique', pct: 19 },
    ],
    risks: crit ? 'Risque de panne immobilisante.' : 'Le problème peut s\'aggraver.',
    garageChecks: ['Lecture codes OBD-II', 'Contrôle capteurs', 'Essai routier'],
    selfChecks: ['Vérifier niveaux huile et liquide refroidissement', 'Observer voyant clignotant ou fixe'],
    createdAt: new Date().toISOString()
  }
}

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', icon: Gauge },
  { id: 'diagnostic', label: 'Diagnostic', icon: Cpu },
  { id: 'history', label: 'Historique', icon: History },
  { id: 'garage', label: 'Garages', icon: MapPin },
  { id: 'profile', label: 'Profil', icon: User },
]

const MODULES = [
  { id: 'diagnostic', label: 'Diagnostic IA', desc: 'Analyse guidée', icon: Cpu, badge: null, accent: false },
  { id: 'photo', label: 'Photo', desc: 'Analyse visuelle', icon: Camera, badge: null, accent: false },
  { id: 'audio', label: 'Audio moteur', desc: 'Bruit diagnostic', icon: Mic, badge: 'Bêta', accent: false },
  { id: 'video', label: 'Vidéo', desc: 'Analyse vidéo', icon: Video, badge: 'Bêta', accent: false },
]

function Header({ onMenu }) {
  return (
    <header className="app-header">
      <div className="brand-block">
        <div className="brand-icon"><Cpu size={22} /></div>
        <div className="brand-titles">
          <h1>MÉCO-IA</h1>
          <p>Diagnostic automobile IA</p>
        </div>
      </div>
      <div className="header-right">
        <div className="status-pill"><Activity size={10} />ONLINE</div>
        <button className="icon-btn" onClick={onMenu} aria-label="Menu"><Settings size={20} /></button>
      </div>
    </header>
  )
}

function BottomNav({ view, setView }) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button key={id} className={`nav-item ${view === id ? 'active' : ''}`} onClick={() => setView(id)}>
          <Icon size={18} /><span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function Home({ setView, history }) {
  const last = history[0]
  return (
    <main className="screen">
      <section className="hero-card glass">
        <div className="hero-glow-bg" />
        <div className="scanner-wrap">
          <div className="scanner-ring">
            <div className="scan-arc" />
            <div className="scanner-inner">
              <Radio size={36} />
            </div>
          </div>
        </div>
        <div className="eyebrow"><Sparkles size={12} />Scanner IA multimodal</div>
        <h2 className="hero-title">Analyse ton véhicule comme un expert.</h2>
        <p className="hero-sub">Renseigne les symptômes, lance le diagnostic et obtiens un rapport professionnel en secondes.</p>
        <button className="btn-primary" onClick={() => setView('diagnostic')}>
          <Zap size={18} />Scanner mon véhicule
        </button>
      </section>

      {last && (
        <section className="vehicle-card glass">
          <div className="vehicle-icon"><Car size={26} /></div>
          <div className="vehicle-info">
            <h3>{last.vehicle}</h3>
            <p>{last.title}</p>
          </div>
          <div className="score-badge">
            <strong>{last.score}%</strong>
            <span>Score</span>
          </div>
        </section>
      )}

      <div className="metrics-row">
        <div className="metric-chip green">
          <div className="m-chip-icon"><Battery size={18} /></div>
          <strong>2/2</strong>
          <span>Crédits</span>
        </div>
        <div className="metric-chip">
          <div className="m-chip-icon"><Shield size={18} /></div>
          <strong>Free</strong>
          <span>Mode</span>
        </div>
        <div className="metric-chip violet">
          <div className="m-chip-icon"><Gauge size={18} /></div>
          <strong>OK</strong>
          <span>Système</span>
        </div>
      </div>

      <div className="section-label"><Activity size={14} />Modules disponibles</div>
      <div className="modules-grid">
        {MODULES.map(({ id, label, desc, icon: Icon, badge }) => (
          <button key={id} className={`module-card`} onClick={() => setView(id)}>
            {badge && <span className="mod-badge">{badge}</span>}
            <div className="mod-icon"><Icon size={20} /></div>
            <div className="mod-card-title">{label}</div>
            <div className="mod-card-desc">{desc}</div>
          </button>
        ))}
      </div>

      <div className="legal-box">
        Méco-IA est un outil d'aide au diagnostic. Toujours faire confirmer par un professionnel.
      </div>
    </main>
  )
}

function DiagnosticForm({ form, setForm, onAnalyze }) {
  const update = e => {
    const v = e.target.value, n = e.target.name
    setForm(p => ({ ...p, [n]: v }))
  }
  const row = fields => (
    <div className="form-grid">
      {fields.map(({ name, placeholder, type }) => (
        <input key={name} name={name} value={form[name]} onChange={update} placeholder={placeholder} type={type || 'text'} inputMode={type === 'number' ? 'numeric' : undefined} />
      ))}
    </div>
  )

  return (
    <main className="screen">
      <section className="diag-form glass">
        <div className="diag-title"><Cpu size={16} />Diagnostic guidé</div>
        {row([{ name: 'brand', placeholder: 'Marque (ex: Renault)' }, { name: 'model', placeholder: 'Modèle (ex: Clio)' }])}
        {row([{ name: 'year', placeholder: 'Année', type: 'number' }, { name: 'mileage', placeholder: 'Kilométrage', type: 'number' }])}
        {row([{ name: 'engine', placeholder: 'Motorisation (ex: 1.5 dCi)' }, { name: 'fuel', placeholder: 'Carburant' }])}
        {row([{ name: 'transmission', placeholder: 'Boîte (Auto/Manuelle)' }, { name: 'issueType', placeholder: 'Type de problème' }])}

        <div className="form-grid" style={{ marginTop: 10 }}>
          <select name="warningLight" value={form.warningLight} onChange={update}>
            <option>Non</option><option>Oui</option><option>Clignotant</option>
          </select>
          <select name="noise" value={form.noise} onChange={update}>
            <option>Non</option><option>Oui</option>
          </select>
          <select name="smoke" value={form.smoke} onChange={update}>
            <option>Non</option><option>Blanc</option><option>Noir</option><option>Bleu</option>
          </select>
          <select name="powerLoss" value={form.powerLoss} onChange={update}>
            <option>Non</option><option>Oui</option>
          </select>
          <select name="hardStart" value={form.hardStart} onChange={update}>
            <option>Non</option><option>Oui</option>
          </select>
          <select name="braking" value={form.braking} onChange={update}>
            <option>Non</option><option>Oui</option>
          </select>
          <select name="steering" value={form.steering} onChange={update}>
            <option>Normal</option><option>Dur</option><option> Vibrant</option>
          </select>
          <select name="temp" value={form.temp} onChange={update}>
            <option>Normal</option><option>Chaud</option><option>Très chaud</option>
          </select>
        </div>
        {row([{ name: 'since', placeholder: 'Depuis quand ?' }, { name: 'severity', placeholder: 'Gravité' }])}
        <textarea name="description" value={form.description} onChange={update} placeholder="Décris le problème en détail..." style={{ gridColumn: 'span 2', minHeight: 110, resize: 'vertical', width: '100%', border: '1px solid rgba(0,212,255,0.18)', borderRadius: 14, background: 'rgba(3,10,22,0.85)', color: '#f0f9ff', padding: 13, fontSize: '0.86rem', fontFamily: 'inherit', outline: 'none', marginBottom: 14, boxSizing: 'border-box' }} />
        <button className="btn-primary" onClick={onAnalyze}><Zap size={18} />Générer le rapport IA</button>
      </section>
    </main>
  )
}

function AnalysisScreen() {
  const steps = ['Collecte des symptômes', 'Croisement causes probables', 'Évaluation urgence', 'Estimation coût', 'Génération rapport']
  return (
    <main className="screen">
      <section className="analysis-card glass">
        <div className="analysis-ring"><RefreshCw size={36} /></div>
        <h2 className="analysis-title">Analyse IA en cours</h2>
        <p className="analysis-sub">Raisonnement en cours à partir des données fournies</p>
        <div className="analysis-steps">
          {steps.map((s, i) => (
            <div key={s} className="step-item">
              <CheckCircle size={16} /><span>{s}</span><em>0{i + 1}</em>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function ResultScreen({ diag, setView, onSave }) {
  if (!diag) return (
    <main className="screen">
      <div className="empty-state glass">
        <AlertTriangle size={42} />
        <h3>Aucun rapport</h3>
        <p>Lance un diagnostic pour générer un rapport.</p>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setView('diagnostic')}>
          <Zap size={16} />Lancer un diagnostic
        </button>
      </div>
    </main>
  )
  const urgClass = diag.urgency === 'Élevée' ? 'high' : diag.urgency === 'Modérée' ? 'med' : 'low'
  return (
    <main className="screen">
      <section className="result-hero glass">
        <div className="result-score">
          <strong>{diag.score}%</strong>
          <span>Santé</span>
        </div>
        <div className="result-info">
          <h2>{diag.title}</h2>
          <p>{diag.vehicle}</p>
          <div className={`urgency-tag ${urgClass}`}>
            <AlertTriangle size={12} />Urgence {diag.urgency}
          </div>
        </div>
      </section>

      <div className="metrics-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="metric-chip">
          <div className="m-chip-icon"><WrenchIcon size={16} /></div>
          <strong style={{ fontSize: '0.82rem' }}>{diag.cost}</strong>
          <span>Coût est.</span>
        </div>
        <div className="metric-chip">
          <div className="m-chip-icon"><Gauge size={16} /></div>
          <strong style={{ fontSize: '0.82rem' }}>{diag.time}</strong>
          <span>Durée répa.</span>
        </div>
        <div className="metric-chip green">
          <div className="m-chip-icon"><Car size={16} /></div>
          <strong style={{ fontSize: '0.82rem' }}>{diag.canDrive.split(',')[0]}</strong>
          <span>Conduite</span>
        </div>
      </div>

      <div className="section-label" style={{ marginTop: 14 }}><WrenchIcon size={14} />Causes probables</div>
      {diag.causes.map(c => (
        <div key={c.label} className="cause-bar glass" style={{ padding: '14px 16px', marginBottom: 8 }}>
          <div className="cause-row">
            <span style={{ fontSize: '0.84rem' }}>{c.label}</span>
            <strong style={{ color: 'var(--green)' }}>{c.pct}%</strong>
          </div>
          <div className="cause-bar-visual"><span style={{ width: `${c.pct}%` }} /></div>
        </div>
      ))}

      <div className="section-label" style={{ marginTop: 10 }}><CheckCircle size={14} />Vérifications</div>
      {diag.selfChecks.map(s => (
        <div key={s} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.1)', marginBottom: 8, fontSize: '0.82rem', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <CheckCircle size={14} style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 2 }} />
          <span>{s}</span>
        </div>
      ))}

      <div className="disclaimer-box">
        ⚠️ Ce diagnostic est une aide, pas un avis mécanique certifié. Confirmez toujours avec un professionnel.
      </div>

      <div className="action-btns">
        <button className="btn-green"><Save size={16} />Sauvegarder</button>
        <button className="btn-secondary"><MapPinned size={16} />Garage</button>
        <button className="btn-violet"><Download size={16} />Rapport</button>
      </div>
    </main>
  )
}

function PhotoScreen({ setView }) {
  return (
    <main className="screen">
      <section className="photo-card glass">
        <h2>📷 Diagnostic photo</h2>
        <p>Envoie une photo de la pièce ou du zone suspecte pour analyse visuelle par l'IA.</p>
        <div className="upload-zone">
          <Camera size={36} />
          <p>Tap pour sélectionner une image</p>
          <span>JPG, PNG, WEBP — Max 20 Mo</span>
        </div>
        <button className="btn-secondary" style={{ marginTop: 14 }} onClick={() => setView('home')}>
          <ChevronRight size={16} />Retour
        </button>
      </section>
    </main>
  )
}

function AudioScreen({ setView }) {
  return (
    <main className="screen">
      <section className="media-card glass">
        <h2>🎙 Audio moteur</h2>
        <p>Enregistre le bruit de ton moteur pour analyse acoustique par l'IA.</p>
        <div className="media-placeholder">
          <Volume2 size={36} />
          <p>Appuie pour enregistrer</p>
          <span className="badge-beta">BÊTA</span>
        </div>
        <button className="btn-secondary" style={{ marginTop: 14 }} onClick={() => setView('home')}>
          <ChevronRight size={16} />Retour
        </button>
      </section>
    </main>
  )
}

function VideoScreen({ setView }) {
  return (
    <main className="screen">
      <section className="media-card glass">
        <h2>🎥 Vidéo</h2>
        <p>Envoie une vidéo courte (30s max) pour analyse multimodale.</p>
        <div className="media-placeholder">
          <Video size={36} />
          <p>Sélectionne une vidéo</p>
          <span className="badge-beta">BÊTA</span>
        </div>
        <button className="btn-secondary" style={{ marginTop: 14 }} onClick={() => setView('home')}>
          <ChevronRight size={16} />Retour
        </button>
      </section>
    </main>
  )
}

function HistoryScreen({ history, setView, setDiag }) {
  if (!history.length) return (
    <main className="screen">
      <div className="empty-state glass">
        <History size={42} />
        <h3>Aucun historique</h3>
        <p>Lance un diagnostic pour commencer.</p>
      </div>
    </main>
  )
  return (
    <main className="screen">
      <div className="section-label" style={{ marginBottom: 14 }}><History size={14} />Historique</div>
      {history.map((h, i) => (
        <div key={h.id || i} className="history-card" onClick={() => { setDiag(h); setView('result') }}>
          <h4>{h.vehicle}</h4>
          <p>{h.title}</p>
          <div className="history-meta">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className={`urgency-dot ${h.urgency === 'Élevée' ? 'high' : h.urgency === 'Modérée' ? 'med' : 'low'}`} />
              {h.urgency}
            </span>
            <strong style={{ color: 'var(--green)' }}>{h.score}%</strong>
          </div>
        </div>
      ))}
    </main>
  )
}

function GarageScreen() {
  const garages = [
    { name: 'Garage Dufrenne', dist: '1.2 km', spec: 'Multimarque', rating: 4.8 },
    { name: 'Speedy Bordeaux', dist: '2.8 km', spec: 'Freinage, Vidange', rating: 4.5 },
    { name: 'Midas', dist: '3.1 km', spec: 'Échappement, Suspension', rating: 4.3 },
  ]
  return (
    <main className="screen">
      <div className="section-label" style={{ marginBottom: 14 }}><MapPin size={14} />Garages partenaires</div>
      {garages.map((g, i) => (
        <div key={i} className="garage-card glass">
          <div className="garage-icon"><WrenchIcon size={20} /></div>
          <div className="garage-info">
            <h4>{g.name}</h4>
            <p>{g.spec}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="garage-dist">{g.dist}</div>
            <span style={{ fontSize: '0.7rem', color: 'var(--amber)' }}>★ {g.rating}</span>
          </div>
        </div>
      ))}
    </main>
  )
}

function ProfileScreen({ setView }) {
  return (
    <main className="screen">
      <section className="profile-card glass">
        <div className="avatar-lg"><User size={36} /></div>
        <h2>Compte Démo</h2>
        <p>demo@mecoia.app</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <div className="metric-chip">
            <div className="m-chip-icon"><Cpu size={16} /></div>
            <strong>2</strong><span>Diagnostics</span>
          </div>
          <div className="metric-chip violet">
            <div className="m-chip-icon"><Crown size={16} /></div>
            <strong>Free</strong><span>Plan</span>
          </div>
        </div>
        <button className="premium-btn" onClick={() => setView('paywall')}>
          <Crown size={18} />Passer Premium
        </button>
      </section>
    </main>
  )
}

function PaywallScreen({ setView }) {
  return (
    <main className="screen">
      <section className="paywall-card glass">
        <Crown size={48} style={{ color: 'var(--violet-2)', marginBottom: 16 }} />
        <h2>Méco-IA Premium</h2>
        <p>Débloque les diagnostics illimités et l'analyse photo/audio/vidéo.</p>
        <div className="plans-grid">
          <div className="plan-card">
            <h3>Free</h3>
            <div className="price">0€ <span>/ mois</span></div>
            <ul>
              <li>2 diagnostics / jour</li>
              <li>Diagnostic texte</li>
              <li>Historique limité</li>
            </ul>
          </div>
          <div className="plan-card featured">
            <h3>Premium</h3>
            <div className="price" style={{ color: 'var(--violet-2)' }}>4,99€ <span>/ mois</span></div>
            <ul>
              <li>Diagnostics illimités</li>
              <li>Photo, Audio, Vidéo</li>
              <li>Historique complet</li>
              <li>Rapports PDF</li>
            </ul>
          </div>
        </div>
        <button className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--violet), #6d28d9)', boxShadow: 'var(--violet-glow)' }} onClick={() => setView('home')}>
          <Crown size={16} />Activer Premium
        </button>
        <button className="btn-secondary" style={{ marginTop: 10 }} onClick={() => setView('home')}>
          <ChevronRight size={16} />Plus tard
        </button>
      </section>
    </main>
  )
}

function MenuOverlay({ onClose, setView }) {
  const items = [
    ['home', 'Système'], ['diagnostic', 'Diagnostic IA'],
    ['photo', 'Photo'], ['audio', 'Audio'],
    ['history', 'Historique'], ['garage', 'Garages'],
    ['profile', 'Profil'], ['paywall', 'Premium'],
  ]
  return (
    <div className="menu-overlay">
      <button className="close-btn" onClick={onClose}><X size={28} /></button>
      <div className="menu-list">
        {items.map(([id, label]) => (
          <button key={id} onClick={() => { setView(id); onClose() }}>
            {label}<ChevronRight size={20} />
          </button>
        ))}
      </div>
      <div className="menu-footer">
        <span>v2.0.0-COCKPIT</span>
        <span>Méco-IA</span>
      </div>
    </div>
  )
}

// Sparkles not in lucide, substitute with Star
const Sparkles = Star

export default function App() {
  const [view, setView] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [diag, setDiag] = useState(null)
  const [history, setHistory] = useState([])

  const runAnalysis = () => {
    setView('analysis')
    setTimeout(() => {
      const result = buildMockDiag(form)
      setDiag(result)
      setHistory(prev => [result, ...prev])
      setView('result')
    }, 2200)
  }

  return (
    <div className="app-shell">
      <div className="grid-bg" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <Header onMenu={() => setMenuOpen(true)} />
      {view === 'home' && <Home setView={setView} history={history} />}
      {view === 'diagnostic' && <DiagnosticForm form={form} setForm={setForm} onAnalyze={runAnalysis} />}
      {view === 'analysis' && <AnalysisScreen />}
      {view === 'result' && <ResultScreen diag={diag} setView={setView} onSave={() => {}} />}
      {view === 'photo' && <PhotoScreen setView={setView} />}
      {view === 'audio' && <AudioScreen setView={setView} />}
      {view === 'video' && <VideoScreen setView={setView} />}
      {view === 'history' && <HistoryScreen history={history} setView={setView} setDiag={setDiag} />}
      {view === 'garage' && <GarageScreen />}
      {view === 'profile' && <ProfileScreen setView={setView} />}
      {view === 'paywall' && <PaywallScreen setView={setView} />}
      <BottomNav view={view} setView={setView} />
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} setView={setView} />}
    </div>
  )
}
