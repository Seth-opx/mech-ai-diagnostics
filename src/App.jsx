import React, { useMemo, useState } from 'react'
import {
  Menu, Cpu, Zap, Shield, History, MapPin, User, Database, Terminal,
  AlertTriangle, Settings2, ChevronRight, X, Gauge, Power,
  BatteryCharging, Camera, RefreshCw, Search, Wifi, Video, Mic,
  Crown, Sparkles, Wrench, FileText, CheckCircle2, Activity
} from 'lucide-react'

const initialForm = {
  brand: '',
  model: '',
  year: '',
  mileage: '',
  engine: '',
  issueType: 'Voyant moteur',
  warningLight: 'Oui',
  noise: 'Non',
  smell: 'Non',
  powerLoss: 'Non',
  since: '',
  severity: 'Moyenne',
  description: ''
}

const tabs = [
  { id: 'dashboard', label: 'Accueil', icon: Gauge },
  { id: 'diagnostic', label: 'Diagnostic', icon: Cpu },
  { id: 'history', label: 'Historique', icon: History },
  { id: 'garage', label: 'Garages', icon: MapPin },
  { id: 'profile', label: 'Profil', icon: User }
]

function buildMockDiagnostic(form) {
  const desc = `${form.issueType} ${form.description}`.toLowerCase()
  const hasCritical =
    form.severity === 'Critique' ||
    form.powerLoss === 'Oui' ||
    desc.includes('fumée') ||
    desc.includes('clignote') ||
    desc.includes('frein')

  const hasEngine =
    desc.includes('moteur') ||
    desc.includes('tremble') ||
    desc.includes('ralenti') ||
    form.issueType === 'Voyant moteur'

  const urgency = hasCritical ? 'Élevée' : hasEngine ? 'Modérée' : 'Faible'

  return {
    id: Date.now(),
    vehicle: `${form.brand || 'Véhicule'} ${form.model || ''}`.trim(),
    title: hasEngine ? 'Anomalie moteur détectée' : 'Contrôle mécanique recommandé',
    urgency,
    score: hasCritical ? 38 : hasEngine ? 67 : 82,
    cost: hasCritical ? '180 € à 850 €' : hasEngine ? '80 € à 320 €' : '40 € à 160 €',
    canDrive: hasCritical ? 'Non recommandé' : hasEngine ? 'Oui, trajet court uniquement' : 'Oui, avec prudence',
    summary:
      hasCritical
        ? "Les symptômes indiquent un risque mécanique sérieux. Évite de rouler et fais contrôler le véhicule rapidement."
        : hasEngine
          ? "Les informations indiquent une anomalie moteur probable. Un scan OBD-II et un contrôle capteur sont recommandés."
          : "Les symptômes semblent modérés. Un contrôle d'entretien ciblé est recommandé pour éviter l'aggravation.",
    causes: hasEngine
      ? [
          { label: "Capteur oxygène ou débitmètre", percent: 36 },
          { label: "Bougies, bobines ou injection", percent: 29 },
          { label: "Prise d'air ou faisceau électrique", percent: 18 }
        ]
      : [
          { label: "Entretien en retard", percent: 34 },
          { label: "Capteur secondaire", percent: 25 },
          { label: "Usure normale d'une pièce périphérique", percent: 19 }
        ],
    selfChecks: [
      "Vérifier les niveaux d'huile et de liquide de refroidissement",
      "Observer si le voyant moteur clignote ou reste fixe",
      "Noter les bruits, odeurs et moments d'apparition"
    ],
    garageChecks: [
      "Lecture des codes défaut OBD-II",
      "Contrôle faisceau/capteurs",
      "Essai routier et mesure des paramètres moteur"
    ],
    risks: hasCritical
      ? "Risque de panne immobilisante ou d'endommagement moteur si le véhicule continue à rouler."
      : "Le problème peut s'aggraver et augmenter le coût de réparation s'il est ignoré.",
    createdAt: new Date().toISOString()
  }
}

function AppHeader({ onMenu }) {
  return (
    <header className="app-header">
      <div className="brand-block">
        <div className="brand-icon"><Cpu size={25} /></div>
        <div>
          <h1>MÉCO-IA</h1>
          <p>Diagnostic automobile IA premium</p>
        </div>
      </div>
      <div className="header-actions">
        <div className="status-pill"><Wifi size={13} /><span>ONLINE</span></div>
        <button className="icon-button" onClick={onMenu} aria-label="Ouvrir le menu"><Menu size={26} /></button>
      </div>
    </header>
  )
}

function BottomNav({ view, setView }) {
  return (
    <nav className="bottom-nav">
      {tabs.map(item => {
        const Icon = item.icon
        return (
          <button key={item.id} className={view === item.id ? 'nav-item active' : 'nav-item'} onClick={() => setView(item.id)}>
            <Icon size={19} /><span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function MetricCard({ label, value, icon: Icon, tone = 'blue' }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric-icon"><Icon size={22} /></div>
      <div><strong>{value}</strong><span>{label}</span></div>
    </div>
  )
}

function OptionCard({ title, icon: Icon, desc, onClick, badge }) {
  return (
    <button onClick={onClick} className="option-card">
      <div className="option-card-top">
        <div className="option-icon"><Icon size={22} /></div>
        {badge && <span className="mini-badge">{badge}</span>}
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <ChevronRight className="option-arrow" size={18} />
    </button>
  )
}

function Dashboard({ setView, latestDiagnostic }) {
  return (
    <main className="screen">
      <section className="hero-card">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow"><Sparkles size={14} />Scanner IA multimodal</div>
          <h2>Analyse ton véhicule comme dans un garage high-tech.</h2>
          <p>Renseigne les symptômes, ajoute une photo si besoin, puis génère un rapport clair avec urgence, causes probables et actions recommandées.</p>
          <button className="primary-button" onClick={() => setView('diagnostic')}><Zap size={20} />Lancer un diagnostic</button>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Crédits restants" value="2/2" icon={BatteryCharging} tone="green" />
        <MetricCard label="Mode actuel" value="Free" icon={Crown} tone="purple" />
        <MetricCard label="État système" value="Stable" icon={Shield} tone="blue" />
      </section>

      {latestDiagnostic && (
        <section className="panel">
          <div className="section-title"><Activity size={18} /><span>Dernier diagnostic</span></div>
          <h3>{latestDiagnostic.title}</h3>
          <p>{latestDiagnostic.summary}</p>
          <div className="result-row"><span>Urgence</span><strong>{latestDiagnostic.urgency}</strong></div>
        </section>
      )}

      <section className="quick-grid">
        <OptionCard title="Texte guidé" icon={FileText} desc="Questionnaire intelligent basé sur les symptômes." onClick={() => setView('diagnostic')} />
        <OptionCard title="Photo" icon={Camera} desc="Analyse visuelle préparée pour l'IA multimodale." onClick={() => setView('photo')} />
        <OptionCard title="Audio moteur" icon={Mic} desc="Bêta : bruit moteur, claquement, sifflement." onClick={() => setView('media')} badge="Bêta" />
        <OptionCard title="Vidéo" icon={Video} desc="Bêta : import vidéo et analyse future." onClick={() => setView('media')} badge="Bêta" />
      </section>

      <div className="legal-box">Méco-IA fournit une aide au diagnostic, pas un avis mécanique certifié. En cas de doute, consulte un professionnel.</div>
    </main>
  )
}

function DiagnosticForm({ form, setForm, onAnalyze }) {
  const update = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="screen">
      <section className="panel">
        <div className="section-title"><Cpu size={18} /><span>Diagnostic guidé</span></div>
        <p className="muted">Plus les informations sont précises, plus le rapport sera utile. Les données ci-dessous alimentent le diagnostic mock.</p>

        <div className="form-grid">
          <input name="brand" value={form.brand} onChange={update} placeholder="Marque ex: Renault" />
          <input name="model" value={form.model} onChange={update} placeholder="Modèle ex: Clio" />
          <input name="year" value={form.year} onChange={update} placeholder="Année ex: 2018" inputMode="numeric" />
          <input name="mileage" value={form.mileage} onChange={update} placeholder="Kilométrage ex: 125000" inputMode="numeric" />
          <input name="engine" value={form.engine} onChange={update} placeholder="Motorisation ex: 1.5 dCi" />
          <select name="issueType" value={form.issueType} onChange={update}>
            <option>Voyant moteur</option><option>Bruit suspect</option><option>Démarrage difficile</option><option>Perte de puissance</option><option>Fumée</option><option>Freinage</option><option>Batterie</option>
          </select>
          <select name="warningLight" value={form.warningLight} onChange={update}>
            <option>Oui</option><option>Non</option><option>Clignotant</option>
          </select>
          <select name="noise" value={form.noise} onChange={update}>
            <option>Non</option><option>Oui</option>
          </select>
          <select name="smell" value={form.smell} onChange={update}>
            <option>Non</option><option>Essence</option><option>Brûlé</option><option>Échappement</option>
          </select>
          <select name="powerLoss" value={form.powerLoss} onChange={update}>
            <option>Non</option><option>Oui</option>
          </select>
          <input name="since" value={form.since} onChange={update} placeholder="Depuis quand ?" />
          <select name="severity" value={form.severity} onChange={update}>
            <option>Faible</option><option>Moyenne</option><option>Élevée</option><option>Critique</option>
          </select>
        </div>

        <textarea name="description" value={form.description} onChange={update} placeholder="Décris le problème : bruit, vibration, fumée, voyant, situation d'apparition..." />
        <button className="primary-button" onClick={onAnalyze}><Zap size={20} />Générer le rapport IA</button>
      </section>
    </main>
  )
}

function AnalysisScreen() {
  const steps = ['Collecte des symptômes', 'Croisement avec causes probables', "Évaluation du niveau d'urgence", 'Estimation du coût', 'Génération du rapport']
  return (
    <main className="screen">
      <section className="analysis-panel">
        <div className="scanner-ring"><RefreshCw size={42} /></div>
        <h2>Analyse IA en cours</h2>
        <p>Le système simule un raisonnement diagnostic à partir des réponses fournies.</p>
        <div className="analysis-steps">
          {steps.map((step, index) => (
            <div className="analysis-step" key={step}><CheckCircle2 size={18} /><span>{step}</span><em>0{index + 1}</em></div>
          ))}
        </div>
      </section>
    </main>
  )
}

function ResultScreen({ diagnostic, setView }) {
  if (!diagnostic) {
    return <main className="screen"><section className="panel empty-state"><AlertTriangle size={38} /><h2>Aucun rapport</h2><p>Lance un diagnostic pour générer un rapport.</p><button className="primary-button" onClick={() => setView('diagnostic')}>Lancer un diagnostic</button></section></main>
  }

  return (
    <main className="screen">
      <section className="result-hero">
        <div><div className="eyebrow"><Wrench size={14} />Rapport IA</div><h2>{diagnostic.title}</h2><p>{diagnostic.summary}</p></div>
        <div className="score-orb"><strong>{diagnostic.score}%</strong><span>Score</span></div>
      </section>

      <section className="panel">
        <div className="result-row"><span>Véhicule</span><strong>{diagnostic.vehicle}</strong></div>
        <div className="result-row"><span>Urgence</span><strong className={`urgency ${diagnostic.urgency.toLowerCase()}`}>{diagnostic.urgency}</strong></div>
        <div className="result-row"><span>Peut-on rouler ?</span><strong>{diagnostic.canDrive}</strong></div>
        <div className="result-row"><span>Coût estimé</span><strong>{diagnostic.cost}</strong></div>
      </section>

      <section className="panel">
        <div className="section-title"><Search size={18} /><span>Causes probables</span></div>
        {diagnostic.causes.map(cause => (
          <div className="cause-row" key={cause.label}>
            <div><strong>{cause.label}</strong><div className="bar"><span style={{ width: `${cause.percent}%` }} /></div></div>
            <em>{cause.percent}%</em>
          </div>
        ))}
      </section>

      <section className="panel"><div className="section-title"><Shield size={18} /><span>À vérifier soi-même</span></div><ul className="clean-list">{diagnostic.selfChecks.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="panel"><div className="section-title"><Terminal size={18} /><span>Contrôle garage</span></div><ul className="clean-list">{diagnostic.garageChecks.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="warning-panel"><AlertTriangle size={20} /><p>{diagnostic.risks}</p></section>
      <div className="action-row"><button className="secondary-button" onClick={() => setView('garage')}>Trouver un garage</button><button className="primary-button" onClick={() => setView('history')}>Voir historique</button></div>
    </main>
  )
}

function PhotoScreen({ setView }) {
  const [photoLabel, setPhotoLabel] = useState('')
  return (
    <main className="screen">
      <section className="panel">
        <div className="section-title"><Camera size={18} /><span>Analyse photo</span></div>
        <div className="upload-zone"><Camera size={44} /><h3>Ajouter une photo</h3><p>Voyant, tableau de bord, pneu, fuite, moteur ou pièce visible.</p><button className="secondary-button">Importer / prendre une photo</button></div>
        <textarea value={photoLabel} onChange={e => setPhotoLabel(e.target.value)} placeholder="Que montre la photo ? Ex: voyant moteur orange, fuite sous moteur..." />
        <button className="primary-button" onClick={() => setView('diagnostic')}>Continuer vers diagnostic</button>
      </section>
    </main>
  )
}

function MediaScreen() {
  return <main className="screen"><section className="panel"><div className="section-title"><Mic size={18} /><span>Audio / Vidéo bêta</span></div><div className="beta-card"><Video size={48} /><h2>Module multimodal en préparation</h2><p>L'analyse audio/vidéo moteur sera connectée à l'IA plus tard. Pour l'instant, utilise le diagnostic guidé et la photo.</p></div></section></main>
}

function HistoryScreen({ history, setView, setDiagnostic }) {
  return (
    <main className="screen">
      <section className="panel">
        <div className="section-title"><History size={18} /><span>Historique</span></div>
        {history.length === 0 ? <div className="empty-state"><History size={38} /><p>Aucun diagnostic enregistré.</p></div> : history.map(item => (
          <button className="history-card" key={item.id} onClick={() => { setDiagnostic(item); setView('result') }}>
            <div><strong>{item.vehicle}</strong><span>{new Date(item.createdAt).toLocaleString('fr-FR')}</span><p>{item.summary}</p></div><em>{item.urgency}</em>
          </button>
        ))}
      </section>
    </main>
  )
}

function GarageScreen() {
  const garages = [
    { name: 'Atelier LED Auto', distance: '1,2 km', note: '4.8', specialty: 'Diagnostic électronique' },
    { name: 'Garage Performance IA', distance: '2,6 km', note: '4.6', specialty: 'Moteur / injection' },
    { name: 'Méca Premium Service', distance: '4,1 km', note: '4.7', specialty: 'Révision complète' }
  ]
  return <main className="screen"><section className="panel"><div className="section-title"><MapPin size={18} /><span>Garages recommandés</span></div>{garages.map(garage => <div className="garage-card" key={garage.name}><div><strong>{garage.name}</strong><span>{garage.specialty}</span></div><div className="garage-meta"><em>{garage.distance}</em><b>★ {garage.note}</b></div></div>)}</section></main>
}

function ProfileScreen({ setView }) {
  return <main className="screen"><section className="profile-card"><div className="avatar"><User size={38} /></div><h2>Compte Démo</h2><p>demo@mecoia.app</p><div className="profile-stats"><MetricCard label="Diagnostics" value="2" icon={Cpu} tone="blue" /><MetricCard label="Plan" value="Free" icon={Crown} tone="purple" /></div><button className="primary-button" onClick={() => setView('paywall')}>Passer Premium</button></section></main>
}

function PaywallScreen() {
  return <main className="screen"><section className="paywall-card"><Crown size={52} /><h2>Méco-IA Premium</h2><p>Débloque les diagnostics illimités et les rapports avancés.</p><div className="plan-grid"><div className="plan-card"><h3>Free</h3><ul><li>2 diagnostics gratuits</li><li>Historique limité</li><li>Publicités récompensées</li></ul></div><div className="plan-card premium"><h3>Premium</h3><ul><li>Diagnostics illimités</li><li>Analyse photo/audio/vidéo</li><li>Rapport détaillé</li><li>Historique complet</li></ul></div></div><button className="primary-button">Activer Premium</button></section></main>
}

function DebugScreen({ form, diagnostic }) {
  return <main className="screen"><section className="panel"><div className="section-title"><Database size={18} /><span>Debug</span></div><pre className="debug-pre">{JSON.stringify({ form, diagnostic }, null, 2)}</pre></section></main>
}

function MenuOverlay({ setMenuOpen, setView }) {
  const menu = [['dashboard', 'Système'], ['diagnostic', 'Analyse IA'], ['history', 'Historique'], ['garage', 'Connectivité garages'], ['profile', 'Profil'], ['paywall', 'Premium'], ['debug', 'Debug']]
  return (
    <div className="menu-overlay">
      <button onClick={() => setMenuOpen(false)} className="menu-close"><X size={32} /></button>
      <div className="menu-list">
        {menu.map(([id, label]) => <button key={id} onClick={() => { setView(id); setMenuOpen(false) }}>{label}<ChevronRight /></button>)}
      </div>
      <div className="menu-footer"><span>V.2.5.0-LUXURY-MOCK</span><Power size={20} /></div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [diagnostic, setDiagnostic] = useState(null)
  const [history, setHistory] = useState([])
  const [form, setForm] = useState(initialForm)

  const latestDiagnostic = useMemo(() => history[0] || null, [history])

  const runAiAnalysis = () => {
    setView('analysis')
    setTimeout(() => {
      const result = buildMockDiagnostic(form)
      setDiagnostic(result)
      setHistory(prev => [result, ...prev])
      setView('result')
    }, 1900)
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-blue" />
      <div className="ambient ambient-purple" />
      <div className="grid-overlay" />
      <AppHeader onMenu={() => setMenuOpen(true)} />

      {view === 'dashboard' && <Dashboard setView={setView} latestDiagnostic={latestDiagnostic} />}
      {view === 'diagnostic' && <DiagnosticForm form={form} setForm={setForm} onAnalyze={runAiAnalysis} />}
      {view === 'analysis' && <AnalysisScreen />}
      {view === 'result' && <ResultScreen diagnostic={diagnostic} setView={setView} />}
      {view === 'photo' && <PhotoScreen setView={setView} />}
      {view === 'media' && <MediaScreen />}
      {view === 'history' && <HistoryScreen history={history} setView={setView} setDiagnostic={setDiagnostic} />}
      {view === 'garage' && <GarageScreen />}
      {view === 'profile' && <ProfileScreen setView={setView} />}
      {view === 'paywall' && <PaywallScreen />}
      {view === 'debug' && <DebugScreen form={form} diagnostic={diagnostic} />}

      <BottomNav view={view} setView={setView} />
      {menuOpen && <MenuOverlay setMenuOpen={setMenuOpen} setView={setView} />}
    </div>
  )
}
