import React, { useState, useEffect } from 'react'
import { ArrowLeft, Check, Plus, Share2 } from 'lucide-react' // ✅ added Share2
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useWebsite } from '../hooks/useWebsite.js'
import '../style/dashboard.css'

const Dashboard = () => {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const { fetchAllWebsites, deploy } = useWebsite() // ✅ added deploy
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState('')
  const [websites, setWebsites] = useState([]) 
  
 const handleDeploy = async (id) => {
    try {
      const res = await deploy(id)
      window.open(`${res.url}`, '_blank')  
      setWebsites((prev) =>
        prev.map((w) => w._id === id ? { ...w, deployed: true, deployUrl: res.url } : w)  
      )
    } catch (error) {
      console.log('error in deploy', error)
    }
  }
  const handleCopied = async (site) => {
    try {
      await navigator.clipboard.writeText(site.deployUrl)
      setCopiedId(site._id)
      setTimeout(() => setCopiedId(''), 2000)
    } catch (error) {
      console.error('copy error', error)
    }
  }

  const handleGetAllWebsites = async () => {
    try {
      setLoading(true)
      const res = await fetchAllWebsites()
      setWebsites(res?.websites || res?.data || []) // ✅ actually store websites
      setError(null)
    } catch (error) {
      console.error('Error fetching all websites:', error)
      setError('Failed to fetch websites')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <ArrowLeft className="back-icon" onClick={() => navigate(-1)} />
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <button className="new-website-btn" onClick={() => navigate('/generate-profile')}>
          <Plus className="plus-icon" />
          New Website
        </button>
      </header>
      <main className="dashboard-main">
        <div className="welcome-section">
          <p className="welcome-text">Welcome back</p>
          <h2 className="user-name">{userData?.name || 'User'}</h2>
        </div>
        <div className="websites-section">
          <button className="fetch-btn" onClick={handleGetAllWebsites} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Websites'}
          </button>
          {error && <p className="error-msg">{error}</p>}

          {/* ✅ map over websites array */}
          {websites.map((w) => (
            <div key={w._id}>
              <p>{w.name || w.title || w._id}</p>
              <button onClick={() => handleDeploy(w._id)}>Deploy</button>
              <button onClick={() => handleCopied(w)}>
                {copiedId === w._id ? ( // ✅ check per-website copied state
                  <><Check size={14} /> Link copied</>
                ) : (
                  <><Share2 size={14} /> Share Link</>
                )}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard