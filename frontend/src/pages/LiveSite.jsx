// LiveSite.jsx
import React, { useEffect, useState } from 'react'
import { useWebsite } from '../hooks/useWebsite.js'
import { useParams } from 'react-router-dom'
import '../style/liveSite.css'

const LiveSite = () => {
  const { getWebsiteBySlug } = useWebsite()
  const { id } = useParams()                    // ✅ matches /site/:id in App.jsx
  const [html, setHtml] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleGetWebsite = async () => {
      if (!id) {
        setError('No website ID provided.')
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const res = await getWebsiteBySlug(id)
        console.log('res:', res)                // ← check shape, remove after

        const latestCode = res?.website?.latestCode || res?.latestCode
        if (!latestCode) {
          setError('No website content found.')
          return
        }
        setHtml(latestCode)
      } catch (err) {
        console.error(err)
        setError('Failed to load the website. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    handleGetWebsite()
  }, [id])

  if (loading) {
    return (
      <div className="live-site-wrapper">
        <div className="live-site-loader">
          <div className="loader-spinner" />
          <p className="loader-text">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="live-site-wrapper">
        <div className="live-site-error">
          <div className="error-icon">✕</div>
          <p className="error-message">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="live-site-wrapper">
      <div className="live-site-header">
        <div className="header-dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="header-title">Live Preview</div>
        <div className="header-badge">LIVE</div>
      </div>
      <div className="live-site-frame-container">
        <iframe
          title="Live site"
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin allow-forms"
          className="live-site-iframe"
        />
      </div>
    </div>
  )
}

export default LiveSite