import { useState, useEffect } from 'react'
import { BarChart3, Download, TrendingUp, Users, Briefcase, DollarSign, Loader2 } from 'lucide-react'
import {
  getReportSummary,
  getYearlyTrends,
  getCompanyWise,
  getDepartmentWise,
  exportReport,
  type ReportSummary,
  type YearlyTrend,
  type CompanyStat,
  type DepartmentStat,
} from '../../services/reportService'
import './Reports.css'

function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

function formatChange(value: number): string {
  if (value > 0) return `+${value}%`
  return `${value}%`
}

function formatPackage(value: number): string {
  return `₹${value.toFixed(1)} LPA`
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function Reports() {
  const [summary, setSummary] = useState<ReportSummary | null>(null)
  const [trends, setTrends] = useState<YearlyTrend[]>([])
  const [companyStats, setCompanyStats] = useState<CompanyStat[]>([])
  const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    let mounted = true

    async function fetchAll() {
      try {
        setLoading(true)
        const [s, t, c, d] = await Promise.all([
          getReportSummary(),
          getYearlyTrends(),
          getCompanyWise(),
          getDepartmentWise(),
        ])
        if (!mounted) return
        setSummary(s)
        setTrends(t)
        setCompanyStats(c)
        setDepartmentStats(d)
      } catch {
        if (mounted) setSummary(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchAll()
    return () => {
      mounted = false
    }
  }, [])

  const maxPlaced = trends.length > 0 ? Math.max(...trends.map((t) => t.placed), 1) : 1
  const maxPlacedCompany = companyStats.length > 0 ? Math.max(...companyStats.map((c) => c.placed), 1) : 1

  const handleExport = async () => {
    try {
      setExporting(true)
      const blob = await exportReport()
      downloadBlob(blob, 'placement-report.csv')
    } catch {
      // silently fail
    } finally {
      setExporting(false)
    }
  }

  const cards = summary
    ? [
        { title: 'Total Placements', value: formatNumber(summary.totalPlacements), change: `${formatChange(summary.change.placements)} from last year`, icon: Briefcase, color: 'primary' },
        { title: 'Active Students', value: formatNumber(summary.activeStudents), change: `${formatChange(summary.change.students)} from last year`, icon: Users, color: 'emerald' },
        { title: 'Avg Package', value: formatPackage(summary.avgPackage), change: `${formatChange(summary.change.avgPackage)} from last year`, icon: DollarSign, color: 'amber' },
        { title: 'Placement Rate', value: `${summary.placementRate}%`, change: `${formatChange(summary.change.placementRate)} from last year`, icon: TrendingUp, color: 'purple' },
      ]
    : []

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1 className="reports-title">Reports & Analytics</h1>
          <p className="reports-subtitle">Placement performance across companies, departments, and years</p>
        </div>
        <button className="reports-export-btn" onClick={handleExport} disabled={exporting}>
          {exporting ? <Loader2 size={16} className="reports-spinner" /> : <Download size={16} />}
          Export Report
        </button>
      </div>

      {loading ? (
        <div className="reports-chart">
          <div className="reports-chart-placeholder">
            <div className="reports-chart-content">
              <BarChart3 size={48} />
              <p>Loading reports...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="reports-grid">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="report-card">
                  <div className="report-card-top">
                    <span className="report-card-title">{card.title}</span>
                    <div className={`report-card-icon ${card.color}`}>
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="report-card-value">{card.value}</p>
                  <p className="report-card-change">{card.change}</p>
                </div>
              )
            })}
          </div>

          <div className="reports-chart">
            <h2 className="reports-chart-title">Placement Trend by Year</h2>
            {trends.length === 0 ? (
              <div className="reports-chart-placeholder">
                <div className="reports-chart-content">
                  <BarChart3 size={48} />
                  <p>No placement data available yet</p>
                </div>
              </div>
            ) : (
              <div className="reports-bar-chart">
                {trends.map((t) => (
                  <div key={t.year} className="reports-bar-col">
                    <span className="reports-bar-value">{t.placed}</span>
                    <div
                      className="reports-bar"
                      style={{ height: `${Math.max((t.placed / maxPlaced) * 100, 4)}%` }}
                    />
                    <span className="reports-bar-label">{t.year}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="reports-breakdown">
            <div className="reports-breakdown-card">
              <h2 className="reports-chart-title">Top Companies</h2>
              {companyStats.length === 0 ? (
                <p className="reports-breakdown-empty">No data yet</p>
              ) : (
                companyStats.map((c) => (
                  <div key={c.company} className="reports-breakdown-row">
                    <span className="reports-breakdown-label">{c.company}</span>
                    <div className="reports-breakdown-track">
                      <div
                        className="reports-breakdown-fill"
                        style={{ width: `${Math.max((c.placed / maxPlacedCompany) * 100, 2)}%` }}
                      />
                    </div>
                    <span className="reports-breakdown-value">{c.placed} placed · {c.drives} drives</span>
                  </div>
                ))
              )}
            </div>

            <div className="reports-breakdown-card">
              <h2 className="reports-chart-title">Department-wise Placements</h2>
              {departmentStats.length === 0 ? (
                <p className="reports-breakdown-empty">No data yet</p>
              ) : (
                departmentStats.map((d) => (
                  <div key={d.department} className="reports-breakdown-row">
                    <span className="reports-breakdown-label">{d.department}</span>
                    <div className="reports-breakdown-track">
                      <div
                        className="reports-breakdown-fill reports-breakdown-fill--purple"
                        style={{ width: `${Math.max((d.placed / maxPlaced) * 100, 2)}%` }}
                      />
                    </div>
                    <span className="reports-breakdown-value">{d.placed} placed · {d.drives} drives</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
