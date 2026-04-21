import { useMemo, useState } from 'react'
import './App.css'

const starterJobs = [
  {
    id: 'job-01',
    project: 'Desert Echoes',
    company: 'Riyadh Motion House',
    country: 'Saudi Arabia',
    role: 'Gaffer',
    budgetBand: 'Mid',
    language: 'Arabic',
    startDate: '2026-05-14',
    reliabilityWeight: 0.35,
    skillWeight: 0.45,
    availabilityWeight: 0.2,
  },
  {
    id: 'job-02',
    project: 'Nile Nights',
    company: 'Cairo Studio Partners',
    country: 'Egypt',
    role: 'Line Producer',
    budgetBand: 'High',
    language: 'Arabic + English',
    startDate: '2026-06-02',
    reliabilityWeight: 0.4,
    skillWeight: 0.4,
    availabilityWeight: 0.2,
  },
]

const defaultProfile = {
  name: '',
  email: '',
  primaryRole: 'Camera Operator',
  country: 'United Arab Emirates',
  yearsExperience: '5',
  expectedDayRate: '450',
  language: 'Arabic + English',
  availabilityDate: '2026-05-20',
  completedProjects: '12',
  onTimeDeliveryScore: '92',
  payrollCompliance: '98',
}

function scoreCandidate(job, profile) {
  const skillFit =
    job.role.toLowerCase() === profile.primaryRole.toLowerCase()
      ? 1
      : profile.primaryRole.toLowerCase().includes(job.role.toLowerCase())
        ? 0.85
        : 0.55

  const availabilityFit = new Date(profile.availabilityDate) <= new Date(job.startDate) ? 1 : 0.45

  const reliabilityBase =
    (Number(profile.onTimeDeliveryScore) * 0.6 + Number(profile.payrollCompliance) * 0.4) /
    100

  const total =
    skillFit * job.skillWeight +
    availabilityFit * job.availabilityWeight +
    reliabilityBase * job.reliabilityWeight

  return Math.round(total * 100)
}

function App() {
  const [profile, setProfile] = useState(defaultProfile)

  const matchResults = useMemo(
    () =>
      starterJobs
        .map((job) => ({
          ...job,
          score: scoreCandidate(job, profile),
        }))
        .sort((a, b) => b.score - a.score),
    [profile],
  )

  const kpiSnapshot = useMemo(() => {
    const avgMatchScore =
      matchResults.reduce((acc, row) => acc + row.score, 0) / matchResults.length

    return [
      {
        label: 'Verified Workforce Profiles',
        value: '14,280',
        insight: 'Track certified crew growth by country, role, and union status.',
      },
      {
        label: 'Median Time-to-Fill',
        value: '41 hrs',
        insight: 'Signals staffing efficiency for studios and public film commissions.',
      },
      {
        label: 'Average Match Confidence',
        value: `${Math.round(avgMatchScore)}%`,
        insight: 'Combined signal from skills, reliability, and schedule readiness.',
      },
      {
        label: 'Payroll Compliance Rate',
        value: `${profile.payrollCompliance}%`,
        insight: 'Useful for government reporting, incentives, and labor audits.',
      },
    ]
  }, [matchResults, profile.payrollCompliance])

  const handleChange = (event) => {
    const { name, value } = event.target
    setProfile((current) => ({ ...current, [name]: value }))
  }

  return (
    <main className="layout">
      <header className="hero">
        <p className="kicker">Crew-Up Platform Blueprint</p>
        <h1>Database-driven crew matching for MENA productions.</h1>
        <p>
          This concept combines a clean operator UI with structured subscriber data, PM-led deal workflows, and KPI intelligence that
          studios and governments can actually use.
        </p>
      </header>

      <section className="panel">
        <h2>1) Subscriber & crew data intake</h2>
        <p className="section-lead">
          Every profile field below is meant to be stored in your core database and reused for matching, contract routing, payroll, and
          reporting.
        </p>

        <form className="form-grid">
          {[
            ['name', 'Full Name'],
            ['email', 'Work Email'],
            ['primaryRole', 'Primary Role'],
            ['country', 'Country'],
            ['yearsExperience', 'Years Experience'],
            ['expectedDayRate', 'Expected Day Rate (USD)'],
            ['language', 'Languages'],
            ['availabilityDate', 'Available From', 'date'],
            ['completedProjects', 'Completed Projects'],
            ['onTimeDeliveryScore', 'On-time Delivery Score'],
            ['payrollCompliance', 'Payroll Compliance Score'],
          ].map(([field, label, type = 'text']) => (
            <label key={field}>
              <span>{label}</span>
              <input name={field} type={type} value={profile[field]} onChange={handleChange} />
            </label>
          ))}
        </form>
      </section>

      <section className="panel">
        <h2>2) Smart matching queue (PM-assisted)</h2>
        <p className="section-lead">
          Project managers can review ranked candidates, negotiate rates, then push approved matches into contract and payroll flows.
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Role Needed</th>
                <th>Country</th>
                <th>Start Date</th>
                <th>Match Score</th>
              </tr>
            </thead>
            <tbody>
              {matchResults.map((row) => (
                <tr key={row.id}>
                  <td>{row.project}</td>
                  <td>{row.role}</td>
                  <td>{row.country}</td>
                  <td>{row.startDate}</td>
                  <td>
                    <strong>{row.score}%</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>3) KPI reporting layer for studios + government</h2>
        <p className="section-lead">
          Export-ready KPIs show labor market impact, compliance, and production velocity—critical for incentive programs and studio
          planning.
        </p>

        <div className="kpi-grid">
          {kpiSnapshot.map((kpi) => (
            <article className="kpi-card" key={kpi.label}>
              <p className="kpi-label">{kpi.label}</p>
              <p className="kpi-value">{kpi.value}</p>
              <p className="kpi-insight">{kpi.insight}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel narrow">
        <h2>Suggested data model (platform database)</h2>
        <ul>
          <li>
            <strong>users</strong>: identity, role (crew/company/PM/admin), country, verification state, KYC status.
          </li>
          <li>
            <strong>crew_profiles</strong>: specialties, credits, rates, languages, equipment, availability calendar.
          </li>
          <li>
            <strong>job_posts</strong>: project metadata, required role, budget band, location, schedule, compliance flags.
          </li>
          <li>
            <strong>matches</strong>: score breakdown, PM notes, negotiation status, approval audit trail.
          </li>
          <li>
            <strong>contracts_payroll</strong>: contract versioning, milestones, payout status, tax and labor records.
          </li>
          <li>
            <strong>kpi_facts</strong>: monthly metrics by region/studio/project type for executive and government reporting.
          </li>
        </ul>
      </section>
    </main>
  )
}

export default App
