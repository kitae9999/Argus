import { AlertTriangle, Bell, CircleDollarSign, DatabaseZap, ShieldCheck } from 'lucide-react'
import './App.css'

const metrics = [
  { label: 'Open violations', value: '18', delta: '+4 today', tone: 'risk', icon: AlertTriangle },
  { label: 'Monthly AI spend', value: '$12.8K', delta: '72% of budget', tone: 'cost', icon: CircleDollarSign },
  { label: 'Sensitive findings', value: '7', delta: '2 high severity', tone: 'data', icon: DatabaseZap },
  { label: 'Notification failures', value: '3', delta: 'retry queued', tone: 'notice', icon: Bell },
]

const findings = [
  { severity: 'HIGH', type: 'DATA', owner: 'platform', title: 'API key pattern detected in AI prompt log', age: '14m', status: 'Open' },
  { severity: 'HIGH', type: 'COST', owner: 'ml-search', title: 'Daily model usage exceeded 300% of baseline', age: '31m', status: 'Triaged' },
  { severity: 'MEDIUM', type: 'SECURITY', owner: 'backend', title: 'Storage bucket allows public object listing', age: '1h', status: 'Open' },
  { severity: 'LOW', type: 'POLICY', owner: 'data', title: 'Resource spend missing owner label', age: '3h', status: 'Open' },
]

function App() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <ShieldCheck size={22} aria-hidden="true" />
          <span>Argus</span>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          <a className="active" href="#overview">Overview</a>
          <a href="#findings">Findings</a>
          <a href="#policies">Policies</a>
          <a href="#costs">Costs</a>
          <a href="#audit">Audit</a>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Governance Console</p>
            <h1>Risk Overview</h1>
          </div>
          <button className="primary-button" type="button">New policy</button>
        </header>

        <section className="metric-grid" aria-label="Governance metrics">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <article className={`metric-card ${metric.tone}`} key={metric.label}>
                <div className="metric-icon"><Icon size={20} aria-hidden="true" /></div>
                <div>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <span>{metric.delta}</span>
                </div>
              </article>
            )
          })}
        </section>

        <section className="panel" id="findings">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Findings Inbox</p>
              <h2>Active findings</h2>
            </div>
            <button className="secondary-button" type="button">Export</button>
          </div>

          <div className="table" role="table" aria-label="Active governance findings">
            <div className="table-row table-head" role="row">
              <span>Severity</span>
              <span>Type</span>
              <span>Finding</span>
              <span>Owner</span>
              <span>Status</span>
              <span>Age</span>
            </div>
            {findings.map((finding) => (
              <div className="table-row" role="row" key={finding.title}>
                <span className={`severity ${finding.severity.toLowerCase()}`}>{finding.severity}</span>
                <span>{finding.type}</span>
                <strong>{finding.title}</strong>
                <span>{finding.owner}</span>
                <span>{finding.status}</span>
                <span>{finding.age}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
